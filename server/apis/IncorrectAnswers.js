let axios = require('axios'),
    FormData = require('form-data'),
    arrayShuffle = require('array-shuffle')

let api = axios.create({
    baseURL: 'https://api.twinword.com/api/word/association/latest/',
    headers: {
        'X-Twaip-Key': 'CENSORED'
    }
})

function parseResponse(data) {
    return arrayShuffle(data.assoc_word_ex).slice(0, 3)
}

module.exports = async function getIncorrectAnswers(correctAnswer) {
    return parseResponse((await api.get('',
        {
            params:
                {
                    entry: correctAnswer
                }
        }
    )).data)
}