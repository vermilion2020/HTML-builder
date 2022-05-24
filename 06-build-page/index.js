const promises = require('fs/promises');
const fs = require('fs');
const path = require('path');

// create project-dist folder
promises.mkdir(path.join(__dirname, 'project-dist'), {recursive: true});

async function copyFiles(folder) {
  await promises.access(path.join(__dirname, 'project-dist', folder), fs.constants.F_OK)
    .then(async () => {
      await promises.rm(path.join(__dirname,'project-dist', folder), { recursive: true });
    }).catch(() => {
    });
  const assetFolders = await promises.readdir(path.join(__dirname, folder));
  for (let i = 0; i < assetFolders.length; i++) {
    await promises.mkdir(path.join(__dirname, 'project-dist', folder, assetFolders[i]), {recursive: true});
    const assetFiles = await promises.readdir(path.join(__dirname, folder, assetFolders[i]));
    for (let j = 0; j < assetFiles.length; j++) {
      promises.copyFile(path.join(__dirname, folder, assetFolders[i], assetFiles[j]), 
        path.join(__dirname, 'project-dist', folder, assetFolders[i], assetFiles[j]));
    }
  }
}

// copy assets folder to project-dist
copyFiles('assets');
     
async function buildIndexHTML() {
  let template = await promises.readFile(path.join(__dirname, 'template.html'));
  template = template.toString();
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
    promises.writeFile(
      path.join(__dirname, 'project-dist', 'index.html'),
      template,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });
}

// combine index.html file and save it to project-dist
buildIndexHTML();

async function buildCss(folder) {
  const cssFiles = await promises.readdir(path.join(__dirname, folder)); 
  let readFiles = [];
  for (let i = 0; i < cssFiles.length; i++) {
    if (path.extname(cssFiles[i]) === '.css') {
      readFiles.push(promises.readFile( path.join(__dirname, 'styles', cssFiles[i]))
        .then(data => data.toString()));
    }
  }
  Promise.all(readFiles).then(data => {
    promises.writeFile(
      path.join(__dirname, 'project-dist', 'style.css'),
      data.join('\n'),
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });
}

// combine css files and save css file to project-dist
buildCss('styles');