import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Switch, Route } from './RouterSwitch';
import Nav from './Nav';

const AuthRoutes = () => (
  <React.Fragment>
    <Route exact path="/auth/signin">
      <h1>Sign in page</h1>
    </Route>
    <Route exact path="/auth/signup">
      <h1>Sign up page</h1>
    </Route>
    <Route exact path="/auth/reset/:token">
      <h1>Password reset page</h1>
    </Route>
  </React.Fragment>
);

const AnotherPageRoute = ({ children }) => <Route exact path="/another" render={() => children} />;

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div style={{ textAlign: 'center' }}>
          <Nav />
          <div>
            <Switch>
              <Route exact path="/">
                <h1>Main page</h1>
              </Route>
              <AuthRoutes />
              <AnotherPageRoute>
                <h1>Another Page</h1>
              </AnotherPageRoute>
              <Route>
                <h1>404 Not Found</h1>
              </Route>
            </Switch>
            <AnotherPageRoute>
              <p>Visible only on another page</p>
            </AnotherPageRoute>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
