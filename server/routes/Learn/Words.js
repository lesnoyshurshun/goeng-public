let router = require('express').Router(),
    auth = require('../../middleware/Auth'),
    User = require('../../models/User'),
    Word = require('../../models/Word')

router.get('/all', auth, async (req, res) => {
    try {
        let {user} = req

        return res.send(
            await Promise.all(
                user.wordsToLearn.map(async w => ({
                    word: (await Word.findById(w.wordId)).word,
                    ...w.toObject({
                        virtuals: true, versionKey: false,
                        transform: (doc, ret) => {
                            delete ret._id
                            delete ret.testsPassed
                            delete ret.nextTest

                            return ret
                        }
                    })
                }))))
    } catch (err) {
        console.log(err)
        res.status(500).send('Bruh')
    }
})

//wordId = id in dictionary
router.get('/has/:wordId', auth, async (req, res) => {
    try {
        let {user} = req
        let {wordId} = req.params

        let wordToLearn = user.wordsToLearn.find(w => w.wordId.toString() === wordId)
        if (wordToLearn) {
            return res.send(wordToLearn.id)
        } else {
            return res.send(false)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Bruh')
    }
})

router.post('/add/:wordId', auth, async (req, res) => {   //wordId = id in dictionary
    try {
        let {user} = req
        let {wordId} = req.params

        if (user.wordsToLearn.some(w => w.wordId.toString() === wordId)) {
            throw Error('Word already added')
        }
        if (!await Word.findById(wordId)) {
            throw Error('Word with given ID does not exist')
        }

        user.wordsToLearn.push({wordId})
        await user.save()

        return res.status(201)
            .send(user.wordsToLearn.find(w => w.wordId.toString() === wordId).id)
    } catch (err) {
        console.log(err)
        return res.status(500).send('Bruh')
    }
})

router.delete('/remove/:wordId', auth, async (req, res) => {    //wordId - id of user saved word
    try {
        let {user} = req
        let {wordId} = req.params

        let word = user.wordsToLearn.id(wordId)
        if (!word)
            throw Error('Word with given ID does not exist')

        user.wordsToLearn.pull(wordId)
        await user.save()

        return res.status(200).send()
    } catch (err) {
        console.log(err)
       return res.status(500).send('Bruh')
    }
})

module.exports = router