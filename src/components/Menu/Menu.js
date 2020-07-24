import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import logo from "../../assets/logo.png";
import doneLogo from "../../assets/logoDone.png";
const Menu = () => {
  return (
    <nav className="nav">
      <div className="logoWrapper">
        <Link to="/" className="todosLogo">
          <img src={logo} alt="logo" />
        </Link>
        <Link to="/Done" className="todosDone">
          <img src={doneLogo} alt="logo" />
        </Link>
      </div>
    </nav>
  );
};

export default Menu;
