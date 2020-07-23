import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import SearchInDictionary from '../../SearchInDictionary'
import React from 'react'
import {useHistory} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import ExitToApp from '@material-ui/icons/ExitToApp'
import {logout} from '../../../apis/Users'

export default function SignedIn({email}) {
    const history = useHistory()

    return (
        <>
            <Grid item md={2}>
                <Box fontWeight={'bold'} fontSize={'h4.fontSize'}
                     style={{cursor: 'pointer'}} onClick={() => history.push('/')}>
                    GoEng
                </Box>
            </Grid>
            <Grid item md={2}>
                <Button size={'large'} onClick={() => history.push('/collection')}>
                    <Box color={'primary.contrastText'}>
                        My words
                    </Box>
                </Button>
            </Grid>
            <Grid item md={2}>
                <Button size={'large'} onClick={() => history.push('/tests')}>
                    <Box color={'primary.contrastText'}>
                        Tests
                    </Box>
                </Button>
            </Grid>
            <Grid item md={3}>
                <SearchInDictionary/>
            </Grid>
            <Grid item md={3}>
                <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}
                     color={'primary.contrastText'}>
                    {email}
                    <IconButton color={'secondary'} onClick={async () => {
                        await logout()
                        history.push('/login')
                    }}>
                        <ExitToApp/>
                    </IconButton>
                </Box>
            </Grid>
        </>
    )
}