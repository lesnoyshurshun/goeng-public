import WithLoading from '../../services/WithLoading'
import {fail, nextTest, pass} from '../../apis/Tests'
import {observable} from 'mobx'

export default class Service extends WithLoading {
    test
    pickedAnswer = observable.box('')
    answersOrdered

    constructor(props) {
        super(props)

        this.loadTest()
    }

    loadTest = async () => {
        this.loading()

        this.test = (await nextTest()).data
        this.pickedAnswer.set('')

        this.loaded()
    }

    pickAnswer = (answers, picked) => {
        this.answersOrdered = answers
        this.pickedAnswer.set(picked)

        let {wordId} = this.test
        picked === this.test.answer ?
            pass(wordId) : fail(wordId)
    }
}