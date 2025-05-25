import { useEffect, useState } from "react";
import Contact from "./Contact";
import ImageGallery from "./ImageGallery";
import Text from "./Text";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

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
        src={isMobile ? "/pozadina-mobilni.png" : "/pozadina-samo.png"}
        alt="Pozadina"
        className={`background-image ${isMobile ? "mobile-bg" : "desktop-bg"}`}
        loading="eager"
      />
      <img src="/pica.png" alt="" className="pica rotate" />
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
