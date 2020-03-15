import React from "react";
import styled from "styled-components";
const Image = styled.img`
-webkit-filter :${props => (props.active ? "grayscale(0%)" : "grayscale(100%)")}
filter :${props => (props.active ? "grayscale(0%)" : "grayscale(100%)")}
transition: filter 1s;
`;
const coverStyle = {
  boxShadow: " 7px 7px 9px rgba(0, 0, 0, 0.2)",
  height: 250
};

export default ({ nowPlaying, is_playing }) => {
  return (
    <Image
      alt={nowPlaying.name}
      src={nowPlaying.albumArt}
      style={coverStyle}
      className={is_playing ? `coverActive` : `coverDeactivated`}
    />
  );
};
