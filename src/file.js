const { writeFile } = require('fs');
const { promisify } = require('util');
const { join } = require('path');
const { createHash } = require('crypto');
const { tmpdir } = require('os');

const writeFileAsync = promisify(writeFile);

const writeTempFile = async (fileName, contents) => {
  const filePath = join(tmpdir(), fileName);
  console.log(`Writing file ${fileName} to ${filePath}`);
  await writeFileAsync(filePath, contents);
  return filePath;
};

module.writeTempFile = writeTempFile;
module.exports = {
  writeTempFile,
};
