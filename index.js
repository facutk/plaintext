const express = require('express');

const puppeteer = require("puppeteer");
const { htmlToText } = require('html-to-text');

const jobRouter = require('./job.router');
const { PORT } = require('./config');

const app = express();
app.use(express.json());
app.use(express.static('public'))
app.use('/job', jobRouter)





app.get('/scrap', async (req, res) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.goto('https://borshch.finance/nests');
  await page.waitForTimeout(5000);
  const data = await page.evaluate(() => document.querySelector('*').outerHTML);

  const text = htmlToText(data);
  res.send(`<pre>${text}</pre>`);

  await browser.close();
});

app.listen(PORT, () => {
  console.log(`plaintext app listening at http://localhost:${PORT}`);
});
