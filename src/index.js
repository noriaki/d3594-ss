const { createServer } = require('http');
const { parseReq } = require('./parser');

const isDev = !process.env.NOW_REGION;

const handler = (req, res) => {
  try {
    const { versions } = process;
    const parsedQuery = parseReq(req);

    res.end(`Hello from Node.js on Now 2.0!

versions: ${JSON.stringify(versions, null, 2)}

queries: ${JSON.stringify(parsedQuery, null, 2)}
`);
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
