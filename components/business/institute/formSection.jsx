"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import HirefromusAddForm from "../HirefromusAddForm";
import { useSelector } from "react-redux";
import Trainfromus from "../trainfromus";
import InstitutionAddForm from "../InstituteAddForm";

export default function FormSection() {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { availabilities, loading, error } = useSelector(
    (state) => state.currentAvailability
  );

  // console.log("availabilities", availabilities);

  return (
    <section
      className="layout-pt-sm layout-pb-sm"
      style={{ background: "#fff0ce" }}
    >
      <div className="container">
        <div className="row y-gap-20 justify-between items-center">
          <div className="col-xl-4 col-lg-5">
            <h2 className="text-30 lh-15 text-black">
              Accelerate Real Impact -
              <span className="" style={{ color: "#f2775e" }}>
                {" "}
                Institute
              </span>{" "}
            </h2>
          </div>

          <div className="col-auto">
            <button
              className="button px-30 h-50 -outline-dark-11 text-orange-1"
              style={{ color: "#f2775e" }}
              onClick={() => setShowModal(true)}
            >
              Start Learning Today
            </button>
          </div>
          <AnimatePresence>
            {showModal && (
              <motion.div
                style={{
                  position: "fixed",
                  top: 20,
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
                      Institute Enquiry Form
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
                    <InstitutionAddForm availabilities={availabilities} />                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
