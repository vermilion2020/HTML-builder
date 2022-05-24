const promises = require('fs/promises');
const path = require('path');

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
      path.join(__dirname, 'project-dist', 'bundle.css'),
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