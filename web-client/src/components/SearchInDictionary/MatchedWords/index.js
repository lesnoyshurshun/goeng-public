import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import {useHistory} from 'react-router-dom'
import useStyles from './style'
import Box from '@material-ui/core/Box'
import {blueGrey} from '@material-ui/core/colors'
import Paper from '@material-ui/core/Paper'

export default function MatchedWords({matches}) {
    const history = useHistory()

    const classes = useStyles()

    if (matches.length === 0)
        return (
                <Box color={'grey[300]'} fontStyle={'italic'}>
                    No matches found
                </Box>
        )

    return (
        <Box position={'fixed'} ml={-2} mt={1} bgcolor={blueGrey[50]}>
            <Paper>
                <List dense>
                    {
                        matches.map((m, i) =>
                            <ListItem
                                key={i}
                                className={classes.item}
                                onMouseDown={() => history.push(`/words/${m.word}`)}>
                                {m.word} - {m.translations}
                            </ListItem>
                        )}
                </List>
            </Paper>
        </Box>)
}