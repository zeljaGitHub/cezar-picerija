import React from "react";
import "./Contact.css";

const Contact = () => {
  // Determine if it's mobile based on screen width
  const isMobile = window.innerWidth <= 768;

  return (
    <div className="contact-container">
      {/* Vertikalni tekst KONTAKT */}
      <div className="contact-text">
        {"KONTAKT".split("").map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </div>

      {/* Facebook link */}
      <a
        href="https://www.facebook.com/cezarfastfood/?locale=sr_RS"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
      >
        <img
          src={isMobile ? "/facebook-mobile.png" : "/facebook.png"}
          alt="Facebook"
          className="contact-image first-image"
        />
      </a>

      {/* Instagram link */}
      <a
        href="https://www.instagram.com/cezarfastfood/?hl=en"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
      >
        <img
          src={isMobile ? "/instagram-mobile.png" : "/instagram.png"}
          alt="Instagram"
          className="contact-image second-image"
        />
      </a>
    </div>
  );
};

export default Contact;
