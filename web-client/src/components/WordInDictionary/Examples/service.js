import {action, computed, observable} from 'mobx'

export default class Service {
    examples
    expandList = observable.box(false)

    constructor(props) {
        this.examples = props.examples
    }

    @computed get tooManyExamples() {
        return this.examples.length > 3
    }

    @computed get examplesToShow() {
        return this.expandList.get() ? this.examples : this.examples.slice(0, 3)
    }

    @action expand = () => {
        this.expandList.set(true)
    }

    @action collapse = () => {
        this.expandList.set(false)
    }
}