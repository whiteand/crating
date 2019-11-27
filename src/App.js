import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { Core, Charts } from "./containers";
import { Provider as StoreProvider } from "./store";
import "./App.css";

function App() {
  return (
    <div className="app">
      <StoreProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Link to="/charts">Go to charts</Link>
              <Core />
            </Route>
            <Route path="/charts">
              <Link to="/">Go to ratings</Link>
              <Charts/>
            </Route>
          </Switch>
        </Router>
      </StoreProvider>
    </div>
  );
}

export default App;
