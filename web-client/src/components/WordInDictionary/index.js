import React from 'react'
import {observer} from 'mobx-react'
import Service from './service'
import {Box} from '@material-ui/core'
import Translations from './Translations'
import Examples from './Examples'
import RemoveWord from './RemoveWord'
import AddWord from './AddWord'

@observer
class WordInDictionary extends React.Component {
    constructor(props) {
        super(props)

        const {word, wordId} = props
        this.service = new Service({word, wordId})
    }

    render() {
        const {service} = this

        if (this.service.isLoading.get())
            return <h4>Loading...</h4>

        const word =
            <Box display={'flex'} alignItems={'center'} pb={3}>
                <Box color={'primary.dark'} fontSize={'h5.fontSize'}>
                    {service.word.word}
                </Box>
                <Box ml={10}>
                    {service.isAdded.get() ?
                        <RemoveWord onRemove={service.handleRemove}/> :
                        <AddWord onAdd={service.handleAdd}/>}
                </Box>
            </Box>

        const translations = service.word.translations.map((t, i) =>
            <Box key={i} pb={2}>
                <Box color={'primary.main'} fontStyle={'italic'}>
                    {t.lexicalCategory}
                </Box>
                <Box pl={1} pb={1}>
                    <Translations translations={t.translations}/>
                </Box>
                <Box pl={1}>
                    <Examples examples={t.examples}/>
                </Box>
            </Box>)

        return (
            <div>
                {word}
                {translations}
            </div>
        )
    }
}

export default WordInDictionary