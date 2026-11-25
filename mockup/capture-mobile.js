const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Mobile viewport
  await page.setViewport({
    width: 375,
    height: 812,
    deviceScaleFactor: 2,
  });

  // Homepage mobile
  await page.goto(`file://${path.resolve(__dirname, 'homepage.html')}`, {
    waitUntil: 'networkidle0'
  });
  await page.screenshot({
    path: path.resolve(__dirname, 'screenshots/homepage-mobile.png'),
    fullPage: false,
  });
  console.log('Homepage mobile screenshot saved');

  // Product page mobile
  await page.goto(`file://${path.resolve(__dirname, 'product-page.html')}`, {
    waitUntil: 'networkidle0'
  });
  await page.screenshot({
    path: path.resolve(__dirname, 'screenshots/product-mobile.png'),
    fullPage: false,
  });
  console.log('Product mobile screenshot saved');

  await browser.close();
})();
