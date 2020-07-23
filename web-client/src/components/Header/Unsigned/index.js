import Box from '@material-ui/core/Box'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import {useHistory} from 'react-router-dom'
import Login from '../../Login'
import Registration from '../../Registration'

export default function Unsigned() {
    const history = useHistory()

    return (
        <>
            <Grid item md={2}>
                <Box fontWeight={'bold'} fontSize={'h4.fontSize'}
                     style={{cursor: 'pointer'}} onClick={() => history.push('/')}>
                    GoEng
                </Box>
            </Grid>
            <Grid item md={7}/>
            <Grid item md={3}>
                <Box display={'flex'} justifyContent={'flex-end'}>
                    <Box mr={2}>
                        <Login/>
                    </Box>
                    <Registration/>
                </Box>
            </Grid>
        </>
    )
}