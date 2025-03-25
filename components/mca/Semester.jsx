import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSemesters } from "@/redux/slices/mca/semester/Semester";
import { useParams } from "next/navigation";
import "./Semester.css";
import TableComponent from "./TableComponent";
import TableModal from "./TableModal";

const Semester = ({ collegeId }) => {
  const dispatch = useDispatch();
  const { semesters, loading, error } = useSelector((state) => state.semester);
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSubmain, setSelectedSubmain] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    dispatch(getAllSemesters());
  }, [dispatch]);

  // Track window width for responsive design
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const isMobile = windowWidth < 768;

  const matchedSemester = semesters.filter(
    (semester) => semester.college?._id === collegeId
  );

  const filteredsemester = semesters.filter(
    (semester) => semester.degree_program && semester.degree_program._id === id
  );

  const handleViewMore = (submain) => {
    setSelectedSubmain(submain);
    setModalOpen(true);
  };

  // Responsive CSS styles
  const styles = {
    programSubtitle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "10px",
    },
    subtitleLine: {
      height: "2px",
      width: isMobile ? "50px" : "100px",
      backgroundColor: "#5B2C6F",
      opacity: "0.5",
    },
    subtitleText: {
      fontSize: isMobile ? "1.5rem" : "2.2rem",
      margin: "0 10px",
      color: "#5B2C6F",
      fontWeight: "500",
      textTransform: "uppercase",
      letterSpacing: isMobile ? "0.5px" : "1px",
    },
    semesterHighlight: {
      color: "orange",
    },
    semesterIcon: {
      width: "20px",
      height: "20px",
    },
    submainContainer: {
      marginTop: "25px",
      position: "relative",
      overflowX: isMobile ? "auto" : "visible",
      paddingBottom: isMobile ? "10px" : "0",
    },
    submainHeader: {
      fontWeight: "bold",
      fontSize: isMobile ? "16px" : "18px",
      marginBottom: "10px",
      color: "#333",
    },
    skillsRow: {
      display: "flex",
      justifyContent: "space-around",
      position: "relative",
      flexWrap: isMobile ? "nowrap" : "wrap",
      minWidth: isMobile ? "500px" : "auto", // Ensure minimum width for scrolling on mobile
    },
    skillItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      width: isMobile ? "120px" : "24%",
      position: "relative",
      marginBottom: isMobile ? "15px" : "0",
      flexShrink: 0,
    },
    verticalLine: {
      position: "absolute",
      top: "0",
      left: "50%",
      height: isMobile ? "40px" : "50px",
      width: "3px",
      backgroundColor: "#b19cd9",
      transform: "translateX(-50%)",
    },
    topCircle: {
      width: isMobile ? "16px" : "20px",
      height: isMobile ? "16px" : "20px",
      borderRadius: "50%",
      backgroundColor: "#fff",
      border: "3px solid #b19cd9",
      position: "absolute",
      top: "-8px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: "2",
    },
    horizontalConnector: {
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      height: "3px",
      backgroundColor: "#b19cd9",
      zIndex: "1",
    },
    iconCircle: {
      width: isMobile ? "45px" : "60px",
      height: isMobile ? "45px" : "60px",
      borderRadius: "50%",
      border: "1px solid black",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      marginTop: isMobile ? "45px" : "60px",
    },
    iconImage: {
      width: isMobile ? "22px" : "30px",
      height: isMobile ? "22px" : "30px",
      objectFit: "contain",
    },
    skillTitle: {
      fontWeight: "bold",
      marginTop: "10px",
      marginBottom: "5px",
      color: "#333",
      fontSize: isMobile ? "0.9rem" : "1rem",
    },
    skillSubtitle: {
      fontSize: isMobile ? "0.8rem" : "0.9rem",
      color: "#666",
      backgroundColor: "#f5f5f5",
      padding: isMobile ? "5px" : "8px",
      borderRadius: "4px",
      width: "100%",
    },
    viewMoreButton: {
      color: "blue",
      textDecoration: "underline",
      cursor: "pointer",
      fontSize: isMobile ? "0.8rem" : "1rem",
      marginTop: "5px",
    },
    purpleSpan: {
      color: "rgb(133, 51, 168)",
    },
    container: {
      padding: isMobile ? "10px" : "20px",
    },
    timelineItem: {
      padding: isMobile ? "10px" : "15px",
      margin: isMobile ? "0 0 10px 10px" : "0 0 15px 15px",
    },
    semesterTitle: {
      fontSize: isMobile ? "1.1rem" : "1.25rem",
      margin: "0 0 8px 0",
    },
    semesterDescription: {
      fontSize: isMobile ? "0.9rem" : "1rem",
      lineHeight: "1.4",
      margin: "10px 0",
    },
    modalContent: {
      width: "100%",
      maxWidth: isMobile ? "100%" : "800px",
      padding: isMobile ? "10px" : "20px",
    },
    scrollHint: {
      fontSize: "0.8rem",
      fontStyle: "italic",
      color: "#666",
      textAlign: "center",
      margin: "5px 0",
      display: isMobile ? "block" : "none",
    },
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={styles.container} className="container">
      {/* Section Title */}
      <div className="text-center mb-4">
        <div
          style={styles.programSubtitle}
          data-aos="fade-up"
          data-aos-duration={300}
        >
          <span style={styles.subtitleLine}></span>
          <span style={styles.subtitleText}>
            Learning Path{" "}
            <span style={styles.purpleSpan}>(Semester-Based)</span>
          </span>
          <span style={styles.subtitleLine}></span>
        </div>
      </div>

      {/* Main Content */}
      <div className="row">
        <div>
          {matchedSemester.map((semesterData) => (
            <div key={semesterData._id}>
              {semesterData.semester.map((semester, idx) => (
                <div className="row mb-4" key={idx}>
                  <div>
                    <ul className="timeline">
                      <li
                        className="timeline-item rounded ml-3 shadow"
                        style={styles.timelineItem}
                      >
                        <h2 style={styles.semesterTitle}>
                          <span style={styles.semesterHighlight}>
                            {semester.semester}
                          </span>{" "}
                          : {semester.heading}
                        </h2>
                        <span className="small text-gray">
                          <img
                            src={semester.icon}
                            alt="icon"
                            style={styles.semesterIcon}
                          />
                          <span className="ml-2"></span> {semester.subheading}
                        </span>
                        <p style={styles.semesterDescription}>
                          {semester.description}
                        </p>

                        {semester.submain && semester.submain.length > 0 && (
                          <div style={styles.submainContainer}>
                            {isMobile && (
                              <div style={styles.scrollHint}>
                                Scroll horizontally to see all items →
                              </div>
                            )}

                            {/* Skills row with connector line */}
                            <div style={styles.skillsRow}>
                              {/* Horizontal connector line */}
                              <div style={styles.horizontalConnector}></div>

                              {semester.submain.map((subItem, subIndex) => (
                                <div style={styles.skillItem} key={subIndex}>
                                  {/* Vertical line for each item */}
                                  <div style={styles.verticalLine}></div>

                                  {/* Circle at top of each line */}
                                  <div style={styles.topCircle}></div>

                                  {/* Icon and content */}
                                  <div style={styles.iconCircle}>
                                    <img
                                      src={
                                        subItem.inner_url ||
                                        "/default-skill-icon.png"
                                      }
                                      alt="skill icon"
                                      style={styles.iconImage}
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.innerHTML = "⚙️"; // Fallback emoji
                                      }}
                                    />
                                  </div>
                                  <div style={styles.skillTitle}>
                                    {subItem.inner_heading}
                                  </div>
                                  <div style={styles.skillSubtitle}>
                                    {subItem.inner_subheading}
                                  </div>
                                  <p
                                    style={styles.viewMoreButton}
                                    onClick={() => handleViewMore(subItem)}
                                  >
                                    View More
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Modal for TableComponent */}
      <TableModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div>
          <TableComponent
            selectedSubmain={selectedSubmain}
            collegeId={collegeId}
          />
        </div>
      </TableModal>
    </div>
  );
};

export default Semester;
