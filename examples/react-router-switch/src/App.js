import React from 'react';
import { HashRouter, Link } from 'react-router-dom';
import { Switch, CaseRoute } from './RouterSwitch';

const AuthRoutes = () => (
  <React.Fragment>
    <CaseRoute exact path="/auth/signin">
      <h1>Sign in page</h1>
    </CaseRoute>
    <CaseRoute exact path="/auth/signup">
      <h1>Sign up page</h1>
    </CaseRoute>
    <CaseRoute exact path="/auth/reset/:token">
      <h1>Password reset page</h1>
    </CaseRoute>
  </React.Fragment>
);

const AnotherPageRoute = () => (
  <CaseRoute exact path="/another">
    <h1>Another Page</h1>
  </CaseRoute>
);

const LinkStyle = { margin: '0 10px' };

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/" style={LinkStyle}>
              Main
            </Link>
            <Link to="/another" style={LinkStyle}>
              Another page
            </Link>
            <Link to="/none" style={LinkStyle}>
              Not implemented page
            </Link>
            <Link to="/auth/signin" style={LinkStyle}>
              Sign in
            </Link>
            <Link to="/auth/signup" style={LinkStyle}>
              Sign up
            </Link>
          </div>
          <div>
            <Switch>
              <CaseRoute exact path="/">
                <h1>Main page</h1>
              </CaseRoute>
              <AuthRoutes />
              <AnotherPageRoute />
              <CaseRoute>
                <h1>404 Not Found</h1>
              </CaseRoute>
            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
