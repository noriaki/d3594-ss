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
  const page = await getPage(isDev);
  await page.setViewport({ width: 1200, height: 628 });
  console.log(`fetch SS... ${url}`);
  await page.goto(url, { waitUntil: 'networkidle2' });
  const file = await page.screenshot({ type });
  return file;
};

module.getScreenshot = getScreenshot;
module.exports = {
  getScreenshot,
};
