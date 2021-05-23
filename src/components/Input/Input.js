import React, { useState, useEffect } from "react";
import "./Input.css";
import { FiSend } from "react-icons/fi";
import { GrEmoji } from "react-icons/gr";
import Picker from "emoji-picker-react";
function Input(props) {
  const [message, setMessage] = useState(props.message);
  const [showEmojies, setShowEmojies] = useState(false);
  const onEmojiClick = (event, emojiObject) => {
    props.handleInputChange(emojiObject.emoji, true);
  };
  useEffect(() => {
    setMessage(props.message);
  }, [props.message]);
  return (
    <div className="input__box">
      {showEmojies ? (
        <div className="emojies__div">
          <Picker className="picker" onEmojiClick={onEmojiClick} />
        </div>
      ) : (
        ""
      )}
      <div
        className="emojies__icon"
        onClick={() => {
          setShowEmojies(!showEmojies);
        }}
      >
        <GrEmoji size={"1rem"} color={"#000"} />
      </div>
      <input
        disabled={props.disabled}
        type="text"
        className="message__input"
        value={message}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            props.sendMessage(e);
          }
        }}
        onChange={(e) => {
          props.handleInputChange(e.target.value);
        }}
        placeholder="Type a message . . ."
      />
      <div
        className="send__message"
        onClick={(e) => {
          props.sendMessage(e);
          setShowEmojies(false);
        }}
        style={{
          pointerEvents: `${props.disabled ? "none" : "auto"}`,
        }}
      >
        <FiSend size={"1rem"} color={"#000"} />
      </div>
    </div>
  );
}

export default Input;
