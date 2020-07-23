import {login} from '../../../apis/Users'

export default class Service {
    setErrors
    history

    constructor({history}) {
        this.history = history
    }

    validate = (values) => {
        let {email, password} = values
        let errors = {}

        if (email.length === 0) {
            errors.email = 'E-mail is required'
        } else if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            errors.email = 'Invalid e-mail'
        }

        if (password.length === 0) {
            errors.password = 'Password is required'
        }

        return errors
    }

    handleSubmit = async (values) => {
        try {
            await login(values)
            this.history.push('/collection')
        } catch ({response}) {

            if (response.status === 404)
                this.setErrors({email: response.data})
            else if (response.status === 401) {
                this.setErrors({password: response.data})
            }
        }
    }
}