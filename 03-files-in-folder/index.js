const promises = require('fs/promises');
const path = require('path');

async function showLog () {
  const files = await promises.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true});
  for (let i = 0; i < files.length; i++) {
    const pathObj = path.parse(files[i].name);
    if (files[i].isFile()) {
      promises.stat(path.join(__dirname, 'secret-folder', files[i].name)).then((stat) => {
        console.log(`${pathObj.name} - ${pathObj.ext.slice(1)} - ${stat.size / 1024} Kb`);
      });
    }
  }
}

showLog();