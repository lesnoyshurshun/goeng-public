let mongoose = require('mongoose'),
    {Schema} = mongoose,
    Word = require('../../Word')

// [i] === x,
// stores required time to wait (for <x> hours) before taking new test if <i> tests are already passed
const waitBeforeNewTest = [
    0,
    1,
    3,
    7,
    20,
    55,
    148,
    403,
    1097
]

function addHours(date, hours) {
    date.setUTCHours(date.getUTCHours() + hours)

    return date
}

let wordToLearnSchema = new Schema({
    wordId: {
        type: Schema.Types.ObjectId,
        ref: 'Word',
        required: true,
        validate: {
            validator: async value => !!await Word.findById(value),
            message: ({value}) => `$Word with id ${value} does not exist`
        }
    },
    testsPassed: {
        type: Number,
        required: true,
        default: 0
    },
    nextTest: {
        type: Date,
        required: true,
        default: () => new Date()
    }
})

wordToLearnSchema.virtual('isLearned')
    .get(function () {
        return this.testsPassed === 9
    })

wordToLearnSchema.methods.passTest = function () {
    ++this.testsPassed

    if (!this.isLearned) {
        let now = new Date()
        this.nextTest = addHours(now, waitBeforeNewTest[this.testsPassed])
    }
}

wordToLearnSchema.methods.failTest = function () {
    let now = new Date()
    this.nextTest = addHours(now, waitBeforeNewTest[this.testsPassed])
}

module.exports = wordToLearnSchema