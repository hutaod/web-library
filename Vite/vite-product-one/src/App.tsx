import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
// import TestHoc from "./components/TestHoc";
// import Routes from "./Routes";
import routes from "./routes/index";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        {routes.map((route) => (
          <Route exact key={route.path} path={route.path}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Router>
  );
}

export default App;
