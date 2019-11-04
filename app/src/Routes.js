import React, { lazy, Suspense, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./pages/login";
import GetToken from "./pages/getToke";
import App from "./App";

//const Content = lazy(() => import("./pages/content"));

export default () => {
  console.log(window.location.hash.substring(1));

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/:id" exact component={GetToken}></Route>
          <Route path="/" exact>
            <App />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
function WaitingComponent(Component) {
  return props => (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
}
