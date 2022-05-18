const fs = require('fs');
const path = require('path');

fs.readFile(
  path.join(__dirname, 'text.txt'),
  'utf-8',
  (error, data) => {
    if (error) {
      console.log(error);
    }
    console.log(data);
  });