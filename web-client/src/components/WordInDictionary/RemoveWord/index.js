import React from 'react'
import Button from '@material-ui/core/Button'

export default function RemoveWord({onRemove}) {
    return (
        <Button
            variant={'contained'}
            color={'secondary'}
            onClick={onRemove}>
            - Remove
        </Button>)
}