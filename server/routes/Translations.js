let router = require('express').Router(),
    Word = require('../models/Word'),
    auth = require('../middleware/Auth'),
    {enToRu, ruToEn} = require('../apis/TranslateWords')

router.get('/:word', auth, async (req, res) => {
    try {
        let storedWord = await Word.findOne({word: req.params.word.toLowerCase()})
        if (storedWord) {
            return res.send(storedWord.toObject({virtuals: true, versionKey: false}))
        } else {
            let translations = await (req.query.lang === 'en' ? enToRu(req.params.word) :
                req.query.lang === 'ru' ? ruToEn(req.params.word) :
                    null)
            if (!translations) {
                throw Error(`Incorrect language format (${req.query.lang})`)
            }

            let newWord = new Word({
                lang: req.query.lang,
                word: req.params.word,
                translations
            })
            await newWord.save()

            return res.send(newWord.toObject({virtuals: true, versionKey: false}))
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send('Bruh')
    }
})

router.get('/id/:wordId', auth, async (req, res) => {
    try {
        let {wordId} = req.params

        let word = await Word.findById(wordId)
        if (!word)
            return res.status(404).send('Word oes not exist')

        return res.send(word.toObject({virtuals: true, versionKey: false}))
    }
    catch(err) {
        console.log(err)
        return res.status(500).send('Bruh')
    }
})

module.exports = router
