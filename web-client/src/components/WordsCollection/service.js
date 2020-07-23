import WithLoading from '../../services/WithLoading'
import {action, computed, observable} from 'mobx'
import {savedWords} from '../../apis/Words'

export default class Service extends WithLoading {
    words   //user saved words to learn
    filter = observable.box('')
    showLearned = observable.box(true)
    showNotLearned = observable.box(true)

    constructor(props) {
        super(props)

        this.loadWords()
    }

    @computed get wordsToShow() {
        let filteredWords = this.words.filter(w =>
            w.isLearned && this.showLearned.get() || !w.isLearned && this.showNotLearned.get()
        )

        filteredWords = filteredWords.filter(({word}) =>
            word.slice(0, this.filter.get().length) === this.filter.get())

        return filteredWords.reduce(
            (words, {wordId, word, isLearned}) => { //wordId - id in dictionary
                let firstLetter = word[0].toUpperCase()

                if (words.has(firstLetter)) {
                    words.get(firstLetter).push({wordId, word, isLearned})
                } else {
                    words.set(firstLetter, [{wordId, word, isLearned}])
                }

                return words
            },
            new Map())
    }

    loadWords = async () => {
        this.words = (await savedWords()).data
            .sort((w1, w2) => w1.word < w2.word ? -1 : 1)

        this.loaded()
    }

    @action handleFilterChange = (value) => {
        this.filter.set(value.toLowerCase())
    }
}