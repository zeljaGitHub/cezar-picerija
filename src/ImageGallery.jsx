import { useState, useEffect, useRef } from "react";
import "./ImageGallery.css";

const ImageGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const audioRef = useRef(null);
  const galleryRef = useRef(null);
  const startYRef = useRef(null);

  const [transitionClass, setTransitionClass] = useState("");
  const [prevIndex, setPrevIndex] = useState(0);

  const desktopImages = [
    "/desktop-gallery/cezar-desktop-1.png",
    "/desktop-gallery/cezar-desktop-2.png",
    "/desktop-gallery/cezar-desktop-3.png",
    "/desktop-gallery/cezar-desktop-4.png",
    "/desktop-gallery/cezar-desktop-5.png",
    "/desktop-gallery/cezar-desktop-6.png",
    "/desktop-gallery/cezar-desktop-7.png",
  ];

  const mobileImages = [
    "/mobile-gallery/cezar-mobile-1.png",
    "/mobile-gallery/cezar-mobile-2.png",
    "/mobile-gallery/cezar-mobile-3.png",
    "/mobile-gallery/cezar-mobile-4.png",
    "/mobile-gallery/cezar-mobile-5.png",
    "/mobile-gallery/cezar-mobile-6.png",
    "/mobile-gallery/cezar-mobile-7.png",
  ];

  // Dodajte u komponentu
  useEffect(() => {
    // Preload pressed button image
    const img = new Image();
    img.src = "/dugme-pritisnuto.png";
  }, []);

  const images = isMobile ? mobileImages : desktopImages;

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleClick = () => {
    playSound();
    setTimeout(() => {
      setIsOpen(true);
    }, 150);
  };

  const closeGallery = () => setIsOpen(false);

  const goToPrev = () => {
    if (isMobile) {
      setTransitionClass("slide-up");
      setPrevIndex(currentIndex);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
        setTransitionClass("slide-in");
        setTimeout(() => setTransitionClass(""), 500);
      }, 50);
    } else {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  const goToNext = () => {
    if (isMobile) {
      setTransitionClass("slide-up");
      setPrevIndex(currentIndex);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        setTransitionClass("slide-in");
        setTimeout(() => setTransitionClass(""), 500);
      }, 50);
    } else {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape") closeGallery();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, isMobile]);

  useEffect(() => {
    if (!isOpen || isMobile) return;

    const handleWheel = (e) => {
      if (e.deltaY > 0) goToNext();
      else if (e.deltaY < 0) goToPrev();
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isOpen, currentIndex, isMobile]);

  useEffect(() => {
    if (!isOpen || !isMobile || !galleryRef.current) return;

    const galleryElement = galleryRef.current;

    const handleTouchStart = (e) => {
      startYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (!startYRef.current) return;
      const currentY = e.touches[0].clientY;
      const diffY = startYRef.current - currentY;

      if (Math.abs(diffY) > 50) {
        if (diffY > 0) goToNext();
        else goToPrev();
        startYRef.current = null;
      }
    };

    galleryElement.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    galleryElement.addEventListener("touchmove", handleTouchMove, {
      passive: true,
    });

    return () => {
      galleryElement.removeEventListener("touchstart", handleTouchStart);
      galleryElement.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isOpen, currentIndex, isMobile]);

  return (
    <div className="gallery-container">
      <audio ref={audioRef} src="/bell.mp3" preload="auto" />
      <button
        onClick={handleClick}
        className="image-button"
        aria-label="Open gallery"
      />

      {isOpen && (
        <div className="gallery-overlay" ref={galleryRef}>
          <button onClick={closeGallery} className="close-button">
            ×
          </button>

          {!isMobile && (
            <>
              <button onClick={goToPrev} className="nav-button left-arrow">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path
                    fill="white"
                    d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
                  />
                </svg>
              </button>

              <button onClick={goToNext} className="nav-button right-arrow">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path
                    fill="white"
                    d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
                  />
                </svg>
              </button>
            </>
          )}

          <div className="gallery-content">
            {isMobile && prevIndex !== currentIndex && (
              <img
                src={images[prevIndex]}
                alt={`Gallery image ${prevIndex + 1}`}
                className={`gallery-image ${
                  transitionClass.includes("slide-up") ? "slide-up" : ""
                }`}
                style={{ position: "absolute" }}
              />
            )}
            <img
              src={images[currentIndex]}
              alt={`Gallery image ${currentIndex + 1}`}
              className={`gallery-image ${
                transitionClass.includes("slide-in") ? "slide-in" : ""
              }`}
            />
            <div className="image-counter">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
