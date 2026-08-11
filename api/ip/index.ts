import {VercelRequest, VercelResponse} from '@vercel/node'
import {contentType, contentTypeJson} from '../../src/Constant'

export default async (request: VercelRequest, response: VercelResponse) => {
  let ip: string | string[] | undefined = request.headers['x-real-ip']
  response.status(200)
    .setHeader(contentType, contentTypeJson)
    .send({ip})
}
