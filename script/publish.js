const fs = require('fs')

// 首页
fs.cpSync('./favicon.ico', './dist/favicon.ico')
fs.cpSync('./index.html', './dist/index.html')
fs.cpSync('./README.md', './dist/README.md')
// qq.html
fs.cpSync('./html/qq.html', './dist/qq.html')
// API
fs.cpSync('./api/index.html', './dist/api/index.html')
fs.cpSync('./api/README.md', './dist/api/README.md')
