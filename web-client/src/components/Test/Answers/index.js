import React from 'react'
import arrayShuffle from 'array-shuffle'
import Box from '@material-ui/core/Box'

export default function Answers({answer, incorrectAnswers, onPick}) {
    let answers = arrayShuffle([answer, ...incorrectAnswers])

    return (
        <div>
            {answers.map((a, i) =>
                <Box key={i} mb={1} style={{cursor: 'pointer'}}
                     onClick={() => onPick(answers, a)}>
                    {a}
                </Box>
            )}
        </div>
    )
}