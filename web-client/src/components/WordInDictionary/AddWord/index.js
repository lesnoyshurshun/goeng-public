import React from 'react'
import Button from '@material-ui/core/Button'

export default function AddWord({onAdd}) {
    return (
        <Button
            variant={'contained'}
            color={'primary'}
            onClick={onAdd}>
            + Add
        </Button>)
}