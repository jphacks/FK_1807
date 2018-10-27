import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Header from './Common/Header';
import Home from './Home/RootHome';
import Recipe from './Recipe/RootRecipe'
const Root = () => {
  return (
    <div>
      <HashRouter>
        <Route component={Header} />
      </HashRouter>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/recipe" component={Recipe} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default Root;