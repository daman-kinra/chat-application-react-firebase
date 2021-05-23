import React from "react";
import { app, provider } from "../firebase/firebase";
import "./Login.css";
function Login() {
  const handleLogin = (e) => {
    app
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="login__page">
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
