import cors from 'cors'
import express, { type ErrorRequestHandler } from 'express'
import type { AppConfig } from './config.js'
import { fetchCourses } from './services/courseProxy.js'

export function createApp(config: AppConfig, fetchImpl: typeof fetch = fetch) {
    const app = express()

    app.disable('x-powered-by')
    app.use(cors({ origin: config.frontendOrigin, methods: ['GET'] }))

    app.get('/api/health', (_request, response) => {
        response.json({ status: 'ok' })
    })

    app.get('/api/courses', async (request, response, next) => {
        const requestUrl = new URL(request.originalUrl, 'http://localhost')
        if (requestUrl.search.length > 2048) {
            response.status(400).json({
                error: {
                    code: 'QUERY_TOO_LONG',
                    message: 'Course query parameters must not exceed 2048 characters.',
                },
            })
            return
        }

        let upstreamResponse: Response
        try {
            upstreamResponse = await fetchCourses(requestUrl.searchParams, fetchImpl)
        } catch (error) {
            if (error instanceof Error && error.name === 'TimeoutError') {
                response.status(504).json({
                    error: {
                        code: 'COURSE_API_TIMEOUT',
                        message: 'The course API did not respond in time.',
                    },
                })
                return
            }

            if (error instanceof Error) {
                console.error('Course API request failed:', error.message)
            } else {
                console.error('Course API request failed with a non-error value.')
            }
            response.status(502).json({
                error: {
                    code: 'COURSE_API_UNAVAILABLE',
                    message: 'The course API could not be reached.',
                },
            })
            return
        }

        try {
            const body = Buffer.from(await upstreamResponse.arrayBuffer())
            response.status(upstreamResponse.status)
            const upstreamContentType = upstreamResponse.headers.get('content-type')
            response.set(
                'content-type',
                isJsonBody(body)
                    ? 'application/json; charset=utf-8'
                    : (upstreamContentType ?? 'application/octet-stream'),
            )
            response.send(body)
        } catch (error) {
            next(error)
        }
    })

    app.use((_request, response) => {
        response.status(404).json({
            error: {
                code: 'ROUTE_NOT_FOUND',
                message: 'The requested API route was not found.',
            },
        })
    })

    const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
        console.error('Unhandled API error:', error)
        response.status(500).json({
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                message: 'An unexpected server error occurred.',
            },
        })
    }
    app.use(errorHandler)

    return app
}

function isJsonBody(body: Buffer): boolean {
    try {
        JSON.parse(body.toString('utf8'))
        return true
    } catch {
        return false
    }
}
