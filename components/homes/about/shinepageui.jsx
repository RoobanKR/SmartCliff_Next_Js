"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllShine } from "@/redux/slices/shine/shine";

export default function ShineUI() {
  const dispatch = useDispatch();
  const { shines, loading, error } = useSelector((state) => state.shine);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    dispatch(getAllShine());

    // Handle screen size changes
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  // Function to render the colored "SHINE" title dynamically
  const renderDynamicShineTitle = (title) => {
    const colors = ["#FF5733", "#026e16", "#1976d2", "#fe5e00", "#ff9005"]; // Colors for S, H, I, N, E

    return [...title].map((letter, index) => (
      <span key={index} style={{ color: colors[index], fontWeight: "bold" }}>
        {letter}
      </span>
    ));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      {/* Left Section - Heading & Illustration */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: isMobile ? "20px 0" : "0 40px",
        }}
      >
        {loading && <p>Loading shines...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {shines.length > 0 ? (
          shines.map((shine) => (
            <div key={shine._id} style={{ width: "100%" }}>
              <h1 style={{ fontSize: "28px", marginBottom: "15px" }}>
                {renderDynamicShineTitle(shine.title.split(" ")[0])} Framework –
                Our Guiding Philosophy
              </h1>
              <p>{shine.description}</p>
              <div style={{ paddingTop: "30px" }}>
                <img
                  src={shine.image}
                  alt="Shine Illustration"
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                    height: "auto",
                    borderRadius: "8px",
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <p>No shines available.</p>
        )}
      </div>

      {/* Right Section - Shine Definitions */}
      <div
        style={{
          flex: 1,
          paddingLeft: isMobile ? "0" : "40px",
          marginTop: isMobile ? "20px" : "30px",
          width: isMobile ? "100%" : "auto",
        }}
      >
        {shines.length > 0 && shines[0].shineDefinition.length > 0 ? (
          shines[0].shineDefinition.map((definition) => (
            <div
              key={definition._id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
                textAlign: isMobile ? "center" : "left",
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <img
                src={definition.icon}
                alt={definition.title}
                style={{
                  marginRight: isMobile ? "0" : "10px",
                  marginBottom: isMobile ? "10px" : "70px",
                  width: "30px",
                  height: "30px",
                }}
              />
              <div>
                <h5
                  style={{
                    fontWeight: "bold",
                    margin: "0",
                    color: definition.color,
                  }}
                >
                  {definition.title}
                </h5>
                <p style={{ margin: "5px 0", color: "#555", fontSize: "14px" }}>
                  {definition.description}
                </p>
                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid #ccc",
                    margin: "10px 0",
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <p>No shine definitions available.</p>
        )}
      </div>
    </div>
  );
}
