import React from 'react'
import {Box} from '@material-ui/core'
import Done from '@material-ui/icons/Done'
import {useHistory} from 'react-router-dom'

export default function XWords({letter, words}) {
    let history = useHistory()

    return (
        <div>
            <Box
                color={'primary.dark'}
                fontSize={'h4.fontSize'}
                fontWeight={'fontWeightBold'}>
                {letter}
            </Box>
            {words.map((w, i) =>
                <Box key={i} mb={1} display={'flex'} alignItems={'center'}>
                    <Box
                        onClick={() => history.push(`/words/id/${w.wordId}`)}
                        style={{cursor: 'pointer'}}>
                        {w.word}
                    </Box>
                    {
                        w.isLearned &&
                        <Box ml={1}>
                            <Done color={'secondary'} fontSize={'small'}/>
                        </Box>
                    }
                </Box>)
            }
        </div>
    )
}