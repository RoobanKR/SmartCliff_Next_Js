"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchBatches } from "@/redux/slices/batch/batches";
import { useDispatch, useSelector } from "react-redux";

export default function Batch() {
  const dispatch = useDispatch();
  const batches = useSelector((state) => state.batches.batches);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchBatches());
  }, [dispatch]);

  const filteredBatches = batches.filter(
    (batch) =>
      batch.course.course_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      batch.category.category_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );
  console.log("filteredBatches", filteredBatches);
  return (
    <>
      <section
        className="page-header -type-1 pt-30"
        style={{ fontFamily: "serif" }}
      >
        <div className="container">
          <div className="page-header__content">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div>
                  <h1 className="page-header__title">Batches</h1>
                </div>

                <div>
                  <p className="page-header__text">
                    Upcoming Batches of Courses around the Tamil Nadu
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="layout-pt-sm layout-pb-lg"
        style={{ fontFamily: "serif" }}
      >
        <div className="container">
          <div className="coolinput">
            {/* <label htmlFor="searchQuery" className="text">Search course by name:</label> */}
            <input
              type="text"
              id="searchQuery"
              placeholder="Serch by course name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input"
              style={{
                padding: "11px 10px",
                fontSize: "1.00rem",
                border: "2px rgba(255, 255, 255, 0.15) solid",
                borderRadius: "5px",
                background: "#e8e8e8",
                width: "fit-content",
              }}
            />
          </div>
          {filteredBatches.length > 0 ? (
            <div className="tabs -pills js-tabs">
              <div className="tabs__content js-tabs-content">
                <div className="tabs__pane -tab-item-1 is-active">
                  <div className="row y-gap-30 pt-30">
                    {filteredBatches.map((batch, i) => (
                      <div key={i} className="col-lg-4 col-md-6">
                        <Link
                          href={`/courses/${batch.course.slug}/${batch.course._id}`}
                        >
                          <div className="eventCard -type-1">
                            <div className="eventCard__img">
                              <Image
                                width={510}
                                height={360}
                                style={{ width: "730px", height: "200px" }}
                                src={batch.image}
                                alt="image"
                              />
                            </div>

                            <div className="eventCard__bg bg-white">
                              <div className="eventCard__content y-gap-10">
                                <div className="eventCard__inner">
                                  <h4 className="eventCard__title text-17 fw-500">
                                    <Link
                                      className="linkCustom"
                                      href={`/courses/${batch.course.slug}/${batch.course._id}`}
                                    >
                                      {batch.course.course_name}
                                    </Link>
                                  </h4>
                                  <div className="text-14 pt-10">
                                    <div style={{ marginBottom: "8px" }}>
                                      <span className="mr-2">Start Date:</span>{" "}
                                      {batch.start_date}
                                    </div>
                                    <div style={{ marginBottom: "8px" }}>
                                      <span className="mr-2">Location:</span>{" "}
                                      {batch.branch}
                                    </div>
                                    <div style={{ marginBottom: "8px" }}>
                                      <span className="mr-2">Trainer:</span>{" "}
                                      {batch.course.instructor
                                        .map((instructor) => instructor.name)
                                        .join(", ")}
                                    </div>
                                    <div style={{ marginBottom: "8px" }}>
                                      <span className="mr-2">Contact:</span>{" "}
                                      {batch.contact}
                                    </div>
                                    <div style={{ marginBottom: "8px" }}>
                                      <span className="mr-2">Batch Type:</span>{" "}
                                      {batch.batch_type}
                                    </div>
                                    <div style={{ marginBottom: "25%" }}>
                                      <span className="mr-2">
                                        Mode of Type:
                                      </span>{" "}
                                      {batch.mode_of_type}
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className="eventCard__button"
                                  style={{
                                    position: "absolute",
                                    bottom: "10px",
                                    left: "10px",
                                  }}
                                >
                                  <Link
                                    href={`/entrollBatch`}
                                    className="button -sm -rounded -outline-purple-1 text-purple-1 px-25"
                                  >
                                    Enroll
                                  </Link>
                                </div>
                                <div
                                  className="eventCard__button"
                                  style={{
                                    position: "absolute",
                                    bottom: "10px",
                                    right: "10px",
                                  }}
                                >
                                  <Link
                                    href={`/courses/${batch.course.slug}/${batch.course._id}`}
                                    className="button -sm -rounded -outline-purple-1 text-purple-1 px-25"
                                  >
                                    Details
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Render message when no courses are coming soon
            <div className="text-center">
              <p>No Batch Available</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
