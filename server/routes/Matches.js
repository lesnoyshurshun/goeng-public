let router = require('express').Router(),
    auth = require('../middleware/Auth'),
    {findMatches} = require('../apis/FindMatches')

router.get('/:searchStr', auth, async (req, res) => {
    try {
        return res.send(await findMatches(req.params.searchStr))
    } catch (err) {
        console.log(err)
        res.status(500).send('Bruh')
    }
})

module.exports = router