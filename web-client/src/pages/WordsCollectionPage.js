import React from 'react'
import WordsCollection from '../components/WordsCollection'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

export default function WordsCollectionPage() {
    return (
        <Box mt={5}>
            <Container>
                <WordsCollection/>
            </Container>
        </Box>
    )
}
