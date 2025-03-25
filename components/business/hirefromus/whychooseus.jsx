import { getAllCurrentAvailabilities } from "@/redux/slices/bussiness/currentAvailbility/currentAvailbility";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SkillsetTable = () => {
  const dispatch = useDispatch();
  const { availabilities, loading, error } = useSelector((state) => state.currentAvailability);

  useEffect(() => {
    dispatch(getAllCurrentAvailabilities());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        Current <span style={styles.highlight}>Availability</span>
      </h2>
      <table style={styles.table}>
        <thead>
          <tr>
            {[
              "Skillset",
              "No. of Resources",
              "Training Duration",
              "Batch",
              "Years of Experience",
              "On Board Remarks",
            ].map((header, index) => (
              <th key={index} style={styles.th}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {availabilities.map((row, index) => (
            <tr key={index}>
              <td style={styles.td}>{row.skillset}</td>
              <td style={styles.td}>{row.resources}</td>
              <td style={styles.td}>{row.duration}</td>
              <td style={styles.td}>{row.batch}</td>
              <td style={styles.td}>{row.experience}</td>
              <td style={{ ...styles.td, color: row.remarks === "Available" ? "green" : "red", fontWeight: "bold" }}>
                {row.remarks}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        @media (max-width: 768px) {
          .responsive-table {
            display: block;
            overflow-x: auto; /* Enable horizontal scrolling */
            white-space: nowrap; /* Prevent text wrapping */
          }

          th, td {
            padding: 8px;
            font-size: 14px; /* Adjust font size for smaller screens */
          }
        }

        @media (max-width: 480px) {
          th, td {
            padding: 6px;
            font-size: 12px; /* Further adjust font size for very small screens */
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    overflowX: "auto", // Allow horizontal scrolling on small screens
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  highlight: {
    color: "#9c27b0",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
    textAlign: "center",
  },
  th: {
    padding: "12px",
    borderBottom: "2px solid #ddd",
    background: "#f4f4f4",
  },
  td: {
    padding: "12px",
    textAlign: "center",
  },
};

export default SkillsetTable;