import React, { useContext } from "react";
import { Context } from "../../index.jsx";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Job Board.</div>
      <div>
        <Link to={"https://github.com/Mihirjain06"} target="=blank">
          <FaGithub />
        </Link>
        <Link to={"https://www.linkedin.com/in/mihirjain04"} target="=blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.instagram.com/mihirjain_04?igsh=MThyYWp1OHdtNDhycg=="} target="=blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
