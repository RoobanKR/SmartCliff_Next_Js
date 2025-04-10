import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroUIFour() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

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

  // Handle responsive detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024); // Adding tablet breakpoint at 1024px
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: isTablet ? "column" : "row", // Use isTablet instead of isMobile
        alignItems: "center",
        justifyContent: isTablet ? "center" : "space-between", // Use isTablet instead of isMobile
        padding: isTablet ? "30px 20px" : "60px 80px", // Use isTablet instead of isMobile
        borderRadius: "15px",
        marginTop: "3%",
        position: "relative",
      }}
    >
      {/* Background Overlay for Opacity Effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "url('/assets/img/about-1/bckimg13.jpg') no-repeat center center/cover",
          opacity: 0.5,
          zIndex: -1,
        }}
      ></div>

      {/* Left Side - Bigger Images - Hidden on Tablet and Mobile */}
      {!isTablet && ( // Hide on tablet and mobile instead of just mobile
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            flex: 1,
          }}
        >
          {/* Bigger Image Card */}
          <div
            style={{
              position: "relative",
              width: "300px",
              height: "450px",
              backgroundColor: "#fff",
              borderRadius: "20px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "15px",
              color: "#000",
            }}
          >
            <img
              src="/assets/img/homeing2.png"
              alt="Digital Fashion"
              style={{ width: "100%", height: "87%", objectFit: "cover" }}
            />

            <div
              style={{ fontSize: "15px", fontWeight: "900", marginTop: "auto" }}
            >
              SHAPE YOUR <br /> FUTURE WITH SMARTCLIFF
            </div>
          </div>

          {/* Award Card + Bigger 3D Sphere */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Bigger Award Card */}
            <div
              style={{
                width: "200px",
                height: "300px",
                backgroundColor: "#90E0BC",
                borderRadius: "20px",
                padding: "25px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  marginBottom: "10px",
                }}
              >
                BEGIN CAREER AT SMARTCLIFF
              </p>
              <Image
                src="/assets/img/about/img1.svg"
                alt="Award Badge"
                width={100}
                height={100}
              />
            </div>

            {/* Bigger 3D Sphere */}
            <div
              style={{
                width: "130px",
                height: "130px",
                backgroundColor: "#fff",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 4px 15px rgba(0,0,0,0.15)",
                position: "absolute",
                bottom: "-55px",
              }}
            >
              <img
                src="https://th.bing.com/th/id/OIP.yFgZerKM6keOrX7srHy6EgHaHa?pid=ImgDet&w=178&h=178&c=7&dpr=1.5"
                alt="Digital Fashion"
                style={{ width: "60%", height: "60%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Right Side - Text & Button Section - Always Visible */}
      <div
        style={{
          textAlign: isTablet ? "center" : "left", // Use isTablet instead of isMobile
          width: "100%",
          maxWidth: "600px",
          flex: isTablet ? "none" : 1, // Use isTablet instead of isMobile
          paddingTop: isTablet ? "90px" : "0px", // Use isTablet instead of isMobile
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? "32px" : "42px", // Keep isMobile for font size
            fontWeight: "800",
            color: "#000",
            marginBottom: "20px",
          }}
        >
          <span style={{ color: "#f27757", fontWeight: "bold" }}>
            SmartCliff
          </span>{" "}
          <br /> Where Learning Meets Success!
        </h2>

        <p
          style={{
            fontSize: isMobile ? "18px" : "20px", // Keep isMobile for font size
            color: "#333",
            marginBottom: "25px",
          }}
        >
          At SmartCliff, we redefine learning with expert-led training programs,
          and cutting-edge technology solutions.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: isTablet ? "center" : "flex-start", // Use isTablet instead of isMobile
            gap: "15px",
          }}
        >
          <Link href="/aboutUs" passHref>
            <button
              style={{
                backgroundColor: "#000",
                color: "#fff",
                fontSize: isMobile ? "16px" : "18px", // Keep isMobile for font size
                fontWeight: "600",
                padding: isMobile ? "8px 16px" : "10px 20px", // Keep isMobile for padding
                borderRadius: "50px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: isMobile ? "180px" : "200px", // Keep isMobile for width
                gap: "10px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.backgroundColor = "#333";
                e.currentTarget.style.boxShadow =
                  "0px 6px 12px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.backgroundColor = "#000";
                e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0,0,0,0.3)";
              }}
            >
              Learn More
              <div
                style={{
                  width: isMobile ? "36px" : "40px", // Keep isMobile for size
                  height: isMobile ? "36px" : "40px", // Keep isMobile for size
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
                  fontSize: isMobile ? "18px" : "20px", // Keep isMobile for font size
                  transition: "all 0.3s ease",
                  color: "#000",
                }}
              >
                →
              </div>
            </button>
          </Link>

          <Image
            src="/assets/img/about/img3.svg"
            alt="Texture"
            width={50}
            height={50}
          />
        </div>
      </div>
    </section>
  );
}