const { Builder, By, Key, until } = require('selenium-webdriver'),
authModel = require('../models/auth'),
waitModel =require('../models/wait')
wishes =require('../models/wishes')

/**
 * Wisher Controller
 * @module wisherController
 */
module.exports = {
	/**
	 * wishes all available friends a happy birthday!
	 * @param {webDriver} driver - web driver
	 * @param {string} env.FBEmail - FBEmail
	 * @param {string} env.FBPass - FBPass
	 * @param {bool} [isToday=true] - true: Today's Birthdays, false: Recent Birthdays
	 * @returns {null}
	 */
	wishAll : async function(params){//modern style form
		let driver = params.driver
        const homeURL = await authModel.login(params)
		await driver.get('https://www.facebook.com/events/birthdays/')
		await waitModel.waitPageChange({driver: params.driver, oldURL: homeURL, env: params.env})
        
        let blockTitle = "Today's Birthdays"
        if(params.isToday === false)
        	blockTitle= "Recent Birthdays"
        
        let myfriends = await driver.findElements(By.xpath("//h3[text() =\""+blockTitle+"\"]//parent::div/following-sibling::div//h3"))

        if(!myfriends.length)
        {
        	console.log('No friends have birthdays today!')
        	return
        }
        //this foreach is synchronous
        for (let i = 0; i < myfriends.length; i++) {
        	let entry = myfriends[i]
			let friendName = await entry.getText();
        	try
        	{
			    console.log(friendName)
			    const textEle = await entry.findElement(By.xpath("./ancestor::div[2]/following-sibling::div//*[@data-text=\"true\"]/../parent::*")).click()
		    	let currentElement = driver.switchTo().activeElement();
		    	await currentElement.sendKeys(wishes.select(friendName));

		    	//To submit directly:
			    //await currentElement.sendKeys('\n')
			}
			catch(err)
			{
				if (err.name != 'NoSuchElementError')
					throw err; //if already wished, or posting is disabled
				console.log(friendName+': could not wish a happy birthday, messagebox not found')
			}
		}
	}
}