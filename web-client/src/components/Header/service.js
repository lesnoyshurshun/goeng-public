import WithLoading from '../../services/WithLoading'
import {observable} from 'mobx'
import {current} from '../../apis/Users'

export default class Service extends WithLoading {
    email

    constructor() {
        super()

        this.loadUser()
    }

    loadUser = async () => {
        try {
            this.email = observable.box((await current()).data.email)
        } catch (err) {
            this.email = observable.box('')
        } finally {
            this.loaded()
        }
    }
}