import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import "./navbar.css";

const Navbar = (props) => {
  const history = useHistory();
  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact-section");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <header className="navbar-container">
      <header data-thq="thq-navbar" className="navbar-navbar-interactive">
        <img
          alt={props.logoAlt}
          src="/img/logo1.png"
          className="navbar-image1"
        />
        <div data-thq="thq-navbar-nav" className="navbar-desktop-menu">
          <nav className="navbar-links1">
            <span className="thq-link thq-body-small" onClick={() => history.push("/")}>
              {props.link1}
            </span>
            <span className="thq-link thq-body-small" onClick={() => history.push("/service")}>{props.link2}</span>
            <span className="thq-link thq-body-small" onClick={() => history.push("/About")}>
              {props.link3}
            </span>
            <span className="thq-link thq-body-small" onClick={handleScrollToContact}>{props.link4}</span>
            <span className="thq-link thq-body-small">{props.link5}</span>
          </nav>
          <div className="navbar-buttons1">
            <button 
              className="navbar-action11 thq-button-animated thq-button-filled"
              onClick={() => history.push("/login")}
            >
              <span className="thq-body-small">Login</span>
            </button>
            <button 
              className="navbar-action21 thq-button-outline thq-button-animated"
              onClick={() => history.push("/signup")}
            >
              <span className="thq-body-small">Register</span>
            </button>
          </div>
        </div>
      </header>
    </header>
  );
};

Navbar.defaultProps = {
  link1: "Home",
  link5: "",
  link2: "Services",
  logoAlt: "Psychotherapy Consultancy",
  link3: "About Us",
  link4: "Contact",
};

Navbar.propTypes = {
  link1: PropTypes.string,
  link5: PropTypes.string,
  link2: PropTypes.string,
  logoSrc: PropTypes.string,
  logoAlt: PropTypes.string,
  link3: PropTypes.string,
  link4: PropTypes.string,
};

export default Navbar;
