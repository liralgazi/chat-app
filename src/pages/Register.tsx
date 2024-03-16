import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.svg";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../server/api'

const Register: React.FC = () => {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
    });
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (handleValidation()) {
            console.log("in validation", registerRoute);
            const { password, confirmpassword, username, email } = values;
            try {
                const { data } = await axios.post(registerRoute, {
                    username,
                    email,
                    password,
                });
                console.log("Response data:", data);
            } catch (error) {
                console.error("Error occurred:", error);
            }
        }
    };

    const handleValidation = () => {
        const { password, confirmpassword, username, email } = values;
        if (password !== confirmpassword) {
            toast.error("Passwords do not match", toastOptions);
            return false;
        } else if (username.length < 3) {
            toast.error("Username too short", toastOptions);
            return false;
        } else if (password.length < 8) {
            toast.error("Password too short", toastOptions);
            return false;
        } else if (email === "") {
            toast.error("Email required", toastOptions);
            return false;
        }
        return true; // Return true if all validations pass
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h1>chatty</h1>
                    </div>
                    <input
                        type="text"
                        placeholder='Username'
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        placeholder='Email'
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder='Confirm Password'
                        name="confirmpassword"
                        value={values.confirmpassword}
                        onChange={handleChange}
                    />
                    <button type='submit'>Create user</button>
                    <span>
                        Already have an account? <Link to="/login">Login</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand{
    display:flex
    align-items:center;
    gap: 1rem;
    justify-content: center;
    img{
        height: 5rem

    }
    h1{
        color: white;
        tex-transorm: uppercase;
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

export default Register