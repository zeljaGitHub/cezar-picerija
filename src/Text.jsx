import React from "react";

const Text = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "14%",
        width: "25rem",
        height: "46rem",
        backgroundColor: "rgba(255, 255, 255, 0.2)", // Bela boja sa 70% opacity
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
        color: "white",
        textAlign: "center",
        textShadow: "1px 1px 3px rgba(0,0,0,0.8)",
      }}
    >
      {/* Prvi blok teksta */}
      <div style={{ marginBottom: "5rem", lineHeight: 0.8 }}>
        <div style={{ fontSize: "3.15rem", fontWeight: "bold" }}>
          NA 5 LOKACIJA
        </div>
        <div
          style={{
            fontSize: "5.5rem",
            fontWeight: "bolder",
            marginTop: "10px",
            color: "#fbca0c",
          }}
        >
          U GRADU
        </div>
      </div>

      {/* Drugi blok teksta */}
      <div style={{ marginBottom: "5rem", lineHeight: 0.8 }}>
        <div style={{ fontSize: "2.9rem", fontWeight: "bold" }}>DOSTAVA</div>
        <div
          style={{
            fontSize: "4.5rem",
            fontWeight: "bold",
            marginTop: "10px",
            color: "#fbca0c",
          }}
        >
          018588588
        </div>
      </div>

      {/* Treći blok teksta */}
      <div style={{ lineHeight: 0.8 }}>
        <div style={{ fontSize: "4.1rem" }}>
          <span>...</span>
          <span style={{ fontWeight: "bold" }}>I NA</span>
        </div>

        <div
          style={{
            fontSize: "7rem",
            fontWeight: "bolder",
            margin: "10px 0",
            color: "#00ccff",
          }}
        >
          WOLT
        </div>
        <div style={{ fontSize: "3.1rem", fontWeight: "bold" }}>APLIKACIJI</div>
      </div>
      <img
        src="/leafs.png"
        alt=""
        style={{ position: "absolute", top: "1.5%", left: "-10%" }}
      />
    </div>
  );
};

export default Text;
