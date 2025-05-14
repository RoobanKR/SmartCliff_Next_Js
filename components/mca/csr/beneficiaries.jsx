import { getAllDPBeneficiaries } from "@/redux/slices/mca/beneficiaries/beneficiaries";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
 
export default function Beneficiaries({ ids }) {
    const fullUrl = typeof window !== "undefined" ? window.location.href : "";
    const segments = fullUrl.split("/").filter(Boolean);
    const lastSegment = segments.pop();
    const secondLastSegment = segments.pop();
 
    const isSkilling = lastSegment === "skilling";
    const isDP = lastSegment === "dp";
 
    const { dpBeneficiaries, loading, error } = useSelector((state) => state.dpBeneficiaries);
    const beneficiaries =
        dpBeneficiaries?.filter((beneficiarie) => beneficiarie.degree_program._id === ids) || [];
 
    return (
        <div style={styles.page}>
            {/* Beneficiaries Section Title with decorative lines */}
            <div className="program-subtitle">
                <span className="subtitle-line"></span>
                <span className="subtitle-text">Beneficiaries</span>
                <span className="subtitle-line"></span>
            </div>
 
            {/* Degree Programme Section */}
            <div style={styles.card}>
                <h2 style={styles.title}>
                    {isSkilling ? "🎯 Skilling" : "🎓 Degree Programme"}
                </h2>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>No. of Candidates</th>
                            {isSkilling ? (
                                <>
                                    <th style={styles.th}>Batch</th>
                                    <th style={styles.th}>Hours</th>
                                    <th style={styles.th}>Duration</th>
                                </>
                            ) : (
                                <>
                                    <th style={styles.th}>College</th>
                                    <th style={styles.th}>Programme</th>
                                    <th style={styles.th}>Batch</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {beneficiaries.map((item, index) => (
                            <tr key={index}>
                                <td style={styles.td}>{item.noOfCandidates || 'N/A'}</td>
                                {isSkilling ? (
                                    <>
                                        <td style={styles.td}>{item.batch || 'N/A'}</td>
                                        <td style={styles.td}>{item.hours || 'N/A'}</td>
                                        <td style={styles.td}>{item.duration || 'N/A'}</td>
                                    </>
                                ) : (
                                    <>
                                        <td style={styles.td}>{item.college || 'N/A'}</td>
                                        <td style={styles.td}>{item.programme || 'N/A'}</td>
                                        <td style={styles.td}>{item.batch || 'N/A'}</td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
 
            {/* Add the CSS for the subtitle styling */}
            <style jsx>{`
                .program-subtitle {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 20px 0;
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
            `}</style>
        </div>
    );
}
 
// Inline styles
const styles = {
    page: {
        padding: "40px",
        backgroundColor: "#f0f2f5",
        fontFamily: "Segoe UI, sans-serif",
    },
    card: {
        backgroundColor: "#fff",
        padding: "24px",
        marginBottom: "40px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    },
    title: {
        fontSize: "20px",
        fontWeight: "600",
        marginBottom: "20px",
        color: "#2C3E50",
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    table: {
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: "0 10px",
    },
    th: {
        textAlign: "left",
        padding: "12px 16px",
        backgroundColor: "#eaf1f8",
        color: "#34495e",
        fontWeight: "600",
    },
    td: {
        backgroundColor: "#ffffff",
        padding: "12px 16px",
        color: "#333",
        borderBottom: "1px solid #e0e0e0",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.03)",
    },
};
 