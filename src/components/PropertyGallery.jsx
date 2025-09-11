import React, { useState, useEffect } from "react";
import "./PropertyGallery.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const PropertyGallery = ({ images = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!images.length) return null;

  const mainImage = images[0];
  const smallImages = images.slice(1, 5);

  return (
    <>
      <div className="gallery-container mt-6">
        {/* Main image on the left */}
        <img src={mainImage} alt="Main" className="main-image" />

        {/* 4 small images on the right */}
        <div className="right-grid">
          {smallImages.map((img, index) => {
            const isLast = index === 3;
            return (
              <div
                key={index}
                className={`small-image-wrapper ${
                  isLast ? "relative overflow-hidden" : ""
                }`}
              >
                <img
                  src={img}
                  alt={`Gallery ${index + 2}`}
                  className="small-image"
                />
                {isLast && (
                  <div className="see-all-overlay">
                    <button onClick={() => setIsOpen(true)}>
                      📷 See all {images.length} photos
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen modal with carousel */}
      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
          >
            <button className="close-button" onClick={() => setIsOpen(false)}>
              ✖
            </button>
            <Carousel
              showThumbs={false}
              infiniteLoop
              swipeable
              emulateTouch
              showStatus={false}
              useKeyboardArrows
              dynamicHeight={false}
            >
              {images.map((img, index) => (
                <div key={index}>
                  <img src={img} alt={`Slide ${index + 1}`} />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyGallery;
