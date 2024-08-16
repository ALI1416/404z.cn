import {VercelRequest, VercelResponse} from '@vercel/node'
import {contentType, contentTypeJson, contentTypePlain} from '../constants'
import {parse} from '../Phone2RegionParse'

export default async (request: VercelRequest, response: VercelResponse) => {
  const {phone} = request.query
  let phoneValue = phone as string

  let status = 200
  let contentTypeValue = contentTypePlain
  let data: any
  try {
    // /api/phone2region/1875471
    data = parse(phoneValue)
    contentTypeValue = contentTypeJson
  } catch (e) {
    console.error(e)
    status = 500
    data = e.toString()
  }
  response.status(status)
    .setHeader(contentType, contentTypeValue)
    .send(data)
}
