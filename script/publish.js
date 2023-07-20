const fs = require('fs')

fs.cpSync('./favicon.ico', './dist/favicon.ico')
fs.cpSync('./index.html', './dist/index.html')
fs.cpSync('./README.md', './dist/README.md')
fs.cpSync('./html', './dist', {recursive: true})
