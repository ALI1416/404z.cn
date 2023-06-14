const fs = require('fs');

fs.cpSync('./favicon.ico', './dist/favicon.ico');
fs.cpSync('./README.md', './dist/README.md');
fs.cpSync('./css', './dist/css', {recursive: true});
fs.cpSync('./js', './dist/js', {recursive: true});
fs.cpSync('./html', './dist', {recursive: true});

fs.cpSync('./github-contribution-grid-snake.svg', './dist/images/github-contribution-grid-snake.svg');
fs.cpSync('./github-contribution-grid-snake-dark.svg', './dist/images/github-contribution-grid-snake-dark.svg');
