import axios from 'axios'

const api = axios.create({
    baseURL: 'https://goeng-server.herokuapp.com/learn/tests/',
    timeout: 5000,
    withCredentials: true
})

function nextTest() {
    return api.get('next')
}

function pass(wordId) {
    return api.post(`pass/${wordId}`)
}

function fail(wordId) {
    return api.post(`fail/${wordId}`)
}

export {nextTest, pass, fail}