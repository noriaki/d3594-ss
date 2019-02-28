const AWS = require('aws-sdk');

const { getEnv } = require('./env');

const putScreenshot = (file, { fileName, mimeType }, isDev) => new Promise(
  (resolve, reject) => {
    const { s3Options, s3origin } = getEnv(isDev);
    AWS.config.update(s3Options);
    const client = new AWS.S3({ apiVersion: '2006-03-01' });
    const bucket = 'assets-deck.d3594.com';
    const dir = 'images/formations/';
    const objectKey = `${dir}${fileName}`;
    const uri = `${s3origin}/${objectKey}`;

    console.log(`Uploading file ${fileName} to bucket: ${bucket}`);
    client.upload({
      Bucket: bucket,
      Key: objectKey,
      Body: file,
      ACL: 'public-read',
      ContentType: mimeType,
    }, (err, data) => {
      if (err) { reject(err); }
      console.log(`Completed.\n uri: ${data.Location}\n as:  ${uri}`);
      resolve(uri);
    });
  }
);

module.putScreenshot = putScreenshot;
module.exports = {
  putScreenshot,
};
