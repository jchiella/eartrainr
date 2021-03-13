import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Activity from './pages/Activity';
import Config from './pages/Config';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/config/:id">
          <Config />
        </Route>
        <Route path="/:id">
          <Activity />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
