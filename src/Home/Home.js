import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import { app, fieldValue } from "../firebase/firebase";
import { RiDeleteBin5Line } from "react-icons/ri";
import Input from "../components/Input/Input";
import "./Home.css";
function Home(props) {
  const [message, setMessage] = useState("");
  const [allMessages, setAllmessages] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [position, setPosition] = useState(null);
  const ref = app.firestore().collection("messages");

  const sendMessage = (e) => {
    e.preventDefault();
    setDisabled(true);
    ref
      .doc()
      .set({
        message: message,
        createdAt: fieldValue.serverTimestamp(),
        sender: props.user.email,
      })
      .then(() => {
        setMessage("");
        setDisabled(false);
        document.getElementsByClassName("message__input")[0].focus();
      })
      .catch((error) => {
        setDisabled(true);
        document.getElementsByClassName("message__input")[0].focus();
      });
  };
  const handleDelete = (id) => {
    ref.doc(id).delete();
  };
  const handleInputChange = (value, fromEmojies) => {
    if (fromEmojies) {
      setMessage((prev) => `${prev}${value}`);
      return;
    }
    setMessage(value);
  };
  const getTime = (timestamp) => {
    if (timestamp) {
      let date = timestamp.toDate();
      let mm = date.getMonth();
      let dd = date.getDate();
      let yyyy = date.getFullYear();
      let hours = date.getHours();
      let min = date.getMinutes();

      date = dd + "/" + mm + "/" + yyyy + " " + hours + ":" + min;
      return date;
    }
    return "...";
  };
  useEffect(() => {
    ref.orderBy("createdAt", "asc").onSnapshot((messages) => {
      const arr = [];
      messages.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setAllmessages(arr);
    });
  }, []);
  useEffect(() => {
    if (document.getElementsByClassName("last__message")[0]) {
      document
        .getElementsByClassName("last__message")[0]
        .scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]);
  return (
    <div
      className="home__page"
      onClick={() => {
        setShowDeleteButton(false);
      }}
    >
      <Header user={props.user} />
      <div className="white__space"></div>
      <div className="messages__container">
        {allMessages.map((item, pos) => {
          return (
            <div
              key={item.id}
              className={`single__message ${
                item.sender === props.user.email
                  ? "your__message"
                  : "others__message"
              } ${pos === allMessages.length - 1 ? "last__message" : ""}`}
            >
              <p className="name">{item.sender}</p>
              <p className="message">{item.message}</p>
              <p className="time">{getTime(item.createdAt)}</p>
              {item.sender === props.user.email ? (
                <p
                  className="options"
                  onMouseMove={() => {
                    setShowDeleteButton(true);
                    setPosition(pos);
                  }}
                  onClick={() => {
                    setShowDeleteButton(true);
                    setPosition(pos);
                  }}
                >
                  ...
                </p>
              ) : (
                ""
              )}

              {showDeleteButton && pos === position ? (
                <div
                  className={`delete__div ${
                    pos === position ? "opening__animation" : ""
                  }`}
                  onMouseMove={() => {
                    setShowDeleteButton(true);
                  }}
                  onMouseLeave={() => {
                    setShowDeleteButton(false);
                  }}
                >
                  <button
                    onClick={(e) => {
                      handleDelete(item.id);
                    }}
                  >
                    <RiDeleteBin5Line size={"1rem"} />
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
      <Input
        disabled={disabled}
        sendMessage={sendMessage}
        handleInputChange={handleInputChange}
        message={message}
      />
    </div>
  );
}

export default Home;
