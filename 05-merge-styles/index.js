const fs = require('fs');
const path = require('path');
let stylesArr = [];

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, function(err, items) {
  if (err) {
    throw err;
  }
  for (let i = 0; i < items.length; i++) {
    if (items[i].isFile() && path.extname(items[i].name) === '.css') {
      let data = fs.readFileSync( path.join(__dirname, 'styles', items[i].name), 'utf-8');
      stylesArr.push(data);
    }
  }
  fs.writeFile(
    path.join(__dirname, 'project-dist', 'bundle.css'),
    stylesArr.join('\n'),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
});

