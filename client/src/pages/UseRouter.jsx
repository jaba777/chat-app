import React, { useContext } from "react";
import Chat from "./Chat";
import Login from "./Login";
import { AuthContext } from "../context/Auth";

const UseRouter = () => {
  const { username, id, email } = useContext(AuthContext);
  if (username && id && email) {
    return <Chat />;
  }

  return <Login />;
};

export default UseRouter;
