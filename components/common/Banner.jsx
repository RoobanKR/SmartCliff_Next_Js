import React from "react";

const Banner = ({ title, description, imageUrl }) => {
  return (
    <>
      <div
        className="banner-container"
        style={{
          position: "relative",
          height: "220px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background:
            "linear-gradient(to right, #348fc7, rgba(255, 255, 255, 0.4))",
          padding: "40px",
          overflow: "hidden", // Ensures animation stays within the div
        }}
      >
        {/* Animated Circles */}
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>

        {/* Left: Text Section */}
        <div
          className="banner-text"
          style={{
            textAlign: "center",
            position: "relative",
            display: "inline-block",
            zIndex: 2,
          }}
        >
          <h1
            style={{
              position: "relative",
              padding: 0,
              margin: 0,
              fontFamily: '"Raleway", sans-serif',
              fontWeight: 300,
              fontSize: "40px",
              color: "#080808",
              transition: "all 0.4s ease",
              display: "inline-block",
            }}
          >
            {title}
            <span
              style={{
                display: "block",
                fontSize: "0.5em",
                lineHeight: "1.3",
              }}
            ></span>
            <span
              className="banner-description"
              style={{
                display: "block",
                lineHeight: "2em",
                paddingBottom: "15px",
                textTransform: "none",
                fontSize: "0.5em",
                fontWeight: "normal",
                fontStyle: "italic",
                fontFamily: '"Playfair Display", "Bookman", serif',
                color: "#fafafa",
                letterSpacing: "none",
              }}
            >
              {description}
            </span>

            {/* Decorative lines */}
            {/* Decorative lines */}
            <span
              className="decorative-line"
              style={{
                position: "absolute",
                left: "50%",
                bottom: 0,
                width: "135px", // Replace with CSS for responsiveness
                height: "2px",
                backgroundColor: "#ccc",
                transform: "translateX(-50%)", // Centering
              }}
            ></span>
            <span
              className="decorative-highlight"
              style={{
                position: "absolute",
                left: "50%",
                bottom: "-3px",
                width: "50px", // Replace with CSS for responsiveness
                height: "9px",
                backgroundColor: "#FFF6DA",
                transform: "translateX(-50%)", // Centering
              }}
            ></span>
          </h1>
        </div>

        {/* Right: Image Section */}
        <div
          className="banner-image"
          style={{
            flex: 1,
            height: "200px",
            maxWidth: "30%",
            backgroundImage: `url('${imageUrl}')`,
            backgroundSize: "contain",
            backgroundPosition: "right center",
            backgroundRepeat: "no-repeat",
            position: "relative", // Ensures image is above animation
            zIndex: 2,
          }}
        ></div>
      </div>

      <style>
        {`
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 1;
  }

  .circles li {
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    animation: animate 25s linear infinite;
    bottom: -150px;
  }

  .circles li:nth-child(1) { left: 25%; width: 80px; height: 80px; animation-delay: 0s; }
  .circles li:nth-child(2) { left: 10%; width: 20px; height: 20px; animation-delay: 2s; animation-duration: 12s; }
  .circles li:nth-child(3) { left: 70%; width: 20px; height: 20px; animation-delay: 4s; }
  .circles li:nth-child(4) { left: 40%; width: 60px; height: 60px; animation-delay: 0s; animation-duration: 18s; }
  .circles li:nth-child(5) { left: 65%; width: 20px; height: 20px; animation-delay: 0s; }
  .circles li:nth-child(6) { left: 75%; width: 110px; height: 110px; animation-delay: 3s; }
  .circles li:nth-child(7) { left: 35%; width: 150px; height: 150px; animation-delay: 7s; }
  .circles li:nth-child(8) { left: 50%; width: 25px; height: 25px; animation-delay: 15s; animation-duration: 45s; }
  .circles li:nth-child(9) { left: 20%; width: 15px; height: 15px; animation-delay: 2s; animation-duration: 35s; }
  .circles li:nth-child(10) { left: 85%; width: 150px; height: 150px; animation-delay: 0s; animation-duration: 11s; }

  @keyframes animate {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
      border-radius: 0;
    }
    100% {
      transform: translateY(-1000px) rotate(720deg);
      opacity: 0;
      border-radius: 50%;
    }
  }

  @media (max-width: 480px) {
  .decorative-line {
    width: 40vw !important; /* Adjust width relative to screen size */
    max-width: 100px; /* Prevent it from becoming too large */
  }

  .decorative-highlight {
    width: 15vw !important; /* Adjust width relative to screen size */
    max-width: 34px; /* Prevent it from becoming too large */
  }
}


  /* Improved mobile responsiveness */
  @media (max-width: 768px) {
    .banner-container {
      flex-direction: column;
      height: auto !important;
      padding: 20px !important;
      justify-content: center !important;
      background: #348fc7 !important;
    }
    
    .banner-text {
      margin-bottom: 20px;
      width: 100%;
    }
    
    .banner-text h1 {
      font-size: 28px !important;
    }
    
    .banner-description {
      font-size: 0.5em !important;
      line-height: 1.5em !important;
    }
    
    .banner-line-long {
      width: 100px !important;
    }
    
    .banner-line-short {
      width: 40px !important;
    }
    
    .banner-image {
      max-width: 80% !important;
      height: 150px !important;
      background-position: center !important;
      margin: 0 auto;
    }
  }

  /* Small mobile screens */
  @media (max-width: 480px) {
    .banner-container {
      padding: 15px !important;
    }
    
    .banner-text h1 {
      font-size: 22px !important;
    }
    
    .banner-description {
      font-size: 0.45em !important;
      padding-bottom: 10px !important;
    }
    
    .banner-line-long {
      width: 80px !important;
    }
    
    .banner-line-short {
      width: 30px !important;
      height: 6px !important;
    }
    
    .banner-image {
      height: 120px !important;
      max-width: 90% !important;
    }
  }
`}
      </style>
    </>
  );
};

export default Banner;
