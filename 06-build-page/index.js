const fs = require('fs');
const promises = require('fs/promises');
const path = require('path');
let template = '';

// create project-dist folder
promises.mkdir(path.join(__dirname, 'project-dist'), {recursive: true});

// copy assets folder to project-dist
fs.readdir(path.join(__dirname, 'assets'), {withFileTypes: true}, function(err, folders) {
  if (err) {
    throw err;
  }
  for (let i = 0; i < folders.length; i++) {
    promises.mkdir(path.join(__dirname, 'project-dist', 'assets', folders[i].name), {recursive: true}).then(() => {
      fs.readdir(path.join(__dirname, 'assets', folders[i].name), {withFileTypes: true}, function(err, files) {
        if (err) {
          throw err;
        }
        for (let j = 0; j < files.length; j++) {
          promises.copyFile(path.join(__dirname, 'assets', folders[i].name, files[j].name), 
            path.join(__dirname, 'project-dist', 'assets', folders[i].name, files[j].name));
        }
      });
    });
  }
});

// combine index.html file and save it to project-dist
promises.readFile(
  path.join(__dirname, 'template.html')).then(data => {
  template = data.toString();
  let regexp = /{{[a-z]{1,}}}/g;
  const vars = template.match(regexp);
  let readFiles = [];
  for (let i = 0; i < vars.length; i++) {
    readFiles.push(promises.readFile( path.join(__dirname, 'components', 
      `${vars[i].slice(2,vars[i].length - 2)}.html`))
      .then(data => data.toString()));
  }
  Promise.all(readFiles).then(data => {
    for (let i = 0; i < vars.length; i++) {
      template = template.replace(vars[i], data[i]);
    }
  }).then(() => {
    fs.writeFile(
      path.join(__dirname, 'project-dist', 'index.html'),
      template,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });
});

// combine css files and save css file to project-dist
fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, function(err, items) {
  if (err) {
    throw err;
  }
  let readFiles = [];
  for (let i = 0; i < items.length; i++) {
    if (items[i].isFile() && path.extname(items[i].name) === '.css') {
      readFiles.push(promises.readFile( path.join(__dirname, 'styles', items[i].name))
        .then(data => data.toString()));
    }
  }
  Promise.all(readFiles).then(data => {
    fs.writeFile(
      path.join(__dirname, 'project-dist', 'style.css'),
      data.join('\n'),
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });
});
