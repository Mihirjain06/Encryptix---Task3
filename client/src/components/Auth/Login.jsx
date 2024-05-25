import axios from "axios";
import React, { useContext, useState } from "react";
import { Context } from "../../index";
import "../../App.css";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline} from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import LoginImg from "../../assets/Login.jpg"
import JobBoardLogo from "../../assets/Job_Board_logo.png"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(
        "/api/v1/user/login",
        {email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
        toast.success(data.message);
        setIsAuthorized(true);
        setEmail("");
        setPassword("");
        setRole("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }
  return <>
    <section className="authPage">
      <div className="container">
        <div className="header">
          <img src={JobBoardLogo} alt="Logo" />
          <h3>Login to your account</h3>
        </div>

        <form>
          <div className="inputTag">
            <label>Login As</label>
            <div>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser/>
            </div>
          </div>

          <div className="inputTag">
            <label>Email Address</label>
            <div>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email">
              </input>
              <MdOutlineMailOutline/>
            </div>
          </div>

          <div className="inputTag">
            <label>Password</label>
            <div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password">
              </input>
              <RiLock2Fill/>
            </div>
          </div>
          <button onClick={handleLogin} type="submit">Login</button>
          <Link to={"/register"}>Don't have an account? Register Now. </Link>
        </form>
      </div>
      <div className="banner">
        <img src={LoginImg} alt="login" />
      </div>
    </section>
  </>
};

export default Login;
