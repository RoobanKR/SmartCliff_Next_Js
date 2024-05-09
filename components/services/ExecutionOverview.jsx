import React, { useState, useEffect } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { events } from "@/data/events";
import { fetchExecutionOverview } from "@/redux/slices/services/executionOverview/ExecutionOverview";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function ExecutionOverview1({ serviceId }) {
  const dispatch = useDispatch();
  const [showSlider, setShowSlider] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);

  // Fetch execution overview data
  useEffect(() => {
    dispatch(fetchExecutionOverview());
  }, [dispatch]);

  useEffect(() => {
    setShowSlider(true);
  }, []);

  const executionOverviews = useSelector(
    (state) => state.executionOverviews.executionOverviews
  );

  const handleYearFilter = (year) => {
    setSelectedYear(year);
  };

  const uniqueYears = Array.from(
    new Set(executionOverviews.map((overview) => overview.year))
  ).sort((a, b) => b - a); // Sort in descending order

  // Filter and sort execution overviews based on selected year, then sort by year in descending order
  const filteredOverview = executionOverviews
    .filter(
      (executionOverview) =>
        executionOverview.service._id === serviceId &&
        (!selectedYear || executionOverview.year === selectedYear)
    )
    .sort((a, b) => b.year - a.year); // Sort by year in descending order

  const jumpAnimation = {
    animationName: {
      "0%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-5px)" },
      "100%": { transform: "translateY(0)" },
    },
    animationDuration: "1s",
    animationIterationCount: "infinite",
  };

  return (
    <section className="layout-pt-sm layout-pb-sm bg-light-4">
      <div className="container">
        <div className="row y-gap-20 justify-between items-center">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle">
                <h2
                  className="sectionTitle__title "
                  style={{ fontFamily: "Serif" }}
                >
                  Execution Overview
                </h2>
                <p
                  className="sectionTitle__text"
                  style={{ fontFamily: "Serif" }}
                >
                  Lorem ipsum dolor sit amet, consectetur.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-60 lg:pt-50 js-section-slider">
          {showSlider && (
            <>
              <div style={{ marginTop: "10px", fontFamily: "serif" }}>
                Filter based on Year: <br />
                <button
                  className={`year-button ${
                    selectedYear === "" ? "selected" : ""
                  }`}
                  onClick={() => handleYearFilter("")}
                  style={{
                    marginRight: "10px",
                    backgroundColor:
                      selectedYear === "" ? "#725589" : "#f7f8fb",
                    padding: "10px",
                    borderRadius: "8px",
                    color: selectedYear === "" ? "white" : "black", // Text color
                    marginTop: "10px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  All Years
                </button>
                {[...uniqueYears].map((year) => (
                  <button
                    key={year}
                    className={`year-button ${
                      selectedYear === year ? "selected" : ""
                    }`}
                    onClick={() => handleYearFilter(year)}
                    style={{
                      marginRight: "10px",
                      backgroundColor:
                        selectedYear === year ? "#725589" : "#f7f8fb",
                      padding: "10px",
                      borderRadius: "8px",
                      marginTop: "10px",
                      border: "none",
                      color: selectedYear === year ? "white" : "black", // Text color
                      cursor: "pointer",
                    }}
                  >
                    {year}
                  </button>
                ))}
              </div>

              <br />

              <Swiper
                className="overflow-visible"
                // {...setting}
                modules={[Navigation, Pagination]}
                pagination={{
                  el: ".event-six-pagination",
                  clickable: true,
                }}
                navigation={{
                  nextEl: ".icon-arrow-right-event-six",
                  prevEl: ".icon-arrow-left-event-six",
                }}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  // when window width is >= 576px
                  450: {
                    slidesPerView: 2,
                  },
                  // when window width is >= 768px
                  768: {
                    slidesPerView: 3,
                  },
                  1200: {
                    // when window width is >= 992px
                    slidesPerView: 4,
                  },
                }}
              >
                {filteredOverview.map((elm, i) => (
                  <SwiperSlide key={i} className="swiper-slide">
                    <div className="swiper-slide">
                      <div
                        className="bg-white rounded-8 shadow-1 px-20 py-20"
                        data-aos="fade-left"
                        data-aos-duration={(i + 1) * 400}
                      >
                        <div className="d-flex items-center">
                          <div className="size-60 d-flex flex-column justify-center items-center rounded-8 bg-dark-1 text-center mr-20">
                            <div
                              className="text-17 lh-15 text-white fw-500"
                              style={{ fontFamily: "Serif" }}
                            >
                              {elm.year}
                            </div>
                            {/* <div className="lh-1 text-white fw-500">
                              {elm.date
                                .split(" ")[1]
                                .split(",")[0]
                                .toUpperCase()}
                            </div> */}
                          </div>
                          <div
                            className="linkCustom"
                            style={{ fontFamily: "Serif" }}
                          >
                            {elm.type[0]} : {elm.typeName[0]}
                          </div>
                        </div>
                        <div className="d-flex items-center mt-20">
                          <div className="icon-location text-14 mr-10"></div>
                          <div
                            className="text-14 lh-1"
                            style={{ fontFamily: "Serif" }}
                          >
                            Batch : {elm.batchName}
                          </div>
                        </div>
                        <div className="d-flex items-center mt-20">
                          <div className="icon-location text-14 mr-10"></div>
                          <div
                            className="text-14 lh-1"
                            style={{ fontFamily: "Serif" }}
                          >
                            Satck : {elm.stack.stack}
                          </div>
                        </div>
                        <div className="d-flex items-center mt-20">
                          <div className="icon-location text-14 mr-10"></div>
                          <div
                            className="text-14 lh-1"
                            style={{ fontFamily: "Serif" }}
                          >
                            Duartion : {elm.duration}
                          </div>
                        </div>
                        <div className="d-flex items-center mt-20">
                          <div className="icon-location text-14 mr-10"></div>
                          <div
                            className="text-14 lh-1"
                            style={{ fontFamily: "Serif" }}
                          >
                            Status : {elm.status}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="d-flex justify-center x-gap-15 items-center pt-60 lg:pt-40">
                <div className="col-auto">
                  <button className="d-flex items-center text-24 arrow-left-hover js-prev icon-arrow-left-event-six">
                    <i className="icon icon-arrow-left"></i>
                  </button>
                </div>
                <div className="col-auto">
                  <div className="pagination -arrows js-pagination event-six-pagination"></div>
                </div>
                <div className="col-auto">
                  <button className="d-flex items-center text-24 arrow-right-hover js-next icon-arrow-right-event-six">
                    <i className="icon icon-arrow-right"></i>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
