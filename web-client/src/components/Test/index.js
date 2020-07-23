import React from 'react'
import Service from './service'
import Question from './Question'
import {observer} from 'mobx-react'
import Answers from './Answers'
import {Paper} from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import AnswersRevealed from './AnswersRevealed'
import Button from '@material-ui/core/Button'
import NavigateNext from '@material-ui/icons/NavigateNext'
import {green, red} from '@material-ui/core/colors'

@observer
class Test extends React.Component {
    constructor(props) {
        super(props)

        this.service = new Service()
    }

    render() {
        const {service} = this

        if (service.isLoading.get()) {
            return <h4>Loading...</h4>
        }

        if (!service.test)
            return (
                <Box color={'text.secondary'}>
                    You have no words to be tested now
                </Box>)

        return (
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                <Paper style={{
                    backgroundColor: service.pickedAnswer.get() ?
                        service.pickedAnswer.get() === service.test.answer ? green[50] : red[50] :
                        'inherit'
                }}>
                    <Box px={2} py={2} minWidth={300}>
                        <Question translations={service.test.translations}/>
                        <Box my={2}>
                            <Divider variant={'middle'}/>
                        </Box>
                        {
                            service.pickedAnswer.get() ?
                                <AnswersRevealed
                                    answers={service.answersOrdered}
                                    correctAnswer={service.test.answer}
                                    picked={service.pickedAnswer.get()}
                                /> :
                                <Box ml={2}>
                                    <Answers
                                        answer={service.test.answer}
                                        incorrectAnswers={service.test.incorrectAnswers}
                                        onPick={service.pickAnswer}
                                    />
                                </Box>
                        }
                    </Box>
                </Paper>
                {
                    service.pickedAnswer.get() &&
                    <Box mt={5}>
                        <Button
                            variant={'contained'}
                            color={'secondary'}
                            endIcon={<NavigateNext/>}
                            onClick={service.loadTest}
                        >
                            Next test
                        </Button>
                    </Box>
                }
            </Box>
        )
    }
}

export default Test