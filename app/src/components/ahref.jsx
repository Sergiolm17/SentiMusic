import React from "react";
import "./href.scss";
export default ({ children, href, newtab, button, onClick }) => {
  if (button && onClick)
    return (
      <button className="button-domo" onClick={onClick}>
        {children}
      </button>
    );
  return (
    <a href={href} target={newtab ? "_blank" : "_self"} className="button-domo">
      {children}
    </a>
  );
};
