const puppeteer = require('puppeteer');
const { htmlToText } = require('html-to-text');

const jobProcess = async (job) => {
  const {
    url,
    delay = 5000,
    onOpen
  } = job.data;
  
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  job.progress(10);

  const page = await browser.newPage();

  await page.goto(url);
  job.progress(50);

  await page.waitForTimeout(delay);
  job.progress(60);

  // page.onOpen
  // progress(70)

  const pageHtml = await page.evaluate(() => document.querySelector('*').outerHTML);
  job.progress(80);

  await browser.close();
  job.progress(90);

  const text = htmlToText(pageHtml);
  job.progress(100)

  return text;
};

module.exports = jobProcess;
