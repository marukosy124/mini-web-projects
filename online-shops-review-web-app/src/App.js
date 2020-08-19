import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './assets/App.css';
import 'semantic-ui-css/semantic.min.css'
import Home from './screens/Home'

export default function App() {
  return (
    <Router>
      <div>
        <div class="ui top fixed menu">
          <Link to="/" class="item">Home</Link>
          <Link to="/about" class="item">About</Link>
          <Link to="/users" class="item">Users</Link>
        </div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/users">
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
