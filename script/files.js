const pkg = require('../json/files.json')
const fs = require('node:fs')

async function download() {
  for (let p of pkg) {
    fs.mkdirSync(p[1].substring(0, p[1].lastIndexOf('/')), {recursive: true})
    let res = Buffer.from(await (await fetch(p[0])).arrayBuffer())
    fs.writeFileSync(p[1], res)
  }
}

download()
