const REQUEST_TIMEOUT_MS = 5000

export function fetchCourses(
    query: URLSearchParams,
    fetchImpl: typeof fetch = fetch,
): Promise<Response> {
    const targetUrl = new URL(
        'https://courseap2.itc.ntnu.edu.tw/acadmOpenCourse/CofopdlCtrl?acadmYear=115&acadmTerm=1&chn=&engTeach=N&clang=N&moocs=N&remoteCourse=N&digital=N&adsl=N&deptCode=SU47&zuDept=&classCode=&kind=&generalCore=&teacher=&serial_number=&course_code=&language=chinese&action=showGrid&weekSection=&start=0&limit=99999&page=1',
    )
    query.forEach((value, key) => targetUrl.searchParams.set(key, value))
    targetUrl.searchParams.set('_dc', String(Date.now()))

    const refererUrl = new URL(targetUrl)

    return fetchImpl(targetUrl, {
        headers: {
            accept: 'application/json, text/javascript, */*; q=0.01',
            referer: refererUrl.toString(),
            'x-requested-with': 'XMLHttpRequest',
        },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        redirect: 'error',
    })
}
