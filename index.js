require('dotenv').config() //to load environment variables
require('./config/config')
const WishController = require('./controllers/wisher'),
  {Builder, By, Key, until} = require('selenium-webdriver'),
  firefox = require('selenium-webdriver/firefox')

options = new firefox.Options().setBinary('D:\\Program Files\\Firefox\\firefox.exe');
//options.addArguments("-headless");

console.log('Wishing friends a Happy Birthday!');

(async () => {
  try {
    const driver = new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
    //Chrome driver as of version 81.0.0 does not support emoji unicodes with more than 4 characters or multi-unicode emojis eg. cake and party popper lol... Why Google Why?
    //const driver = new Builder().withCapabilities({ browserName: 'chrome', chromeOptions: { w3c: false }}).build();
    await driver.manage().window().maximize()
    const params = {
      env: {
        FBEmail: process.env.FB_EMAIL,
        FBPass: process.env.FB_PASS
      },
      driver
    }

    //params.isToday=false
    await WishController.wishAll(params)
    //to quit after completion
    //await driver.quit();
  } catch (e) {
    console.log(e)
  }
})();