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
        <div style={{ fontSize: "3.3rem" }}>NA 5 LOKACIJA</div>
        <div
          style={{
            fontSize: "5.75rem",
            marginTop: "10px",
            color: "#fbca0c",
          }}
        >
          U GRADU
        </div>
      </div>

      {/* Drugi blok teksta */}
      <div style={{ marginBottom: "5rem", lineHeight: 0.8 }}>
        <div style={{ fontSize: "3.05rem" }}>DOSTAVA</div>
        <div
          style={{
            fontSize: "4.77rem",
            marginTop: "10px",
            color: "#fbca0c",
          }}
        >
          018588588
        </div>
      </div>

      {/* Treći blok teksta */}
      <div style={{ lineHeight: 0.8 }}>
        <div style={{ fontSize: "4.3rem" }}>...I NA</div>

        <div
          style={{
            fontSize: "7.1rem",
            margin: "10px 0",
            color: "#00ccff",
          }}
        >
          WOLT
        </div>
        <div style={{ fontSize: "3.2rem" }}>APLIKACIJI</div>
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
