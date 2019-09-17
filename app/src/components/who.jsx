import React from "react";
import "./who.scss";
const WhoStyle = {
  margin: "10px"
};
export default ({ name, artist }) => {
  return (
    <div style={WhoStyle}>
      <h2>{name} </h2>
      <h3>{artist}</h3>
    </div>
  );
};
