let express = require('express'),
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose')

const app = express()

const corsOptions = {
    origin: 'https://goeng-web.herokuapp.com',
    credentials: true
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())

app.use('/users', require('./routes/Users'))
app.use('/translations', require('./routes/Translations'))
app.use('/matches', require('./routes/Matches'))
app.use('/learn/words', require('./routes/Learn/Words'))
app.use('/learn/tests', require('./routes/Learn/Tests'))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/goeng',
    {useNewUrlParser: true, useUnifiedTopology: true})
let db = mongoose.connection
db.on('error', () => console.log('Connection error: '))
db.once('open', () => {
    console.log('Successfully connected')

    const port = 3001
    app.listen(process.env.PORT || port, () => console.log(`App listening to port ${port}`))
})