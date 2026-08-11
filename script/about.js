const fs = require('node:fs')
const {QRCode} = require('@ali1416/qrcode-encoder')

const contactQQ = 'https://qm.qq.com/cgi-bin/qm/qr?k=1eBuYD8Qu7vGH05Yrpac3UoLdWesIQfl'
const contactWeChat = 'https://u.wechat.com/EKWOJfyClzkv8bhDG96fVAs'
const contactAliPay = 'https://qr.alipay.com/a7x14840swddpo9xtqadp9a'
const contactEmail = 'mailto:1416978277@qq.com'

const sponsorQQ = 'https://i.qianbao.qq.com/wallet/sqrcode.htm?a=1&n=1&u=1416978277&ac=CAEQ5b7VowUY98DK0wYyDOS4quS6uuekvuS6pDgBQiBiODMzMWJmOGNiYjAwMjZjNmJlYmJiODkwOWVmNjBiY0oMNTguNTguNTEuMjI2_xxx_sign'
const sponsorWeChat = 'wxp://f2f0jddlG49-RNa1tIOpyJBNMqY4uDhztz-4'
const sponsorAliPay = 'https://qr.alipay.com/tsx12002eejtwi0y7yx3x71'
const sponsorUnionPay = 'UnionPay'

// v4d33x3=99 v8d49x2=98
// 66l0m2v4 l0m2v4
const qrContactQQ = new QRCode(contactQQ, 0, 2, 4)
// 44l0m2v3 l2m2v4
const qrContactWeChat = new QRCode(contactWeChat, 2, 2, 4)
// 45l0m2v3 l2m2v4
const qrContactAliPay = new QRCode(contactAliPay, 2, 2, 4)
// 24l0m2v2 l3m2v4
const qrContactEmail = new QRCode(contactEmail, 3, 2, 4)

// 181l0m2v8
const qrSponsorQQ = new QRCode(sponsorQQ, 0, 2, 8)
// 42l0m2v3 l2m2v4
const qrSponsorWeChat = new QRCode(sponsorWeChat, 2, 2, 4)
// 45l0m2v3 l2m2v4
const qrSponsorAliPay = new QRCode(sponsorAliPay, 2, 2, 4)
// 8l0m2v1 l3m2v4
const qrSponsorUnionPay = new QRCode(sponsorUnionPay, 3, 2, 4)

const qrName = ['contactQQ', 'contactWeChat', 'contactAliPay', 'contactEmail', 'sponsorQQ', 'sponsorWeChat', 'sponsorAliPay', 'sponsorUnionPay']
const qrColorLight = ['#f99', '#9c9', '#6cf', '#333', '#f99', '#9c9', '#6cf', '#333']
const qrColorDark = ['#f99', '#9c9', '#6cf', '#ccc', '#f99', '#9c9', '#6cf', '#ccc']
const qrXy = [[10, 80], [130, 80], [250, 80], [370, 80], [10, 255], [130, 255], [250, 255], [370, 255]]
// --fgColor-default
const textColorLight = '#1f2328'
const textColorDark = '#f0f6fc'

const style = styles()
const def = defs()
const use = uses()
const useLight = uses('light')
const useDark = uses('dark')
const text = texts()
const textLight = texts('light')
const textDark = texts('dark')

const svgHeader = '<svg width="480" height="360" viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg">'
const svgFooter = '</svg>'
const svgLight = `${svgHeader}
${def}
${textLight}
${useLight}${svgFooter}
`
const svgDark = `${svgHeader}
${def}
${textDark}
${useDark}${svgFooter}
`
const svg = `${svgHeader}
${style}
${def}
${text}
${use}${svgFooter}
`

/**
 * 写入文件
 */
fs.mkdirSync('./dist/images/', {recursive: true})
fs.writeFileSync('./dist/images/about.light.svg', svgLight)
fs.writeFileSync('./dist/images/about.dark.svg', svgDark)
fs.writeFileSync('./dist/images/about.svg', svg)

/**
 * 样式
 */
function styles() {
  let style = `<style>
.text{fill:${textColorLight}}
`
  for (let i = 0; i < qrColorLight.length; i++) {
    style += `.qr${i}{fill:${qrColorLight[i]}}\n`
  }
  style += `@media(prefers-color-scheme: dark){
.text{fill:${textColorDark}}
`
  for (let i = 0; i < qrColorDark.length; i++) {
    style += `.qr${i}{fill:${qrColorDark[i]}}\n`
  }
  style += `}
</style>`
  return style
}

/**
 * 定义
 */
function defs() {
  let defs = '<defs>\n'
  defs += `<path id="contactQQ" d="${QrMatrix2SvgPath(qrContactQQ.Matrix, 3)}"/>\n`
  defs += `<path id="contactWeChat" d="${QrMatrix2SvgPath(qrContactWeChat.Matrix, 3)}"/>\n`
  defs += `<path id="contactAliPay" d="${QrMatrix2SvgPath(qrContactAliPay.Matrix, 3)}"/>\n`
  defs += `<path id="contactEmail" d="${QrMatrix2SvgPath(qrContactEmail.Matrix, 3)}"/>\n`
  defs += `<path id="sponsorQQ" d="${QrMatrix2SvgPath(qrSponsorQQ.Matrix, 2)}"/>\n`
  defs += `<path id="sponsorWeChat" d="${QrMatrix2SvgPath(qrSponsorWeChat.Matrix, 3)}"/>\n`
  defs += `<path id="sponsorAliPay" d="${QrMatrix2SvgPath(qrSponsorAliPay.Matrix, 3)}"/>\n`
  defs += `<path id="sponsorUnionPay" d="${QrMatrix2SvgPath(qrSponsorUnionPay.Matrix, 3)}"/>\n`
  defs += '</defs>'
  return defs
}

/**
 * 文本
 */
function texts(scheme) {
  let color
  switch (scheme) {
    case 'light': {
      color = `fill="${textColorLight}"`
      break
    }
    case 'dark': {
      color = `fill="${textColorDark}"`
      break
    }
    default: {
      color = `class="text"`
    }
  }
  return `<text ${color}>
<tspan x="10" y="30" font-size="125%" font-weight="600">联络</tspan>
<tspan x="50" y="60"><a href="${contactQQ}" target="_blank">QQ</a></tspan>
<tspan x="25" y="80" font-size="85%">1416978277</tspan>
<tspan x="170" y="60"><a href="${contactWeChat}" target="_blank">微信</a></tspan>
<tspan x="145" y="80" font-size="85%">1416978277</tspan>
<tspan x="280" y="60"><a href="${contactAliPay}" target="_blank">支付宝</a></tspan>
<tspan x="250" y="80" font-size="85%">1416978277</tspan>
<tspan x="390" y="60"><a href="${contactEmail}" target="_blank">电子邮箱</a></tspan>
<tspan x="340" y="80" font-size="85%">1416978277@qq.com</tspan>
<tspan x="10" y="220" font-size="125%" font-weight="600">赞助</tspan>
<tspan x="50" y="250">QQ</tspan>
<tspan x="170" y="250">微信</tspan>
<tspan x="280" y="250">支付宝</tspan>
<tspan x="400" y="250">云闪付</tspan>
</text>`
}

/**
 * 引用
 */
function uses(scheme) {
  let uses = ''
  for (let i = 0; i < qrName.length; i++) {
    let color
    switch (scheme) {
      case 'light': {
        color = `fill="${qrColorLight[i]}"`
        break
      }
      case 'dark': {
        color = `fill="${qrColorDark[i]}"`
        break
      }
      default: {
        color = `class="qr${i}"`
      }
    }
    uses += `<use href="#${qrName[i]}" ${color} x="${qrXy[i][0]}" y="${qrXy[i][1]}"/>\n`
  }
  return uses
}

/**
 * 二维码boolean[][]转SVG路径
 * @param bytes boolean[][]
 * @param pixelSize 像素尺寸
 * @return string SVG
 */
function QrMatrix2SvgPath(bytes, pixelSize) {
  let length = bytes.length
  let svg = ''
  for (let x = 0; x < length; x++) {
    for (let y = 0; y < length; y++) {
      if (bytes[x][y]) {
        let xx = (x + 1) * pixelSize
        let yy = (y + 1) * pixelSize
        svg += 'M' + xx + ' ' + yy + 'H' + (xx + pixelSize) + 'V' + (yy + pixelSize) + 'H' + xx + 'Z'
      }
    }
  }
  return svg
}
