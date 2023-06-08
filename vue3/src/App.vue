<script setup>
import {QRCode} from '@ali1416/qrcode-encoder'
import {SVG} from '@svgdotjs/svg.js'
import {onMounted} from "vue"

const contactQQ = "https://qm.qq.com/cgi-bin/qm/qr?k=1eBuYD8Qu7vGH05Yrpac3UoLdWesIQfl"
const contactWeChat = "https://u.wechat.com/EKWOJfyClzkv8bhDG96fVAs"
const contactAliPay = "https://qr.alipay.com/a7x14840swddpo9xtqadp9a"
const contactEmail = "mailto:1416978277@qq.com"

const sponsorQQ = "https://i.qianbao.qq.com/wallet/sqrcode.htm?a=1&n=1&u=1416978277&ac=CAEQ5b7VowUYnfDsgQY%3D_xxx_sign"
const sponsorWeChat = "wxp://f2f0jddlG49-RNa1tIOpyJBNMqY4uDhztz-4"
const sponsorAliPay = "https://qr.alipay.com/tsx12002eejtwi0y7yx3x71"
const sponsorUnionPay = "UnionPay"

onMounted(() => {
  // v5m2 108, 86, 62, 46 -2 106, 84, 60, 44 d37 +2 39
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

  const draw = SVG('#svg').size(480, 400)

  draw.use(draw.defs().path(QrMatrix2SvgPath(qrContactQQ.Matrix, 3))).fill('#f99').move(0, 80)
  draw.use(draw.defs().path(QrMatrix2SvgPath(qrContactWeChat.Matrix, 3))).fill('#9c9').move(120, 80)
  draw.use(draw.defs().path(QrMatrix2SvgPath(qrContactAliPay.Matrix, 3))).fill('#6cf').move(240, 80)
  draw.use(draw.defs().path(QrMatrix2SvgPath(qrContactEmail.Matrix, 3))).fill('#333').move(360, 80)

  draw.use(draw.defs().path(QrMatrix2SvgPath(qrSponsorQQ.Matrix, 3))).fill('#f99').move(0, 280)
  draw.use(draw.defs().path(QrMatrix2SvgPath(qrSponsorWeChat.Matrix, 3))).fill('#9c9').move(120, 280)
  draw.use(draw.defs().path(QrMatrix2SvgPath(qrSponsorAliPay.Matrix, 3))).fill('#6cf').move(240, 280)
  draw.use(draw.defs().path(QrMatrix2SvgPath(qrSponsorUnionPay.Matrix, 3))).fill('#333').move(360, 280)
});

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
</script>

<template>
  <svg id="svg">
    <text>
      <tspan x="10" y="20" font-size="150%">联络</tspan>
      <tspan x="45" y="60"><a href="https://qm.qq.com/cgi-bin/qm/qr?k=1eBuYD8Qu7vGH05Yrpac3UoLdWesIQfl" target="_blank">QQ</a></tspan>
      <tspan x="20" y="80" font-size="85%">1416978277</tspan>
      <tspan x="162" y="60"><a href="https://u.wechat.com/EKWOJfyClzkv8bhDG96fVAs" target="_blank">微信</a></tspan>
      <tspan x="138" y="80" font-size="85%">1416978277</tspan>
      <tspan x="275" y="60"><a href="https://qr.alipay.com/a7x14840swddpo9xtqadp9a" target="_blank">支付宝</a></tspan>
      <tspan x="240" y="80" font-size="85%">1416978277</tspan>
      <tspan x="390" y="60"><a href="mailto:1416978277@qq.com" target="_blank">电子邮箱</a></tspan>
      <tspan x="330" y="80" font-size="85%">1416978277@qq.com</tspan>
      <tspan x="10" y="240" font-size="150%">赞助</tspan>
      <tspan x="45" y="280">QQ</tspan>
      <tspan x="162" y="280">微信</tspan>
      <tspan x="275" y="280">支付宝</tspan>
      <tspan x="395" y="280">云闪付</tspan>
    </text>
  </svg>
</template>
