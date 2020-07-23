import React from 'react'
import {BrowserRouter as Router, Switch, Route, useParams} from 'react-router-dom'
import WordInDictionary from '../components/WordInDictionary'
import SearchInDictionary from '../components/SearchInDictionary'
import RegistrationForm from '../components/Registration/RegistrationForm'
import Registration from '../components/Registration'
import Logout from '../components/Logout'
import LoginForm from '../components/Login/LoginForm'
import Test from '../components/Test'
import WordsCollection from '../components/WordsCollection'
import Header from '../components/Header'
import WordInDictionaryPage from '../pages/WordInDictionaryPage'
import TestPage from '../pages/TestPage'
import WordsCollectionPage from '../pages/WordsCollectionPage'
import LoginPage from '../pages/LoginPage'
import RegistrationPage from '../pages/RegistrationPage'

export default function () {
    return (
        <Router forceRefresh>
            <Header/>
            <Switch>
                <Route exact path={'/'} component={() => null}/>
                <Route exact path={'/registration'} component={RegistrationPage}/>
                <Route exact path={'/login'} component={LoginPage}/>
                <Route exact path={'/logout'} component={Logout}/>
                <Route exact path={'/words/:word'}
                       component={WordInDictionaryPage}/>
                <Route exact path={'/words/id/:wordId'}
                       component={WordInDictionaryPage}/>
                <Route exact path={'/tests'}
                       component={TestPage}/>
                <Route exact path={'/collection'}
                       component={WordsCollectionPage}/>
            </Switch>
        </Router>
    )
}