import {VercelRequest, VercelResponse} from '@vercel/node'
import {contentType, contentTypeJson} from '../constants'

export default async (request: VercelRequest, response: VercelResponse) => {
  let ip = request.headers['x-real-ip']
  response.status(200)
    .setHeader(contentType, contentTypeJson)
    .send({ip})
}
