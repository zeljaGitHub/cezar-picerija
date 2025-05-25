import { useState, useEffect, useRef } from "react";
import "./ImageGallery.css";
import GalleryButton from "./GalleryButton";

const ImageGallery = ({ isMobile, isOpen, onOpenGallery, onCloseGallery }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioningImages, setTransitioningImages] = useState([]);
  const [direction, setDirection] = useState("next");
  const galleryRef = useRef(null);
  const startYRef = useRef(null);

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

  useEffect(() => {
    mobileImages.forEach((imageSrc) => {
      const img = new Image();
      img.src = imageSrc;
    });
  }, []);

  const images = isMobile ? mobileImages : desktopImages;

  const handleClick = () => {
    if (onOpenGallery) onOpenGallery(true);
  };

  const closeGallery = () => {
    if (onCloseGallery) onCloseGallery(false);
  };

  const animateTransition = (newIndex, dir) => {
    const oldImage = images[currentIndex];
    const newImage = images[newIndex];

    setDirection(dir);
    setTransitioningImages([
      {
        src: oldImage,
        key: "out",
        className: `gallery-image mobile-out-${dir}`,
      },
      {
        src: newImage,
        key: "in",
        className: `gallery-image mobile-in-${dir}`,
      },
    ]);

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setTransitioningImages([]);
    }, 600);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    animateTransition(nextIndex, "next");
  };

  const goToPrev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    animateTransition(prevIndex, "prev");
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

    const handleTouchStart = (e) => {
      startYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (!startYRef.current) return;
      const deltaY = e.touches[0].clientY - startYRef.current;

      if (Math.abs(deltaY) > 40) {
        if (deltaY < 0) goToNext();
        else goToPrev();
        startYRef.current = null;
      }
    };

    const gallery = galleryRef.current;
    gallery.addEventListener("touchstart", handleTouchStart, { passive: true });
    gallery.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      gallery.removeEventListener("touchstart", handleTouchStart);
      gallery.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isOpen, currentIndex, isMobile]);

  return (
    <div className="gallery-container">
      {!isMobile && <GalleryButton onClick={handleClick} />}

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
            {transitioningImages.length > 0 ? (
              transitioningImages.map((img) => (
                <img
                  key={img.key}
                  src={img.src}
                  className={img.className}
                  alt=""
                />
              ))
            ) : (
              <img
                src={images[currentIndex]}
                className="gallery-image"
                alt=""
              />
            )}
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
