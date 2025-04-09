import { BorderBottom } from "@mui/icons-material";
import React, { useEffect } from "react";
const TrainingModulesSummary = ({ selectedTrack }) => {
  const summaryData = selectedTrack?.trainingModuleSummary || [];
  // Calculate overall totals for summary
  const calculateSummaryTotals = () => {
    const totalHours = summaryData.reduce((sum, item) => sum + item.TrainingInHours, 0);
    const totalDays = summaryData.reduce((sum, item) => sum + item.TrainingInDays, 0);
    return { totalHours, totalDays };
  };

  const summaryTotals = calculateSummaryTotals();

  // Styles
  const containerStyle = {
    width: "100%",
    padding: "16px",
    backgroundColor: "white",
    fontFamily: "Arial, sans-serif",
  };

  const headerContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  };

  const headerStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    // color: "#4a235a",
    color: "#553982",
    margin: 0,
  };

  const tableContainerStyle = {
    overflowX: "auto",
    borderRadius: "10px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thStyle = {
    padding: "16px",
    textAlign: "center",
    // border: "1px solid #4a235a",
    backgroundColor: "#553982",
    color: "white",
    // fontWeight: "bold",
  };

  const tdStyle = {
    padding: "16px",
    textAlign: "center",
    // border: "1px solid #cccccc",
    borderBottom: "1px solid rgb(211, 211, 211)",
  };

  const totalsRowStyle = {
    backgroundColor: " #332154",
    color: "white",
    fontWeight: "bold",
  };

  const totalsCellStyle = {
    padding: "16px",
    textAlign: "center",
    border: "1px solid #3a1d4a",
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerContainerStyle}>
        <h2 style={headerStyle}>Training Modules: Summary</h2>
      </div>

      {/* Table */}
      {/* Table */}
      {summaryData.length > 0 ? (
        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>SNo</th>
                <th style={thStyle}>Module Level</th>
                <th style={thStyle}>Training in Hours</th>
                <th style={thStyle}>Training in Days</th>
                <th style={thStyle}>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {summaryData.map((item, index) => (
                <tr key={index} style={{ backgroundColor: "white" }}>
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={tdStyle}>{item.moduleLevel}</td>
                  <td style={tdStyle}>{item.TrainingInHours}</td>
                  <td style={tdStyle}>{item.TrainingInDays}</td>
                  <td style={tdStyle}>{item.remarks}</td>
                </tr>
              ))}
              <tr style={totalsRowStyle}>
                <td style={{ ...totalsCellStyle, textAlign: "center" }} colSpan="2">
                  Total
                </td>
                <td style={totalsCellStyle}>{summaryTotals.totalHours}</td>
                <td style={totalsCellStyle}>{summaryTotals.totalDays}</td>
                <td style={totalsCellStyle}></td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#888", fontStyle: "italic", marginTop: "16px" }}>
          No training module summary available.
        </p>
      )}
    
    </div>
  );
};

export default TrainingModulesSummary;
