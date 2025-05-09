import React from "react";

export default function PrivacyPolicy() {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  const headingStyle = {
    fontSize: isMobile ? "18px" : "25px",
    color: "#8B66A4",
    fontWeight: 600,
    fontFamily: "Montserrat, sans-serif",
    marginBottom: "8px",
  };

  const textStyle = {
    fontSize: isMobile ? "14px" : "17px",
    color: "#212529",
    lineHeight: 1.6,
    fontWeight: 400,
    fontFamily: "Montserrat, sans-serif",
  };

  const containerStyle = {
    // padding: isMobile ? "20px 15px" : "40px 80px",
    maxWidth: "100%",
    boxSizing: "border-box",
  };

  const listNumberStyle = {
    ...headingStyle,
    marginRight: "8px",
  };

  const dotStyle = {
    fontSize: isMobile ? "16px" : "20px",
    color: "#f79c8d",
    marginRight: "10px",
  };

  return (
    <section style={containerStyle}>
      <ol style={{ paddingLeft: "20px" }}>
        <li style={{ marginTop: "25px", ...textStyle }}>
          <span style={listNumberStyle}>1.</span>
          At SmartCliff, we are committed to the ethical collection, retention,
          and use of any personal information ("Personal Information") you
          provide while using our website ("Site").
        </li>

        <li style={{ marginTop: "25px", ...textStyle }}>
          <span style={listNumberStyle}>2.</span>
          What We Collect
          <ul style={{ paddingLeft: "25px", marginTop: "10px" }}>
            <p style={{ marginTop: "10px", ...textStyle }}>
              Your Personal Information may include, but is not limited to:
            </p>

            {[
              "Your name",
              "Your email and mailing address",
              "Your telephone number",
              "Limited personal details",
              "Any other information that SmartCliff may require for specific purposes",
            ].map((item, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginTop: "8px",
                }}
              >
                <span style={dotStyle}>●</span>
                <span style={textStyle}>{item}</span>
              </li>
            ))}
          </ul>
        </li>

        <li style={{ marginTop: "25px", ...textStyle }}>
          <span style={listNumberStyle}>3.</span>
          Your Consent
          <p style={{ marginTop: "10px", ...textStyle }}>
            By using this website, you consent to the terms outlined in this
            Privacy Policy, including any future amendments. Your continued use
            of the Site signifies your agreement to the collection and use of
            your Personal Information as described herein.
          </p>
        </li>

        <li style={{ marginTop: "25px" }}>
          <span style={listNumberStyle}>4.</span>
          <span
            style={{ ...headingStyle, fontSize: isMobile ? "16px" : "20px" }}
          >
            INFORMATION COLLECTION
          </span>
        </li>
      </ol>

      <ol
        style={{
          paddingLeft: "30px",
          marginTop: "30px",
          listStyleType: "lower-alpha",
        }}
      >
        <li style={{ marginTop: "20px" }}>
          <span style={{ fontSize: "20px", fontWeight: "600" }}>1.</span>
          <strong style={{ color: "#8B66A4" }}> SITE BROWSING: </strong>
          You may browse the Site anonymously without submitting any Personal
          Information. However, certain interactions or services may require you
          to provide identifiable details.
        </li>

        <li style={{ marginTop: "20px" }}>
          <span style={{ fontSize: "20px", fontWeight: "600" }}>2.</span>
          <strong style={{ color: "#8B66A4" }}> GENERAL INFORMATION: </strong>
          While you browse the Site, our systems may automatically capture
          non-personal data such as:
          <ol
            style={{
              paddingLeft: "30px",
              marginTop: "10px",
              listStyleType: "lower-roman",
            }}
          >
            <li style={{ marginTop: "6px" }}> <span style={{fontSize:"20px"}}> ✦ </span>Date and time of your visit.</li>
            <li style={{ marginTop: "6px" }}><span style={{fontSize:"20px"}}>✦</span> Referring website</li>
            <li style={{ marginTop: "6px" }}>
            <span style={{fontSize:"20px"}}> ✦ </span> Browser type (e.g., Chrome, Safari)
            </li>
            <li style={{ marginTop: "6px" }}>
            <span style={{fontSize:"20px"}}> ✦ </span> Operating system (e.g., Windows, macOS)
            </li>
          </ol>
          <br />
          This general information is not linked to your identity and is used
          strictly for website traffic analysis and to understand public
          interest trends.
        </li>

        <li style={{ marginTop: "20px" }}>
          <span style={{ fontSize: "20px", fontWeight: "600" }}>3.</span>
          <strong style={{ color: "#8B66A4" }}>USE OF COOKIES: </strong>
          While you browse the Site, our systems may automatically capture
          non-personal data such as:
          <ol
            style={{
              paddingLeft: "30px",
              marginTop: "10px",
              listStyleType: "lower-roman",
            }}
          >
            <li style={{ marginTop: "6px" }}><span style={{fontSize:"20px"}}> ✦ </span>Time of visit</li>
            <li style={{ marginTop: "6px" }}><span style={{fontSize:"20px"}}> ✦ </span>Pages viewed</li>
            <li style={{ marginTop: "6px" }}><span style={{fontSize:"20px"}}> ✦ </span>Areas of interest on the Site</li>
          </ol>
        </li>

        <li style={{ marginTop: "20px" }}>
          <span style={{ fontSize: "20px", fontWeight: "600" }}>4.</span>
          <strong style={{ color: "#8B66A4" }}>TYPE OF COOKIES: </strong>
          <ol
            style={{
              paddingLeft: "30px",
              marginTop: "10px",
              listStyleType: "lower-roman",
            }}
          >
            <li style={{ marginTop: "6px" }}>
            <span style={{fontSize:"20px"}}> ✦ </span> Session-based or persistent, depending on their duration.
            </li>
            <li style={{ marginTop: "6px" }}>
            <span style={{fontSize:"20px"}}> ✦ </span> Used for user preference, analytics, etc.
            </li>
          </ol>
        </li>

        <li style={{ marginTop: "20px" }}>
          <span style={{ fontSize: "20px", fontWeight: "600" }}>5.</span>
          <strong style={{ color: "#8B66A4" }}>PERSISTENT COOKIES: </strong>
          Remain on your device for a set period.
        </li>
        <li style={{ marginTop: "25px", ...textStyle }}>
          <span style={listNumberStyle}>5.</span>
          Cookies may be used for purposes such as remembering user preferences,
          enabling analytics, and improving website functionality.
        </li>
        <li style={{ marginTop: "25px", ...textStyle }}>
          <span style={listNumberStyle}>6.</span>
          Would you like to include a section on data protection or user rights
          (such as opting out or data access requests)?
        </li>
      </ol>
    </section>
  );
}