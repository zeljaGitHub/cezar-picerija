import React from "react";

const Contact = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "10%",
        left: "93%",
        // transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        zIndex: 5, // Osigurava da je iznad pozadine
        color: "white", // Pretpostavka da će bolje kontrastirati sa pozadinom
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Poboljšava čitljivost
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
          marginBottom: "2rem",
          lineHeight: "1.2",
        }}
      >
        {"KONTAKT".split("").map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </div>

      {/* Prva slika */}
      <img
        src="/facebook.png" // Zamijenite sa stvarnim putem
        alt="Slika 1"
        style={{
          width: "100px",
          height: "auto",
          marginBottom: "1rem",
        }}
      />

      {/* Druga slika */}
      <img
        src="/instagram.png" // Zamijenite sa stvarnim putem
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
