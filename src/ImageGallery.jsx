import { useState, useEffect, useRef } from "react";
import "./ImageGallery.css";

const ImageGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [transitioningImages, setTransitioningImages] = useState([]);
  const [direction, setDirection] = useState("next");
  const galleryRef = useRef(null);
  const startYRef = useRef(null);
  const audioRef = useRef(null);

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

  const images = isMobile ? mobileImages : desktopImages;

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleClick = () => {
    playSound();
    setTimeout(() => setIsOpen(true), 150);
  };

  const closeGallery = () => setIsOpen(false);

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
    }, 500); // match CSS duration
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
    if (!isOpen || !isMobile || !galleryRef.current) return;

    const handleTouchStart = (e) => {
      startYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (!startYRef.current) return;
      const deltaY = e.touches[0].clientY - startYRef.current;

      if (Math.abs(deltaY) > 50) {
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
