import React from 'react'
import Test from '../components/Test'
import Box from '@material-ui/core/Box'

export default function TestPage() {
    return (
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}
             mt={5}
        >
            <Test/>
        </Box>
    )
}