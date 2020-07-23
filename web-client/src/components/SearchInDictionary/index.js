import React from 'react'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import Service from './service'
import {observer} from 'mobx-react'
import MatchedWords from './MatchedWords'
import Box from '@material-ui/core/Box'
import InputAdornment from '@material-ui/core/InputAdornment'
import Search from '@material-ui/icons/Search'

export default observer(class SearchInDictionary extends React.Component {
    constructor(props) {
        super(props)

        this.service = new Service()
    }

    render() {
        const {service} = this

        return (
            <Paper>
                <Box px={2}>
                    <InputBase
                        fullWidth
                        placeholder={'Search in dictionary'}
                        endAdornment={
                            <InputAdornment position={'end'}>
                                <Search color={'action'}/>
                            </InputAdornment>
                        }
                        onFocus={service.handleFocus}
                        onBlur={service.handleBlur}
                        onChange={service.handleChange}/>
                    {
                        service.showMatches.get() &&
                        <MatchedWords matches={service.matches}/>
                    }
                </Box>
            </Paper>
        )
    }
})

