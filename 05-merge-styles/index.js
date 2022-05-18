const fs = require('fs');
const promises = require('fs/promises');
const path = require('path');
let readFiles = [];

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, function(err, items) {
  if (err) {
    throw err;
  }
  for (let i = 0; i < items.length; i++) {
    if (items[i].isFile() && path.extname(items[i].name) === '.css') {
      readFiles.push(promises.readFile( path.join(__dirname, 'styles', items[i].name))
        .then(data => data.toString()));
    }
  }
  Promise.all(readFiles).then(data => {
    fs.writeFile(
      path.join(__dirname, 'project-dist', 'bundle.css'),
      data.join('\n'),
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });
});

