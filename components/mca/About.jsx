"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { fetchAboutCollegeData } from "@/redux/slices/mca/aboutCollege/aboutCollege";
import { useParams, useRouter } from "next/navigation";

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
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

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
              <div className="container ">
                <div
                  className="page-header__content"
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    borderRadius: "8px",
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
                            fontSize: "35px",
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
              className=""
              style={{ marginTop: "10px", backgroundColor: "white" }}
            >
              <div className="container">
                <div className="row y-gap-50 justify-between items-start">
                  <div className="col-lg-6 sm:pr-15">
                    <div className="composition -type-8">
                      {college.images &&
                        college.images.map((image, index) => (
                          <div className={`-el-${index + 1}`} key={index}>
                            <Image
                              width={300}
                              height={400}
                              src={image}
                              alt="image"
                            />
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div
                      className="program-subtitle"
                      style={{ marginTop: "-10px" }}
                    >
                      <span
                        className="subtitle-text"
                        style={{ paddingTop: "-20px" }}
                      >
                        About Program
                      </span>
                    </div>
                    <p
                      className="text-dark-1 mt-10"
                      style={{ textAlign: "justify" }}
                    >
                      {college.description}
                    </p>
                    <p className="pr-10 lg:pr-0 mt-25"></p>
                  </div>
                </div>
              </div>
            </section>
          </React.Fragment>
        ))
      ) : (
        <div className="container">
          <p>No matching college information found.</p>
        </div>
      )}

      <style jsx>
        {`
          .program-subtitle {
            display: flex;
          }
          .subtitle-text {
            font-size: 2rem;
            margin: 0 15px;
            color: #5b2c6f;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
        `}
      </style>
    </>
  );
}
