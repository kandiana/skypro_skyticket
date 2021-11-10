const fs = require('fs');

module.exports = (folder, name, s3) => {
  if (process.env.NODE_ENV === 'production') {
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
