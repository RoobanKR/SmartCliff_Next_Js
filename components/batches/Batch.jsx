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

  const filteredBatches = batches.filter((batch) =>
  (batch.course.course_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
  (batch.category.category_name?.toLowerCase().includes(searchQuery.toLowerCase()))
);

  return (
    <>
      <section className="page-header -type-1 pt-30">
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

      <section className="layout-pt-sm layout-pb-lg">
        <div className="container">
        <div className="coolinput">
            {/* <label htmlFor="searchQuery" className="text">Search course by name:</label> */}
            <input
              type="text"
              id="searchQuery"
              placeholder="Courses"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input"
              style={{
                padding: "11px 10px",
                fontSize: "1.00rem",
                border: "2px #818CF8 solid",
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
                       <Link href={`/courses/${batch.course._id}`}>
                      <div className="eventCard -type-1">
                        <div className="eventCard__img">
                          <Image
                            width={510}
                            height={360}
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
                                  href={`/courses/${batch.course._id}`}
                                >
                                  {batch.course.course_name}
                                </Link>
                              </h4>
                              <div className="d-flex x-gap-15 pt-10">
                                <div className="d-flex items-center">
                                  <div className="icon-calendar-2 text-16 mr-8"></div>
                                  <div className="text-14">
                                    {" "}
                                    start Date:{""}
                                    {batch.start_date}
                                  </div>
                                </div>
                                <div className="d-flex items-center">
                                  <div className="icon-location text-16 mr-8"></div>
                                  <div className="text-14">{batch.branch}</div>
                                </div>
                              </div>
                              <div className="d-flex x-gap-15 pt-10">
                                <div className="d-flex items-center">
                                  <div className="icon-person-3 text-16 mr-8"></div>
                                  {batch.course.instructor.map((instructor) => (
                                    <div
                                      key={instructor._id}
                                      className="text-14"
                                    >
                                      Trainer:{""} {instructor.name}
                                    </div>
                                  ))}
                                </div>
                                <div className="d-flex items-center">
                                  <div className="icon-message text-16 mr-8"></div>
                                  <div className="text-14">{batch.contact}</div>
                                </div>
                              </div>
                              <div className="d-flex x-gap-15 pt-10">
                                <div className="d-flex items-center">
                                  <div className="icon-online-learning-4 text-16 mr-8"></div>
                                  <div className="text-14">
                                    {" "}
                                    Batch Type : {batch.batch_type}
                                  </div>
                                </div>
                                <div className="d-flex items-center">
                                  <div className="icon-time-management text-16 mr-8"></div>
                                  <div className="text-14">
                                    {batch.mode_of_type}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="eventCard__button">
                              <Link
                                href={`/entrollBatch`}
                                className="button -sm -rounded -outline-purple-1 text-purple-1 px-25"
                              >
                                Enroll
                              </Link>
                            </div>
                            <div className="eventCard__button">
                              <Link
                                href={`/courses/${batch.course._id}`}
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