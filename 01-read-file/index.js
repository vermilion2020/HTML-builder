const fs = require('fs');
const path = require('path');

const rs = fs.createReadStream(path.join(__dirname, 'text.txt'));

rs.on('data', function (chunk, ) {
  console.log(chunk.toString());
});


