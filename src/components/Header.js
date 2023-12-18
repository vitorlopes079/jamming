import React from "react";
import './header.css'
import spotify from "../images/icon3@2x.png"

const Header = () => {
  return (
    <div>
      <div className="logo-bar">
        <img className="logoPhoto" src={spotify} alt="spotify logo"/>
        <h2>
          Ja<span>mmi</span>ng
        </h2>
      </div>
    </div>
  );
};

export default Header;
