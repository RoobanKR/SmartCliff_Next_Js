import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import TrainingModuleComponent from "./SummaryTable";
const TrainingModuleModal = ({
    isOpen,
    onClose,
    selectedTrack,
    selectedLevel,
    setSelectedLevel
}) => {
    const [activeTab, setActiveTab] = useState("levels"); // 'objective', 'levels', or 'summary'

    // Calculate total hours and days for the selected level
    const calculateTotals = () => {
        if (!selectedTrack || selectedLevel === null)
            return { totalHours: 0, totalDays: 0 };

        if (
            !selectedTrack.trainingModuleLevels ||
            !selectedTrack.trainingModuleLevels[selectedLevel]
        ) {
            return { totalHours: 0, totalDays: 0 };
        }

        const modules = selectedTrack.trainingModuleLevels[selectedLevel].modules;
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
    if (!isOpen || !selectedTrack) return null;

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
        }}>
            <div style={{
                backgroundColor: "white",
                borderRadius: "10px",
                width: "95%",
                maxWidth: "900px",
                height: "90vh", // Fixed height
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
                animation: "fadeInModal 0.3s ease",
                position: "relative",
            }}>
                {/* Modal Header */}
                <div style={{
                    padding: "20px",
                    borderBottom: "1px solid #eaeaea",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    flexShrink: 0, // Prevent header from shrinking
                }}>
                    <h2 style={{
                        width: "90%",
                        margin: 0,
                        fontSize: window.innerWidth <= 768 ? "15px" : "22px",
                        fontWeight: "700",
                        color: "#553982",
                    }}>{selectedTrack.trackName}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "8px",
                            padding: window.innerWidth <= 768 ? "2px 3px" : "4px 6px",
                            border: "none",
                            backgroundColor: "#b91616",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: window.innerWidth <= 768 ? "15px" : "22px",
                            color: "white",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                        }}
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Main Tabs - Fixed position */}
                <div style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginBottom: "0px",
                    padding: "10px 20px",
                    borderBottom: "1px solid #eaeaea",
                    backgroundColor: "#f8f9fa",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    gap: "10px",
                    flexWrap: "wrap",
                    flexShrink: 0, // Prevent tabs from shrinking
                }}>
                    <button
                        onClick={() => setActiveTab("objective")}
                        style={{
                            padding: window.innerWidth <= 768 ? "4px 8px" : "8px 16px",
                            backgroundColor: activeTab === "objective" ? "#553982" : "#e0e0e0",
                            color: activeTab === "objective" ? "white" : "#555",
                            cursor: "pointer",
                            borderRadius: "4px",
                            fontWeight: "500",
                            fontSize: window.innerWidth <= 768 ? "12px" : "14px",
                            border: "none",
                            transition: "all 0.2s ease",
                        }}
                    >
                        Objective
                    </button>

                    {/* Level tabs directly integrated in the top tabs section */}
                    {selectedTrack.trainingModuleLevels?.map((level, idx) => (
                        <button
                            key={level._id || idx}
                            onClick={() => {
                                setActiveTab("levels");
                                setSelectedLevel(idx);
                            }}
                            style={{
                                padding: window.innerWidth <= 768 ? "4px 8px" : "8px 16px",
                                backgroundColor: activeTab === "levels" && idx === selectedLevel
                                    ? "#553982"
                                    : "#e0e0e0",
                                color: activeTab === "levels" && idx === selectedLevel
                                    ? "white"
                                    : "#555",
                                cursor: "pointer",
                                borderRadius: "4px",
                                fontWeight: "500",
                                fontSize: window.innerWidth <= 768 ? "12px" : "14px",
                                border: "none",
                                transition: "all 0.2s ease",
                            }}
                        >
                            Level {idx + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setActiveTab("summary")}
                        style={{
                            padding: window.innerWidth <= 768 ? "4px 8px" : "8px 16px",
                            backgroundColor: activeTab === "summary" ? "#553982" : "#e0e0e0",
                            color: activeTab === "summary" ? "white" : "#555",
                            cursor: "pointer",
                            borderRadius: "4px",
                            fontWeight: "500",
                            fontSize: window.innerWidth <= 768 ? "12px" : "14px",
                            border: "none",
                            transition: "all 0.2s ease",
                        }}
                    >
                        Summary
                    </button>
                </div>

                {/* Scrollable Content Area */}
                <div style={{
                    padding: "20px",
                    overflowY: "auto",
                    flexGrow: 1, // Take up remaining space
                }}>
                    {activeTab === "objective" && (
                        <div style={{
                            backgroundColor: "#f8f9fa",
                            padding: "25px",
                            borderRadius: "8px",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
                            minHeight: "200px",
                            display: "flex",
                            flexDirection: "column",
                        }}>
                            <h3 style={{
                                fontSize: "18px",
                                fontWeight: "700",
                                color: "#553982",
                                margin: "0 0 15px 0",
                            }}>Training Objective</h3>
                            <p style={{
                                whiteSpace: "pre-line",
                                lineHeight: "1.6",
                                fontSize: "15px",
                                color: "#444",
                                margin: 0,
                            }}>
                                {selectedTrack.objecttive || "No objective available for this track."}
                            </p>
                        </div>
                    )}

                    {activeTab === "levels" && (
                        <>
                            {/* Level Content */}
                            <h3 style={{
                                fontSize: "18px",
                                fontWeight: "700",
                                color: "#553982",
                                margin: "0 0 20px 0",
                                textAlign: "left",
                                display: "flex",
                                alignItems: "center",
                            }}>
                                <span style={{
                                    marginRight: "10px",
                                    width: "30px",
                                    height: "30px",
                                    backgroundColor: "#553982",
                                    borderRadius: "50%",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                }}>L{selectedLevel + 1}</span>
                                Training Modules: Level {selectedLevel + 1}
                            </h3>

                            {/* Module Table */}
                            <div style={{ overflowX: "auto" }}>
                                <table style={{
                                    width: "100%",
                                    borderCollapse: "separate",
                                    borderSpacing: "0",
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                    boxShadow: "0 0 15px rgba(0, 0, 0, 0.05)",
                                    minWidth: "600px"
                                }}>
                                    <thead>
                                        <tr>
                                            <th style={{
                                                backgroundColor: "#553982",
                                                color: "white",
                                                padding: "14px 16px",
                                                fontWeight: "600",
                                                fontSize: "14px",
                                                textAlign: "center",
                                                borderBottom: "2px solid #422c64",
                                            }}>Module No</th>
                                            <th style={{
                                                backgroundColor: "#553982",
                                                color: "white",
                                                padding: "14px 16px",
                                                fontWeight: "600",
                                                fontSize: "14px",
                                                textAlign: "center",
                                                borderBottom: "2px solid #422c64",
                                            }}>Module Name</th>
                                            <th style={{
                                                backgroundColor: "#553982",
                                                color: "white",
                                                padding: "14px 16px",
                                                fontWeight: "600",
                                                fontSize: "14px",
                                                textAlign: "center",
                                                borderBottom: "2px solid #422c64",
                                            }}>Training Component in Hours</th>
                                            <th style={{
                                                backgroundColor: "#553982",
                                                color: "white",
                                                padding: "14px 16px",
                                                fontWeight: "600",
                                                fontSize: "14px",
                                                textAlign: "center",
                                                borderBottom: "2px solid #422c64",
                                            }}>Training Component in Days (6 Hours / Day)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedTrack.trainingModuleLevels[selectedLevel]?.modules.map((module, idx) => (
                                            <tr
                                                key={module._id || idx}
                                                style={idx % 2 !== 0 ? { backgroundColor: "#f8f9fa" } : {}}
                                            >
                                                <td
                                                    style={{
                                                        padding: "14px 16px",
                                                        borderBottom: "1px solid #eaeaea",
                                                        fontSize: "14px",
                                                        color: "#444",
                                                        backgroundColor: "white",
                                                        textAlign: "center"
                                                    }}
                                                >
                                                    {idx + 1}
                                                </td>
                                                <td style={{
                                                    padding: "14px 16px",
                                                    borderBottom: "1px solid #eaeaea",
                                                    fontSize: "14px",
                                                    color: "#444",
                                                    backgroundColor: "white",
                                                    textAlign: "center"
                                                }}>
                                                    {module.modulename}
                                                </td>
                                                <td
                                                    style={{
                                                        padding: "14px 16px",
                                                        borderBottom: "1px solid #eaeaea",
                                                        fontSize: "14px",
                                                        color: "#444",
                                                        backgroundColor: "white",
                                                        textAlign: "center"
                                                    }}
                                                >
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
                                                    }}>
                                                        {module.TrainingComponentInHours} hrs
                                                    </div>
                                                </td>
                                                <td
                                                    style={{
                                                        padding: "14px 16px",
                                                        borderBottom: "1px solid #eaeaea",
                                                        fontSize: "14px",
                                                        color: "#444",
                                                        backgroundColor: "white",
                                                        textAlign: "center"
                                                    }}
                                                >
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
                                                    }}>
                                                        {module.TrainingComponentInDays} days
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr style={{
                                            backgroundColor: "#332154",
                                            color: "white",
                                            fontWeight: "600",
                                        }}>
                                            <td
                                                style={{
                                                    padding: "14px 16px",
                                                    color: "white",
                                                    textAlign: "center",
                                                    fontSize: "15px",
                                                    fontWeight: "600",
                                                }}
                                                colSpan="2"
                                            >
                                                Total
                                            </td>
                                            <td style={{
                                                padding: "14px 16px",
                                                color: "white",
                                                textAlign: "center",
                                                fontSize: "15px",
                                                fontWeight: "600",
                                            }}>
                                                <div style={{
                                                    display: "inline-block",
                                                    padding: "4px 8px",
                                                    borderRadius: "4px",
                                                    fontWeight: "500",
                                                    fontSize: "13px",
                                                    textAlign: "center",
                                                    minWidth: "60px",
                                                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                                                    border: "1px solid rgba(255, 255, 255, 0.4)",
                                                    color: "white",
                                                }}>
                                                    {calculateTotals().totalHours} hrs
                                                </div>
                                            </td>
                                            <td style={{
                                                padding: "14px 16px",
                                                color: "white",
                                                textAlign: "center",
                                                fontSize: "15px",
                                                fontWeight: "600",
                                            }}>
                                                <div style={{
                                                    display: "inline-block",
                                                    padding: "4px 8px",
                                                    borderRadius: "4px",
                                                    fontWeight: "500",
                                                    fontSize: "13px",
                                                    textAlign: "center",
                                                    minWidth: "60px",
                                                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                                                    border: "1px solid rgba(255, 255, 255, 0.4)",
                                                    color: "white",
                                                }}>
                                                    {calculateTotals().totalDays} days
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                    {activeTab === "summary" && (
                        <TrainingModuleComponent
                            selectedTrack={selectedTrack}
                        />
                    )}
                </div>
            </div>

            <style>{`
        @keyframes fadeInModal {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};
export default TrainingModuleModal;