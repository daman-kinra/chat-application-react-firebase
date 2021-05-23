import React from "react";
import { app } from "./firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./Login/Login";
import Home from "./Home/Home";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";
import "./App.css";

function App() {
  const [user, loading] = useAuthState(app.auth());

  if (loading) {
    return (
      <div className="loading__area">
        <HashLoader
          color={"#a7bbc7"}
          loading={true}
          css={override}
          size={150}
        />
      </div>
    );
  }
  if (!user) {
    return <Login></Login>;
  }
  if (user) {
    return <Home user={user} />;
  }
}
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
export default App;
