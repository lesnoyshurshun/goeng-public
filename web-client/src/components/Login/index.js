import Button from '@material-ui/core/Button'
import React from 'react'
import {useHistory} from 'react-router-dom'

export default function Login() {
    let history = useHistory()

    return (
        <Button
            variant={'contained'}
            onClick={() => history.push('/login')}>
            Sign in
        </Button>
    )
}