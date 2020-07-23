import React from 'react'
import {useParams} from 'react-router-dom'
import WordInDictionary from '../components/WordInDictionary'
import Box from '@material-ui/core/Box'
import {Container} from '@material-ui/core'

export default function WordInDictionaryPage() {
    const {word, wordId} = useParams()

    return (
        <Box mt={5}>
            <Container>
                <WordInDictionary word={word} wordId={wordId}/>
            </Container>
        </Box>

    )
}