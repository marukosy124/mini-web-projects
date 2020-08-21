import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./screens/Home";
import About from "./screens/About";
import TopNavBar from "./components/TopNavBar";

export default function App() {
  return (
    <Router>
      <TopNavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/shops"></Route>
      </Switch>
    </Router>
  );
}
