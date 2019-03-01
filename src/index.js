const { createServer } = require('http');
const { parseReq } = require('./parser');
const { getScreenshot } = require('./chromium');
const { existsScrennshot, putScreenshot } = require('./s3');
const { getEnv } = require('./env');

const isDev = !process.env.NOW_REGION;

const handler = async (req, res) => {
  try {
    const { versions } = process;
    const parsedQuery = parseReq(req);
    const { fileName, fileType, mimeType } = parsedQuery;
    let ssUri = await existsScrennshot(fileName, isDev);
    if (ssUri === null) {
      const { origin: sourceOrigin } = getEnv(isDev);
      const sourceUri = `${sourceOrigin}/f/${fileName}`;
      const file = await getScreenshot(sourceUri, fileType, isDev);
      ssUri = await putScreenshot(file, parsedQuery, isDev);
    }
    console.log(`Redirect to ${ssUri}`);
    res.writeHead(302, { Location: ssUri });
    res.end('ok');
  } catch (e) {
    res.statusCode = 500;
    res.end(e.message);
    console.error(e);
  }
};

module.exports = handler;

if (isDev) {
  const PORT = process.env.PORT || 13594;
  const listen = () => console.log(`Listening on ${PORT}...`);
  createServer(handler).listen(PORT, listen);
}
