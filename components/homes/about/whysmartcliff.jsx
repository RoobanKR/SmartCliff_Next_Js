"use client";
import { learningPathSix } from "@/data/learningPaths";
import { getAllAboutUs } from "@/redux/slices/aboutUs/aboutUs";
import { getAllWCU } from "@/redux/slices/whyThis/whyThis";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function WhySmartcliff() {
  const dispatch = useDispatch();
  const all = useSelector((state) => state.wcu.wcuItems);
  useEffect(() => {
    dispatch(getAllWCU());
  }, [dispatch]);

  return (
    <section
      className="layout-pt-sm layout-pb-md"
      style={{ background: "#f2f2f2" }}
    >
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">
                Why <span style={{ color: "#f27757" }}>SmartCliff</span>
                {""} ?
              </h2>

              <p className="sectionTitle__text ">
                We empower individuals, institutions, and organizations with
                innovative, practical, and results-driven training for success.
              </p>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 justify-between pt-20 lg:pt-30">
          {all.map((elm, i) => (
            <div key={i} className="col-lg-4 col-md-6">
              <div
                className="coursesCard -type-3 px-0 text-center"
                style={{
                  background: "white",
                  padding: "24px",
                  borderRadius: "16px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Soft shadow
                  transition: "all 0.3s ease-in-out",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  overflow: "hidden",
                  minHeight: "320px", // Ensures all cards have the same height
                  justifyContent: "space-between",
                  border: "3px solid transparent", // Gradient border effect
                  backgroundImage:
                    "linear-gradient(white, white), linear-gradient(135deg, #ffab91 , #ffab91)", // Pink to gold border
                  backgroundClip: "padding-box, border-box",
                  backgroundOrigin: "padding-box, border-box",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0px 10px 20px rgba(0, 0, 0, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0px 4px 12px rgba(0, 0, 0, 0.1)";
                }}
              >
                {/* Floating Decoration */}
                <div
                  style={{
                    position: "absolute",
                    top: "-30px",
                    right: "-30px",
                    width: "70px",
                    height: "70px",
                    background: "#ffab91", // Light pink decoration
                    borderRadius: "50%",
                  }}
                ></div>

                {/* Icon */}
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    background: "#F5F5F5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "12px",
                    marginBottom: "16px",
                    border: "2px solid #ffab91", // Gold border for the icon
                  }}
                >
                  <img
                    src={elm.icon}
                    alt={elm.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>

                {/* Content */}
                <div
                  className="coursesCard__content"
                  style={{
                    flexGrow: 1, // Expands content to keep consistent height
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <h5
                    className="coursesCard__title"
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#222",
                      marginBottom: "10px",
                    }}
                  >
                    {elm.title}
                  </h5>
                  <p
                    className="coursesCard__text"
                    style={{
                      fontSize: "16px",
                      color: "#555",
                      paddingLeft: "24px",
                      paddingRight: "24px",
                      textAlign: "justify",
                      fontWeight: "500",
                      flexGrow: 1,
                    }}
                  >
                    {elm.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
