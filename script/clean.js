const fs = require('fs');

fs.rmSync('./dist', {force: true, recursive: true})
