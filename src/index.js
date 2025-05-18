import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
import NotFound1 from './views/not-found'
import Home from './views/home'
import Login from './views/login'
import SignUp from './views/signup'
import User from './views/user'
import Service from './views/service'
import About from './views/about'
import User_service from './views/user_service'
import User_about from './views/user_about'
import Appoint from './views/appoint'
import ChatRoom from "./views/chat";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={NotFound1} exact path="/not-found" />
        <Route component={Home} exact path="/" />
        <Route component={Login} exact path="/login" />
        <Route component={SignUp} exact path="/signup" />
        <Route component={User} exact path="/user" />
        <Route component={About} exact path="/about" />
        <Route component={User_about} exact path="/user/about" />
        <Route component={Service} exact path="/service" />
        <Route component={User_service} exact path="/user/service" />
        <Route component={Appoint} exact path="/user/appoint" />
        <Route path="/chat" component={ChatRoom} />


        <Route component={NotFound1} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
