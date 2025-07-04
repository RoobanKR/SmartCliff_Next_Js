"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import InstitutionAddForm from "../InstituteAddForm";
import { useSelector } from "react-redux";

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
  const { learningJourneys } = useSelector(
    (state) => state.learningJourney
  );
 
  // Filter only hirefromus type data
  const hireFromUsData = learningJourneys.filter(
    (journey) => journey.type === "institute"
  );

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
          backgroundImage: "url('/assets/img/home-1/hero/bg.webp')",
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
          Empowering Institutions, Enabling Careers
        </h1>
        <p
          style={{
            fontSize: isMobile ? "16px" : "18px",
            opacity: 0.9,
            marginBottom: "20px",
            color: "#E0E7FF",
          }}
        >
          A degree alone isn't enough in today's job market. We help educational
          institutions equip students with industry-aligned training, ensuring
          they graduate as skilled professionals ready for the workforce.
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
              zIndex: "3",
              width: "auto",
            }}
            onClick={() => setShowModal(true)}
          >
            Let's Collaborate!
          </button>{" "}
        </div>
        
  <AnimatePresence>
            {showModal && (
              <motion.div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.75)",
                  backdropFilter: "blur(5px)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 101,
                  overflowY: "hidden",
 
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Modal Box - Perfectly Centered */}
                <motion.div
                  style={{
                    backgroundColor: "rgb(255, 255, 255)",
                    padding: "20px 30px",
                    borderRadius: "20px",
                    width: "500px",
                    height: "100%",
                    position: "relative",
                    zIndex: 10000,
                    display: "flex",
                    flexDirection: "column", // Ensure proper layout
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
                      marginBottom: "15px",
                      position: "sticky",
                      top: "0",
                      backgroundColor: "white",
                      zIndex: 100,
                      paddingBottom: "10px",
                    }}
                  >
                    <h1
                      style={{
                        fontSize: "30px",
                        fontWeight: "normal",
                        fontFamily: "'Dancing Script', cursive",
                        color: "#000",
                        margin: "0",
                        position: "relative",
                        padding: "0 0 10px 0",
                      }}
                    >
                       Let’s Collaborate!
                      <span
                        style={{
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
                      flexGrow: 1, // Takes remaining height
                      overflowY: "auto",
                      paddingRight: "10px",
                      scrollbarWidth: "thin",
                    }}
                  >
                    <InstitutionAddForm  setShowModal={setShowModal} hireFromUsData={hireFromUsData}/>
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
            src="/assets/img/about-1/hfu.webp"
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