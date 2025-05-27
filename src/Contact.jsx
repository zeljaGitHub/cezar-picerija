import React from "react";
import "./Contact.css";

const Contact = () => {
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
          src="/facebook.png"
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
          src="/instagram.png"
          alt="Instagram"
          className="contact-image second-image"
        />
      </a>
    </div>
  );
};

export default Contact;
