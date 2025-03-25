 
"use client";
import React, { useEffect } from "react";
import ModalVideo from "react-modal-video";
 
export default function ModalVideoComponent({ isOpen, setIsOpen, videoId, videoUrl, videoType }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
 
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
 
  if (!isOpen) return null;
 
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "16px",
      }}
    >
      {/* Close Button */}
      <button
        onClick={() => setIsOpen(false)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          border: "none",
          borderRadius: "50%",
          width: "35px",
          height: "35px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 1001,
          transition: "0.3s ease",
        }}
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="white"
          width="20"
          height="20"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
 
      {/* Video Modal Content */}
      <div
        style={{
          position: "relative",
          width: "90%",
          maxWidth: "800px",
          height: "auto",
          borderRadius: "8px",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {videoType === "youtube" && videoId ? (
          <ModalVideo
            channel="youtube"
            youtube={{ mute: 0, autoplay: 1 }}
            isOpen={isOpen}
            videoId={videoId}
            onClose={() => setIsOpen(false)}
          />
        ) : (
          <video
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
            }}
            controls
            autoPlay
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
}
 
 