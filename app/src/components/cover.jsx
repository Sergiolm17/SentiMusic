import React from "react";
import "./cover.scss";

const coverStyle = {
  boxShadow: " 7px 7px 9px rgba(0, 0, 0, 0.2)",
  height: 250
};
export default ({ nowPlaying, is_playing }) => {
  return (
    <img
      alt={nowPlaying.name}
      src={nowPlaying.albumArt}
      style={coverStyle}
      className={is_playing ? `coverActive` : `coverDeactivated`}
    />
  );
};
