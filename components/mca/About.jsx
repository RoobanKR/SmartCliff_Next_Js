"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAboutCollegeData } from "@/redux/slices/mca/aboutCollege/aboutCollege";
import { useParams } from "next/navigation";

export default function About({ collegeId, ids }) {
  const dispatch = useDispatch();
  const aboutCollegeData = useSelector(
    (state) => state.aboutCollege.aboutCollegeData
  );
  const loading = useSelector((state) => state.aboutCollege.loading);
  const error = useSelector((state) => state.aboutCollege.error);
  const { id } = useParams();

  const fullUrl = typeof window !== "undefined" ? window.location.href : "";
  const segments = fullUrl.split("/").filter(Boolean);
  const lastSegment = segments.pop();
  const secondLastSegment = segments.pop();
  const thirdLastSegment = segments.pop();

  useEffect(() => {
    dispatch(fetchAboutCollegeData());
  }, [dispatch]);

  // Filter colleges based on collegeId parameter
  const matchedAboutColleges = aboutCollegeData.filter(
    (about) => about.college && about.college.some((i) => i._id === collegeId)
  );

  const selectedAboutCollege = aboutCollegeData.find(
    (program) => program?._id === ids
  );

  // Determine which data to display based on the URL segment
  let displayData = [];
  if (secondLastSegment === "csr" && selectedAboutCollege) {
    displayData = [selectedAboutCollege];
  } else if (thirdLastSegment === "b2i" && matchedAboutColleges.length > 0) {
    displayData = matchedAboutColleges;
  }

  return (
    <>
      {/* Display content for each college in displayData */}
      {displayData.length > 0 ? (
        displayData.map((college, collegeIndex) => (
          <React.Fragment key={collegeIndex}>
            <section
              style={{
                paddingTop: thirdLastSegment === "csr" ? "90px" : "50px",
                backgroundColor: "white",
              }}
            >
              <div className="container">
                <div
                  className="page-header__content"
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                >
                  <div className="row justify-center">
                    <div className="col-auto">
                      <div>
                        <h1
                          style={{
                            color: "#8952a8",
                            textTransform: "uppercase",
                            letterSpacing: "2px",
                            fontSize: "32px",
                            fontWeight: "bold",
                            marginBottom: "10px",
                          }}
                        >
                          {college.title}
                        </h1>
                        <div
                          style={{
                            height: "3px",
                            width: "100px",
                            margin: "8px auto",
                            background:
                              "linear-gradient(to right, gray 40%, #8952a8 40%)",
                          }}
                        ></div>
                      </div>

                      <div>
                        <p
                          style={{
                            fontStyle: "italic",
                            color: "black",
                            fontSize: "18px",
                            marginTop: "10px",
                          }}
                        >
                          {college.slogan}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section
              className="image-content-section"
              style={{
                margin: "0px 0",
                backgroundColor: "white",
                padding: "0px 0"
              }}
            >
              <div className="container">
                <div className={`row ${collegeIndex % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Image Column */}
                  <div className="col-lg-5 col-md-12 image-col">
                    <div className="image-container">
                      {college.images && college.images.length > 0 && (
                        <img
                          src={college.images[0]}
                          alt={college.title}
                          className="college-image"
                        />
                      )}
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className="col-lg-7 col-md-12 content-col">
                    <div className="content-container">
                      <h2 className="section-subtitle">
                        <span className="title-with-line">
                          About Program
                        </span>
                      </h2>
                      <p className="program-description">
                        {college.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </React.Fragment>
        ))
      ) : (
        <div className="container" style={{ padding: "50px 0", textAlign: "center" }}>
          <p style={{ fontSize: "18px", color: "#666" }}>No matching college information found.</p>
        </div>
      )}

      <style jsx>{`
        .row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          margin: 0 -15px;
        }
        
        .flex-row {
          flex-direction: row;
        }
        
        .flex-row-reverse {
          flex-direction: row-reverse;
        }
        
        .justify-center {
          justify-content: center;
        }
        
        .col-auto {
          flex: 0 0 auto;
        }
        
        .image-col, .content-col {
          padding: 0 15px;
          box-sizing: border-box;
        }
        
        .image-container {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          margin: 0 20px;
        }
        
        .image-container:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        
        .college-image {
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 12px;
          aspect-ratio: 4/3;
          display: block;
        }
        
        .content-container {
          padding: 20px 30px;
        }
        
        .section-subtitle {
          color: #5b2c6f;
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 20px;
          position: relative;
          padding-bottom: 10px;
        }
        
        .title-with-line {
          display: inline-block;
          position: relative;
        }
        
        .title-with-line::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 50px;
          height: 3px;
          background-color: #8952a8;
        }
        
        .program-description {
          text-align: justify;
          line-height: 1.8;
          font-size: 16px;
          color: #333;
        }
        
        /* Medium screens */
        @media (max-width: 992px) {
          .image-col, .content-col {
            flex: 0 0 100%;
            max-width: 100%;
          }
          
          .row, .flex-row-reverse {
            flex-direction: column;
          }
          
          .image-container {
            margin-bottom: 30px;
            max-width: 80%;
            margin-left: auto;
            margin-right: auto;
          }
          
          .content-container {
            padding: 15px;
          }
        }
        
        /* Small screens */
        @media (max-width: 576px) {
          .image-container {
            max-width: 100%;
          }
          
          .content-container {
            padding: 10px 0;
          }
          
          .section-subtitle {
            font-size: 22px;
          }
        }
      `}</style>
    </>
  );
}