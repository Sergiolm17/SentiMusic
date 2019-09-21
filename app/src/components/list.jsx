import React, { useState } from "react";
import "./list.scss";
export default ({ artist, name, src, preview_url, valence, onClick }) => {
  const [disabled, setdisabled] = useState(false);
  const click = () => {
    setdisabled(true);
    onClick();
  };
  return (
    <div className="list-container">
      <div>
        <img alt={name} src={src} style={{ height: "50px" }} />
      </div>
      <div className="list-who">
        <span className="list-name">{name}</span>
        <span className="list-artist">{artist}</span>
      </div>
      <div className="list-valence">
        <span className="valence">{valence}</span>
      </div>
      <div
        className={`list-audio ${disabled ? "active-audio" : "disabled-audio"}`}
      >
        <audio controls={true} src={preview_url} preload="none">
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </div>
      {!disabled && (
        <button disabled={disabled} className="add-music" onClick={click}>
          ADD
        </button>
      )}
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
