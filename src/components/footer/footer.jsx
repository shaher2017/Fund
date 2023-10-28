import React from 'react';
import './footer.css'; 
import logo from "../login/logo.png";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fab);

const Footer = () => {
    return (
        <footer className="footer">
        <div className="footer-content">
            <div className="footer-logo">
                <img src={logo} alt="Your Logo" />
                <h1>Shaher Fund</h1>
            </div>
            <div className="footer-social">
                <a href="https://github.com/shaher2017?tab=repositories"><FontAwesomeIcon icon={['fab', 'github']} /></a>
                <a href="https://linkedin.com/in/shaher-emad-211852223"><FontAwesomeIcon icon={['fab', 'linkedin']} /></a>
                <p>&copy; 2023 Shaher Fund</p>
            <p>Empowering Dreams, Transforming Lives</p>
            </div>
            <div className="footer-links">
                <a href="/projects">Home</a>
                <a href="/aboutus">About</a>
                <a href="/projects">Projects</a>
            </div>
        </div>
    </footer>
    );
}

export default Footer;
