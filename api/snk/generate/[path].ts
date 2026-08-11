import {VercelRequest, VercelResponse} from '@vercel/node'
import {
  cacheControl,
  cacheControlMaxAge,
  contentType,
  contentTypeJson,
  contentTypePlain,
  contentTypeSvg,
  textNotFound,
} from '../../../src/Constant'
import {snk} from '@ali1416/snk'

export default async (request: VercelRequest, response: VercelResponse) => {
  const {path, year} = request.query
  let pathValue: string = path as string
  let pathValueArray: string [] = pathValue.split('.')
  let yearValue: string = year as string
  let userNameValue: string

  let status: number = 200
  let contentTypeValue: string = contentTypePlain
  let data: any
  try {
    userNameValue = pathValueArray[0]
    switch (pathValueArray.length) {
      // /api/snk/generate/ali1416
      case 1: {
        data = await snk(userNameValue, 3, yearValue)
        contentTypeValue = contentTypeJson
        break
      }
      case 2: {
        // /api/snk/generate/ali1416.svg
        if (pathValueArray[1] === 'svg') {
          data = await snk(userNameValue, 0, yearValue)
          contentTypeValue = contentTypeSvg
        }
        break
      }
      case 3: {
        if (pathValueArray[2] === 'svg') {
          switch (pathValueArray[1]) {
            // /api/snk/generate/ali1416.light.svg
            case 'light': {
              data = await snk(userNameValue, 1, yearValue)
              contentTypeValue = contentTypeSvg
              break
            }
            // /api/snk/generate/ali1416.dark.svg
            case 'dark': {
              data = await snk(userNameValue, 2, yearValue)
              contentTypeValue = contentTypeSvg
              break
            }
          }
        }
        break
      }
    }
    if (!data) {
      status = 404
      data = textNotFound
    }
  } catch (e) {
    const error = e as Error
    console.error(error)
    status = 500
    data = error.toString()
  }
  response.status(status)
    .setHeader(contentType, contentTypeValue)
    .setHeader(cacheControl, cacheControlMaxAge)
    .send(data)
}
