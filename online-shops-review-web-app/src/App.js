import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Menu, Sticky } from 'semantic-ui-react'
import Home from './screens/Home'

export default function App() {
  return (
    <Router>
      <Sticky >
        <Menu attached='top' secondary widths={3}>
          <Link to="/" class="item">Home</Link>
          <Link to="/about" class="item">About</Link>
          <Link to="/shops" class="item">Shops</Link>
        </Menu>
      </Sticky>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/about">
        </Route>
        <Route path="/shops">
        </Route>
      </Switch>
    </Router>
  )
}

