const fs = require('fs');
const path = require('path');

const accessLogStream = fs.createWriteStream(path.join(__dirname, "../log.txt"), { flags: "a" });

module.exports = accessLogStream;