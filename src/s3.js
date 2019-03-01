const AWS = require('aws-sdk');

const { getEnv } = require('./env');

const bucket = 'assets-deck.d3594.com';
const dir = 'images/formations/';
const getObjectKey = fileName => `${dir}${fileName}`;
const getUri = (fileName, isDev) => {
  const { s3origin } = getEnv(isDev);
  const objectKey = getObjectKey(fileName);
  return `${s3origin}/${objectKey}`;
};

const getS3Client = (isDev) => {
  const { s3Options } = getEnv(isDev);
  AWS.config.update(s3Options);
  return new AWS.S3({ apiVersion: '2006-03-01' });
};

const existsScrennshot = (fileName, isDev) => new Promise(
  (resolve, reject) => {
    const client = getS3Client(isDev);
    const objectKey = getObjectKey(fileName);
    const uri = getUri(fileName, isDev);

    console.log(`Checking file existance ${fileName} on bucket: ${bucket}`);
    client.headObject({
      Bucket: bucket,
      Key: objectKey,
    }, (err, data) => {
      if (err) {
        if (err.code === 'NotFound') { resolve(null); }
        reject(err);
      }
      resolve(uri);
    });
  }
);

const putScreenshot = (file, { fileName, mimeType }, isDev) => new Promise(
  (resolve, reject) => {
    const client = getS3Client(isDev);
    const objectKey = getObjectKey(fileName);
    const uri = getUri(fileName, isDev);

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

module.existsScrennshot = existsScrennshot;
module.putScreenshot = putScreenshot;
module.exports = {
  existsScrennshot,
  putScreenshot,
};
