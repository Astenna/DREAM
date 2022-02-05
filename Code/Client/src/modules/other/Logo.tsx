import React from 'react';
import logo from '../../assets/logo2.png';

/**
 * Logo of the application, visible in navigation bars.
 */
const Logo = () => {
  return (
    <div style={{width: "150px", height: "50px"}}>
      <img src={logo} alt="Logo"/>
    </div>
  );
};

export default Logo;