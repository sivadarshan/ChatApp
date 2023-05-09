import React from "react"
// React Router DOM is a library that allows to have multipage application
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { AuthProvider } from "../contexts/AuthContext"

import Chats from "./Chats"
import Login from "./Login"

function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <Router>
         <AuthProvider> 

        {/* Switch allows to render any one of the routes either chats or login component */}
          <Switch> 
            <Route path="/chats" component={Chats} />
            <Route path="/" component={Login} /> 
          </Switch>

        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
