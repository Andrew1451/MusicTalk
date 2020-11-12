import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './containers/Signup';
import Signin from './containers/Signin';
import Profile from './containers/Profile';
import Home from './containers/Home';
import './App.css';
import Layout from './hoc/Layout';

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Switch>
            <Route path='/sign-up' component={Signup} />
            <Route path='/sign-in' component={Signin} />
            <Route path='/profile' component={Profile} />
            <Route path='/' exact component={Home} />
          </Switch>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
