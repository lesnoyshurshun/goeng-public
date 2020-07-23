import React from 'react'
import {useHistory} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import {logout} from '../../apis/Users'

export default function Logout() {
    let history = useHistory()

    return (
        <Button
            color={'secondary'}
            variant={'outlined'}
            onClick={async () => {
                await logout()
                history.push('/registration')
            }}>
            Log out
        </Button>
    )

    //should redirect to log in page
}