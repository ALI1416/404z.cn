import {VercelRequest, VercelResponse} from '@vercel/node'
import {contentType, contentTypeJson} from '../constants'

export default async (request: VercelRequest, response: VercelResponse) => {
  let ip = (request.headers['x-real-ip'] as string).substring(7)
  response.status(200)
    .setHeader(contentType, contentTypeJson)
    .send({ip})
}
