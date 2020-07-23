import axios from 'axios'

const api = axios.create({
    baseURL: 'https://goeng-server.herokuapp.com/',
    timeout: 5000,
    withCredentials: true
    //put headers here
})

function wordInDictionary(word) {
    //language should be determined here but for test purposes it's considered as english by default
    return api.get(`translations/${word}`, {params: {lang: 'en'}})
}

function wordInDictionaryById(wordId) {
    return api.get(`translations/id/${wordId}`)
}

function findMatches(searchStr) {
    return api.get(`matches/${searchStr.toLowerCase()}`)
}

function savedWords() {
    return api.get('learn/words/all')
}

function isAdded(wordId) {
    return api.get(`learn/words/has/${wordId}`)
}

function addWord(wordId) {
    return api.post(`learn/words/add/${wordId}`)
}

function removeWord(wordId) {
    return api.delete(`learn/words/remove/${wordId}`)
}

export {wordInDictionary, wordInDictionaryById, findMatches, savedWords, isAdded, addWord, removeWord}