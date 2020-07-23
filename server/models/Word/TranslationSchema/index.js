let mongoose = require('mongoose'),
    {Schema} = mongoose

let translationSchema = new Schema({
    lexicalCategory: {
        type: String,
        required: true
    },
    translations: [String],
    examples: [{text: String, translation: String}]
})

module.exports = translationSchema