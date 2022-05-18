const fs = require('fs');
const path = require('path');

const { stdin, stdout } = process;
stdout.write('Hello my dear friend!\n');
stdin.on('data', data => {
  fs.writeFile(
    path.join(__dirname, 'new-text-file.txt'),
    data,
    (err) => {
      if (err) {
        console.log(err);
      }
      console.log('Saved into file new-text-file.txt');
      process.exit();
    }
  );
});