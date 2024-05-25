import axios from "axios";
import React, { useContext, useState } from "react";
import { Context } from "../../index";
import "../../App.css";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { FaPencilAlt, FaRegUser } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdOutlineMailOutline} from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import RegisterImg from "../../assets/Register.jpg"
import JobBoardLogo from "../../assets/Job_Board_logo.png"

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(
        "/api/v1/user/register",
        { name, email, password, phone, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
        toast.success(data.message);
        setIsAuthorized(true);
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
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
          <h3>Create a new account</h3>
        </div>

        <form>
          <div className="inputTag">
            <label>Register As</label>
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
            <label>Name</label>
            <div>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name">
              </input>
              <FaPencilAlt/>
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
            <label>Phone Number</label>
            <div>
              <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone">
              </input>
              <FaPhoneFlip/>
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
          <button onClick={handleRegister} type="submit">Register</button>
          <Link to={"/login"}>Already have an register? Login Now.</Link>
        </form>
      </div>
      <div className="banner">
        <img src={RegisterImg} alt="register" />
      </div>
    </section>
  </>
};

export default Register;
