"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import CareerEnquiryForm from "./careerForm";
import { CircularProgress } from "@mui/material";
import { fetchAllCareers } from "@/redux/slices/career/career";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
 
 
export default function CareerSlideOne() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { careers, loading, error } = useSelector((state) => state.career);
 
  useEffect(() => {
    dispatch(fetchAllCareers());
  }, [dispatch]);
 
  const toggleModal = () => setIsOpen(!isOpen);
 
  if (loading) {
    return <CircularProgress />;
  }
 
  const careerData = careers.length > 0 ? careers[0] : null;
 
  const renderTitle = (title) => {
    if (!title) return null;
 
    const parts = title.split(/(Courses)/);
 
    return (
      <h3 className="text-30 md:text-30 lh-11">
        {parts.map((part, index) =>
          part === "Courses" ? (
            <span key={index} style={{ color: "#f07057" }}>
              Courses
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </h3>
    );
  };
 
  return (
    <section className="layout-pt-xs" style={{ marginTop: "20px" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-12 mb-2">
            {careerData && (
              <div className="composition -type-4">
                <Image
                  style={{ width: "100%", height: "auto" }}
                  ratio
                  src={careerData.image}
                  alt="image"
                  width={500}
                  height={500}
                />
              </div>
            )}
          </div>
 
          <div className="col-lg-7 col-md-12">
            {careerData && (
              <>
                {renderTitle(careerData.title)}
 
                <p className="mt-3" style={{ textAlign: "justify" }}>
                  {careerData.description}
                </p>
 
                <p
                  className="mt-4"
                  style={{ fontSize: "24px", fontWeight: "bold" }}
                >
                  {careerData.subTitle}
                </p>
 
                <p className="mt-2" style={{ textAlign: "justify" }}>
                  {careerData.subDescription
                    .split(/(Join us|Join Us|JOIN US)/i)
                    .map((part, index) => (
                      <React.Fragment key={index}>
                        {part.match(/Join us|Join Us|JOIN US/i) ? (
                          <span
                            onClick={toggleModal}
                            style={{
                              fontWeight: "bold",
                              cursor: "pointer",
                              color: "#f07057",
                            }}
                          >
                            {part}
                          </span>
                        ) : (
                          part
                        )}
                      </React.Fragment>
                    ))}
                </p>
              </>
            )}
            {/* {isOpen && <CareerEnquiryForm closeModal={toggleModal} />} */}
            {isOpen && (
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
                  overflowY: "hidden",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  style={{
                    backgroundColor: "rgb(255, 255, 255)",
                    padding: "20px 30px",
                    borderRadius: "20px",
                    width: "500px",
                    height: "95%",
                    position: "relative",
                    zIndex: 10000,
                    display: "flex",
                    flexDirection: "column",
                  }}
                  initial={{ y: 50, opacity: 0, scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 50, opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
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
                      Career Enquiry Form
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
                      onClick={toggleModal}
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
                  <div
                    style={{
                      flexGrow: 1,
                      overflowY: "auto",
                      paddingRight: "10px",
                      scrollbarWidth: "thin",
                    }}
                  >
                    <CareerEnquiryForm closeModal={toggleModal} />
                  </div>
                </motion.div>
              </motion.div>
            )
            }
          </div>
        </div>
      </div>
    </section>
  );
}
 
 