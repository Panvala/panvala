import { After, AfterAll, Before, BeforeAll, Status } from 'cucumber'
import { getDriver, buildDriver } from '../framework/driver/driverFactory';
import { PANVALA_APP_URL, SELENIUM_BROWSER } from '../config/envConfig';
import fs from 'fs';
import path from 'path';
let driver;

Before(async () => {
    console.log(`BeforeAll`);
    await buildDriver(SELENIUM_BROWSER);
    driver = getDriver();
    await driver.manage().setTimeouts({implicit: 10000, pageLoad: 30000, script: 5000});
    await driver.manage().window().maximize();
});

After(async function(scenario) {
    if (scenario.result.status === Status.FAILED) {
    const screenshotPath = 'screenshot';
    if (!fs.existsSync(screenshotPath)) {
        fs.mkdirSync(screenshotPath);
    }
    const data = await driver.takeScreenshot();
    const image = Buffer.from(data).toString('base64');
    await this.attach(image, 'image/jpg');
    const base64Data = data.replace(/^data:image\/png;base64,/, '');
    const screenshotFullPath = path.join(screenshotPath, scenario.pickle.name + '.png').replace(/ /g, '_')
    fs.writeFileSync(screenshotFullPath, base64Data, 'base64');
    }
    await driver.close();
    await driver.quit();
});
