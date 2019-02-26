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
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.waitFor(() => (
    document.documentElement.className
      && document.documentElement.className.split(' ').includes('wf-active')
  ));
  await page.waitFor(1000); // wait 1 [sec]
  const file = await page.screenshot({ type });
  return file;
};

module.getScreenshot = getScreenshot;
module.exports = {
  getScreenshot,
};
