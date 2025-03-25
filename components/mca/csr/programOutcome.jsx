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

const TestimonialCard = ({ index, title, bgColor }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      padding: "15px",
      borderBottom: "1px solid #ddd",
      gap: "15px",
    }}
  >
    {/* Index Number with Background */}
    <div
      style={{
        width: "40px",
        height: "40px",
        backgroundColor: bgColor,
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        fontWeight: "bold",
        color: "#fff",
      }}
    >
      {String(index + 1).padStart(2, "0")}
    </div>

    <div style={{ flex: 1 }}>
      <p
        style={{ color: "#333", fontSize: "16px", fontWeight: "bold" }}
      >{title}</p>
    </div>
  </div>
);

const RightSideImage = () => (
  <div
    style={{
      flex: 1,
      minHeight: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "10px",
      overflow: "hidden",
    }}
  >
    <img
      src="/assets/img/about-1/bulb.png" // Replace with actual image URL
      alt="Right side"
      style={{ width: "60%", borderRadius: "10px" }}
    />
  </div>
);

const TestimonialsSection = () => {
  const dispatch = useDispatch();
  const outcomes = useSelector((state) => state.outcomes.outcomes);
  
  // Filter outcomes where college is null
  const filteredOutcomes = outcomes.filter((out) => out.college === null);
  
  useEffect(() => {
    dispatch(getAllOutcomes());
  }, [dispatch]);

  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 640;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: "20px",
      }}
    >
      {/* About College Section */}
      <div className="bg-gray-100 py-4 px-6 border-b mb-30">
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
          flexWrap: "wrap",
          gap: "20px",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <div style={{ flex: 1, minWidth: "350px" }}>
          <h6 style={{ color: "#505050", marginBottom: "20px" }}>
           <i> Our program equips students with industry-relevant skills and
            guaranteed placement opportunities to ensure a successful career</i>
          </h6>
          
          {/* Map through the filtered outcomes instead of static testimonials */}
          {filteredOutcomes.map((outcome, index) => (
            <TestimonialCard 
              key={outcome._id} 
              index={index} 
              title={outcome.title} 
              bgColor={bgColors[index % bgColors.length]} 
            />
          ))}
        </div>

        <RightSideImage />
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
          width: 100px;
          background-color: #5b2c6f;
          opacity: 0.5;
        }

        .subtitle-text {
          font-size: ${isMobile ? "1.8rem" : "2.5rem"};
          margin: 0 15px;
          color: #5b2c6f;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        @media (max-width: 640px) {
          .subtitle-line {
            width: 60px;
          }

          .subtitle-text {
            font-size: 1.5rem;
          }
        }

        @media (min-width: 641px) and (max-width: 1023px) {
          .subtitle-text {
            font-size: 2rem;
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