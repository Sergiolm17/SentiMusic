import React from "react";
import "./card.scss";
export default ({ children, normal }) => {
  return <div className={`${normal && "normal"} card `}>{children}</div>;
};
