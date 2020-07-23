let mongoose = require('mongoose'),
    {Schema, model} = mongoose,
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    config = require('config'),
    randToken = require('rand-token'),
    wordToLearnSchema = require('./WordToLearnSchema')

let userSchema = new Schema({
    email: {
        type: String,
        required: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    passwordHash: {
        type: String,
        required: true
    },
    refreshTokens: {
        type: [String]
    },
    wordsToLearn: [wordToLearnSchema]
})

userSchema.methods.genAccessToken = function () {
    return jwt.sign({
        id: this._id
    }, config.privateKey, {
        expiresIn: '5m'
    })
}

userSchema.methods.addRefreshToken = function () {
    let token = userSchema.statics.genRefreshToken()
    this.refreshTokens.push(token)

    return token
}

userSchema.methods.cancelRefreshToken = function (token) {
    let pos = this.refreshTokens.findIndex(t => t === token)
    if (pos === -1)
        throw new Error(`Refresh token does not exist ${token}`)

    this.refreshTokens.splice(pos, 1)

    return token
}

userSchema.statics.genRefreshToken = function () {
    return randToken.uid(256)
}

userSchema.virtual('password').set(function (value) {
    if (!/^([a-zA-Z0-9]{8,15})$/.test(value))
        throw new Error(`Invalid password: ${value}`)

    this.passwordHash = bcrypt.hashSync(value, 10)

    return this.passwordHash
})

module.exports = model('User', userSchema)