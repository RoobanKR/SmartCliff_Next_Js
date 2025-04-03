"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import HirefromusAddForm from "../HirefromusAddForm";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import Trainfromus from "../trainfromus";

export default function HeroSection({ scrollToSection }) {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        textAlign: isMobile ? "center" : "left",
        color: "#F3F4F6",
        padding: isMobile ? "20px 5%" : "40px 5%",
        backgroundColor: "#0A192F",
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/assets/img/home-1/hero/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2,
          zIndex: 0,
        }}
      />

      {/* Content Section */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: isMobile ? "100%" : "50%",
        }}
      >
        <h1
          style={{
            fontSize: isMobile ? "28px" : "42px",
            fontWeight: "bold",
            marginBottom: "15px",
            color: "#FACC15",
          }}
        >
          Train Top Talent Effortlessly with Train From Us
        </h1>
        <p
          style={{
            fontSize: isMobile ? "16px" : "18px",
            opacity: 0.9,
            marginBottom: "20px",
            color: "#E0E7FF",
          }}
        >
          Empower your workforce with industry-relevant skills through our
          expert-led training programs. We offer comprehensive, hands-on
          training designed to bridge the gap between academic learning and
          real-world industry demands.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <button
            style={{
              backgroundColor: "transparent",
              color: "#FACC15",
              padding: "12px 24px",
              fontSize: "16px",
              fontWeight: "600",
              borderRadius: "8px",
              border: "2px solid #FACC15",
              cursor: "pointer",
              position: "relative",
              zIndex: "1051",
              width: "auto",
            }}
            onClick={() => {
              if (typeof scrollToSection === "function") {
                scrollToSection();
              } else {
                console.error(
                  "❌ scrollToSection is NOT a function!",
                  scrollToSection
                );
              }
            }}
          >
            Training Enquiry
          </button>{" "}
        </div>
        <AnimatePresence>
          {showModal && (
            <motion.div
              style={{
                position: "fixed",
                top: 40,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.75)",
                backdropFilter: "blur(5px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 100000,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Modal Box - Perfectly Centered */}
              <motion.div
                style={{
                  backgroundColor: "#ffffff",
                  padding: "20px 40px",
                  borderRadius: "20px",
                  width: "90%",
                  maxHeight: "80vh",
                  overflowY: "auto",
                  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.25)",
                  position: "relative",
                  zIndex: 10000,
                  margin: "auto", // Added for perfect centering
                }}
                initial={{ y: 50, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 50, opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Modal Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "25px",
                    paddingBottom: "15px",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "40px",
                      fontWeight: "normal",
                      fontFamily: "'Dancing Script', cursive",
                      color: "#000", // Black color for text
                      margin: "0",
                      display: "inline-block",
                      position: "relative",
                      padding: "0 0 10px 0 ",
                    }}
                  >
                    Training Enquiry Form
                    <span
                      style={{
                        content: '""',
                        position: "absolute",
                        left: "0",
                        bottom: "0",
                        height: "5px",
                        width: "55px",
                        backgroundColor: "black",
                      }}
                    ></span>
                    {/* Bottom Thin Line */}
                    <span
                      style={{
                        content: '""',
                        position: "absolute",
                        left: "0",
                        bottom: "2px",
                        height: "1px",
                        width: "95%",
                        maxWidth: "255px",
                        backgroundColor: "black",
                      }}
                    ></span>
                  </h1>

                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "8px",
                      padding: "4px 6px",
                      border: "none",
                      backgroundColor: "#b91616",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      color: "white",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <FaTimes />
                  </button>
                </div>

                {/* Modal Content */}
                <div
                  style={{
                    maxHeight: "80vh",
                    overflowY: "auto",
                    scrollbarWidth: "thin", // For Firefox
                    scrollbarColor: "#F2775Ergb(255, 0, 0)",
                  }}
                >
                  <Trainfromus />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right-Side Image (Hidden in Mobile) */}
      {!isMobile && (
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "40%",
          }}
        >
          <img
            src="/assets/img/about-1/hfu.png"
            alt="Business Professionals"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
            }}
          />
        </div>
      )}
    </div>
  );
}
