import React, { useState } from "react";
import Spotify from "../files/Spotify.svg";
import Add from "../files/Add.svg";

import styled from "styled-components";
const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 50px auto 54px;
  grid-gap: 4px;
  text-align: left;
  padding: 19px 0px;
`;
const ListWho = styled.div`
  display: grid;
  grid-template-rows: auto auto;
`;
const ListName = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #ffffff;
`;
const ListArtist = styled.span`
  font-family: Zilla Slab;
  font-style: italic;
  font-weight: normal;
  font-size: 17px;
  line-height: 22px;
  color: #cbcfd4;
`;
const ImageList = styled.img`
  height: 54px;
`;
const AddMusic = styled.button`
  border: none;
  margin: 0em;

  padding: 0px;

  background-color: transparent;
  cursor: pointer;
  transition: all 0.7s;
  outline: none;
  &:hover {
    box-sizing: border-box;
    outline: none;
  }
  &:active {
    box-sizing: border-box;
    outline: none;
  }
`;
const ListAudio = styled.div`
  grid-column-start: 1;
  audio {
    text-align: center;
    width: 100%;
  }
  grid-column-end: ${props => (props.disabled ? 3 : 4)};
`;
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
    setdisabled(true);
    onClick();
  };
  if (!preview_url) return "";
  return (
    <ListContainer>
      <div>
        <img alt={name} src={src} style={{ height: "50px" }} />
      </div>
      <ListWho>
        <ListName>{name}</ListName>
        <ListArtist>{artist}</ListArtist>
      </ListWho>

      <div>
        <a href={external_urls} target="_blank" rel="noopener noreferrer">
          <ImageList src={Spotify} alt="Spotify Logo" />
        </a>
      </div>

      <ListAudio disabled>
        <audio controls={true} src={preview_url} preload="none">
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </ListAudio>
      {!disabled && (
        <AddMusic disabled={disabled} onClick={click}>
          <ImageList src={Add} alt="Add Logo" />
        </AddMusic>
      )}
    </ListContainer>
  );
};
/*
.valence {
  font-family: Zilla Slab;
  color: #cbcfd4;
}
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
