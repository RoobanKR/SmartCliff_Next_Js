"use client";
import React from "react";
const Banner2 = ({ title, description, imageUrl }) => {
  return (
    <div
      style={{
        position: "relative",
        height: "220px",
        width: "100%",
        background: `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('${imageUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        padding: "20px",
        animation: "zoomInOut 8s infinite alternate ease-in-out",
      }}
    >
      <div
        style={{
          maxWidth: "60%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: "35px",
            fontWeight: "lighter",
            // fontStyle: 'italic !important',
            fontFamily: "'Dancing Script', cursive !important",
            color: "#F3CA52",
            marginBottom: "8px",
            animation: "bounceIn 2s infinite ease-in-out",
            textShadow: "0px 0px 10px rgba(255, 255, 255, 0.66)",
          }}
        >
          <span
            style={{
              // fontFamily: "'Clicker Script', cursive !important",
              fontFamily:
                "'Tangerine',Brush Script MT, Brush Script Std, cursive !important", // Ensure cursive applies

              fontSize: "120px",
              color: "#FFD700",
            }}
          >
            {title.charAt(0)}
          </span>
          <i>{title.slice(1)}</i>
        </h1>

        <p
          style={{
            fontSize: "20px",
            lineHeight: "1.5",
            animation: "fadeInOut 4s infinite ease-in-out",
          }}
        >
          {description}
        </p>
      </div>

      <style>
        {`
          @keyframes bounceIn {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
 
          @keyframes fadeInOut {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
 
          @keyframes zoomInOut {
            0%, 100% { background-size: 100%; }
            50% { background-size: 105%; }
          }
        `}
      </style>
    </div>
  );
};

export default Banner2;
