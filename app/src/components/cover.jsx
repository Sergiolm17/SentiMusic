import React from "react";
const coverStyle = {
  boxShadow: " 7px 7px 9px rgba(0, 0, 0, 0.2)",
  height: 300
};
export default ({ nowPlaying }) => {
  return (
    <img alt={nowPlaying.name} src={nowPlaying.albumArt} style={coverStyle} />
  );
};
