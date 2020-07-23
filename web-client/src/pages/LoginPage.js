import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import LoginForm from '../components/Login/LoginForm'
import Box from '@material-ui/core/Box'

export default function LoginPage() {
    return (
        <Box mt={5}>
            <Container>
                <Grid container>
                    <Grid item md={4}/>
                    <Grid item md={4}>
                        <LoginForm/>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}