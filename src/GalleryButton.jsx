import { useRef } from "react";

const GalleryButton = ({ onClick }) => {
  const audioRef = useRef(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleClick = () => {
    playSound();
    setTimeout(() => onClick(), 150);
  };

  return (
    <>
      <audio ref={audioRef} src="/bell.mp3" preload="auto" />
      <button
        onClick={handleClick}
        className="image-button social-link"
        aria-label="Open gallery"
      />
    </>
  );
};

export default GalleryButton;
