const contentType: string = 'Content-Type'
const contentTypePlain: string = 'text/plain; charset=utf-8'
const contentTypeJson: string = 'application/json; charset=utf-8'
const contentTypeSvg: string = 'image/svg+xml; charset=utf-8'

const cacheControl: string = 'Cache-Control'
const cacheControlMaxAge: string = 'max-age=21600, s-maxage=43200, stale-while-revalidate=86400'
const cacheControlNo: string = 'private, no-store, no-cache, must-revalidate, max-age=0'

const textNotFound: string = '404 NOT FOUND'

export {
  contentType, contentTypePlain, contentTypeJson, contentTypeSvg,
  cacheControl, cacheControlMaxAge, cacheControlNo,
  textNotFound,
}
