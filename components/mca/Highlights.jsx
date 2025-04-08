import Image from "next/image";

import { useState } from "react";

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const baseCardStyle = {
    flex: 1,

    margin: "20px",

    padding: "40px",

    borderRadius: "12px",

    backgroundColor: "#F9FAFB",

    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",

    transition: "all 0.3s ease",

    cursor: "pointer",

    minWidth: "320px",

    maxWidth: "600px",
  };

  const getCardStyle = (index) => ({
    ...baseCardStyle,

    transform: hoveredCard === index ? "translateY(-6px)" : "none",

    backgroundColor: hoveredCard === index ? "#EAF6F6" : "#F9FAFB",
  });

  const containerStyle = {
    display: "flex",

    flexWrap: "wrap",

    justifyContent: "center",

    padding: "60px 30px",

    backgroundColor: "#F3F4F6",

    fontFamily: "sans-serif",

    minHeight: "100vh",
  };

  const headerStyle = {
    color: "#000",

    fontSize: "36px",

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

  const paraStyle = {
    fontSize: "16px",

    color: "#444",

    marginBottom: "30px",

    lineHeight: "1.6",
  };

  const buttonStyle = {
    padding: "10px 24px",

    borderRadius: "6px",

    border: "1px solid #333",

    backgroundColor: "#fff",

    color: "#333",

    fontWeight: 500,

    fontSize: "15px",

    transition: "all 0.3s ease",
  };

  const logoRowStyle = {
    display: "flex",

    flexWrap: "wrap",

    gap: "15px",

    marginTop: "30px",

    alignItems: "center",
  };

  const logoStyle = {
    height: "30px",

    objectFit: "contain",
  };

  return (
    <div style={containerStyle}>
      {/* Left Card */}
      <div
        style={getCardStyle(0)}
        onMouseEnter={() => setHoveredCard(0)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div style={tagStyle}>ENTERPRISE BUSINESS SOLUTIONS</div>
        <h2 style={headerStyle}>
          Work with our in-house <br /> team of experts
        </h2>
        <p style={paraStyle}>
          Our partnership goes far beyond the point of purchase. The enterprise
          services team comes with the product insight and specialised industry
          knowledge tailored to the unique business needs of your company.
        </p>

        <p
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#555",
            marginBottom: "10px",
          }}
        >
          TRUSTED BY LEADING COMPANIES
        </p>

        <div style={logoRowStyle}>
          <Image
            src="/logos/tafe.png"
            alt="tafe"
            width={60}
            height={30}
            style={logoStyle}
          />
          <Image
            src="/logos/union.png"
            alt="union"
            width={100}
            height={30}
            style={logoStyle}
          />
          <Image
            src="/logos/nsdl.png"
            alt="nsdl"
            width={60}
            height={30}
            style={logoStyle}
          />
          <Image
            src="/logos/icici.png"
            alt="icici"
            width={110}
            height={30}
            style={logoStyle}
          />
        </div>

        <div style={{ marginTop: "30px" }}>
          <button style={buttonStyle}>LEARN MORE ABOUT EBS →</button>
        </div>
      </div>

      {/* Right Card */}
      <div
        style={getCardStyle(1)}
        onMouseEnter={() => setHoveredCard(1)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div style={tagStyle}>SI PARTNERS</div>
        <h2 style={headerStyle}>
          Get up and running with <br /> our global Partner network
        </h2>
        <p style={paraStyle}>
          Team up with world-class experts who will partner with you on a
          comprehensive strategy for deployment, so you can reduce time to value
          and scale with confidence. If you have a preferred SI in mind, let us
          know and we'll make the connection.
        </p>

        <p
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#555",
            marginBottom: "10px",
          }}
        >
          OUR GSI PARTNERS
        </p>

        <div style={logoRowStyle}>
          <Image
            src="/logos/pwc.png"
            alt="pwc"
            width={40}
            height={30}
            style={logoStyle}
          />
          <Image
            src="/logos/tcs.png"
            alt="tcs"
            width={60}
            height={30}
            style={logoStyle}
          />
          <Image
            src="/logos/deloitte.png"
            alt="deloitte"
            width={80}
            height={30}
            style={logoStyle}
          />
          <Image
            src="/logos/techm.png"
            alt="techm"
            width={100}
            height={30}
            style={logoStyle}
          />
        </div>

        <div style={{ marginTop: "30px" }}>
          <button style={buttonStyle}>EXPLORE MORE →</button>
        </div>
      </div>
    </div>
  );
}
