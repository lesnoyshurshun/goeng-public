const axios = require('axios')

const api = axios.create({
    baseURL: 'https://wooordhunt.ru/get_tips.php',
    timeout: 5000,
    headers: {
        'Accept': 'application/json'
    }
})

async function findMatches(word) {
    let matches = (await api.get('', {params: {abc: word}})).data.tips

    if (!matches)
        return []

    return matches.map(m => ({word: m.w, translations: m.t}))
}

// function isProperNoun(str) {
//     return str[0] && str[0] === str[0].toUpperCase()
// }
//
// function isMultiWord(str) {
//     return str.split('').some(ch => ch === ' ')
// }
//
// function isCorrectSearchResult(str) {
//     return !isProperNoun(str) && !isMultiWord(str)
// }
//
// async function findMatches(searchStr, lang) {
//     let words = (await api.get(`${lang}`, {
//         params: {
//             q: searchStr,
//             prefix: true
//         }
//     })).data.results.map(res => res.word)
//
//     let wordIdx = 0
//     let results = []
//     for (let numOfResults = 0; numOfResults < 10;) {
//         if (isCorrectSearchResult(words[wordIdx])) {
//             results.push(words[wordIdx])
//             ++numOfResults
//         }
//
//         ++wordIdx
//     }
//
//     return results
// }

module.exports = {findMatches}