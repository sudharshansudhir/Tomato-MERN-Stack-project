import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import axios from "../../axios";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const enableLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", { username, password });
      if (res.data.success) {
        alert("Login Success!");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setShowLogin(false);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const enableRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/register", { username, email, password });
      alert("Register Success!");
      setShowLogin(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='login-popup'>
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          <input type="text" placeholder='Your name' onChange={(e) => setUsername(e.target.value)} required />
          {currState === "Login" ? null :
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Your email' required />}
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='password' required />
        </div>
        {currState === "Sign Up" ?
          <button onClick={enableRegister}>Create account</button> :
          <button onClick={enableLogin}>Login</button>}
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currState === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  );
};

export default LoginPopup;
