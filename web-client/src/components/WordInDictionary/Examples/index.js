import React from 'react'
import {observer} from 'mobx-react'
import Service from './service'
import {Box} from '@material-ui/core'

@observer
class Examples extends React.Component {
    constructor(props) {
        super(props)

        this.service = new Service({
            examples: props.examples
        })
    }

    render() {
        return (
            <Box>
                {this.service.examplesToShow.map((e, i) =>
                    <Box key={i} color={'text.secondary'}>
                        {e.text} ({e.translation})
                    </Box>)}

                {this.service.tooManyExamples && (this.service.expandList.get() ?
                    <Box color={'primary.main'} width={'fit-content'}
                         onClick={this.service.collapse}>
                        <u>less examples</u>
                    </Box> :
                    <Box color={'primary.main'} width={'fit-content'}
                         onClick={this.service.expand}>
                        <u>more examples</u>
                    </Box>)}
            </Box>
        )
    }
}

export default Examples