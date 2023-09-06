import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { profile } from "../utils/APIRoutes";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [email, setEmail] = useState(null);
  useEffect(() => {
    axios.get(profile).then((response) => {
      console.log(response?.data?.user);
      setUsername(response?.data?.user.username);
      setId(response?.data?.user.id);
      setEmail(response?.data?.user.email);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{ username, setUsername, id, setId, email, setEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};
