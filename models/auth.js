const {Builder, By, Key, until} = require('selenium-webdriver'),
	waitModel = require('./wait')

/**
 * Auth Model
 * @module authModel
 */
module.exports = {
	/**
	 * Goes to FB and logs in
	 * @param {webDriver} driver - web driver
	 * @param {string} env.FBEmail - FBEmail
	 * @param {string} env.FBPass - FBPass
	 * @returns {string} url
	 */
	login: async function(params) {
		console.log('logging in')
		const driver = params.driver
		await driver.get('https://www.facebook.com')
		await waitModel.waitPageLoad({driver})
		try {
			await driver.findElements(By.id('email')) //prevents possible selenium error
			await driver.findElements(By.id('pass')) //prevents possible selenium error
			await driver.findElement(By.id('email')).sendKeys(params.env.FBEmail)
			await driver.findElement(By.id('pass')).sendKeys(params.env.FBPass)
			let oldURL = await driver.getCurrentUrl()
			await driver.findElement(By.id('loginbutton')).click()
			return await waitModel.waitPageChange({
				driver: driver,
				oldURL,
				env: params.env
			})
		} catch (err) {
			if (err.name != 'NoSuchElementError')
				throw err; //if error is other than (already logged in), throw it
		}
	}
}