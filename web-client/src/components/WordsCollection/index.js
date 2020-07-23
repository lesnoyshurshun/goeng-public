import React from 'react'
import Service from './service'
import {observer} from 'mobx-react'
import Grid from '@material-ui/core/Grid'
import XWords from './XWords'
import Filter from './Filter'
import Box from '@material-ui/core/Box'

@observer
class WordsCollection extends React.Component {
    constructor(props) {
        super(props)

        this.service = new Service()
    }

    render() {
        const {service} = this

        if (service.isLoading.get()) {
            return <h4>Loading...</h4>
        }

        let groupedWords = service.wordsToShow
        const xWords = []
        groupedWords.forEach((words, letter) =>
            xWords.push(
                <Grid key={letter} item md={2}>
                    <XWords
                        letter={letter}
                        words={words}
                    />
                </Grid>)
        )

        return (
            <div>
                <Box mb={5}>
                    <Filter
                        onChange={service.handleFilterChange}
                        showLearned={service.showLearned}
                        showNotLearned={service.showNotLearned}
                    />
                </Box>
                <Grid container spacing={2}>
                    {xWords}
                </Grid>
            </div>
        )
    }
}

export default WordsCollection