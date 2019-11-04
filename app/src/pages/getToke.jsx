import React from "react";
import { Redirect } from "react-router-dom";

export default props => {
  var hashParams = {};

  const r = /([^&;=]+)=?([^&;]*)/g;
  //console.log(props.location.search.substring(1));
  var e = r.exec(props.location.search.substring(1));
  console.log(e);
  while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    e = r.exec(props.location.search.substring(1));
  }
  console.log(hashParams);
  if (hashParams) return <Redirect></Redirect>;
  return <div>props</div>;
};
