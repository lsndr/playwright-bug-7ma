const { chromium, } = require('playwright');
const { setTimeout } = require('timers/promises');

(async () => {
    const browser = await chromium.launch({
        channel: 'chrome',
        headless: true,
    });

    const page = await browser.newPage();

    page.on('requestfailed', (request) => {
        // This will hang until the browser is closed
        // then fail with "Target page, context or browser has been closed"
        request.allHeaders();

        // This will be null
        console.log(request.failure());
    });

    await page.goto('https://security-crawl-maze.app/css/font-face.html', {
        waitUntil: 'load'
    });
    await page.waitForLoadState('networkidle');
    await setTimeout(5000); // just in case

    await browser.close();
})().catch(console.error);