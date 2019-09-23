import React from "react";
import Happy from "../files/Happy.svg";
import Sad from "../files/Sad.svg";
import Cool from "../files/Cool.svg";
import "./Emoji.scss";

export default ({ state, onClick }) => {
  const emoji = state => {
    if (state === 1) return Happy;
    if (state === 2) return Sad;
    if (state === 3) return Cool;
    return null;
  };

  return (
    <button className="buttonStyle" onClick={onClick}>
      <img src={emoji(state)} alt={"emotion"} className="EmojiStyle"></img>
    </button>
  );
};
