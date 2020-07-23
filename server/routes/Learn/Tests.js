let router = require('express').Router(),
    auth = require('../../middleware/Auth'),
    testAvailability = require('../../middleware/TestAvailability'),
    Word = require('../../models/Word'),
    getIncorrectAnswers = require('../../apis/IncorrectAnswers')

router.get('/next', auth, async (req, res) => {
    try {
        let {user} = req
        if (user.wordsToLearn.toObject().length === 0)
            return res.send(false)

        // find a word with the earliest next testing date
        let notLearned = user.wordsToLearn.toObject({virtuals: true}).filter(w => !w.isLearned)
        let word = notLearned.reduce((res, w) =>
                w.nextTest < res.nextTest ? w : res,
            notLearned[0]
        )
        if (word.nextTest > new Date())
            return res.send(false)

        // retrieve user's word id, translations, word to test and 3 related words (incorrect answers)
        let wordInDictionary = await Word.findById(word.wordId)
        let answer = wordInDictionary.word
        let test = {
            wordId: word.id,
            translations: wordInDictionary.translations.map(t => ({
                lexicalCategory: t.lexicalCategory,
                translations: t.translations.slice(0, 3)
            })),
            answer,
            incorrectAnswers: await getIncorrectAnswers(answer)
        }

        return res.send(test)
    } catch (err) {
        console.log(err)
        res.status(500).send('Bruh')
    }
})

//wordId - id of user saved word
router.post('/pass/:wordId', [auth, testAvailability], async (req, res) => {
    try {
        let {user, word} = req

        word.passTest()
        await user.save()

        return res.status(200).send('Passed')
    } catch (err) {
        console.log(err)
        return res.status(500).send('Bruh')
    }
})

//wordId - id of user saved word
router.post('/fail/:wordId', [auth, testAvailability], async (req, res) => {
    try {
        let {user, word} = req

        word.failTest()
        await user.save()

        return res.status(200).send('Failed')
    } catch (err) {
        console.log(err)
        return res.status(500).send('Bruh')
    }
})

module.exports = router