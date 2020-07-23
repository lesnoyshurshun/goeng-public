import Box from '@material-ui/core/Box'
import React from 'react'
import Done from '@material-ui/icons/Done'
import Clear from '@material-ui/icons/Clear'
import {green, red} from '@material-ui/core/colors'

export default function AnswersRevealed({answers, correctAnswer, picked}) {
    return (
        <div>
            {answers.map((a, i) =>
                <Box key={i} mb={1} display={'flex'} alignItems={'center'}>
                    {a === correctAnswer ?
                        <Done style={{color: green[900]}} fontSize={'inherit'}/> :
                        <Clear  style={{color: red['A700']}} fontSize={'inherit'}/>}
                    <Box color={a === picked ? 'primary.dark' : 'text.primary'}>
                        {a}
                    </Box>
                </Box>
            )}
        </div>
    )
}