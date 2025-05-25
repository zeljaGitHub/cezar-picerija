import React from "react";
import "./Text.css";
import GalleryButton from "./GalleryButton";

const Text = ({ isMobile, onOpenGallery }) => {
  return (
    <div className="text-container">
      <div className="text-blocks-wrapper">
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
            href="https://wolt.com"
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
      </div>

      <img src="/leafs.png" alt="" className="leaf-image" />
    </div>
  );
};

export default Text;
