import {observable} from 'mobx'

export default class WithLoading {
        isLoading = observable.box(true)

        loaded = () => {
            this.isLoading.set(false)
        }

        loading = () => {
            this.isLoading.set(true)
        }
}