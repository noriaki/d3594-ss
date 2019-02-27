const chrome = require('chrome-aws-lambda');
const exePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const getOptions = async (isDev) => {
  let options;
  if (isDev) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
    };
  } else {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    };
  }
  return options;
};

module.getOptions = getOptions;
module.exports = {
  getOptions,
};
