import { useEffect, useState } from "react";
import Contact from "./Contact";
import ImageGallery from "./ImageGallery";
import Text from "./Text";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [picaPosition, setPicaPosition] = useState({ right: "0%", top: "20%" });

  useEffect(() => {
    const updatePicaPosition = () => {
      const vh = window.innerHeight;

      // Početne vrednosti za 650px visine
      const baseValues = {
        right: -62,
        top: -20,
      };

      // Promena pozicije na svakih 100px visine
      const changePer100px = {
        right: -3, // right se smanjuje za 3% na svakih 100px
        top: 3.5, // top se povećava za 5% na svakih 100px
      };

      // Izračunavanje nove pozicije
      const heightDifference = vh - 650;
      const steps = heightDifference / 100;

      const newRight = baseValues.right + changePer100px.right * steps;
      const newTop = baseValues.top + changePer100px.top * steps;

      // Postavljanje granica (opciono)
      const clampedRight = Math.max(-80, Math.min(-50, newRight));
      const clampedTop = Math.max(-30, Math.min(0, newTop));

      setPicaPosition({
        right: `${clampedRight}%`,
        top: `${clampedTop}%`,
      });
    };

    const checkIfMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) updatePicaPosition();
    };

    // Debounce funkcija za optimizaciju
    const debouncedCheck = debounce(checkIfMobile, 50);

    checkIfMobile();
    window.addEventListener("resize", debouncedCheck);
    return () => window.removeEventListener("resize", debouncedCheck);
  }, []);

  // Debounce helper funkcija
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  return (
    <div className="image-container">
      <img
        src={isMobile ? "/pozadina-mobilni.jpg" : "/pozadina-samo.png"}
        alt="Pozadina"
        className={`background-image ${isMobile ? "mobile-bg" : "desktop-bg"}`}
        loading="eager"
      />
      <img
        src="/pica.png"
        alt=""
        className="pica rotate"
        style={isMobile ? picaPosition : {}}
      />
      <img src="/cvetici.png" alt="" className="cvetici" />
      <ImageGallery
        isMobile={isMobile}
        isOpen={isGalleryOpen}
        onOpenGallery={setIsGalleryOpen}
        onCloseGallery={setIsGalleryOpen}
      />
      <Contact />
      <Text isMobile={isMobile} onOpenGallery={setIsGalleryOpen} />
    </div>
  );
}

export default App;
