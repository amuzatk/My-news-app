import React from "react";
import News from "./components/News";
import NewsDetail from "./components/NewsDetail";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import "./App.css";

function App() {
  return (
    <SkeletonTheme baseColor="rgb(75, 72, 225)" highlightColor="#444">
      <Router>
        <Switch>
          {<Route path="/" exact component={News} /> || <Skeleton count={12} />}
          <Route path="/:id" component={NewsDetail} />
        </Switch>
      </Router>
    </SkeletonTheme>
  );
}

export default App;
