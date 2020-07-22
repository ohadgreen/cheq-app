const fs = require('fs');

function readFile(fileName) {
    const relPath = process.cwd() + '/resources/' + fileName;
    let fileText = fs.readFileSync(relPath).toString();
    console.log(fileText);
    return fileText;
}

module.exports = { readFile }