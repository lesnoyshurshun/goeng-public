let router = require('express').Router(),
    User = require('../models/User'),
    bcrypt = require('bcryptjs'),
    auth = require('../middleware/Auth')

const msInYear = 1000 * 60 * 60 * 24 * 365

router.get('/current', auth, async (req, res) => {
    try {
        let {user} = req

        return res.send({
            email: user.email
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send('Bruh')
    }
})

router.post('/exists', async (req, res) => {
    try {
        let {email} = req.body

        return res.send(!!(await User.findOne({email})))
    } catch (err) {
        console.log(err)
        return res.status(500).send('Bruh')
    }
})

router.post('/register', async (req, res) => {
    try {
        if (await User.findOne({email: req.body.email})) {
            return res.status(103).send('User with given e-mail already exists')
        }

        let user = new User({
            email: req.body.email
        })
        user.password = req.body.password
        let refreshToken = user.addRefreshToken()
        await user.save()

        res.status(201)
            .cookie('access-token', user.genAccessToken(),
                {maxAge: msInYear, httpOnly: true, secure: true})
            .cookie('refresh-token', refreshToken,
                {maxAge: msInYear, httpOnly: true, secure: true})
            .cookie('email', user.email,
                {maxAge: msInYear, secure: true})
            .send()
    } catch (err) {
        console.log(err)
        return res.status(500).send('Bruh')
    }
})

router.post('/login', async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email})
        if (!user) return res.status(404).send('User does not exist')

        if (bcrypt.compareSync(req.body.password, user.passwordHash)) {
            let refreshToken = user.addRefreshToken()
            await user.save()

            return res
                .cookie('access-token', user.genAccessToken(),
                    {maxAge: msInYear, httpOnly: true, secure: true})
                .cookie('refresh-token', refreshToken,
                    {maxAge: msInYear, httpOnly: true, secure: true})
                .cookie('email', user.email,
                    {maxAge: msInYear, secure: true})
                .send()
        } else res.status(401).send('Wrong password')
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal server error')
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        let user = await User.findById(req.user._id)
        if (!user)
            return res.status(404).send('User does not exist')

        let refreshToken = req.cookies['refresh-token']
        if (!refreshToken)
            return res.status(401).send('No refresh token provided')

        user.cancelRefreshToken(refreshToken)
        await user.save()
        res
            .clearCookie('access-token', {httpOnly: true, secure: true})
            .clearCookie('refresh-token', {httpOnly: true, secure: true})
            .clearCookie('email', {secure: true})
            .send()
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal server error')
    }
})

module.exports = router