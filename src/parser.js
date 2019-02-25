const { parse } = require('url');

const idRegexp = /^[0-9a-f]{32}$/;
const extRegexp = /^(png|jpe?g)$/;

const parseReq = (req) => {
  console.log(`HTTP ${req.url}`);
  const { pathname = '/', query = {} } = parse(req.url || '', true);

  const [id, ext] = pathname.slice(1).split('.');
  if (!idRegexp.test(id) || !extRegexp.test(ext)) {
    throw new Error('Invalid url pathname');
  }
  const fileType = ext === 'jpg' ? 'jpeg' : ext;

  return {
    ...query,
    id,
    ext,
    fileName: `${id}.${ext}`,
    fileType,
    mimeType: `image/${fileType}`,
  };
};

module.parseReq = parseReq;
module.exports = {
  parseReq,
};
