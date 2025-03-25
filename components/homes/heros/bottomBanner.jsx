const BottomBanner = () => {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#EADBC8",
        color: "#333",
        padding: "1px 0",
        textAlign: "center",
        fontSize: "22px",
        fontWeight: "bold",
        boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.15)",
        display: "block", // Forces block display
      }}
    >
      Build your success with{" "}
      <span style={{ color: "#EF5A6F" }}>SmartCliff</span> and
      <span style={{ color: "#405D72" }}> SHINE</span> in your career!
    </div>
  );
};

export default BottomBanner;
