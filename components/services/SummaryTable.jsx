import React from "react";
const TrainingModulesSummary = () => {
  // Data for summary view based on the image
  const summaryData = [
    { sNo: 1, level: "Level I", hours: 432, days: 72, remarks: "Compulsory" },
    { sNo: 2, level: "Level II", hours: 180, days: 30, remarks: "Compulsory" },
    { sNo: 3, level: "Level III", hours: 48, days: 8, remarks: "Compulsory" },
    {
      sNo: 4,
      level: "Level IV",
      hours: 120,
      days: 20,
      remarks: "Optional (Based on Company Needs)",
    },
  ];

  // Calculate overall totals for summary
  const calculateSummaryTotals = () => {
    const totalHours = summaryData.reduce((sum, item) => sum + item.hours, 0);
    const totalDays = summaryData.reduce((sum, item) => sum + item.days, 0);
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
    fontSize: "32px",
    fontWeight: "bold",
    color: "#4a235a",
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
    border: "1px solid #4a235a",
    backgroundColor: "#553982",
    color: "white",
    fontWeight: "bold",
  };

  const tdStyle = {
    padding: "16px",
    textAlign: "center",
    border: "1px solid #cccccc",
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

  const noteStyle = {
    marginTop: "16px",
    padding: "16px",
    backgroundColor: "#ffeb3b",
    color: "black",
  };

  const footerStyle = {
    marginTop: "24px",
    fontSize: "12px",
    color: "#666666",
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerContainerStyle}>
        <h2 style={headerStyle}>Training Modules: Summary</h2>
      </div>

      {/* Table */}
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>SNo</th>
              <th style={thStyle}>Module Level</th>
              <th style={thStyle}>Training in Hours</th>
              <th style={thStyle}>Training in Days (6 Hours / Day)</th>
              <th style={thStyle}>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {summaryData.map((item) => (
              <tr key={item.sNo} style={{ backgroundColor: "white" }}>
                <td style={tdStyle}>{item.sNo}</td>
                <td style={tdStyle}>{item.level}</td>
                <td style={tdStyle}>{item.hours}</td>
                <td style={tdStyle}>{item.days}</td>
                <td style={tdStyle}>{item.remarks}</td>
              </tr>
            ))}
            <tr style={totalsRowStyle}>
              <td
                style={{ ...totalsCellStyle, textAlign: "center" }}
                colSpan="2"
              >
                Total
              </td>
              <td style={totalsCellStyle}>{summaryTotals.totalHours}</td>
              <td style={totalsCellStyle}>{summaryTotals.totalDays}</td>
              <td style={totalsCellStyle}></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Note */}
      <div style={noteStyle}>
        <strong>Note:</strong> The proposed training hours are tentative and may
        be adjusted based on needs and the students' performance in the
        Pre-Assessment test before the commencement of training.
      </div>

      {/* Footer */}
      <div style={footerStyle}>©SmartCliff 2024 Confidential</div>
    </div>
  );
};

export default TrainingModulesSummary;
