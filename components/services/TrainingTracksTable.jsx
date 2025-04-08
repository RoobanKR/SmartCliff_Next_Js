import { getAllPlacementTrainingTracks, selectPlacementTrainingTrackState } from "@/redux/slices/PlacementTrainingTrack/PlacementTrainingTrack";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TrainingModuleModal from "./TrainingModuleModal";
const TrainingTracksTable = () => {
  const dispatch = useDispatch();
  const { tracks, isLoading, isError } = useSelector(
    selectPlacementTrainingTrackState
  );

  useEffect(() => {
    dispatch(getAllPlacementTrainingTracks());
  }, [dispatch]);

  const [showModal, setShowModal] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  // Function to handle clicking the View Details button
  const handleViewDetails = (trackId) => {
    const track = tracks.find((row) => row._id === trackId);
    if (track && track.trainingModuleLevels && track.trainingModuleLevels.length > 0) {
      setSelectedTrack(track);
      setSelectedLevel(0); // Default to first level
      setShowModal(true);
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedTrack(null);
    setSelectedLevel(null);
  };

  // Function to format target semesters as a string
  const formatTargetSemesters = (semesters) => {
    if (!semesters || !Array.isArray(semesters)) return "";
    return semesters.join(", ");
  };

  return (
    <div style={{
      width: "95%",
      maxWidth: "1200px",
      margin: "30px auto",
      fontFamily: "'Segoe UI', Roboto, Arial, sans-serif",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      borderRadius: "10px",
      padding: "25px",
      backgroundColor: "#fff",
      position: "relative",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
        borderBottom: "1px solid #eaeaea",
        paddingBottom: "15px",
      }}>
        <h2 style={{
          fontSize: "29px",
          fontWeight: "700",
          color: "#333",
          margin: "0",
          textAlign: "left",
        }}>Training Modal</h2>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: "0",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
          marginBottom: "20px",
          minWidth: "800px" // Ensures table doesn't shrink too much on mobile
        }}>
          <thead>
            <tr>
              <th style={{
                backgroundColor: "#553982",
                color: "white",
                padding: "16px 12px",
                textAlign: "left",
                fontWeight: "600",
                fontSize: "14px",
                borderBottom: "2px solid #303f9f",
                transition: "all 0.3s ease",
                position: "relative",
                width: "5%",
                textAlign: "center"
              }}>S.No</th>
              <th style={{
                backgroundColor: "#553982",
                color: "white",
                padding: "16px 12px",
                textAlign: "left",
                fontWeight: "600",
                fontSize: "14px",
                borderBottom: "2px solid #303f9f",
                transition: "all 0.3s ease",
                position: "relative",
                width: "35%",
                textAlign: "center"
              }}>Track Name</th>
              <th style={{
                backgroundColor: "#553982",
                color: "white",
                padding: "16px 12px",
                textAlign: "left",
                fontWeight: "600",
                fontSize: "14px",
                borderBottom: "2px solid #303f9f",
                transition: "all 0.3s ease",
                position: "relative",
                width: "15%",
                textAlign: "center"
              }}>Proposed Hours</th>
              <th style={{
                backgroundColor: "#553982",
                color: "white",
                padding: "16px 12px",
                textAlign: "left",
                fontWeight: "600",
                fontSize: "14px",
                borderBottom: "2px solid #303f9f",
                transition: "all 0.3s ease",
                position: "relative",
                width: "15%",
                textAlign: "center"
              }}>No of Days</th>
              <th style={{
                backgroundColor: "#553982",
                color: "white",
                padding: "16px 12px",
                textAlign: "left",
                fontWeight: "600",
                fontSize: "14px",
                borderBottom: "2px solid #303f9f",
                transition: "all 0.3s ease",
                position: "relative",
                width: "15%",
                textAlign: "center"
              }}>Target Semesters</th>
              <th style={{
                backgroundColor: "#553982",
                color: "white",
                padding: "16px 12px",
                textAlign: "left",
                fontWeight: "600",
                fontSize: "14px",
                borderBottom: "2px solid #303f9f",
                transition: "all 0.3s ease",
                position: "relative",
                width: "15%",
                textAlign: "center"
              }}>Module Details</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((row, index) => (
              <tr key={row._id} style={index % 2 !== 0 ? { backgroundColor: "#f8f9fa" } : {}}>
                <td style={{
                  padding: "10px 6px",
                  borderBottom: "1px solid #eaeaea",
                  fontSize: "14px",
                  color: "#555",
                  verticalAlign: "middle",
                  textAlign: "center"
                }}>{index + 1}</td>
                <td style={{
                  padding: "10px 6px",
                  borderBottom: "1px solid #eaeaea",
                  fontSize: "14px",
                  color: "#555",
                  verticalAlign: "middle",
                  textAlign: "center"
                }}>{row.trackName}</td>
                <td style={{
                  padding: "10px 6px",
                  borderBottom: "1px solid #eaeaea",
                  fontSize: "14px",
                  color: "#555",
                  verticalAlign: "middle",
                  textAlign: "center"
                }}>
                  <div style={{
                    display: "inline-block",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontWeight: "500",
                    fontSize: "13px",
                    textAlign: "center",
                    minWidth: "60px",
                    backgroundColor: "rgba(85, 57, 130, 0.1)",
                    color: "#553982",
                    border: "1px solid rgba(85, 57, 130, 0.2)",
                  }}>{row.proposedHour} hrs</div>
                </td>
                <td style={{
                  padding: "10px 6px",
                  borderBottom: "1px solid #eaeaea",
                  fontSize: "14px",
                  color: "#555",
                  verticalAlign: "middle",
                  textAlign: "center"
                }}>
                  <div style={{
                    display: "inline-block",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontWeight: "500",
                    fontSize: "13px",
                    textAlign: "center",
                    minWidth: "60px",
                    backgroundColor: "rgba(63, 81, 181, 0.1)",
                    color: "#3f51b5",
                    border: "1px solid rgba(63, 81, 181, 0.2)",
                  }}>{row.noOfDays} days</div>
                </td>
                <td style={{
                  padding: "10px 6px",
                  borderBottom: "1px solid #eaeaea",
                  fontSize: "14px",
                  color: "#555",
                  verticalAlign: "middle",
                  textAlign: "center"
                }}>{formatTargetSemesters(row.targetSemester)}</td>
                <td style={{
                  padding: "10px 6px",
                  borderBottom: "1px solid #eaeaea",
                  fontSize: "14px",
                  color: "#555",
                  verticalAlign: "middle",
                  textAlign: "center"
                }}>
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
                      backgroundColor: "#1f2937",
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: "none",
                      cursor: "pointer",
                      transition: "background 0.9s ease-in-out",
                      outline: "none",
                      minWidth: "120px"
                    }}
                    onClick={() => handleViewDetails(row._id)}
                    onMouseEnter={(e) => {
                      const hoverEffect = e.currentTarget.querySelector('.hoverEffect');
                      if (hoverEffect) {
                        hoverEffect.style.width = "200px";
                        hoverEffect.style.height = "200px";
                      }
                    }}
                    onMouseLeave={(e) => {
                      const hoverEffect = e.currentTarget.querySelector('.hoverEffect');
                      if (hoverEffect) {
                        hoverEffect.style.width = "0";
                        hoverEffect.style.height = "0";
                      }
                    }}
                  >
                    <span
                      className="hoverEffect"
                      style={{
                        position: "absolute",
                        width: "0",
                        height: "0",
                        backgroundColor: "#ea580c",
                        borderRadius: "50%",
                        transition: "width 0.5s ease-out, height 0.5s ease-out",
                        transform: "translate(-50%, -50%)",
                        top: "50%",
                        left: "50%",
                      }}
                    ></span>
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
                    <span
                      style={{
                        position: "absolute",
                        inset: "0",
                        width: "100%",
                        height: "100%",
                        marginTop: "-4px",
                        borderRadius: "8px",
                        opacity: "0.3",
                        background: "linear-gradient(to bottom, transparent, transparent, #e5e7eb)",
                      }}
                    ></span>
                    <span style={{ position: "relative", zIndex: "2" }}>
                      More Details
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Using the new TrainingModuleModal component */}
      <TrainingModuleModal
        isOpen={showModal}
        onClose={closeModal}
        selectedTrack={selectedTrack}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
      />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 768px) {
          .container {
            padding: 15px;
          }
          
          .header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .heading {
            font-size: 24px;
            margin-bottom: 15px;
          }
        }
      `}</style>
    </div>
  );
};
export default TrainingTracksTable;