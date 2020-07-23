let auth = require('./Auth')

//wordId - id of user saved word
//requires <Auth> middleware to be called before being called itself
//cannot pass if time has not come (new Date() < nextTest) or already passed 9 times (testsPassed === 9)
module.exports = function testAvailability(req, res, next) {
    try {
        let {user} = req
        let {wordId} = req.params

        req.word = user.wordsToLearn.id(wordId)
        let word = req.word
        if (!word)
            throw Error('Word with given ID does not exist')
        if (new Date() < word.nextTest)
            throw Error('Attempt to pass test too early')
        if (word.isLearned)
            throw Error('User already learned the word')

        next()
    } catch (err) {
        console.log(err)
        return res.status(500).send('Bruh')
    }
}
