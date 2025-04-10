import Image from "next/image";

import { useEffect, useState } from "react";

export default function Home({ ids }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const baseCardStyle = {
    flex: 1,
    margin: isMobile ? "10px 0" : "20px",
    padding: isMobile ? "20px" : "40px",
    borderRadius: "12px",
    backgroundColor: "#F9FAFB",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    width: isMobile ? "100%" : "48%",
  };

  const getCardStyle = (index) => ({
    ...baseCardStyle,
    transform: hoveredCard === index ? "translateY(-6px)" : "none",
    backgroundColor: "#EAF6F6",
  });

  const getCard2Style = (index) => ({
    ...baseCardStyle,
    transform: hoveredCard === index ? "translateY(-6px)" : "none",
    backgroundColor: "#fff3d4",
  });

  const containerStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: "10px",
    fontFamily: "sans-serif",
    minHeight: "100vh",
  };

  const headerStyle = {
    color: "#000",
    fontSize: isMobile ? "24px" : "36px",
    fontWeight: "600",
    margin: "10px 0 20px",
    lineHeight: "1.3",
  };

  const tagStyle = {
    color: "#16A34A",
    backgroundColor: "#E0F2F1",
    padding: "5px 12px",
    borderRadius: "5px",
    fontSize: "14px",
    fontWeight: 600,
    display: "inline-block",
    marginBottom: "15px",
  };

  const tag2Style = {
    color: "#a39c16",
    backgroundColor: "#f2efe0",
    padding: "5px 12px",
    borderRadius: "5px",
    fontSize: "14px",
    fontWeight: 600,
    display: "inline-block",
    marginBottom: "15px",
  };
  const sponsorList = [
    {
      name: "A key supporter in agricultural machinery innovation and student development initiatives.",
      amount: "₹5,00,000",
    },
    {
      name: "Partnering with us to promote financial literacy programs and entrepreneurial projects.",
      amount: "₹3,50,000",
    },
    {
      name: "Supporting digital transformation workshops and internship opportunities for students.",
      amount: "₹2,75,000",
    },
    {
      name: "Empowering students through career-building sessions and digital banking infrastructure.",
      amount: "₹4,20,000",
    },
  ];

  const renderSponsorshipSection = (tag, heading, colorStyle, index) => (
    <div
      style={colorStyle(index)}
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <div style={heading.includes("Skilling") ? tag2Style : tagStyle}>
        {heading.includes("Skilling")
          ? "Skilling Sponsorship"
          : "Academic Sponsorship"}
      </div>

      <h2 style={headerStyle}>{heading}</h2>

      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          width: "100%",
        }}
      >
        <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
          {sponsorList.map((sponsor, idx) => (
            <li
              key={idx}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                padding: "12px 0",
                borderBottom:
                  idx !== sponsorList.length - 1 ? "1px solid #e5e7eb" : "none",
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                  color: "#3b82f6",
                  fontWeight: "bold",
                  lineHeight: "1.2",
                  marginTop: "2px",
                  flexShrink: 0,
                }}
              >
                →
              </span>
              <div>
                <p style={{ margin: 0, fontWeight: 500, color: "#111827" }}>
                  <i>{sponsor.name}</i>
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    color: "#6b7280",
                    marginTop: "4px",
                  }}
                >
                  Sponsorship Amount:{" "}
                  <strong style={{ color: "#008b33" }}>{sponsor.amount}</strong>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div style={{ padding: "2px 2px" }}>
      <br></br>
      <div
        style={{
          position: "relative",
        }}
      >
        <div className="program-subtitle">
          <span className="subtitle-line"></span>
          <span className="subtitle-text"> Sponsership Details</span>
          <span className="subtitle-line"></span>
        </div>
      </div>
      <br></br>
      <div style={containerStyle}>
        {renderSponsorshipSection(
          tagStyle,
          "Empowering Our Vision Through Academic Sponsorships",
          getCardStyle,
          0
        )}
        {renderSponsorshipSection(
          tag2Style,
          "Empowering Our Vision Through Skilling Sponsorships",
          getCard2Style,
          1
        )}
      </div>

      <style jsx>{`
        .program-subtitle {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
          width: 100%;
        }
 
        .subtitle-line {
          height: 2px;
          width: 100px;
          background-color: #5b2c6f;
          opacity: 0.5;
        }
 
        .subtitle-text {
          font-size: 2.5rem;
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
            margin: 0 10px;
            text-align: center;
          }
        }
 
        @media (min-width: 641px) and (max-width: 1023px) {
          .subtitle-text {
            font-size: 2rem;
          }
        }
        @media (max-width: 768px) {
          .coursesCard {
            max-width: 100%; // Full width on smaller screens
          }
        }
      `}</style>
    </div>
  );
}

