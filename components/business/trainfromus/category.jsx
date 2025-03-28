"use client";

import { fetchWCYHires } from "@/redux/slices/bussiness/whyCanYou/whyCanYou";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function HiringCategories() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dispatch = useDispatch();
  const { wcyHires, loading, error } = useSelector((state) => state.wcyHire);

  useEffect(() => {
    dispatch(fetchWCYHires());
  }, [dispatch]);

  const hireFromUsData = wcyHires.filter(
    (works) => works.type === "trainfromus"
  );

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <div
      style={{
        backgroundColor: "#F8FAFC",
        padding: isMobile ? "40px 5%" : "60px 5%",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "space-between",
        textAlign: isMobile ? "center" : "left",
      }}
    >
      {/* Left Section - Text */}
      <div style={{ flex: 1, paddingRight: isMobile ? "0px" : "40px" }}>
        {hireFromUsData.map((elm, i) => (
          <div key={i}>
            {" "}
            {/* Wrap in a div to avoid syntax error */}
            <h2
              style={{
                fontSize: isMobile ? "28px" : "34px",
                fontWeight: "bold",
                color: "#334155",
              }}
            >
              {" "}
              {elm.title}
            </h2>
            <p
              style={{
                fontSize: isMobile ? "16px" : "18px",
                marginBottom: "20px",
                color: "#475569",
              }}
            >
              {" "}
              {elm.description}
            </p>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "15px" : "25px",
          }}
        >
          {hireFromUsData.length > 0 ? (
            hireFromUsData[0].wcyDefinition.map((category, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "center" : "flex-start",
                  gap: "12px",
                }}
              >
                <span style={{ fontSize: "30px", color: "#FACC15" }}>
                  <Image
                    width={50}
                    height={50}
                    src={category.icon}
                    alt="icon"
                  />
                </span>
                <div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {category.title}
                  </h3>
                  <p style={{ fontSize: "16px", color: "#64748B" }}>
                    {category.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No hiring categories available.</p>
          )}
        </div>
      </div>

      {/* Right Section - Image */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          marginTop: isMobile ? "20px" : "0px",
        }}
      >
        {hireFromUsData.length > 0 && (
          <Image
            src={hireFromUsData[0].image} // Use the main image from the first hireFromUs data
            alt="Hiring Process"
            width={isMobile ? 300 : 450} // Adjust for mobile
            height={isMobile ? 300 : 450}
            style={{ borderRadius: "10px" }}
          />
        )}
      </div>
    </div>
  );
}
