let translationSchema = require('./TranslationSchema')

let mongoose = require('mongoose'),
    {Schema, model} = mongoose

let wordSchema = new Schema({
    lang: {
        type: String,
        required: true,
        validate: {
            validator: (v) => ['en', 'ru'].some(l => l === v),
            message: ({value}) => `Language can be \'en\' or \'ru\' only, got ${value}`
        }
    },
    word: {
        type: String,
        required: true,
        set: v => v.toLowerCase(),
        validate: {
            validator: function (v) {
                if (this.lang === 'en')
                    return /^[a-z]+$/.test(v)
                if (this.lang === 'ru')
                    return /^[а-я]+$/.test(v)
                return false
            },
            message: function ({value}) {
                return `${value} is not a correct word!`
            }
        }
    },
    translations: {
        type: [translationSchema],
        required: true,
        default: []
    }
})

module.exports = model('Word', wordSchema)