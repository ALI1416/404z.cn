const https = require('https');
const fs = require('fs');

fs.mkdirSync('./dist/files/ip2region/v3.0.0/', {recursive: true})
saveFile('https://github.com/ALI1416/ip2region/raw/v3.0.0/data/ip2region.zdb', './dist/files/ip2region/v3.0.0/data/ip2region.zdb')
fs.mkdirSync('./dist/files/phone2region/v2.0.0/', {recursive: true})
saveFile('https://github.com/ALI1416/phone2region/raw/v2.0.0/data/phone2region.zdb', './dist/files/phone2region/v2.0.0/data/phone2region.zdb')
saveFile('https://github.com/ALI1416/phone2region/raw/v2.0.0/data/phone2region.txt', './dist/files/phone2region/v2.0.0/data/phone2region.txt')

/**
 * 保存文件
 * @param url URL
 * @param path 路径
 */
function saveFile(url, path) {
  https.get(url, (res) => {
    let writeStream = fs.createWriteStream(path)
    res.pipe(writeStream)
    writeStream.on('finish', () => {
      writeStream.close()
    })
  })
}
