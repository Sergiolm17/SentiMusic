import React from "react";
import "./href.scss";
export default ({ children, href, newtab, button }) => {
  return (
    <a href={href} target={newtab ? "_blank" : "_self"} className="button-domo">
      {children}
    </a>
  );
};
