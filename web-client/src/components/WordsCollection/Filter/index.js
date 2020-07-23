import {TextField} from '@material-ui/core'
import React from 'react'
import InputAdornment from '@material-ui/core/InputAdornment'
import Search from '@material-ui/icons/Search'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Box from '@material-ui/core/Box'
import {observer} from 'mobx-react'

export default observer(function Filter({onChange, showLearned, showNotLearned}) {
    return (
        <Box display={'flex'} alignItems={'center'}>
            <TextField
                label={'Search your words'}
                onChange={event => onChange(event.target.value)}
                InputProps={{
                    startAdornment:
                        <InputAdornment position={'start'}>
                            <Search color={'action'}/>
                        </InputAdornment>
                }}>
            </TextField>
            <Box ml={5} display={'flex'} flexDirection={'column'}>
                <FormControlLabel
                    label={'Learned'}
                    control={
                        <Switch
                            checked={showLearned.get()}
                            onChange={event => showLearned.set(event.target.checked)}
                        />}
                />
                <FormControlLabel
                    label={'Not learned yet'}
                    control={
                        <Switch
                            color={'primary'}
                            checked={showNotLearned.get()}
                            onChange={event => showNotLearned.set(event.target.checked)}
                        />}
                />
            </Box>
        </Box>
    )
})