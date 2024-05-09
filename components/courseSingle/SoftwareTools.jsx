import React from "react";

export default function SoftwareTools({ softwareTools = [] }) {
  // Ensure there are enough tools to display
  if (softwareTools.length === 0) {
    return null; // Or render a message indicating that there are no tools
  }

  // Function to chunk the software tools array into smaller arrays with four elements each
  const chunkArray = (array, size) => {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
      array.slice(index * size, index * size + size)
    );
  };

  // Chunk the software tools array into arrays with four elements each
  const chunkedTools = chunkArray(softwareTools, 4);

  return (
    <div className="mt-4" style={{ fontFamily: "Serif" }}>
      <br />
      <div className="sectionTitle">
        <h2 className="sectionTitle__title">Software Tools</h2>
      </div>
      <br />
      <div className="tools-container">
        {/* Map through the chunked tools and render each row */}
        {chunkedTools.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {/* Map through the tools in each row and render */}
            {row.map((tool, toolIndex) => (
              <div key={tool._id} className="col-lg-3 col-md-6 col-sm-12 mb-4">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100px",
                      maxWidth: "200px",
                      margin: "auto",
                    }}
                    src={tool.image}
                    alt={tool.software_name}
                  />
                  <p style={{ marginTop: "10px" }}>{tool.software_name}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Responsive adjustments */}
      <style jsx>{`
        @media (max-width: 767px) {
          .row {
            display: flex;
            flex-wrap: wrap;
            margin-right: -15px;
            margin-left: -15px;
          }
          .col-lg-3 {
            flex: 0 0 100%;
            max-width: 100%;
          }
        }
        @media (min-width: 768px) {
          .row {
            display: flex;
            flex-wrap: wrap;
            margin-right: -15px;
            margin-left: -15px;
          }
          .col-lg-3 {
            flex: 0 0 25%;
            max-width: 25%;
          }
        }
      `}</style>
    </div>
  );
}
