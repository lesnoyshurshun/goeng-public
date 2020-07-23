import {exists, register} from '../../../apis/Users'

export default class Service {
    history

    constructor({history}) {
        this.history = history
    }

    validate = async (values) => {
        let {email, password} = values
        let errors = {}

        if (email.length === 0) {
            errors.email = 'E-mail is required'
        } else if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            errors.email = 'Invalid e-mail'
        } else if ((await exists(email)).data) {
            errors.email = 'User with given e-mail already exists'
        }

        if (password.length === 0) {
            errors.password = 'Password is required'
        } else if (!password.match(/^([a-zA-Z0-9]{8,15})$/)) {
            errors.password = 'Only latin letters and digits are allowed. Length must be between 8 and 15 symbols'
        }

        return errors
    }

    handleSubmit = async (values) => {
        await register(values)
        this.history.push('/words/word')
    }
}