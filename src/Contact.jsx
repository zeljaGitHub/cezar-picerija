import React from "react";

const Contact = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "7%",
        right: "1%",
        // transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        zIndex: 5, // Osigurava da je iznad pozadine
        color: "#4d3d63",
        // textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* Vertikalni tekst KONTAKT */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: "3.7rem",
          fontWeight: "bold",
          marginBottom: "6rem",
          lineHeight: "1",
        }}
      >
        {"KONTAKT".split("").map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </div>

      {/* Prva slika */}
      <img
        src="/facebook.png"
        alt="Slika 1"
        style={{
          width: "93px",
          height: "122px",
          marginBottom: "1rem",
        }}
      />

      {/* Druga slika */}
      <img
        src="/instagram.png"
        alt="Slika 2"
        style={{
          width: "100px",
          height: "auto",
        }}
      />
    </div>
  );
};

export default Contact;
