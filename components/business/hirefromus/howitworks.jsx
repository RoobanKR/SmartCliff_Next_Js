"use client";
 
import { fetchAllHowItWorks } from "@/redux/slices/bussiness/howItWorks/howItWorks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
 
export default function HowItWorks() {
  const dispatch = useDispatch();
  const { howItWorks, loading, error } = useSelector(
    (state) => state.howItWorks
  );
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
 
  useEffect(() => {
    dispatch(fetchAllHowItWorks());
  }, [dispatch]);
 
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
 
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
 
  const hireFromUsData = howItWorks.filter(
    (works) => works.type === "hirefromus"
  );
 
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
 
  return (
    <div
      style={{
        padding: isMobile ? "20px 15px" : "30px 5%",
        textAlign: "center",
        color: "#1E293B",
      }}
    >
      <h2 
        style={{ 
          fontSize: isMobile ? "26px" : "34px", 
          fontWeight: "bold", 
          color: "#334155" 
        }}
      >
        How It Works
      </h2>
      <p 
        style={{ 
          fontSize: isMobile ? "16px" : "18px", 
          marginBottom: isMobile ? "30px" : "40px", 
          color: "#475569",
          padding: isMobile ? "0 10px" : "0"
        }}
      >
        A simple and effective hiring process to get the best talent.
      </p>
 
      {hireFromUsData.length === 5 && !isMobile && !isTablet ? (
        <>
          {/* Desktop view with 5 items - 3 in first row, 2 in second */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "60px",
              marginBottom: "30px",
              flexWrap: isTablet ? "wrap" : "nowrap"
            }}
          >
            {hireFromUsData.slice(0, 3).map((step, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "25px",
                  borderRadius: "10px",
                  textAlign: "center",
                  border: "1px solid #CBD5E1",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
                  width: "280px",
                  position: "relative",
                  marginBottom: isTablet ? "20px" : "0"
                }}
              >
                <div
                  style={{
                    fontSize: "38px",
                    marginBottom: "15px",
                    color: "#FACC15",
                  }}
                >
                  <img width="50" height="50" src={step.image} alt="icon" />
                </div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#1E293B",
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: "16px", color: "#64748B" }}>
                  {step.description}
                </p>
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "15px",
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#94A3B8",
                  }}
                >
                  Step {index + 1}
                </span>
              </div>
            ))}
          </div>
 
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "30px",
            }}
          >
            {hireFromUsData.slice(3).map((step, index) => (
              <div
                key={index + 3}
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "25px",
                  borderRadius: "10px",
                  textAlign: "center",
                  border: "1px solid #CBD5E1",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
                  width: "280px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontSize: "38px",
                    marginBottom: "15px",
                    color: "#FACC15",
                  }}
                >
                  <img width="50" height="50" src={step.image} alt="icon" />
                </div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#1E293B",
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: "16px", color: "#64748B" }}>
                  {step.description}
                </p>
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "15px",
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#94A3B8",
                  }}
                >
                  Step {index + 4}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : hireFromUsData.length === 4 && !isMobile ? (
        // Tablet/Desktop with 4 items
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: isTablet ? "20px" : "30px",
            marginBottom: "30px",
            flexWrap: isTablet ? "wrap" : "nowrap",
          }}
        >
          {hireFromUsData.map((step, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#FFFFFF",
                padding: isTablet ? "20px" : "25px",
                borderRadius: "10px",
                textAlign: "center",
                border: "1px solid #CBD5E1",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
                width: isTablet ? "260px" : "280px",
                position: "relative",
                marginBottom: isTablet ? "20px" : "0",
              }}
            >
              <div
                style={{
                  fontSize: "38px",
                  marginBottom: "15px",
                  color: "#FACC15",
                }}
              >
                  <img width="50" height="50" src={step.image} alt="icon" />
              </div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#1E293B",
                }}
              >
                {step.title}
              </h3>
              <p style={{ fontSize: "16px", color: "#64748B" }}>
                {step.description}
              </p>
              <span
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "15px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#94A3B8",
                }}
              >
                Step {index + 1}
              </span>
            </div>
          ))}
        </div>
      ) : (
        // Mobile view or other cases - stack vertically
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {hireFromUsData.map((step, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#FFFFFF",
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center",
                border: "1px solid #CBD5E1",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
                width: isMobile ? "100%" : "280px",
                position: "relative",
              }}
            >
              <div
                style={{
                  fontSize: isMobile ? "32px" : "38px",
                  marginBottom: "15px",
                  color: "#FACC15",
                }}
              >
                  <img width="50" height="50" src={step.image} alt="icon" />
              </div>
              <h3
                style={{
                  fontSize: isMobile ? "18px" : "20px",
                  fontWeight: "bold",
                  color: "#1E293B",
                  marginTop: "10px",
                }}
              >
                {step.title}
              </h3>
              <p style={{ 
                fontSize: isMobile ? "14px" : "16px", 
                color: "#64748B",
                marginTop: "5px",
                paddingBottom: "10px" 
              }}>
                {step.description}
              </p>
              <span
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "15px",
                  fontSize: isMobile ? "16px" : "18px",
                  fontWeight: "bold",
                  color: "#94A3B8",
                }}
              >
                Step {index + 1}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}