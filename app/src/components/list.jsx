import React from "react";
import "./list.scss";
export default ({ artist, name, src, preview_url }) => {
  return (
    <div className="list-container">
      <div>
        <img alt={name} src={src} style={{ height: "50px" }} />
      </div>
      <div className="list-who">
        <span className="list-name">{name}</span>
        <span className="list-artist">{artist}</span>
      </div>
      <audio controls={true} src={preview_url} preload="none">
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </div>
  );
};
/*
  <div>
        <audio controls={true} src={preview_url} preload="none">
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </div>

*/
