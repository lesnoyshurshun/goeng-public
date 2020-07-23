import WithLoading from '../../services/WithLoading'
import {findMatches} from '../../apis/Words'
import {observable} from 'mobx'

export default class Service extends WithLoading {
    showMatches = observable.box(false)
    @observable matches = []

    constructor() {
        super()

        this.loaded()
    }

    findMatches = async searchStr => {
        this.loading()

        this.matches = (await findMatches(searchStr)).data

        this.loaded()
    }

    handleFocus = event => {
        if (event.target.value.trim().length !== 0)
            this.showMatches.set(true)
    }

    handleBlur = event => {
        this.showMatches.set(false)
    }

    handleChange = async event => {
        if (event.target.value.trim().length !== 0) {
            this.showMatches.set(false)
            await this.findMatches(event.target.value.trim())
            this.showMatches.set(true)
        } else {
            this.showMatches.set(false)
        }
    }
}