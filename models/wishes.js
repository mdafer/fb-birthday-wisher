function getRandomWish(wishArr) {
    return wishArr[Math.floor(Math.random() * wishArr.length)];
};

const friendGroups = {
	noWish:['Unlucky Friend'],
	Group1:['John Doe'],
	Group2:['Steve Mostafa Dafer', 'Mahmoud Dafer']
}

function getFriendGroup(friendName) {
	let result =  Object.keys(friendGroups).find(key => friendGroups[key].includes(friendName))
	if(!result)
	{
		//check En or Ar
		const arabicCharset = /[\u0600-\u06FF]/
		result = arabicCharset.test(friendName)?'normalAr':'normalEn'
	}
	return result
}

/**
 * Wishes Model
 * @module wishesModel
 */
module.exports = {
	/**
	 * selects a wish based on friend's name
	 * @param {string} friendName - friendName
	 * @returns {string} selected wish
	 */
	select: (friendName)=>{
		const firstName = friendName.split(' ')[0]
		const wishList=
		{
			normalEn:[`Happy Birthday ${firstName}! Best Wishes :) \uD83C\uDF70\uD83C\uDF82\uD83C\uDF89`,`Happy Birthday ${firstName}! Best Wishes :) \uD83C\uDF70\uD83C\uDF82\uD83C\uDF89`,`Happy Birthday ${firstName}! Best Wishes :) \uD83C\uDF70\uD83C\uDF82\uD83C\uDF89`],
			normalAr:[`كل سنة وانت طيب يا  ${firstName}! العمر كله بالصحة والعافية ان شاء الله  :) \uD83C\uDF70\uD83C\uDF82\uD83C\uDF89`],
			Group1:[
			`Happy Birthday ${firstName}! I wish you all the happiness in the world! :)  \uD83C\uDF70\uD83C\uDF82\uD83C\uDF89`,
			`Happy Birthday ${firstName}! May all of your birthday wishes come true! :)  \uD83C\uDF70\uD83C\uDF82\uD83C\uDF89`
			],
			Group2:[`كل سنة وانت طيب! العمر كله بالصحة والعافية ان شاء الله :)`]
		}

		const friendGroup = getFriendGroup(friendName);
		if(friendGroup=='noWish')
			return false
		return getRandomWish(wishList[friendGroup])
	}
}