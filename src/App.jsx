import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [bgStyle, setBgStyle] = useState({});

  useEffect(() => {
    function adjustBackground() {
      const windowRatio = window.innerWidth / window.innerHeight;
      const imageRatio = 16 / 9; // Vaša slika je 1600x900 (16:9)

      if (windowRatio > imageRatio) {
        // Širi ekran (npr. 21:9) - podešavamo po visini
        setBgStyle({
          width: "auto",
          height: "100vh",
          margin: "0 auto",
        });
      } else {
        // Viši ekran (npr. 4:3) - podešavamo po širini
        setBgStyle({
          width: "100vw",
          height: "auto",
          margin: "auto 0",
        });
      }
    }

    adjustBackground();
    window.addEventListener("resize", adjustBackground);
    return () => window.removeEventListener("resize", adjustBackground);
  }, []);

  return (
    <div className="fullscreen-bg">
      <img
        src="/pozadina-desktop-logo-cezar.jpg"
        alt="Background"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: "100%",
          minHeight: "100%",
          ...bgStyle,
          zIndex: -1,
        }}
      />
      {/* Ostali sadržaj */}
      <div className="content">
        <h1>Vaš sajt</h1>
      </div>
    </div>
  );
}

export default App;
