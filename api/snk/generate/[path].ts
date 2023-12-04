import {snk} from '@ali1416/snk'

export default async (request, response) => {
  const {path, year} = request.query
  let pathValue = path as string
  let pathValueArray = pathValue.split('.')
  let yearValue = year as string
  let userNameValue: string
  try {
    userNameValue = pathValueArray[0]
    let data
    let notFound = true
    let contentType = 'image/svg+xml; charset=utf-8'
    switch (pathValueArray.length) {
      // /api/snk/generate/ali1416
      case 1: {
        data = await snk(userNameValue, 3, yearValue)
        notFound = false
        contentType = 'application/json; charset=utf-8'
        break
      }
      case 2: {
        // /api/snk/generate/ali1416.svg
        if (pathValueArray[1] === 'svg') {
          data = await snk(userNameValue, 0, yearValue)
          notFound = false
          break
        }
      }
      case 3: {
        if (pathValueArray[2] === 'svg') {
          switch (pathValueArray[1]) {
            // /api/snk/generate/ali1416.light.svg
            case 'light': {
              data = await snk(userNameValue, 1, yearValue)
              notFound = false
              break
            }
            // /api/snk/generate/ali1416.dark.svg
            case 'dark': {
              data = await snk(userNameValue, 2, yearValue)
              notFound = false
              break
            }
          }
        }
      }
    }
    if (notFound) {
      response.status(404).end('404 NOT FOUND')
    } else {
      response.status(200)
        .setHeader('Content-Type', contentType)
        .setHeader('Cache-Control', 'max-age=21600, s-maxage=43200, stale-while-revalidate=86400')
        .send(data)
    }
  } catch (e) {
    console.error(e)
    response.status(500).end(e.toString())
  }
}
