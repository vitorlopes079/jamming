import React from "react";
import gif from "../images/jammingDesktop2.gif"
import "../css/apresentation.css"

const Apresentation = () => {
  return (
    <div className="aprentation-container">
        <h1 className="aprentation-header">How Jamming looks like:</h1>
      <div className="media-container">
        <img src={gif} alt="gif apresentation" />
      </div>
    </div>
  );
};

export default Apresentation;
