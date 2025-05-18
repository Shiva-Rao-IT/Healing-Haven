import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './user_navbar.css';

const Navbar = (props) => {
  const { history } = props;
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Retrieve username from localStorage (ensure it's set during login)
    const storedUsername = localStorage.getItem("username") || "User";
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove authentication token
    localStorage.removeItem("username"); // Remove stored username
    history.push("/login"); // Redirect to login page
  };
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
            <span className="thq-link thq-body-small" onClick={() => history.push("/user")}>{props.link1}</span>
            <span className="thq-link thq-body-small"onClick={() => history.push("/user/service")}>{props.link2}</span>
            <span className="thq-link thq-body-small" onClick={() => history.push("/user/about")}>{props.link3}</span>
            <span className="thq-link thq-body-small"onClick={handleScrollToContact}>{props.link4}</span>
            <span className="thq-link thq-body-small" onClick={() => history.push("/user/appoint")}>{props.link5}</span>
          </nav>
          <div className="navbar-user">
            {username ? (
              <>
              <img src="/img/user.png" alt="User Icon" className="user-icon"></img>
                <span className="thq-body-small">
                
                  Welcome, {username}</span>

              </>
            ) : null}
          </div>
        </div>
      </header>
    </header>
  );
};

Navbar.defaultProps = {
  link1: 'Home',
  link5: 'Apppointments',
  link2: 'Services',
  logoSrc:
    'https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/84ec08e8-34e9-42c7-9445-d2806d156403/fac575ac-7a41-484f-b7ac-875042de11f8?org_if_sml=1&force_format=original',
  logoAlt: 'Psychotherapy Consultancy',
  link3: 'About Us',
  link4: 'Contact',
};

Navbar.propTypes = {
  link1: PropTypes.string,
  link5: PropTypes.string,
  link2: PropTypes.string,
  logoSrc: PropTypes.string,
  logoAlt: PropTypes.string,
  link3: PropTypes.string,
  link4: PropTypes.string,
  history: PropTypes.object.isRequired,
};

export default withRouter(Navbar);
