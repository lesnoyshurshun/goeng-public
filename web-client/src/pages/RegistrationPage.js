import Box from '@material-ui/core/Box'
import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import RegistrationForm from '../components/Registration/RegistrationForm'

export default function RegistrationPage() {
    return (
        <Box mt={5}>
            <Container>
                <Grid container>
                    <Grid item md={4}/>
                    <Grid item md={4}>
                        <RegistrationForm />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}