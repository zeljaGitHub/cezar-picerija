import React from "react";

const Text = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "15%",
        width: "300px",
        height: "500px",
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
      <div style={{ marginBottom: "20px", lineHeight: 0.6 }}>
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>
          NA 5 LOKACIJA
        </div>
        <div
          style={{
            fontSize: "32px",
            fontWeight: "bolder",
            marginTop: "10px",
            color: "#fbca0c",
          }}
        >
          U GRADU
        </div>
      </div>

      {/* Drugi blok teksta */}
      <div style={{ marginBottom: "20px", lineHeight: 0.6 }}>
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>DOSTAVA</div>
        <div
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            marginTop: "10px",
            color: "#fbca0c",
          }}
        >
          018588588
        </div>
      </div>

      {/* Treći blok teksta */}
      <div style={{ marginBottom: "20px", lineHeight: 0.6 }}>
        <div style={{ fontSize: "18px", fontWeight: "bold" }}>...I NA</div>
        <div
          style={{
            fontSize: "40px",
            fontWeight: "bolder",
            margin: "10px 0",
            color: "#00ccff",
          }}
        >
          WOLT
        </div>
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>APLIKACIJI</div>
      </div>
    </div>
  );
};

export default Text;
