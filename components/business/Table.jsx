import React from "react";

export default function Table() {
  return (
    <div className="col-lg-12 mt-25" style={{ fontFamily: "sans-serif" }}>
      <div>
        <h1 className="page-header__title text-center">
          Eligibility for Placements
        </h1>
      </div>
      <div className="text-18 lh-1 text-dark-1 fw-500 mb-30"></div>
      <table className="table w-1/1">
        <thead>
          <tr>
            <th style={{ color: "black", fontWeight: "bold" }}>Criteria</th>
            <th style={{ color: "black", fontWeight: "bold" }}>
              Minimum Attendance
            </th>
            <th style={{ color: "black", fontWeight: "bold" }}>
              Minimum Internal Score
            </th>
            <th style={{ color: "black", fontWeight: "bold" }}>
              Mock and Assessment Interview
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Theory</td>
            <td>75%</td>
            <td>40%</td>
            <td>Recommendation</td>
          </tr>
          <tr>
            <td>Lab</td>
            <td>75%</td>
            <td>40%</td>
            <td>Recommendation</td>
          </tr>
          <tr>
            <td>Communication</td>
            <td>75%</td>
            <td>40%</td>
            <td>Recommendation</td>
          </tr>
          <tr>
            <td>Aptitude</td>
            <td>75%</td>
            <td>40%</td>
            <td>Not Applicable</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
