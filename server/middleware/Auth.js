let jwt = require('jsonwebtoken'),
    config = require('config'),
    User = require('../models/User')

const msInYear = 1000 * 60 * 60 * 24 * 365

module.exports = async function (req, res, next) {
    try {
        var accessToken = req.cookies['access-token']
        if (!accessToken)
            return res.status(401).send('No access token provided')

        var userPayload = jwt.verify(accessToken, config.privateKey)
    } catch (err) {
        try {
            if (err.name === 'TokenExpiredError') {
                let refreshToken = req.cookies['refresh-token']
                if (!refreshToken)
                    return res.status(401).send('No refresh token provided')

                userPayload = jwt.verify(accessToken, config.privateKey, {ignoreExpiration: true})
                let user = await User.findById(userPayload.id)
                if (!user)
                    return res.status(404).send('User does not exist')

                if (user.refreshTokens.some(t => t === refreshToken)) {
                    res.cookie('access-token', user.genAccessToken(), {maxAge: msInYear, httpOnly: true })
                } else return res.status(401).send('Invalid refresh token')
            } else return res.status(500).send('Invalid access token')
        } catch (err) {
            console.log(err)
            return res.status(500).send('Bruh')
        }
    }

    req.user = await User.findById(userPayload.id)
    next()
}