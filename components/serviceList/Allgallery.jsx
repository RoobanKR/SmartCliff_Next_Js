"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGallery } from "@/redux/slices/gallery/gallery";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

export default function AllGalleryList() {
  const [currentYear, setCurrentYear] = useState("All Years");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const dispatch = useDispatch();
  const gallery = useSelector((state) => state.gallery.gallery);

  // Sort gallery by date (newest first)
  const sortedGallery = [...gallery].sort((a, b) => {
    // Sort by year first (descending)
    if (a.year !== b.year) {
      return b.year - a.year;
    }
    
    // If same year, sort by month
    const months = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    
    return months.indexOf(b.month) - months.indexOf(a.month);
  });

  // Extract unique years from gallery data
  const availableYears = [...new Set(sortedGallery.map((item) => item.year))].sort((a, b) => b - a);

  // Filter gallery items based on selected year
  const filteredGallery =
    currentYear === "All Years"
      ? sortedGallery
      : sortedGallery.filter((item) => item.year === currentYear);

  useEffect(() => {
    dispatch(getAllGallery());
  }, [dispatch]);
  
  // Add event listener for keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!modalOpen) return;
      
      if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'Escape') {
        closeModal();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, currentImageIndex, selectedImages]);

  // Function to open modal with all images
  const openModal = (images, event) => {
    if (event) {
      event.stopPropagation();
    }
    setSelectedImages(images);
    setCurrentImageIndex(0);
    setModalOpen(true);
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  // Function to close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImages([]);
    // Re-enable scrolling
    document.body.style.overflow = "auto";
  };

  // Navigate to next image
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === selectedImages.length - 1 ? 0 : prev + 1
    );
  };

  // Navigate to previous image
  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedImages.length - 1 : prev - 1
    );
  };

  return (
    <div style={{ padding: "20px", marginTop: "70px" }}>
      {/* Header */}
      <h1
        style={{
          textAlign: "center",
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        All Galleries
      </h1>

      {/* Year Filter Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <button
          style={{
            padding: "8px 15px",
            borderRadius: "8px",
            border: "none",
            backgroundColor:
              currentYear === "All Years" ? "#5B2C6F" : "#e0e0e0",
            color: currentYear === "All Years" ? "#fff" : "#333",
            cursor: "pointer",
            transition: "0.3s",
            fontWeight: "bold",
          }}
          onClick={() => setCurrentYear("All Years")}
        >
          All Years
        </button>
        {availableYears.map((year) => (
            <button
              key={year}
              style={{
                padding: "8px 15px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: currentYear === year ? "#5B2C6F" : "#e0e0e0",
                color: currentYear === year ? "#fff" : "#333",
                cursor: "pointer",
                transition: "0.3s",
                fontWeight: "bold",
              }}
              onClick={() => setCurrentYear(year)}
            >
              {year}
            </button>
          ))}
      </div>

      {/* Gallery Grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          padding: "20px",
        }}
      >
        {filteredGallery.length > 0 ? (
          filteredGallery.map((elm, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                width: "320px",
                textAlign: "center",
                transition: "all 0.3s ease-in-out",
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0px 8px 16px rgba(0, 0, 0, 0.2)";
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0px 4px 8px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Single Index Image (Only show first image) */}
              <div
                style={{
                  overflow: "hidden",
                  borderRadius: "12px 12px 0 0",
                  height: "200px",
                }}
                onClick={(e) => openModal(elm.images, e)}
              >
                <img
                  src={elm.images[0]}
                  alt={`${elm.name} thumbnail`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              
              </div>

              {/* Content */}
              <div style={{ padding: "15px" }}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#333",
                    marginBottom: "8px",
                  }}
                >
                  {elm.name}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    lineHeight: "1.5",
                    marginBottom: "12px",
                  }}
                >
                  {elm.description}
                </p>

                {/* Date Tag */}
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#5B2C6F",
                    backgroundColor: "#F5F0FF",
                    display: "inline-block",
                    padding: "6px 12px",
                    borderRadius: "6px",
                  }}
                >
                  {elm.month} {elm.year}
                </div>
                  {elm.images.length > 1 && (
                     <div
                onClick={(e) => openModal(elm.images, e)}
              >
                  <div
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      right: "10px",
                      backgroundColor: "rgba(0,0,0,0.6)",
                      color: "white",
                      borderRadius: "4px",
                      padding: "4px 8px",
                      fontSize: "12px",
                    }}
                  >
                    +{elm.images.length - 1} more
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", fontSize: "16px", color: "#777" }}>
            No gallery items available.
          </div>
        )}
      </div>

      {/* Modal for displaying all images */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={closeModal}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "800px",
              height: "auto",
              aspectRatio: "4/3",
              maxHeight: "90vh",
              overflow: "hidden",
              backgroundColor: "#000",
              borderRadius: "8px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image container */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={selectedImages[currentImageIndex]}
                alt={`Gallery image ${currentImageIndex + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevImage}
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(91, 44, 111, 0.7)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                fontSize: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                zIndex: 2,
              }}
            >
              &#10094;
            </button>
            
            <button
              onClick={nextImage}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(91, 44, 111, 0.7)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                fontSize: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                zIndex: 2,
              }}
            >
              &#10095;
            </button>
            
            {/* Close button */}
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                fontSize: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                zIndex: 2,
              }}
            >
              &#10005;
            </button>
            
            {/* Image counter */}
            <div
              style={{
                position: "absolute",
                bottom: "15px",
                left: "50%",
                transform: "translateX(-50%)",
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                padding: "5px 10px",
                borderRadius: "15px",
                fontSize: "14px",
                zIndex: 2,
              }}
            >
              {currentImageIndex + 1} / {selectedImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}