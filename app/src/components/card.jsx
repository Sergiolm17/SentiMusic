import React from "react";
import "./card.scss";
export default ({ children, normal }) => {
  return <div className={`card ${normal && "normal"}`}>{children}</div>;
};
