const puppeteer = require('puppeteer-core');
const { getOptions: getLaunchOptions } = require('./options');

let _page = null;

const getPage = async (isDev) => {
  if (_page) {
    return _page;
  }
  const options = await getLaunchOptions(isDev);
  const browser = await puppeteer.launch(options);
  _page = await browser.newPage();
  return _page;
};

const getScreenshot = async (url, type, isDev) => {
  const gotoOptions = {
    waitUntil: isDev ? 'networkidle2' : 'networkidle0',
  };
  const page = await getPage(isDev);
  await page.setViewport({ width: 1200, height: 628 });
  console.log(`Fetch and Shoot SS... ${url}`);
  const response = await page.goto(url, gotoOptions);
  if (!response.ok()) {
    throw new Error(
      `Response: [${response.status()}]
  ${response.statusText()}
  from ${response.url()}`
    );
  }
  await page.waitForSelector('svg');
  const file = await page.screenshot({ type });
  return file;
};

module.getScreenshot = getScreenshot;
module.exports = {
  getScreenshot,
};
