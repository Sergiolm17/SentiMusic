import React from "react";
import {  analytics } from "../Firebase";

import "./href.scss";
export default ({ children, href, newtab, button, onClick }) => {
  if (button && onClick)
    return (
      <button className="button-domo" onClick={onClick}>
        {children}
      </button>
    );
  return (
    <a href={href} target={newtab ? "_blank" : "_self"} onClick={()=>analytics.logEvent("login")} className="button-domo">
      {children}
    </a>
  );
};
