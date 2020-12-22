import React from 'react';
import Applogo from "src/images/quick-e-park-logo.jpg"
const Logo = (props) => {
  return (
    <div class="row" style={{display:'flex'}}>
    <div class="column">
    <img
      alt="Logo"
      src = {Applogo}
      
      {...props}
    />
    </div>
    <div class="column">
      <h3 style={{color:'white',padding:'15px'}}>Quick-E-Park</h3>
    </div>
    </div>
  );
};

export default Logo;
