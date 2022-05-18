const fs = require('fs');
const promises = require('fs/promises');
const path = require('path');

promises.mkdir(path.join(__dirname, 'files-copy'), {recursive: true});
fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true}, function(err, items) {
  if (err) {
    throw err;
  }

  for (let i = 0; i < items.length; i++) {
    promises.copyFile(path.join(__dirname, 'files', items[i].name), 
      path.join(__dirname, 'files-copy', items[i].name));
  }
});