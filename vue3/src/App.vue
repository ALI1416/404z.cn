<script setup>
import {QRCode} from '@ali1416/qrcode-encoder'
import {SVG} from '@svgdotjs/svg.js'
import {onMounted} from "vue"

onMounted(() => {
  const qr = new QRCode('123');
  console.log(QrMatrix2SvgPath(qr.Matrix, 10));
  const draw = SVG().addTo('body').size(300, 300)
  draw.rect(100, 100).attr({fill: '#6cf'})
  console.log(draw.svg())
});

/**
 * 二维码boolean[][]转SVG路径
 * @param bytes boolean[][]
 * @param pixelSize 像素尺寸
 * @return string SVG
 */
function QrMatrix2SvgPath(bytes, pixelSize) {
  let length = bytes.length;
  let size = (length + 2) * pixelSize;
  let svg = "<svg width=\"" + size + "\" height=\"" + size + "\" viewBox=\"0 0 " + size + " " + size + "\" xmlns=\"http://www.w3.org/2000/svg\">\n";
  svg += "<path d=\"\n";
  for (let x = 0; x < length; x++) {
    for (let y = 0; y < length; y++) {
      if (bytes[x][y]) {
        let xx = (x + 1) * pixelSize;
        let yy = (y + 1) * pixelSize;
        svg += "M" + xx + " " + yy + "H" + (xx + pixelSize) + "V" + (yy + pixelSize) + "H" + xx + "z\n"
      }
    }
  }
  svg += "\"/>";
  svg += "</svg>\n";
  return svg;
}
</script>

<template>
</template>
