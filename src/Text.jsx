import React from "react";
import { useEffect, useState } from "react";
import "./Text.css";
import GalleryButton from "./GalleryButton";

const Text = ({ isMobile, onOpenGallery }) => {
  const [scaleStyle, setScaleStyle] = useState({});

  useEffect(() => {
    if (!isMobile) return;

    const calculateScale = () => {
      const height = window.innerHeight;
      const baseHeight = 915; // Visina na kojoj je scale = 1.0
      const step = 100; // Promena na svakih 100px
      const scaleStep = 0.1; // Promena scale-a po stepu

      // Računamo koliko koraka ima od baze
      const stepsFromBase = (height - baseHeight) / step;

      // Scale = 1.0 + (broj koraka * 0.1)
      let scale = 1.0 + stepsFromBase * scaleStep;

      // Opciono: ograniči scale između min/max vrednosti
      const minScale = 0.7; // Najmanji scale (na 215px ispod baze)
      const maxScale = 1.3; // Najveći scale (na 385px iznad baze)
      scale = Math.min(Math.max(scale, minScale), maxScale);

      setScaleStyle({ "--dynamic-scale": scale });
    };

    calculateScale();
    const resizeHandler = () => window.requestAnimationFrame(calculateScale);
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [isMobile]);

  return (
    <div className="text-container">
      <div className="text-blocks-wrapper" style={isMobile ? scaleStyle : {}}>
        <div className="text-block first-block">
          <div className="text-line">NA 5 LOKACIJA</div>
          <div className="text-line yellow-text">U GRADU</div>
        </div>

        <div className="text-block second-block">
          <div className="text-line">DOSTAVA</div>
          <div className="text-line yellow-text">
            <a href="tel:+38118588588">018588588</a>
          </div>
        </div>

        <div className="text-block third-block">
          <div className="text-line">...I NA</div>
          <a
            href="https://wolt.com/sr/srb/nis/nis-cezar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-line blue-text wolt social-link"
          >
            WOLT
          </a>
          <div className="text-line">APLIKACIJI</div>
        </div>

        {isMobile && (
          <div className="text-block fourth-block">
            <GalleryButton onClick={() => onOpenGallery(true)} />
          </div>
        )}

        <div className="contact-container-mobile">
          {/* Vertikalni tekst KONTAKT */}
          <div className="contact-text-mobile">KONTAKT</div>

          {/* Facebook link */}
          <a
            href="https://www.facebook.com/cezarfastfood/?locale=sr_RS"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <img
              src="/facebook-mobile.png"
              alt="Facebook"
              className="contact-image first-image"
            />
          </a>

          {/* Instagram link */}
          <a
            href="https://www.instagram.com/cezarfastfood/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <img
              src="/instagram-mobile.png"
              alt="Instagram"
              className="contact-image second-image"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Text;
