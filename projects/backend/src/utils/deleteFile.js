const fs = require('fs');

module.exports = (folder, name) => {
  const path = `${folder}/${name}`;
  try {
    fs.unlinkSync(path);
    console.log(`file ${name} was deleted`);
  } catch (err) {
    console.log(err);
  }
};
