/**
 * Wait Model
 * @module waitModel
 */
module.exports = {
	/**
	 * sets timeout (sleep if awaited)
	 * @param {string} ms - sleep duration (in ms)
	 * @returns {Promise} timeoutPromise
	 */
	sleep: function(params) { //should always be called with await
		return new Promise(resolve => setTimeout(resolve, params.ms));
	},
	/**
	 * waits for the page to load properly
	 * @param {webDriver} driver - web driver
	 * @returns {null}
	 */
	waitPageLoad: async function(_params) {
		let mystatus = await _params.driver.executeScript("return document.readyState")
		while (mystatus != 'complete') {
			await module.exports.sleep({ms: 1000})
			mystatus = await _params.driver.executeScript("return document.readyState")
		}
		await module.exports.sleep({ms: 1000}) //to deal with ajax/js populated elements
	},
	/**
	 * to-do: handle multiple redirections properly
	 * waits for the page to change and returns the new url
	 * @param {webDriver} driver - web driver
	 * @param {string} oldURL - the old url
	 * @param {int} [timeout=10] - timeout in seconds, 2 seconds are automatically added to the timeout
	 * @returns {string} the new URL
	 */
	waitPageChange: async function(params) {
		await module.exports.sleep({ms: 2000}) //to help with multiple redirections
		let curURL = await params.driver.getCurrentUrl()
		let mystatus = await params.driver.executeScript("return document.readyState")
		let timeout = params.timeout || 10
		while (timeout > 0 && (params.oldURL == curURL || mystatus != 'complete')) {
			await module.exports.sleep({ms: 1000})
			mystatus = await params.driver.executeScript("return document.readyState")
			curURL = await params.driver.getCurrentUrl()
			timeout--
		}
		if (timeout < 0)
			throw new Error('waitPageChange Timed Out')
		await module.exports.sleep({ms: 1000}) //to deal with ajax/js populated elements
		return curURL
	}
}