import { fetchAllColleges } from "@/redux/slices/collegeDetails/collegeDetails";
import { ArrowRightAlt } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
const AboutCollege = ({ collegeId }) => {
  const dispatch = useDispatch();
  const collegeDetails = useSelector((state) => state.colleges.colleges);

  // Window size hook for responsive design
  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 640;
  const isTablet = windowSize.width >= 640 && windowSize.width < 1024;

  useEffect(() => {
    dispatch(fetchAllColleges());
  }, [dispatch]);

  const matchedCollege = collegeDetails.find(
    (college) => college._id === collegeId
  );

  // Responsive style objects
  const styles = {
    container: {
      padding: isMobile ? "10px 20px" : isTablet ? "10px 40px" : "10px 70px",
    },

    cover: {
      width: "100%",
      height: isMobile ? "120px" : isTablet ? "160px" : "200px",
      objectFit: "cover",
      display: "block",
      borderRadius: "8px",
      marginTop: "16px",
    },
    headerContent: {
      display: "flex",
      padding: isMobile ? "16px" : "20px",
      alignItems: "center",
      borderBottom: "1px solid #eee",
      flexDirection: isMobile ? "column" : "row",
      textAlign: isMobile ? "center" : "left",
    },
    logo: {
      width: isMobile ? "70px" : "80px",
      height: isMobile ? "70px" : "80px",
      borderRadius: "8px",
      marginRight: isMobile ? "0" : "20px",
      marginBottom: isMobile ? "15px" : "0",
      objectFit: "cover",
      border: "2px solid #fff",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },
    titleBlock: {
      flex: isMobile ? "none" : "1",
      width: isMobile ? "100%" : "auto",
    },
    title: {
      margin: "0 0 5px 0",
      fontSize: isMobile ? "20px" : "24px",
      fontWeight: "bold",
      color: "#0c4da2",
    },

    bodyContent: {
      padding: isMobile ? "16px" : "24px",
    },
    description: {
      fontSize: isMobile ? "14px" : "16px",
      lineHeight: isMobile ? "1.5" : "1.6",
    },
  };

  if (!matchedCollege) {
    return <div>Loading college details...</div>;
  }
  return (
    <div style={styles.container}>
      <div className="bg-gray-100 py-0 px-6 border-b">
        <div className="program-subtitle">
          <span className="subtitle-line"></span>
          <span className="subtitle-text">About College</span>
          <span className="subtitle-line"></span>
        </div>
      </div>

      <div style={styles.headerContent}>
        <img
          src={matchedCollege?.logo}
          alt={`${matchedCollege?.collegeName} logo`}
          style={styles.logo}
        />
        <div style={styles.titleBlock}>
          <h1 style={styles.title}>{matchedCollege?.collegeName}</h1>
        </div>
      </div>

      <div style={styles.bodyContent}>
        <p style={styles.description}>{matchedCollege?.description}</p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginTop: "15px" }}
        >
          {/* Informational Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: "16px", color: "#333", marginBottom: "10px" }}
          >
            View more details about the college by visiting the link :{" "}
            <a
              href={
                matchedCollege.website.startsWith("http")
                  ? matchedCollege.website
                  : `https://${matchedCollege.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "3px 8px",
                // border: "2px solid #4F547B",
                color: "rgb(0, 42, 255)",
                borderRadius: "6px",
                textDecoration: "none",
                transition: "all 0.3s",
              }}
            >
              <span
                style={{
                  color: "rgb(0, 42, 255)",
                  textDecoration: "underline",
                }}
              >
                Click{" "}
              </span>
            </a>
          </motion.p>
        </motion.div>
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
          font-size: ${isMobile ? "1.8rem" : "2.2rem"};
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
      `}</style>
    </div>
  );
};

// Custom hook for window size
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

export default AboutCollege;
