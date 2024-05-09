import React from "react";

export default function Overview({ objective, disabled, opportunities }) {
  if (disabled) {
    return null;
  }

  // Function to chunk the opportunities array into smaller arrays with four elements each
  const chunkArray = (array, size) => {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
      array.slice(index * size, index * size + size)
    );
  };

  // Chunk the opportunities array into arrays with four elements each
  const chunkedOpportunities = chunkArray(opportunities, 4);

  return (
    <div
      id="overview"
      className="pt-60 lg:pt-40 to-over"
      style={{ fontFamily: "Serif" }}
    >
      <div className="sectionTitle">
        <h2 className="sectionTitle__title">Overview</h2>
      </div>
      <br></br>
      <h4 className="text-18 fw-500" style={{ textDecoration: "underline" }}>
        Description:
      </h4>
      <div className="show-more mt-30 js-show-more">
        <div className="">
          <p>{objective}</p>
        </div>
      </div>

      {/* Display career opportunities */}
      <h4
        className="text-18 fw-500 mt-30"
        style={{ textDecoration: "underline" }}
      >
        Career Opportunities:
      </h4>
      <div className="mt-4" style={{ fontFamily: "Serif" }}>
        {/* Map through the chunked opportunities and render each row */}
        {chunkedOpportunities.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {/* Map through the opportunities in each row and render */}
            {row.map((opportunity, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-6 col-sm-12 mb-4"
                style={{ textAlign: "center" }}
              >
                <img
                  style={{ width: "100%", maxWidth: "150px", height: "auto" }}
                  src={opportunity.image}
                  alt={opportunity.company_name}
                />
                <p style={{ marginTop: "10px" }}>{opportunity.company_name}</p>
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
