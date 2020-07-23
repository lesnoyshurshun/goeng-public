import {action, computed, observable} from 'mobx'

export default class Service {
    translations
    expandList = observable.box(false)

    constructor(props) {
        this.translations = props.translations
    }

    @computed get tooManyTranslations() {
        return this.translations.length > 3
    }

    @computed get translationsToShow() {
        return this.expandList.get() ? this.translations : this.translations.slice(0, 3)
    }

    @action expand = () => {
        this.expandList.set(true)
    }

    @action collapse = () => {
        this.expandList.set(false)
    }
}

