"use client";
 
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import HirefromusAddForm from "../HirefromusAddForm";
import { useSelector } from "react-redux";
import Trainfromus from "../trainfromus";
import TrainFromUsAddForm from "../TrainfromusAddForm";
 
export default function FormSection() {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

   const { learningJourneys, loading, error } = useSelector(
     (state) => state.learningJourney
   );
   const hireFromUsData = learningJourneys.filter(
    (journey) => journey.type === "trainfromus"
  );
  console.log("hireFromUsData", hireFromUsData);

 
 
  return (
    <section
      className="layout-pt-sm layout-pb-sm"
      style={{ background: "#fff0ce" }}
    >
      <div className="container">
        <div className="row y-gap-20 justify-between items-center">
          <div className="col-xl-8 col-lg-5">
          <h2 className="text-0 text-black">
          Equip your workforce with the skills they need to excel -  {" "}
                            <span style={{ color: "#f2775e" }}>
                               
                            partner with us today!                             </span>{" "}
                        </h2>
          </div>
 
          <div className="col-auto">
            <button
              className="button px-30 h-50 -outline-dark-11 text-orange-1"
              style={{ color: "#f2775e" }}
              onClick={() => setShowModal(true)}
            >
              Start Training Today
            </button>
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
                      Training Enquiry Form
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
                    <TrainFromUsAddForm hireFromUsData={hireFromUsData} setShowModal={setShowModal} />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
 
 