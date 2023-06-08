const fs = require('fs')
const {QRCode} = require('@ali1416/qrcode-encoder')

const contactQQ = "https://qm.qq.com/cgi-bin/qm/qr?k=1eBuYD8Qu7vGH05Yrpac3UoLdWesIQfl"
const contactWeChat = "https://u.wechat.com/EKWOJfyClzkv8bhDG96fVAs"
const contactAliPay = "https://qr.alipay.com/a7x14840swddpo9xtqadp9a"
const contactEmail = "mailto:1416978277@qq.com"

const sponsorQQ = "https://i.qianbao.qq.com/wallet/sqrcode.htm?a=1&n=1&u=1416978277&ac=CAEQ5b7VowUYnfDsgQY%3D_xxx_sign"
const sponsorWeChat = "wxp://f2f0jddlG49-RNa1tIOpyJBNMqY4uDhztz-4"
const sponsorAliPay = "https://qr.alipay.com/tsx12002eejtwi0y7yx3x71"
const sponsorUnionPay = "UnionPay"

// c66l1
const qrContactQQ = new QRCode(contactQQ, 1, 2, 5)
// c44l3
const qrContactWeChat = new QRCode(contactWeChat, 3, 2, 5)
// c45l2
const qrContactAliPay = new QRCode(contactAliPay, 2, 2, 5)
// c24l3
const qrContactEmail = new QRCode(contactEmail, 3, 2, 5)

// c99l0
const qrSponsorQQ = new QRCode(sponsorQQ, 0, 2, 5)
// c42l3
const qrSponsorWeChat = new QRCode(sponsorWeChat, 3, 2, 5)
// c45l2
const qrSponsorAliPay = new QRCode(sponsorAliPay, 2, 2, 5)
// c8l3
const qrSponsorUnionPay = new QRCode(sponsorUnionPay, 3, 2, 5)

const qr = [qrContactQQ, qrContactWeChat, qrContactAliPay, qrContactEmail, qrSponsorQQ, qrSponsorWeChat, qrSponsorAliPay, qrSponsorUnionPay]
const qrName = ['contactQQ', 'contactWeChat', 'contactAliPay', 'contactEmail', 'sponsorQQ', 'sponsorWeChat', 'sponsorAliPay', 'sponsorUnionPay']
const qrColor = ['#f99', '#9c9', '#6cf', '#333', '#f99', '#9c9', '#6cf', '#333'];
const qrXy = [[0, 80], [120, 80], [240, 80], [360, 80], [0, 280], [120, 280], [240, 280], [360, 280]]

let svg = `<svg width="480" height="400" viewBox="0 0 480 400" xmlns="http://www.w3.org/2000/svg">
${defs()}
<text>
  <tspan x="10" y="20" font-size="150%">联络</tspan>
  <tspan x="45" y="60"><a href="${contactQQ}" target="_blank">QQ</a></tspan>
  <tspan x="20" y="80" font-size="85%">1416978277</tspan>
  <tspan x="162" y="60"><a href="${contactWeChat}" target="_blank">微信</a></tspan>
  <tspan x="138" y="80" font-size="85%">1416978277</tspan>
  <tspan x="275" y="60"><a href="${contactAliPay}" target="_blank">支付宝</a></tspan>
  <tspan x="240" y="80" font-size="85%">1416978277</tspan>
  <tspan x="390" y="60"><a href="${contactEmail}" target="_blank">电子邮箱</a></tspan>
  <tspan x="330" y="80" font-size="85%">1416978277@qq.com</tspan>
  <tspan x="10" y="240" font-size="150%">赞助</tspan>
  <tspan x="45" y="280">QQ</tspan>
  <tspan x="162" y="280">微信</tspan>
  <tspan x="275" y="280">支付宝</tspan>
  <tspan x="395" y="280">云闪付</tspan>
</text>
${uses()}</svg>
`

fs.mkdirSync('./dist/images/', {recursive: true})
fs.writeFileSync('./dist/images/about.svg', svg)

/**
 * 定义
 */
function defs() {
  let defs = "<defs>"
  for (let i = 0; i < qr.length; i++) {
    defs += `<path d="\n${QrMatrix2SvgPath(qr[i].Matrix, 3)}" id="${qrName[i]}"></path>\n`
  }
  defs += "</defs>"
  return defs
}

/**
 * 引用
 */
function uses() {
  let uses = ""
  for (let i = 0; i < qrName.length; i++) {
    uses += `<use href="#${qrName[i]}" fill="${qrColor[i]}" x="${qrXy[i][0]}" y="${qrXy[i][1]}"></use>\n`
  }
  return uses;
}

/**
 * 二维码boolean[][]转SVG路径
 * @param bytes boolean[][]
 * @param pixelSize 像素尺寸
 * @return string SVG
 */
function QrMatrix2SvgPath(bytes, pixelSize) {
  let length = bytes.length;
  let svg = "";
  for (let x = 0; x < length; x++) {
    for (let y = 0; y < length; y++) {
      if (bytes[x][y]) {
        let xx = (x + 1) * pixelSize;
        let yy = (y + 1) * pixelSize;
        svg += "M" + xx + " " + yy + "H" + (xx + pixelSize) + "V" + (yy + pixelSize) + "H" + xx + "Z\n"
      }
    }
  }
  return svg;
}
