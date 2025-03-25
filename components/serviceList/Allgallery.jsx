"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGallery } from "@/redux/slices/gallery/gallery";

export default function AllGalleryList() {
  const [currentYear, setCurrentYear] = useState("All Years");
  const dispatch = useDispatch();
  const gallery = useSelector((state) => state.gallery.gallery);

  // Extract unique years from gallery data
  const availableYears = [...new Set(gallery.map((item) => item.year))];

  // Filter gallery items based on selected year
  const filteredGallery =
    currentYear === "All Years"
      ? gallery
      : gallery.filter((item) => item.year === currentYear);

  useEffect(() => {
    dispatch(getAllGallery());
  }, [dispatch]);

  return (
    <div style={{ padding: "20px", marginTop: "70px" }}>
      {/* Header */}
      <h1
        style={{
          textAlign: "center",
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        All Galleries
      </h1>

      {/* Year Filter Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <button
          style={{
            padding: "8px 15px",
            borderRadius: "8px",
            border: "none",
            backgroundColor:
              currentYear === "All Years" ? "#5B2C6F" : "#e0e0e0",
            color: currentYear === "All Years" ? "#fff" : "#333",
            cursor: "pointer",
            transition: "0.3s",
            fontWeight: "bold",
          }}
          onClick={() => setCurrentYear("All Years")}
        >
          All Years
        </button>
        {availableYears
          .sort((a, b) => b - a)
          .map((year) => (
            <button
              key={year}
              style={{
                padding: "8px 15px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: currentYear === year ? "#5B2C6F" : "#e0e0e0",
                color: currentYear === year ? "#fff" : "#333",
                cursor: "pointer",
                transition: "0.3s",
                fontWeight: "bold",
              }}
              onClick={() => setCurrentYear(year)}
            >
              {year}
            </button>
          ))}
      </div>

      {/* Gallery Grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          padding: "20px",
        }}
      >
        {filteredGallery.length > 0 ? (
          filteredGallery.map((elm, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                width: "320px",
                textAlign: "center",
                transition: "all 0.3s ease-in-out",
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0px 8px 16px rgba(0, 0, 0, 0.2)";
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0px 4px 8px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Image */}
              <div
                style={{
                  overflow: "hidden",
                  borderRadius: "12px 12px 0 0",
                  height: "200px",
                }}
              >
                <img
                  src={elm.image}
                  alt={elm.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease-in-out",
                  }}
                  onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
                  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                />
              </div>

              {/* Content */}
              <div style={{ padding: "15px" }}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#333",
                    marginBottom: "8px",
                  }}
                >
                  {elm.name}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    lineHeight: "1.5",
                    marginBottom: "12px",
                  }}
                >
                  {elm.description}
                </p>

                {/* Date Tag */}
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#5B2C6F",
                    backgroundColor: "#F5F0FF",
                    display: "inline-block",
                    padding: "6px 12px",
                    borderRadius: "6px",
                  }}
                >
                  {elm.month} {elm.year}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", fontSize: "16px", color: "#777" }}>
            No gallery items available.
          </div>
        )}
      </div>
    </div>
  );
}
