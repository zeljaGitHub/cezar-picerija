import React from "react";
import "./Text.css"; // Importujemo CSS fajl

const Text = () => {
  return (
    <div className="text-container">
      {/* Prvi blok teksta */}
      <div className="text-block first-block">
        <div className="text-line">NA 5 LOKACIJA</div>
        <div className="text-line yellow-text">U GRADU</div>
      </div>

      {/* Drugi blok teksta */}
      <div className="text-block second-block">
        <div className="text-line">DOSTAVA</div>
        <div className="text-line yellow-text">
          <a href="tel:018588588">018588588</a>
        </div>
      </div>

      {/* Treći blok teksta */}
      <div className="text-block third-block">
        <div className="text-line">...I NA</div>
        <div className="text-line blue-text wolt">WOLT</div>
        <div className="text-line">APLIKACIJI</div>
      </div>

      <img src="/leafs.png" alt="" className="leaf-image" />
    </div>
  );
};

export default Text;
