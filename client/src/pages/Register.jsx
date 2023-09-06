import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
//import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toast from "react-hot-toast";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
import { MdAddAPhoto } from "react-icons/md";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [avatarImage, setAvatarImage] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const productData = new FormData();
    productData.append("username", values.username);
    productData.append("email", values.email);
    productData.append("password", values.password);
    productData.append("avatarImage", avatarImage);
    try {
      console.log(productData);
      const register = await axios.post(registerRoute, productData);
      console.log(values);
      setError("");
      navigate("/");
    } catch (error) {
      //console.log(error.response.data.message);
      setError(error?.response?.data.message);
      toast.error(error.response.data.message);
    }
  };
  return (
    <FormContainer>
      <form
        onSubmit={handleSubmit}
        action="/upload"
        method="post"
        encType="multipart/form-data"
      >
        <div className="brand">
          <img src={Logo} alt="Logo" />
          <h1>snappy</h1>
        </div>
        <label>
          {avatarImage ? (
            <img
              src={URL.createObjectURL(avatarImage)}
              alt="Product_Photo"
              className="img img-responsive"
            />
          ) : (
            <MdAddAPhoto className="photo-add" />
          )}
          <input
            type="file"
            accept="image/*"
            name="avatarImage"
            onChange={(e) => {
              setAvatarImage(e.target.files[0]);
              console.log(e.target.files[0]);
            }}
            hidden
          />
        </label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit" onClick={handleSubmit}>
          Register
        </button>
        {error && <p className="error">{error}</p>}
        <span>
          Already have an account ? <Link to="/">Login</Link>
        </span>
      </form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  .photo-add {
    color: #333350;
    font-size: 5rem;
    cursor: pointer;
    text-align: center;
  }
  label {
    display: flex;
    justify-content: center;
    .img-responsive {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  .error {
    color: red;
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register;
