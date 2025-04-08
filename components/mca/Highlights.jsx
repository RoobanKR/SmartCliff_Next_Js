import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHighlights } from "@/redux/slices/mca/highlights/Highlights";
import { useParams } from "next/navigation";
import "./css/HighlightsCards.css";

export default function Highlights() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const highlights = useSelector((state) => state.highlight.highlights);
  const filteredhighlights = highlights.filter(
    (highlights) =>
      highlights.degree_program && highlights.degree_program._id === id
  );
  useEffect(() => {
    dispatch(fetchAllHighlights());
  }, [dispatch]);

  return (
    <section
      className="layout-pt-sm layout-pb-md bg-light-3"
      style={{ fontFamily: "Serif" }}
    >
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle">
              <h2 className="sectionTitle__title">
                Smartcliff MCA vs Traditional MCA
              </h2>
              <p className="sectionTitle__text">
                Lorem ipsum dolor sit amet, consectetur.
              </p>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 pt-60 lg:pt-50 justify-content-center position-relative">
          {filteredhighlights.map((highlight, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div
                className={`highlight-card ${
                  index === 0 ? "primary-card" : "secondary-card"
                }`}
                data-aos="fade-right"
                data-aos-duration={500 * (index + 1)}
              >
                <div className="card-title-container">
                  <div className="card-main-title">{highlight.title}</div>
                  <div className="hover-text">hover me</div>
                </div>
                <div className="highlight-content">
                  <h3 className="highlight-title">{highlight.title}</h3>
                  <p className="highlight-description">
                    {highlight.description}
                  </p>

                  <div className="highlight-list">
                    {highlight.versus.map((subheading, i) => (
                      <div key={i} className="highlight-item">
                        <span className="highlight-icon">
                          {index === 0 ? (
                            <FontAwesomeIcon
                              icon={faCheck}
                              style={{ color: "green" }}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faTimes}
                              style={{ color: "red" }}
                            />
                          )}
                        </span>
                        <span className="highlight-text">
                          {subheading.subheading}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* VS Badge */}
          {filteredhighlights.length >= 2 && <div className="vs-badge">VS</div>}
        </div>
      </div>
    </section>
  );
}
