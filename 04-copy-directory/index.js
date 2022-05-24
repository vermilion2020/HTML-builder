const fs = require('fs');
const promises = require('fs/promises');
const path = require('path');

async function removeIfExists (dirname) {
  await promises.access(path.join(__dirname, dirname), fs.constants.F_OK)
    .then(async () => {
      await promises.rm(path.join(__dirname, dirname), { recursive: true });
    }).catch(() => {
    });

  promises.mkdir(path.join(__dirname, dirname), {recursive: true});
  fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true}, function(err, items) {
    if (err) {
      throw err;
    }
  
    for (let i = 0; i < items.length; i++) {
      promises.copyFile(path.join(__dirname, 'files', items[i].name), 
        path.join(__dirname, dirname, items[i].name));
    }
  });
}

removeIfExists('files-copy');

