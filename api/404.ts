import {VercelRequest, VercelResponse} from '@vercel/node'
import {contentType, contentTypePlain, textNotFound} from '../src/constants'

export default async (request: VercelRequest, response: VercelResponse) => {
  response.status(404)
    .setHeader(contentType, contentTypePlain)
    .send(textNotFound)
}
