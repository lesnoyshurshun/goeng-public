import axios from 'axios'

const api = axios.create({
    baseURL: 'https://goeng-server.herokuapp.com/users/',
timeout: 5000,
    withCredentials: true
//put headers here
})

function current() {
    return api.get('current')
}

function exists(email) {
    return api.post('exists', {email})
}

function register(user) {
    return api.post('register', user)
}

function login(user) {
    return api.post('login', user)
}

function logout() {
    return api.post('logout')
}

export {current, exists, register, login, logout}