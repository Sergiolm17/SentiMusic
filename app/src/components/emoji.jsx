import React from "react";
import Happy from "../files/Happy.svg";
import Sad from "../files/Sad.svg";
import "./Emoji.scss";

export default ({ state, onClick }) => {
  return (
    <button className="buttonStyle" onClick={onClick}>
      <img
        src={state ? Happy : Sad}
        alt={state ? "Happy" : "Sad"}
        className="EmojiStyle"
      ></img>
    </button>
  );
};
