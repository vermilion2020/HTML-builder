const promises = require('fs/promises');
const fs = require('fs');
const path = require('path');

async function readAndAddData(filename, data) {
  oldData = '';
  await promises.access(path.join(__dirname, filename), fs.constants.F_OK)
    .then(async () => {
      oldData = await promises.readFile(path.join(__dirname, filename), {encoding: 'utf8'});
    }).catch((err) => {
    });
    oldData += data;
    fs.writeFile(
      path.join(__dirname, filename),
      oldData,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    ); 
}

const { stdin, stdout } = process;
stdout.write('Hello my dear friend!\n');
stdin.on(
  'data', data => {
    if (data.toString().trim() === 'exit') {
      process.exit();
    }
    readAndAddData('new-text-file.txt', data);
});