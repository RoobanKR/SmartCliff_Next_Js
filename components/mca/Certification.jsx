import React from "react";
 
const DegreeCertificationUI = () => {
  return (
    <div>
      {/* Heading outside the container with proper styling */}
      <div className="program-subtitle">
        <span className="subtitle-line"></span>
        <span className="subtitle-text">Certification</span>
        <span className="subtitle-line"></span>
      </div>
      <div style={styles.container}>
        {/* Left side content */}
        <div style={styles.leftContent}>
          <div style={styles.accreditationContainer}>
            <div style={styles.dot}></div>
            <span style={styles.accreditationText}>Official Accreditation</span>
          </div>
          <h1 style={styles.title}>Earn your degree program certificate</h1>
          <p style={styles.description}>
            Add this prestigious credential to your LinkedIn profile, resume, or
            CV
          </p>
          <p style={styles.description}>
            Share it on social media and enhance your professional portfolio
          </p>
        </div>
 
        {/* Right side certificate illustration */}
        <div style={styles.certificateWrapper}>
          <img
            src="/assets/img/home-1/newhero/certificate.avif"
            alt="Certificate"
            style={styles.certificateImage}
          />
        </div>
      </div>
      <style jsx>
        {`
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
            font-size: 2.5rem;
            margin: 0 15px;
            color: #5b2c6f;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
             @media (max-width: 640px) {
         
 
          .subtitle-text {
            font-size: 1.5rem;
             margin: 0 10px;
             text-align:center;
          }
        `}
      </style>
    </div>
  );
};
 
const styles = {
  mainHeading: {
    textAlign: "center",
    fontSize: "42px",
    fontWeight: "bold",
    color: "#1A1A2E",
    padding: "0 20px",
  },
  certificateImage: {
    width: "120px", // Further reduced width for compact size
    height: "auto", // Maintains aspect ratio
    objectFit: "contain", // Ensures full certificate visibility
    borderRadius: "5px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "40px",
    borderRadius: "12px",
    // boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    background: "linear-gradient(to right, #ffffff,rgb(161, 165, 171))",
    maxWidth: "1100px",
    margin: "30px auto",
    position: "relative",
    overflow: "hidden",
    flexWrap: "wrap",
  },
  leftContent: {
    flex: "1",
    paddingRight: "40px",
    zIndex: "1",
    minWidth: "280px",
  },
  accreditationContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
  },
  dot: {
    width: "24px",
    height: "24px",
    backgroundColor: "#2D46B9",
    borderRadius: "50%",
    marginRight: "10px",
  },
  accreditationText: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#2D46B9",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#1A1A2E",
    marginBottom: "16px",
    lineHeight: "1.2",
  },
  description: {
    fontSize: "17px",
    color: "#444",
    marginBottom: "12px",
    lineHeight: "1.5",
  },
  certificateWrapper: {
    width: "100%",
    maxWidth: "320px",
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  certificateBox: {
    position: "relative",
    backgroundColor: "#E9F0FF",
    width: "100%",
    height: "220px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  certificateContent: {
    position: "absolute",
    top: "25px",
    width: "80%",
    height: "170px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  universityLogoContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "14px",
  },
  universityLogo: {
    width: "30px",
    height: "30px",
    borderRadius: "4px",
    backgroundColor: "#2D46B9",
    marginRight: "8px",
  },
  textPlaceholder: {
    height: "6px",
    width: "80px",
    backgroundColor: "#ECECEC",
    marginBottom: "6px",
  },
  textPlaceholderSmall: {
    height: "4px",
    width: "60px",
    backgroundColor: "#ECECEC",
  },
  certificateTitle: {
    height: "8px",
    width: "80%",
    backgroundColor: "#2D46B9",
    opacity: "0.7",
    marginBottom: "12px",
  },
  textLine: {
    height: "5px",
    width: "90%",
    backgroundColor: "#ECECEC",
    marginBottom: "8px",
  },
  progressTextContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "6px",
  },
  progressLabel: {
    fontSize: "9px",
    color: "#666",
  },
  progressPercentage: {
    fontSize: "9px",
    fontWeight: "bold",
    color: "#2D46B9",
  },
  progressBarBackground: {
    height: "6px",
    width: "100%",
    backgroundColor: "#ECECEC",
    borderRadius: "3px",
  },
  progressBar: {
    height: "100%",
    width: "75%",
    background: "linear-gradient(to right, #2D46B9, #4A66E3)",
    borderRadius: "3px",
  },
  badgeWrapper: {
    position: "absolute",
    bottom: "15px",
    right: "15px",
  },
  badge: {
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #2D46B9, #4A66E3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: "22px",
    fontWeight: "bold",
  },
};
 
export default DegreeCertificationUI;