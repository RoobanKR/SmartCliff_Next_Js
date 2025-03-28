"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const HeroUITwo = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const isMobile = windowSize.width <= 768;
  // const isTablet = windowSize.width <= 1024;

  const isMobile = windowSize.width <= 640;
  const isTablet = windowSize.width > 640 && windowSize.width <= 1024;

  // Responsive scaling factor (0.5 for mobile, 0.7 for tablet, 1 for desktop)
  const scaleFactor = isMobile ? 0.5 : isTablet ? 0.7 : 1;

  const containerStyles = {
    position: "absolute",
    background: "rgba(152, 148, 137, 0.32)",
    padding: `${10 * scaleFactor}px`,
    borderRadius: `${15 * scaleFactor}px`,
    display: "flex",
    alignItems: "center",
    width: `${300 * scaleFactor}px`,
    height: `${100 * scaleFactor}px`,
    animation: "float 3s infinite alternate ease-in-out",
    fontSize: `${14 * scaleFactor}px`,
    zIndex: 1,
  };

  const containers = [
    {
      text: "S - Skilling for Success",
      subtext: "Learn industry-relevant skills.",
      imgSrc: "/assets/img/home-1/newhero/Sblue2.png",
      style: {
        top: `${25 * (isMobile ? 0.6 : 1)}%`,
        left: `${5 * (isMobile ? 0.8 : 1)}%`,
        animationDelay: "0.2s",
      },
    },
    {
      text: "H - Handholding for Growth",
      subtext: "Support and mentorship.",
      imgSrc: "/assets/img/home-1/newhero/Horange2.png",
      style: {
        top: `${50 * (isMobile ? 0.8 : 1)}%`,
        left: `${15 * (isMobile ? 0.2 : 1)}%`,
        animationDelay: "0.4s",
      },
    },
    {
      text: "I - Industry Readiness",
      subtext: "Training for real-world jobs.",
      imgSrc: "/assets/img/home-1/newhero/Igreen.png",
      style: {
        top: `${75 * (isMobile ? 0.8 : 1)}%`,
        right: `${40 * (isMobile ? 1.2 : 1)}%`,
        animationDelay: "0.6s",
      },
    },
    {
      text: "N - Nurturing Talent",
      subtext: "Personalized learning paths.",
      imgSrc: "/assets/img/home-1/newhero/Nyellow2.png",
      style: {
        top: `${50 * (isMobile ? 0.9 : 1)}%`,
        right: `${15 * (isMobile ? 0.7 : 1)}%`,
        animationDelay: "0.8s",
      },
    },
    {
      text: "E - Employability",
      subtext: "Career success guaranteed.",
      imgSrc: "/assets/img/home-1/newhero/Ered.png",
      style: {
        top: `${25 * (isMobile ? 0.8 : 1)}%`,
        right: `${5 * (isMobile ? 0.8 : 1)}%`,
        animationDelay: "1s",
      },
    },
  ];

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        background:
          "url('/assets/img/home-1/newhero/bckimg1.png') no-repeat center center/cover",
        height: "100vh",
        minHeight: "600px",
        fontFamily: "'Poppins', sans-serif",
        color: "#512e6e",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <header
        style={{
          position: "absolute",
          top: `${20 * scaleFactor}px`,
          left: 0,
          width: "96%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: `${20 * scaleFactor}px`,
          zIndex: 2,
        }}
      >
        <div>
          <Image
            src="/logo.png"
            alt="SHINE Logo"
            width={60 * scaleFactor}
            height={60 * scaleFactor}
            style={{ borderRadius: `${10 * scaleFactor}px` }}
          />
        </div>
        <div
          style={{
            fontSize: `${20 * scaleFactor}px`,
            fontWeight: "bold",
          }}
        >
          Career/Solutions
        </div>
      </header>

      {/* SHINE Title - Centered */}
      <div
        style={{
          paddingTop: "0px",
          zIndex: 2,
          transform: `scale(${scaleFactor})`,
          transformOrigin: "center",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontSize: "70px",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "30px",
            animation: "pulse 2s infinite alternate",
            margin: "40px 0",
            display: "inline-block", // Prevents transform scale from affecting layout
          }}
        >
          <span style={{ color: "#3b82f6" }}>S</span>
          <span style={{ color: "#f97316" }}>H</span>
          <span style={{ color: "#10b981" }}>I</span>
          <span style={{ color: "#facc15" }}>N</span>
          <span style={{ color: "#ef4444" }}>E</span>
        </h1>
      </div>

      {/* Floating Containers */}
      {containers.map((container, index) => (
        <div
          key={index}
          style={{
            ...containerStyles,
            ...container.style,
            backgroundColor:
              index === 0
                ? "#bfd7ff59"
                : index === 1
                  ? "#ffc49c91"
                  : index === 2
                    ? "#a8ffe296"
                    : index === 3
                      ? "#fff0b4b3"
                      : "#ffb6b69e",
            color: "#414141",
          }}
        >
          <Image
            src={container.imgSrc}
            alt={container.text}
            width={50 * scaleFactor}
            height={50 * scaleFactor}
            style={{
              borderRadius: "50%",
              marginRight: `${10 * scaleFactor}px`,
            }}
          />
          <p
            style={{
              fontSize: `${14 * scaleFactor}px`,
              textAlign: "left",
              lineHeight: `${1.5 * scaleFactor}rem`,
              margin: 0,
            }}
          >
            <strong>{container.text}</strong> <br />
            <span style={{ fontSize: `${12 * scaleFactor}px` }}>
              {container.subtext}
            </span>
          </p>
        </div>
      ))}

      {/* Floating Animation Keyframes */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(${-20 * scaleFactor}px);
          }
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(${1 + 0.1 * scaleFactor});
          }
        }
      `}</style>

      {/* Decorative Images */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          zIndex: 0,
          transform: `scale(${scaleFactor})`,
          transformOrigin: "bottom right",
        }}
      >
        <Image
          src="/assets/img/home-1/newhero/center.svg"
          alt="Bottom Corner"
          width={300}
          height={300}
          unoptimized
        />
      </div>

      <div
        style={{
          zIndex: 0,
          transform: `scale(${scaleFactor})`,
          transformOrigin: "center",
        }}
      >
        <Image
          src="/assets/img/home-1/newhero/left.svg"
          alt="Left Illustration"
          width={250}
          height={250}
          unoptimized
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: `${5 * scaleFactor}px`,
          zIndex: 0,
          transform: `scale(${scaleFactor})`,
          transformOrigin: "bottom left",
        }}
      >
        <Image
          src="/assets/img/home-1/newhero/right.svg"
          alt="Right Illustration"
          width={300}
          height={300}
          unoptimized
        />
      </div>
    </div>
  );
};

export default HeroUITwo;

