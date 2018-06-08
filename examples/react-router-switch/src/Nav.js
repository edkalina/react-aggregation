import React from 'react';
import { Link } from 'react-router-dom';

const LinkStyle = { margin: '0 10px' };

export default function Nav() {
  return (
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
  );
}
