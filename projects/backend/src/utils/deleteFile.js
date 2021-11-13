const fs = require('fs');
const { usersFolder } = require('../config');

module.exports = (folder, name, s3) => {
  if (!name) {
    console.log(`no file to delete`);
    return;
  }

  if (process.env.NODE_ENV === 'production' && folder !== usersFolder) {
    s3.deleteObject(
      {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: name,
      },
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
  } else {
    const path = `${folder}/${name}`;

    try {
      fs.unlinkSync(path);
      console.log(`file ${name} was deleted`);
    } catch (err) {
      console.log(err);
    }
  }
};
