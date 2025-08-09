import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from "../../axios";

const LoginPopup = ({setShowLogin}) => {

    const [currState,setCurrState] = useState("Login")
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");


    const enableLogin = async (e) => {
    e.preventDefault(); // ✅ Prevent refresh
    try {
      const res = await axios.post("http://localhost:3000/login", { username, password });
      
      if(res.data.success) {// ✅ Store in localStorage
      alert("Login Success!");
      const token = res.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      console.log(res);      
      }
      else{
        alert(res.data.message)
      }
       // optional
      setShowLogin(false);
    } catch (err) {
      console.error(err);
    //   alert("Login Failed");
    }
  };

  const enableRegister = async (e) => {
    e.preventDefault(); // ✅ Prevent refresh
    try {
      const res = await axios.post("http://localhost:3000/register", { username, email, password });
      //const token = res.data;
      //localStorage.setItem("token", token); // ✅ Store token
      alert("Register Success!");
      console.log(res);
      
      setShowLogin(false);
    } catch (err) {
      console.error(err);
    //   alert("Register Failed");
    }
  };

    
  return (
    <div className='login-popup'>
        <form className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)}  src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                
                <input type="text"  placeholder='Your name' onChange={(e)=>setUsername(e.target.value)} required/>
                {currState==="Login"?<></>:
                <input type="email" onChange={(e)=>setEmail(e.target.value) } placeholder='Your email' required/>}
                <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder='password' required/>
            </div>
            {currState==="Sign Up"?
            <button onClick={(e)=>enableRegister(e)}>Create account</button>
            :<button onClick={(e)=>enableLogin(e)}>Login</button>}
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By continuing,i agree to the terms of use & privacy policy</p>
            </div>
            {currState=="Login"
            ?<p>Create a new account? <span onClick={()=>{setCurrState("Sign Up");}}>Click here</span></p>
            :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
            }
        </form>
    </div>
  )
}

export default LoginPopup