import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Main from '../components/Home/Main'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'
import API from '../components/API/API'
import About from '../components/About/About'
import Guide from '../components/Guide/Guide'
import Snackbar from '../components/Snackbar/Snackbar'
import SimpleBackdrop from '../components/SimpleBackdrop/SimpleBackdrop'
import NotFound from '../components/NotFound/NotFound'
import ScrollToTop from './scroll'
import Admin from '../components/Admin/Admin'

const ImplicitExplicitRouter = ({ history }) => (
  <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
    <Header />
    <Snackbar />
    <ScrollToTop />
    <SimpleBackdrop />
    <Switch>
      <Route exact path="/">
        <Main />
      </Route>
      <Route path="/admin">
        <Admin />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/api">
        <API />
      </Route>
      <Route path="/guide">
        <Guide />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <NotFound />
    </Switch>
    <Footer />
  </Router>
)

ImplicitExplicitRouter.propTypes = {
  history: PropTypes.object,
}

export default ImplicitExplicitRouter
