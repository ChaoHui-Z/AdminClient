import React, {Component} from 'react'
import { BrowserRouter, Switch, Route} from "react-router-dom"

import Login from './pages/login/login.jsx'
import Admin from './pages/admin/admin.jsx'

/*
应用根组件
 */
class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch> 
          <Route path="/login" component={Login} />
          <Route path="/" component={Admin} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
