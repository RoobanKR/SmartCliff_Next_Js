"use client";
import { getAllOutcomes } from "@/redux/slices/mca/outcomes/Outcomes";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Static colors for the index backgrounds
const bgColors = [
  "#0074E4",
  "#FF5A5F",
  "#28A745",
  "#FF9800",
  "#9C27B0",
  "#6C757D",
  "#DC3545",
  "#17A2B8",
  "#FFC107",
  "#20C997"
];

const TestimonialCard = ({ index, title, bgColor, isMobile }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      padding: isMobile ? "10px" : "15px",
      borderBottom: "1px solid #ddd",
      gap: isMobile ? "10px" : "15px",
    }}
  >
    {/* Index Number with Background */}
    <div
      style={{
        width: isMobile ? "30px" : "40px",
        height: isMobile ? "30px" : "40px",
        backgroundColor: bgColor,
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: isMobile ? "16px" : "24px",
        fontWeight: "bold",
        color: "#fff",
        flexShrink: 0
      }}
    >
      {String(index + 1).padStart(2, "0")}
    </div>

    <div style={{ flex: 1 }}>
      <p
        style={{
          color: "#333",
          fontSize: isMobile ? "14px" : "16px",
          fontWeight: "bold",
          margin: 0
        }}
      >
        {title}
      </p>
    </div>
  </div>
);

const RightSideImage = ({ isMobile }) => (
  <div
    style={{
      flex: 1,
      minHeight: isMobile ? "200px" : "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "10px",
      overflow: "hidden",
      marginTop: isMobile ? "20px" : 0,
      width: isMobile ? "100%" : "auto"
    }}
  >
    <img
      src="/assets/img/about-1/bulb.png"
      alt="Program outcomes"
      style={{
        width: isMobile ? "80%" : "60%",
        borderRadius: "10px",
        maxWidth: "400px"
      }}
    />
  </div>
);

const TestimonialsSection = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const programId = params.id;
  const outcomes = useSelector((state) => state.outcomes.outcomes);
  const filteredOutcomes =
    outcomes?.filter(
      (partner) => partner.degree_program._id === programId
    ) || [];



  useEffect(() => {
    dispatch(getAllOutcomes());
  }, [dispatch]);

  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 768; // Changed to 768px breakpoint for tablets

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: isMobile ? "15px" : "20px",
      }}
    >
      {/* About College Section */}
      <div style={{
        backgroundColor: "#f8f9fa",
        padding: isMobile ? "10px" : "20px",
        width: "100%",
        marginBottom: "30px",
        borderBottom: "1px solid #e0e0e0"
      }}>
        <div className="program-subtitle">
          <span className="subtitle-line"></span>
          <span className="subtitle-text">Program Outcome</span>
          <span className="subtitle-line"></span>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "15px" : "20px",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <div style={{
          flex: 1,
          minWidth: isMobile ? "100%" : "350px",
          padding: isMobile ? "0" : "0 10px"
        }}>
          <h6 style={{
            color: "#505050",
            marginBottom: "20px",
            fontSize: isMobile ? "14px" : "16px",
            fontStyle: "italic",
            textAlign: isMobile ? "center" : "left"
          }}>
            Our program equips students with industry-relevant skills and
            guaranteed placement opportunities to ensure a successful career
          </h6>

          {/* Map through the filtered outcomes */}
          {filteredOutcomes.map((outcome, index) => (
            <TestimonialCard
              key={outcome._id}
              index={index}
              title={outcome.title}
              bgColor={bgColors[index % bgColors.length]}
              isMobile={isMobile}
            />
          ))}
        </div>

        <RightSideImage isMobile={isMobile} />
      </div>
      <style jsx>{`
        .program-subtitle {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
        }

        .subtitle-line {
          height: 2px;
          width: ${isMobile ? "40px" : "100px"};
          background-color: #5b2c6f;
          opacity: 0.5;
        }

        .subtitle-text {
          font-size: ${isMobile ? "1.5rem" : "2.5rem"};
          margin: 0 15px;
          color: #5b2c6f;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-align: center;
        }

        @media (max-width: 480px) {
          .subtitle-text {
            font-size: 1.3rem;
          }
        }

        @media (min-width: 481px) and (max-width: 767px) {
          .subtitle-text {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
};

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Check if window is available (client-side)
    if (typeof window !== "undefined") {
      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

export default TestimonialsSection;