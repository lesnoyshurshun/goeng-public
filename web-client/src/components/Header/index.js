import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import SignedIn from './SignedIn'
import Unsigned from './Unsigned'
import {observer} from 'mobx-react'
import Service from './service'

@observer
class Header extends React.Component {
    constructor(props) {
        super(props)

        this.service = new Service()
    }

    render() {
        const {service} = this

        if (service.isLoading.get()) {
            return null
        }

        return (
            <AppBar position={'sticky'}>
                <Toolbar>
                    <Container>
                        <Grid container alignItems={'center'} spacing={2}>
                            {
                                service.email.get() ?
                                    <SignedIn email={service.email.get()}/> :
                                    <Unsigned/>
                            }
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Header