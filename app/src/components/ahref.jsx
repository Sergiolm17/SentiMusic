import React from "react";
import "./href.scss";
export default ({ children, href }) => {
  return (
    <a href={href} className="button-domo">
      {children}
    </a>
  );
};
