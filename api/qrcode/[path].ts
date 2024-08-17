import {VercelRequest, VercelResponse} from '@vercel/node'
import {contentType, contentTypeJson, contentTypePlain, contentTypeSvg, textNotFound} from '../../src/constants'
import {QRCode} from '@ali1416/qrcode-encoder'

/**
 * 二维码boolean[][]转SVG路径
 * @param bytes boolean[][]
 * @param pixelSize 像素尺寸
 * @return string SVG
 */
function QrMatrix2SvgPath(bytes: boolean[][], pixelSize: number): string {
  let length = bytes.length
  let size = (length + 2) * pixelSize
  let svg = '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" xmlns="http://www.w3.org/2000/svg">\n'
  svg += '<path d="'
  for (let x = 0; x < length; x++) {
    for (let y = 0; y < length; y++) {
      if (bytes[x][y]) {
        let xx = (x + 1) * pixelSize
        let yy = (y + 1) * pixelSize
        svg += 'M' + xx + ' ' + yy + 'H' + (xx + pixelSize) + 'V' + (yy + pixelSize) + 'H' + xx + 'Z'
      }
    }
  }
  svg += '"/>'
  svg += '\n</svg>\n'
  return svg
}

export default (request: VercelRequest, response: VercelResponse) => {
  const {path, content, level, mode, versionNumber, pixelSize} = request.query
  let pathValue = path as string
  let contentValue = content as string
  let levelValue = Number(level as string)
  if (isNaN(levelValue)) {
    levelValue = undefined
  }
  let modeValue = Number(mode as string)
  if (isNaN(modeValue)) {
    modeValue = undefined
  }
  let versionNumberValue = Number(versionNumber as string)
  if (isNaN(versionNumberValue)) {
    versionNumberValue = undefined
  }
  let pixelSizeValue = Number(pixelSize as string)
  if (isNaN(pixelSizeValue)) {
    pixelSizeValue = 10
  }

  let status = 200
  let contentTypeValue = contentTypePlain
  let data: any
  try {
    switch (pathValue) {
      // /api/qrcode/encoder?content=123
      case 'encoder': {
        let qr = new QRCode(contentValue, levelValue, modeValue, versionNumberValue)
        data = [[qr.Level, qr.Mode, qr.VersionNumber], qr.Matrix]
        contentTypeValue = contentTypeJson
        break
      }
      // /api/qrcode/encoder.svg?content=123
      case 'encoder.svg': {
        data = QrMatrix2SvgPath(new QRCode(contentValue, levelValue, modeValue, versionNumberValue).Matrix, pixelSizeValue)
        contentTypeValue = contentTypeSvg
        break
      }
      default: {
        status = 404
        data = textNotFound
      }
    }
  } catch (e) {
    console.error(e)
    status = 500
    data = e.toString()
  }
  response.status(status)
    .setHeader(contentType, contentTypeValue)
    .send(data)
}
