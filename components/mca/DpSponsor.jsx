import { fetchAllOurSponsors } from "@/redux/slices/degreeProgram/dpSponsor";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SponsorsSection() {
  const dispatch = useDispatch();
  const params = useParams();
  const programId = params.id;
  const { ourSponsors, loading, error } = useSelector(
    (state) => state.ourSponsors
  );

  const finalSponsor =
    ourSponsors?.filter(
      (partner) => partner.degree_program._id === programId
    ) || [];

  // Function to generate a unique gradient for each sponsor
  const generateGradient = (index) => {
    const gradients = [
      "linear-gradient(135deg, #6366f1, #8b5cf6)",
      "linear-gradient(135deg, #10b981, #059669)",
      "linear-gradient(135deg, #f59e0b, #d97706)",
      "linear-gradient(135deg, #ef4444, #dc2626)",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section
      style={{
        padding: "30px 40px",
        textAlign: "center",
        fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        borderRadius: "16px",
        margin: "40px auto",
        maxWidth: "1400px",
      }}
    >
      {/* Header with animation */}
      <div
        style={{
          marginBottom: "60px",
          position: "relative",
        }}
      >
        <h2
          style={{
            fontSize: "3rem",
            // margin: " 0 15px",
            color: "rgb(0, 0, 0)",
            fontWeight: "500",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Our Valued Sponsors
        </h2>
      </div>
      {/* Sponsor Cards - Improved Grid Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "30px",
          justifyContent: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {finalSponsor.map((sponsor, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              background: "white",
              borderRadius: "16px",
              padding: "30px 25px",
              textAlign: "left",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.8)",
              overflow: "hidden",
              transition: "transform 0.4s ease, box-shadow 0.4s ease",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow =
                "0 20px 40px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(0, 0, 0, 0.05)";
            }}
          >
            {/* Top Accent Bar */}
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "8px",
                background: generateGradient(index),
              }}
            ></div>

            {/* Card Content */}
            <div>
              {/* Header Section */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                  marginBottom: "25px",
                }}
              >
                {/* Logo Container */}
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "12px",
                    background: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
                    border: "1px solid rgba(229, 231, 235, 0.8)",
                    padding: "10px",
                    marginRight: "15px",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>

                {/* Name and Type */}
                <div>
                  <h4
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      color: "#1e293b",
                      marginBottom: "6px",
                    }}
                  >
                    {sponsor.name}
                  </h4>
                  <div
                    style={{
                      display: "inline-block",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "white",
                      background: generateGradient(index),
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {sponsor.category}
                  </div>
                </div>
              </div>

              {/* Sponsor Type */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                {/* <span
                  style={{
                    display: "inline-block",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: generateGradient(index),
                    marginRight: "10px",
                  }}
                ></span> */}
                <span
                  style={{
                    fontSize: "16px",
                    color: "#64748b",
                    fontWeight: "500",
                  }}
                >
                  {sponsor.type}
                </span>
              </div>
            </div>

            {/* Contributions Section */}
            <div>
              {/* <h5
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#1e293b",
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "18px",
                    height: "3px",
                    background: generateGradient(index),
                    marginRight: "8px",
                    borderRadius: "2px",
                  }}
                ></span>
                Key Contributions
              </h5> */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {sponsor.contributions.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(243, 244, 246, 0.7)",
                      padding: "12px 15px",
                      borderRadius: "10px",
                      fontSize: "14px",
                      color: "#4b5563",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "flex-start",
                      transition:
                        "transform 0.2s ease, background-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateX(5px)";
                      e.currentTarget.style.backgroundColor =
                        "rgba(243, 244, 246, 0.9)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateX(0)";
                      e.currentTarget.style.backgroundColor =
                        "rgba(243, 244, 246, 0.7)";
                    }}
                  >
                    {/* <span
                      style={{
                        display: "inline-block",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: generateGradient(index),
                        marginRight: "10px",
                        marginTop: "6px",
                      }}
                    ></span> */}
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
