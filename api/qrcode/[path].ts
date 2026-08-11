import {VercelRequest, VercelResponse} from '@vercel/node'
import {contentType, contentTypeJson, contentTypePlain, contentTypeSvg, textNotFound} from '../../src/Constant'
import {QRCode} from '@ali1416/qrcode-encoder'

/**
 * 二维码boolean[][]转SVG路径
 * @param bytes boolean[][]
 * @param pixelSize 像素尺寸
 * @return string SVG
 */
function QrMatrix2SvgPath(bytes: boolean[][], pixelSize: number): string {
  let length: number = bytes.length
  let size: number = (length + 2) * pixelSize
  let svg: string = '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" xmlns="http://www.w3.org/2000/svg">\n'
  svg += '<path d="'
  for (let x: number = 0; x < length; x++) {
    for (let y: number = 0; y < length; y++) {
      if (bytes[x][y]) {
        let xx: number = (x + 1) * pixelSize
        let yy: number = (y + 1) * pixelSize
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
  let pathValue: string = path as string
  let contentValue: string = content as string
  let levelValue: number | undefined = Number(level as string)
  if (Number.isNaN(levelValue)) {
    levelValue = undefined
  }
  let modeValue: number | undefined = Number(mode as string)
  if (Number.isNaN(modeValue)) {
    modeValue = undefined
  }
  let versionNumberValue: number | undefined = Number(versionNumber as string)
  if (Number.isNaN(versionNumberValue)) {
    versionNumberValue = undefined
  }
  let pixelSizeValue: number = Number(pixelSize as string)
  if (Number.isNaN(pixelSizeValue)) {
    pixelSizeValue = 10
  }

  let status: number = 200
  let contentTypeValue: string = contentTypePlain
  let data: any
  try {
    switch (pathValue) {
      // /api/qrcode/encoder?content=123
      case 'encoder': {
        let qr: QRCode = new QRCode(contentValue, levelValue, modeValue, versionNumberValue)
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
    const error = e as Error
    console.error(error)
    status = 500
    data = error.toString()
  }
  response.status(status)
    .setHeader(contentType, contentTypeValue)
    .send(data)
}
