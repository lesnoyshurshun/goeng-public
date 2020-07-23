import {addWord, isAdded, removeWord, wordInDictionary, wordInDictionaryById} from '../../apis/Words'
import WithLoading from '../../services/WithLoading'
import {observable} from 'mobx'

export default class Service extends WithLoading {
    word
    isAdded = observable.box(false) //if added, stores user saved word id

    constructor({word, wordId}) {
        super()

        wordId ? this.loadWordById(wordId) : this.loadWord(word)
    }

    //load word from dictionary and info if user added word to his collection
    loadWord = async (word) => {
        this.word = (await wordInDictionary(word)).data

        this.isAdded.set((await isAdded(this.word.id)).data)

        this.loaded()
    }

    //load word by id in dictionary
    loadWordById = async (wordId) => {
        this.word = (await wordInDictionaryById(wordId)).data

        this.isAdded.set((await isAdded(this.word.id)).data)

        this.loaded()
    }

    handleAdd = async () => {
        //user saved word id
        let wordId = (await addWord(this.word.id)).data

        this.isAdded.set(wordId)
    }

    handleRemove = () => {
        removeWord(this.isAdded.get())

        this.isAdded.set(false)
    }
}