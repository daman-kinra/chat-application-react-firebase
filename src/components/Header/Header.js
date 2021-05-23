import React from "react";
import "./Header.css";
function Header(props) {
  return (
    <div className="header__main">
      <div className="image__div">
        <img src={props.user.photoURL} alt="" className="user__img" />
      </div>
      <div className="user__name">
        <h2>@ {props.user.displayName}</h2>
      </div>
    </div>
  );
}

export default Header;
