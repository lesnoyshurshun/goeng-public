import React from 'react'
import {observer} from 'mobx-react'
import Service from './service'
import {Box} from '@material-ui/core'

@observer
class Translations extends React.Component {
    constructor(props) {
        super(props)

        this.service = new Service({
            translations: props.translations
        })
    }

    render() {
        return (
            <Box>
                {this.service.translationsToShow.map((t, i) =>
                    <Box key={i}>
                        - {t}
                    </Box>)}

                {this.service.tooManyTranslations && (this.service.expandList.get() ?
                    <Box color={'primary.main'} width={'fit-content'}
                         onClick={this.service.collapse}>
                        <u>show less</u>
                    </Box> :
                    <Box color={'primary.main'} width={'fit-content'}
                         onClick={this.service.expand}>
                        <u>show more</u>
                    </Box>)}
            </Box>
        )
    }
}

export default Translations