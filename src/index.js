const { createServer } = require('http');
const { parseReq } = require('./parser');
const { getScreenshot } = require('./chromium');
const { putScreenshot } = require('./s3');
const { getEnv } = require('./env');

const isDev = !process.env.NOW_REGION;

const handler = async (req, res) => {
  try {
    const { versions } = process;
    const parsedQuery = parseReq(req);
    const { fileName, fileType, mimeType } = parsedQuery;
    const { origin } = getEnv(isDev);
    const url = `${origin}/f/${fileName}`;
    const file = await getScreenshot(url, fileType, isDev);
    const uri = await putScreenshot(file, parsedQuery, isDev).catch(throwErr);
    res.writeHead(302, { Location: uri });
    res.end('ok');

    /*
    res.statusCode = 200;
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.end(file);
    */
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

const throwErr = (err) => { throw err; };
