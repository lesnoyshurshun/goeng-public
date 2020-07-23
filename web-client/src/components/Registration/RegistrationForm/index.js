import React from 'react'
import Service from './service'
import Paper from '@material-ui/core/Paper'
import {Field, Formik} from 'formik'
import {TextField} from 'formik-material-ui'
import Button from '@material-ui/core/Button'
import {withRouter} from 'react-router-dom'
import Box from '@material-ui/core/Box'

export default withRouter(
    class RegistrationForm extends React.Component {
        constructor(props) {
            super(props)

            this.service = new Service({history: props.history})
        }

        render() {
            const Form = ({
                              errors,
                              touched,
                              isSubmitting,
                              submitForm
                          }) =>
                <Paper>
                    <Box
                        display={'flex'} flexDirection={'column'} alignItems={'flex-start'}
                        p={5}
                    >
                        <Field
                            component={TextField}
                            fullWidth
                            name={'email'}
                            label={'E-mail'}
                            error={touched.email && errors.email}
                            helperText={touched.email ? errors.email : null}
                        />
                        <Box mt={5}>
                            <Field
                                component={TextField}
                                name={'password'}
                                label={'Password'}
                                type={'password'}
                                error={touched.password && errors.password}
                                helperText={touched.password ? errors.password : null}
                            />
                        </Box>
                        <Box mt={10} alignSelf={'flex-end'}>
                            <Button
                                variant={'contained'}
                                color={'primary'}
                                disabled={isSubmitting}
                                onClick={submitForm}>
                                Register
                            </Button>
                        </Box>
                    </Box>
                </Paper>

            return (
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validate={this.service.validate}
                    onSubmit={this.service.handleSubmit}
                    component={Form}>
                </Formik>
            )
        }
    })