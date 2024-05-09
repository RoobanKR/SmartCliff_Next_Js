import React from "react";

export default function Instractor({ instructor = [] }) {
  if (!instructor || instructor.length === 0) {
    return null;
  }

  return (
    <div
      id="instructors"
      className="pt-60 lg:pt-40"
      style={{ fontFamily: "Serif" }}
    >
      <div className="sectionTitle">
        <h2 className="sectionTitle__title">Instructors</h2>
      </div>
      <div className="mt-30">
        {instructor.map((instructors) => (
          <div key={instructors._id} className="mb-40">
            <div className="d-flex flex-column flex-md-row align-items-start">
              <div className="size-120 mr-md-20 mb-20">
                <img
                  style={{ width: "100%", maxWidth: "300px", height: "auto" }}
                  className="object-cover"
                  src={instructors.profile_pic}
                  alt="Instructor Profile"
                />
              </div>
              <div className="flex-grow-1 ml-10">
                <h5 className="text-20 lh-14 fw-500">{instructors.name}</h5>
                <p className="mt-5">{instructors.designation}</p>
                <p className="text-20 mt-15">Specialization:</p>
                <ul
                  className="mt-1 list-unstyled"
                  style={{ paddingLeft: "1.25rem" }}
                >
                  {instructors.specialization.map((spec, index) => (
                    <li key={index} style={{ listStyleType: "disc" }}>
                      {spec}
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <p>{instructors.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
