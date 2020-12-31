import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src="app/static/logo.svg"
      {...props}
    />
  );
};

export default Logo;
