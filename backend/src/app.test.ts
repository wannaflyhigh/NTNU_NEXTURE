import assert from 'node:assert/strict'
import { afterEach, test } from 'node:test'
import request from 'supertest'
import { createApp } from './app.js'
import type { AppConfig } from './config.js'

const baseConfig: AppConfig = {
    port: 3000,
    frontendOrigin: 'http://localhost:5173',
}
const originalCourseApiUrl = process.env.COURSE_API_URL

afterEach(() => {
    if (originalCourseApiUrl === undefined) {
        delete process.env.COURSE_API_URL
    } else {
        process.env.COURSE_API_URL = originalCourseApiUrl
    }
})

test('health endpoint reports a healthy API', async () => {
    const response = await request(createApp(baseConfig)).get('/api/health')

    assert.equal(response.status, 200)
    assert.deepEqual(response.body, { status: 'ok' })
})

test('course endpoint reports missing upstream configuration', async () => {
    delete process.env.COURSE_API_URL
    const response = await request(createApp(baseConfig)).get('/api/courses')

    assert.equal(response.status, 503)
    assert.equal(response.body.error.code, 'COURSE_API_NOT_CONFIGURED')
})

test('course endpoint forwards query parameters and the upstream response', async () => {
    process.env.COURSE_API_URL =
        'https://courses.example.edu/api/courses?acadmYear=115&department=default'
    let observedUrl: URL | undefined
    let observedHeaders: HeadersInit | undefined
    const fetchImpl: typeof fetch = async (input, init) => {
        const url = new URL(input.toString())
        observedUrl = url
        observedHeaders = init?.headers
        assert.equal(url.origin, 'https://courses.example.edu')
        assert.equal(url.pathname, '/api/courses')
        assert.equal(url.searchParams.get('keyword'), '資料科學')
        assert.equal(url.searchParams.get('department'), 'CS')
        assert.equal(url.searchParams.get('acadmYear'), '115')
        assert.ok(/^\d+$/.test(url.searchParams.get('_dc') ?? ''))
        return new Response('{"items":[]}', {
            status: 200,
            headers: { 'content-type': 'text/html;charset=UTF-8' },
        })
    }

    const response = await request(createApp(baseConfig, fetchImpl))
        .get('/api/courses?keyword=%E8%B3%87%E6%96%99%E7%A7%91%E5%AD%B8&department=CS')

    assert.equal(response.status, 200)
    assert.equal(response.headers['content-type'], 'application/json; charset=utf-8')
    assert.deepEqual(response.body, { items: [] })
    assert.equal(observedUrl?.searchParams.get('department'), 'CS')
    assert.equal(
        new Headers(observedHeaders).get('referer'),
        'https://courses.example.edu/api/courses?language=chinese',
    )
    assert.equal(new Headers(observedHeaders).get('x-requested-with'), 'XMLHttpRequest')
})

test('course endpoint rejects oversized query strings', async () => {
    process.env.COURSE_API_URL = 'https://courses.example.edu/api/courses'
    let upstreamCalled = false
    const fetchImpl: typeof fetch = async () => {
        upstreamCalled = true
        return new Response('{}')
    }
    const response = await request(createApp(baseConfig, fetchImpl))
        .get(`/api/courses?keyword=${'a'.repeat(2050)}`)

    assert.equal(response.status, 400)
    assert.equal(upstreamCalled, false)
})

test('course endpoint reports upstream connection failures', async () => {
    process.env.COURSE_API_URL = 'https://courses.example.edu/api/courses'
    const fetchImpl: typeof fetch = async () => {
        throw new Error('connection refused')
    }

    const response = await request(createApp(baseConfig, fetchImpl)).get('/api/courses')

    assert.equal(response.status, 502)
    assert.equal(response.body.error.code, 'COURSE_API_UNAVAILABLE')
})

test('course endpoint reports upstream timeouts', async () => {
    process.env.COURSE_API_URL = 'https://courses.example.edu/api/courses'
    const fetchImpl: typeof fetch = async () => {
        throw new DOMException('request timed out', 'TimeoutError')
    }

    const response = await request(createApp(baseConfig, fetchImpl)).get('/api/courses')

    assert.equal(response.status, 504)
    assert.equal(response.body.error.code, 'COURSE_API_TIMEOUT')
})
