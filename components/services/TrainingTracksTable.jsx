
import { getAllPlacementTrainingTracks, selectPlacementTrainingTrackState } from "@/redux/slices/PlacementTrainingTrack/PlacementTrainingTrack";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TrainingTracksTable = () => {
  const dispatch = useDispatch();
  const { tracks, isLoading, isError } = useSelector(
    selectPlacementTrainingTrackState
  );

  useEffect(() => {
    dispatch(getAllPlacementTrainingTracks());
  }, [dispatch]);


  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const detailsRef = useRef(null);

  // Function to toggle row expansion and scroll to details section
  const toggleRow = (id) => {
    if (expandedRow === id) {
      setExpandedRow(null);
      setSelectedLevel(null);
    } else {
      setExpandedRow(id);
      // Get the first level index
      const track = tracks.find((row) => row._id === id);
      if (
        track &&
        track.trainingModuleLevels &&
        track.trainingModuleLevels.length > 0
      ) {
        setSelectedLevel(0); // Using index instead of key
      }

      // Scroll after the component updates with the new expanded section
      setTimeout(() => {
        if (detailsRef.current) {
          detailsRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  };

  // Use effect to scroll when changing levels as well
  useEffect(() => {
    if (expandedRow !== null && detailsRef.current) {
      detailsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedLevel]);

  // Calculate total hours and days for the selected level
  const calculateTotals = () => {
    if (expandedRow === null || selectedLevel === null)
      return { totalHours: 0, totalDays: 0 };

    const track = tracks.find((row) => row._id === expandedRow);
    if (
      !track ||
      !track.trainingModuleLevels ||
      !track.trainingModuleLevels[selectedLevel]
    ) {
      return { totalHours: 0, totalDays: 0 };
    }

    const modules = track.trainingModuleLevels[selectedLevel].modules;
    const totalHours = modules.reduce(
      (sum, module) => sum + module.TrainingComponentInHours,
      0
    );
    const totalDays = modules.reduce(
      (sum, module) => sum + module.TrainingComponentInDays,
      0
    );

    return { totalHours, totalDays };
  };

  const { totalHours, totalDays } = calculateTotals();

  // Enhanced styles for better UI
  const styles = {
    container: {
      width: "95%",
      maxWidth: "1200px",
      margin: "30px auto",
      fontFamily: "'Segoe UI', Roboto, Arial, sans-serif",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      borderRadius: "10px",
      padding: "25px",
      backgroundColor: "#fff",
      position: "relative",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
      borderBottom: "1px solid #eaeaea",
      paddingBottom: "15px",
    },
    heading: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#333",
      margin: "0",
      textAlign: "left",
    },
    logo: {
      height: "50px",
    },
    logoPlaceholder: {
      width: "180px",
      height: "50px",
      backgroundColor: "#f0f0f0",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      color: "#555",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: "0",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
      marginBottom: "20px",
    },
    th: {
      backgroundColor: "#553982",
      color: "white",
      padding: "16px 12px",
      textAlign: "left",
      fontWeight: "600",
      fontSize: "14px",
      borderBottom: "2px solid #303f9f",
      transition: "all 0.3s ease",
      position: "relative",
    },
    td: {
      padding: "10px 6px",
      borderBottom: "1px solid #eaeaea",
      fontSize: "14px",
      color: "#555",
      verticalAlign: "middle",
    },
    oddRow: {
      backgroundColor: "#f8f9fa",
    },
    expandedSection: {
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      padding: "20px",
      marginTop: "25px",
      boxShadow: "inset 0 0 8px rgba(0, 0, 0, 0.05)",
      animation: "fadeIn 0.3s ease",
      scrollMarginTop: "130px", // Increased from 20px to 110px for better spacing when scrolling
      position: "relative",
      paddingTop: "30px",
    },
    tabContainer: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "25px",
      padding: "0 10px",
    },
    tab: {
      padding: "5px 15px",
      margin: "0 5px",
      backgroundColor: "#e0e0e0",
      color: "#555",
      cursor: "pointer",
      borderRadius: "6px",
      fontWeight: "500",
      fontSize: "14px",
      border: "1px solid transparent",
      transition: "all 0.2s ease",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    activeTab: {
      backgroundColor: "#3f51b5",
      color: "white",
      boxShadow: "0 2px 5px rgba(63, 81, 181, 0.3)",
    },
    objectiveSection: {
      marginBottom: "25px",
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
    },
    objectiveHeading: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#553982",
      margin: "0 0 15px 0",
      textAlign: "left",
    },
    objectiveText: {
      whiteSpace: "pre-line",
      lineHeight: "1.6",
      fontSize: "15px",
      color: "#444",
      margin: "0",
    },
    levelHeading: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#553982",
      margin: "0 0 20px 0",
      textAlign: "left",
      display: "flex",
      alignItems: "center",
    },
    levelIcon: {
      marginRight: "10px",
      width: "34px",
      height: "34px",
      backgroundColor: "#553982",
      borderRadius: "50%",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "12px",
      fontWeight: "bold",
    },
    moduleTable: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: "0",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 0 15px rgba(0, 0, 0, 0.05)",
    },
    moduleHeader: {
      backgroundColor: "#553982",
      color: "white",
      padding: "14px 16px",
      fontWeight: "600",
      fontSize: "14px",
      textAlign: "left",
      borderBottom: "2px solid #422c64",
    },
    moduleCell: {
      padding: "14px 16px",
      borderBottom: "1px solid #eaeaea",
      fontSize: "14px",
      color: "#444",
      backgroundColor: "white",
    },
    moduleCellCentered: {
      padding: "14px 16px",
      borderBottom: "1px solid #eaeaea",
      fontSize: "14px",
      color: "#444",
      backgroundColor: "white",
      textAlign: "center",
    },
    totalRow: {
      backgroundColor: "#332154",
      color: "white",
      fontWeight: "600",
    },
    totalCell: {
      padding: "14px 16px",
      color: "white",
      textAlign: "center",
      fontSize: "15px",
      fontWeight: "600",
    },
    totalTextCell: {
      padding: "14px 16px",
      color: "white",
      textAlign: "right",
      fontSize: "15px",
      fontWeight: "600",
    },
    // Badge style for hours and days
    badge: {
      display: "inline-block",
      padding: "4px 8px",
      borderRadius: "4px",
      fontWeight: "500",
      fontSize: "13px",
      textAlign: "center",
      minWidth: "60px",
    },
    hoursBadge: {
      backgroundColor: "rgba(85, 57, 130, 0.1)",
      color: "#553982",
      border: "1px solid rgba(85, 57, 130, 0.2)",
    },
    daysBadge: {
      backgroundColor: "rgba(63, 81, 181, 0.1)",
      color: "#3f51b5",
      border: "1px solid rgba(63, 81, 181, 0.2)",
    },
    // Animate the section
    "@keyframes fadeIn": {
      from: { opacity: 0, transform: "translateY(-10px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
  };

  // Function to format target semesters as a string
  const formatTargetSemesters = (semesters) => {
    if (!semesters || !Array.isArray(semesters)) return "";
    return semesters.join(", ");
  };

  // Function to get the selected track
  const getSelectedTrack = () => {
    return tracks.find((track) => track._id === expandedRow) || null;
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Training Schedule</h2>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={{ ...styles.th, width: "5%", textAlign: "center" }}>
              S.No
            </th>
            <th style={{ ...styles.th, width: "35%", textAlign: "center" }}>
              Track Name
            </th>
            <th style={{ ...styles.th, width: "15%", textAlign: "center" }}>
              Proposed Hours
            </th>
            <th style={{ ...styles.th, width: "15%", textAlign: "center" }}>
              No of Days
            </th>
            <th style={{ ...styles.th, width: "15%", textAlign: "center" }}>
              Target Semesters
            </th>
            <th style={{ ...styles.th, width: "15%", textAlign: "center" }}>
              Module Details
            </th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((row, index) => (
            <tr key={row._id} style={index % 2 !== 0 ? styles.oddRow : {}}>
              <td style={{ ...styles.td, textAlign: "center" }}>{index + 1}</td>
              <td style={{ ...styles.td, textAlign: "center" }}>
                {row.trackName}
              </td>
              <td style={{ ...styles.td, textAlign: "center" }}>
                <div style={{ ...styles.badge, ...styles.hoursBadge }}>
                  {row.proposedHour} hrs
                </div>
              </td>
              <td style={{ ...styles.td, textAlign: "center" }}>
                <div style={{ ...styles.badge, ...styles.daysBadge }}>
                  {row.noOfDays} days
                </div>
              </td>
              <td style={{ ...styles.td, textAlign: "center" }}>
                {formatTargetSemesters(row.targetSemester)}
              </td>
              <td style={{ ...styles.td, textAlign: "center" }}>
                <button
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "8px 16px",
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "white",
                    backgroundColor: "#1f2937", // Equivalent to gray-800
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "none",
                    cursor: "pointer",
                    transition: "background 0.9s ease-in-out",
                    outline: "none",
                  }}
                  onClick={() => toggleRow(row._id)}
                  onMouseEnter={(e) => {
                    e.currentTarget.querySelector(".hoverEffect").style.width =
                      "200px";
                    e.currentTarget.querySelector(".hoverEffect").style.height =
                      "200px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.querySelector(".hoverEffect").style.width =
                      "0";
                    e.currentTarget.querySelector(".hoverEffect").style.height =
                      "0";
                  }}
                >
                  {/* Expanding Hover Effect */}
                  <span
                    className="hoverEffect"
                    style={{
                      position: "absolute",
                      width: "0",
                      height: "0",
                      backgroundColor: "#ea580c", // Equivalent to orange-600
                      borderRadius: "50%",
                      transition: "width 0.5s ease-out, height 0.5s ease-out",
                      transform: "translate(-50%, -50%)",
                      top: "50%",
                      left: "50%",
                    }}
                  ></span>
                  {/* Left SVG Decoration */}
                  <span
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      height: "100%",
                      marginLeft: "-8px",
                      opacity: "0.1",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 487 487"
                      style={{
                        width: "auto",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    >
                      <path
                        fill="#FFF"
                        fillOpacity="0.1"
                        fillRule="nonzero"
                        d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
                      ></path>
                    </svg>
                  </span>
                  {/* Right SVG Decoration */}
                  <span
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      width: "48px",
                      height: "100%",
                      marginRight: "-12px",
                      opacity: "0.1",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 487 487"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    >
                      <path
                        fill="#FFF"
                        fillOpacity="0.1"
                        fillRule="nonzero"
                        d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
                      ></path>
                    </svg>
                  </span>
                  {/* Gradient Overlay Effect */}
                  <span
                    style={{
                      position: "absolute",
                      inset: "0",
                      width: "100%",
                      height: "100%",
                      marginTop: "-4px",
                      borderRadius: "8px",
                      opacity: "0.3",
                      background:
                        "linear-gradient(to bottom, transparent, transparent, #e5e7eb)", // Equivalent to gray-200
                    }}
                  ></span>

                  {/* Button Text */}
                  <span style={{ position: "relative", zIndex: "2" }}>
                    {expandedRow === row._id ? "Hide Details" : "View Details"}
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {expandedRow !== null && selectedLevel !== null && (
        <div style={styles.expandedSection} ref={detailsRef}>
          <div style={styles.tabContainer}>
            {getSelectedTrack()?.trainingModuleLevels?.map((level, idx) => (
              <div
                key={level._id}
                style={{
                  ...styles.tab,
                  ...(selectedLevel === idx ? styles.activeTab : {}),
                }}
                onClick={() => setSelectedLevel(idx)}
              >
                Level {idx + 1}
              </div>
            ))}
          </div>

          {/* Show objective only for the selected track */}
          {getSelectedTrack() && (
            <div style={styles.objectiveSection}>
              <h3 style={styles.objectiveHeading}>Training Objective</h3>
              <p style={styles.objectiveText}>
                {getSelectedTrack().objecttive}
              </p>
            </div>
          )}

          <h3 style={styles.levelHeading}>
            <span style={styles.levelIcon}>L{selectedLevel + 1}</span>
            Training Modules: Level {selectedLevel + 1}
          </h3>

          <table style={styles.moduleTable}>
            <thead>
              <tr>
                <th style={{ ...styles.moduleHeader, textAlign: "center" }}>
                  Module No
                </th>
                <th style={{ ...styles.moduleHeader, textAlign: "center" }}>
                  Module Name
                </th>
                <th style={{ ...styles.moduleHeader, textAlign: "center" }}>
                  Training Component in Hours
                </th>
                <th style={{ ...styles.moduleHeader, textAlign: "center" }}>
                  Training Component in Days (6 Hours / Day)
                </th>
              </tr>
            </thead>
            <tbody>
              {getSelectedTrack()?.trainingModuleLevels[
                selectedLevel
              ]?.modules.map((module, idx) => (
                <tr
                  key={module._id}
                  style={idx % 2 !== 0 ? { backgroundColor: "#f8f9fa" } : {}}
                >
                  <td
                    style={{
                      ...styles.moduleCellCentered,
                      textAlign: "center",
                    }}
                  >
                    {idx + 1}
                  </td>
                  <td style={{ ...styles.moduleCell, textAlign: "center" }}>
                    {module.modulename}
                  </td>
                  <td
                    style={{
                      ...styles.moduleCellCentered,
                      textAlign: "center",
                    }}
                  >
                    <div style={{ ...styles.badge, ...styles.hoursBadge }}>
                      {module.TrainingComponentInHours} hrs
                    </div>
                  </td>
                  <td
                    style={{
                      ...styles.moduleCellCentered,
                      textAlign: "center",
                    }}
                  >
                    <div style={{ ...styles.badge, ...styles.daysBadge }}>
                      {module.TrainingComponentInDays} days
                    </div>
                  </td>
                </tr>
              ))}
              <tr style={styles.totalRow}>
                <td
                  style={{ ...styles.totalCell, textAlign: "center" }}
                  colSpan="2"
                >
                  Total
                </td>
                <td style={{ ...styles.totalCell, textAlign: "center" }}>
                  <div
                    style={{
                      ...styles.badge,
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      border: "1px solid rgba(255, 255, 255, 0.4)",
                      color: "white",
                    }}
                  >
                    {totalHours} hrs
                  </div>
                </td>
                <td style={{ ...styles.totalCell, textAlign: "center" }}>
                  <div
                    style={{
                      ...styles.badge,
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      border: "1px solid rgba(255, 255, 255, 0.4)",
                      color: "white",
                    }}
                  >
                    {totalDays} days
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TrainingTracksTable;
