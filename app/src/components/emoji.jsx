import React from "react";
import Happy from "../files/Happy.svg";
import Sad from "../files/Sad.svg";
import Cool from "../files/Cool.svg";
import styled from "styled-components";
const Boton = styled.button`
  color: transparent;
  background: transparent;
  border: 2px solid transparent;
  border-radius: 20px;
  cursor: default;
  margin: 8px;
  -webkit-transition: all 0.7s; /* Safari prior 6.1 */
  transition: all 0.7s;
  &:hover {
    border: 2px solid #ffffff8e;
    box-sizing: border-box;
  }
  &:focus {
    border: 2px solid #ffffff;
    outline: none;
  }
`;
const EmojiStyle = styled.img`
  margin: 14px;
`;

export default ({ state, onClick }) => {
  const emoji = state => {
    if (state === 1) return Happy;
    if (state === 2) return Sad;
    if (state === 3) return Cool;
    return null;
  };

  return (
    <Boton onClick={onClick}>
      <EmojiStyle src={emoji(state)} alt={"emotion"}></EmojiStyle>
    </Boton>
  );
};
