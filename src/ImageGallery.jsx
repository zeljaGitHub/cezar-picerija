import { useState, useEffect, useRef } from "react";
import "./ImageGallery.css";

const ImageGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const audioRef = useRef(null);
  const galleryRef = useRef(null);
  const startXRef = useRef(null);

  // Desktop slike
  const desktopImages = [
    "/desktop-gallery/cezar-desktop-1.png",
    "/desktop-gallery/cezar-desktop-2.png",
    "/desktop-gallery/cezar-desktop-3.png",
    "/desktop-gallery/cezar-desktop-4.png",
    "/desktop-gallery/cezar-desktop-5.png",
    "/desktop-gallery/cezar-desktop-6.png",
    "/desktop-gallery/cezar-desktop-7.png",
  ];

  // Mobilne slike
  const mobileImages = [
    "/mobile-gallery/cezar-mobile-1.png",
    "/mobile-gallery/cezar-mobile-2.png",
    "/mobile-gallery/cezar-mobile-3.png",
    "/mobile-gallery/cezar-mobile-4.png",
    "/mobile-gallery/cezar-mobile-5.png",
    "/mobile-gallery/cezar-mobile-6.png",
    "/mobile-gallery/cezar-mobile-7.png",
  ];

  // Odaberi odgovarajući set slika
  const images = isMobile ? mobileImages : desktopImages;

  // Provera da li je mobilni uređaj
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const openGallery = () => {
    playSound();
    setIsOpen(true);
  };

  const closeGallery = () => setIsOpen(false);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Handle keyboard navigation
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

  // Handle wheel scroll
  useEffect(() => {
    if (!isOpen || isMobile) return;

    const handleWheel = (e) => {
      if (e.deltaY > 0) goToNext();
      else if (e.deltaY < 0) goToPrev();
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isOpen, currentIndex, isMobile]);

  // Handle touch events for mobile swipe
  useEffect(() => {
    if (!isOpen || !isMobile || !galleryRef.current) return;

    const galleryElement = galleryRef.current;

    const handleTouchStart = (e) => {
      startXRef.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      if (!startXRef.current) return;
      const currentX = e.touches[0].clientX;
      const diffX = startXRef.current - currentX;

      if (Math.abs(diffX) > 50) {
        // Threshold za swipe
        if (diffX > 0) {
          goToNext();
        } else {
          goToPrev();
        }
        startXRef.current = null;
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
      <button onClick={openGallery} className="gallery-button">
        <img
          src="/dugmeRRRRR.png"
          alt="Open gallery"
          className="button-image"
        />
      </button>

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
            <img
              src={images[currentIndex]}
              alt={`Gallery image ${currentIndex + 1}`}
              className="gallery-image"
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
