const s3 = require('s3');

const { getEnv } = require('./env');
const { writeTempFile } = require('./file');

const putScreenshot = (file, { fileName, mimeType }, isDev) => new Promise(
  async (resolve, reject) => {
    const filePath = await writeTempFile(fileName, file);
    const { s3Options, s3origin } = getEnv(isDev);
    const client = s3.createClient({ s3Options });
    const bucket = 'assets-deck.d3594.com';
    const dir = 'images/formations/';
    const objectKey = `${dir}${fileName}`;
    const uri = `${s3origin}/${objectKey}`;

    console.log(`Uploading file ${fileName} to bucket: ${bucket}`);
    const uploader = client.uploadFile({
      localFile: filePath,
      s3Params: {
        Bucket: bucket,
        Key: objectKey,
        ACL: 'public-read',
        ContentType: mimeType,
      },
    });

    uploader.on('error', reject);
    uploader.on('end', () => {
      console.log(`Completed. ${uri}`);
      resolve(uri);
    })
  }
);

module.putScreenshot = putScreenshot;
module.exports = {
  putScreenshot,
};
