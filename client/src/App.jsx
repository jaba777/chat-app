import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import axios from "axios";
import UseRouter from "./pages/UseRouter";

function App() {
  axios.defaults.withCredentials = true;
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<UseRouter />} />

        <Route path="*" element={<div>Error</div>} />
      </Routes>
    </>
  );
}

export default App;
