const fs = require('fs');
const promises = require('fs/promises');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, function(err, items) {
  if (err) {
    throw err;
  }
  for (let i = 0; i < items.length; i++) {
    if(items[i].isFile()) {
      const pathObj = path.parse(items[i].name);
      promises.stat(path.join(__dirname, 'secret-folder', items[i].name)).then((stat) => {
        console.log(`${pathObj.name} - ${pathObj.ext.slice(1)} - ${stat.size / 1024} Kb`);
      });
    }
  }
});