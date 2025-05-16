import { useEffect, useState } from "react";
import Contact from "./Contact";
import ImageGallery from "./ImageGallery";
import Text from "./Text";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <div className="image-container">
      <img
        src={isMobile ? "/mobile-bg.jpg" : "/proba.png"}
        alt="Pozadina"
        className={`background-image ${isMobile ? "mobile-bg" : "desktop-bg"}`}
        loading="eager"
      />
      <ImageGallery />
      <Contact />
      <Text />
    </div>
  );
}

export default App;
