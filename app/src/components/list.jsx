import React, { useState } from "react";
import Spotify from "../files/Spotify.svg";
import Add from "../files/Add.svg";
import {  analytics } from "../Firebase";

import "./list.scss";
export default ({
  artist,
  name,
  src,
  preview_url,
  valence,
  onClick,
  external_urls
}) => {
  const [disabled, setdisabled] = useState(false);
  const click = () => {
    analytics.logEvent("add_to_playlist",{artist,name})
    setdisabled(true);
    onClick();
  };
  const OpenSpotify =()=>{
    analytics.logEvent("open_spotify",{artist,name})
  }
  if (!preview_url) return "";
  return (
    <div className="list-container">
      <div>
        <img alt={name} src={src} style={{ height: "50px" }} />
      </div>
      <div className="list-who">
        <span className="list-name">{name}</span>
        <span className="list-artist">{artist}</span>
      </div>

      <div className="gotoSpoty">
        <a href={external_urls} target="_blank" rel="noopener noreferrer" onClick={OpenSpotify}>
          <img src={Spotify} alt="Spotify Logo" className="imageList" />
        </a>
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
          <img src={Add} alt="Add Logo" className="imageList" />
        </button>
      )}
    </div>
  );
};
/*

      <div className="list-valence">
        <span className="valence">{valence}</span>
      </div>

  <div>
        <audio controls={true} src={preview_url} preload="none">
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </div>

*/
