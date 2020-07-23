import React from 'react'
import Box from '@material-ui/core/Box'

export default function Question({translations}) {
    return (
        <div>
            {translations.map((t, i) =>
                <Box key={i} mb={1}>
                    <Box color={'primary.main'} fontStyle={'italic'}>
                        {t.lexicalCategory}
                    </Box>
                    <div>
                        - {t.translations.join(', ')}
                    </div>
                </Box>
            )}
        </div>
    )
}