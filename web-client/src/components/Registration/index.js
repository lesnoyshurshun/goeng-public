import Button from '@material-ui/core/Button'
import React from 'react'
import {useHistory} from 'react-router-dom'

export default function Registration() {
    let history = useHistory()

    return (
        <Button
            variant={'contained'}
            color={'secondary'}
            onClick={() => history.push('/registration')}>
            Sign up
        </Button>
    )
}