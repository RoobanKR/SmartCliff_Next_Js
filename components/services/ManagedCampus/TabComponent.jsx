import React, { useState, useEffect } from "react";
import axios from "axios";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "next/navigation";
import { fetchExecutionOverviews, fetchManagedCampus } from "@/redux/slices/services/managedCampus/managedCampus";
SwiperCore.use([Autoplay]);

export default function TabComponent({ backgroundColor, serviceId }) {
  // State variables initialization
  const [activeTab, setActiveTab] = useState(0);
  const [showSlider, setShowSlider] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const executionOverviews = useSelector((state) => state.managedCampus.executionOverviews);
  const dispatch = useDispatch();
  const managedCampus = useSelector((state) => state.managedCampus.data);

  // Fetch the id parameter from the URL
  const { id } = useParams();

  useEffect(() => {
    setShowSlider(true);
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(fetchManagedCampus(id));
    }
  }, [id, dispatch]);

  // Effect hook to fetch execution overviews based on the id parameter
  useEffect(() => {
    setShowSlider(true);
    dispatch(fetchExecutionOverviews());
  }, [dispatch]);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleYearFilter = (year) => {
    setSelectedYear(year);
  };

  const jumpAnimation = {
    animationName: {
      "0%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-5px)" },
      "100%": { transform: "translateY(0)" },
    },
    animationDuration: "1s",
    animationIterationCount: "infinite",
  };

  // Create a Set to store unique years
  const uniqueYears = new Set();
  if (Array.isArray(executionOverviews)) {
    executionOverviews.forEach((overview) => {
      uniqueYears.add(overview.year);
    });
  } else {
    console.error("executionOverviews is not an array");
  }

  return (
    <section className="pt-30 layout-pb-md" style={{ fontFamily: "serif" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="pt-25 pb-30 px-30 bg-white shadow-2 rounded-8 border-light">
              <div className="tabs -active-purple-2 js-tabs pt-0 ">
                <div className="tabs__controls d-flex js-tabs-controls">
                  {managedCampus &&
                    managedCampus.map((campus, index) => (
                      <button
                        key={index}
                        onClick={() => handleTabClick(index)}
                        className={`tabs__button js-tabs-button js-update-pin-scene ${
                          index !== 0 ? "ml-0" : ""
                        } ${index === activeTab ? "is-active" : ""}`}
                        type="button"
                        style={{
                          whiteSpace: "normal", // Allow text to wrap
                          // wordBreak: "break-word", // Ensure text breaks properly
                          fontSize: "14px", // Adjust font size for smaller screens
                          padding: "10px", // Add padding for spacing
                        }}
                      >
                        {campus.sub_title}
                      </button>
                    ))}
                </div>
                <div className="tabs__content js-tabs-content">
                  {/* Check if managedCampus is defined before rendering */}
                  {managedCampus &&
                    managedCampus.map((campus, index) => (
                      <div
                        key={index}
                        className={`tabs__pane -tab-item-${index + 1} ${
                          index === activeTab ? "is-active" : ""
                        }`}
                      >
                        {index === activeTab && (
                           <section className="layout-pt-sm layout-pb-sm section-bg">
                           <div className="container">
                             <div className="row y-gap-20 justify-center text-center">
                               <div className="col-auto">
                                 <div className="sectionTitle">
                                   <h2 className="sectionTitle__title">Executive Highlights</h2>
                                   <p className="sectionTitle__text">
                                     Executive highlights succinctly summarize key accomplishments, providing stakeholders with a snapshot of significant developments and achievements.
                                   </p>
                                 </div>
                               </div>
                             </div>
                       
                             <Swiper
                               modules={[Navigation, Pagination, Autoplay]}
                               autoplay={{ delay: 3000 }} // 3 seconds delay for autoplay
                               slidesPerView={1} // Display one slide
                               centeredSlides={true} // Center the active slide
                               spaceBetween={30} // Spacing between slides
                               navigation={{
                                 nextEl: ".swiper-next",
                                 prevEl: ".swiper-prev",
                               }}
                               pagination={{ clickable: true }} // Pagination dots
                               speed={1200} // Animation speed
                              //  loop={true} // Enable looping for a smooth experience
                             >
    {campus.execution_highlights.map(
                                  (highlight, index) => (                                 <SwiperSlide key={index}>
                                   <div className="infoCard -type-2 text-center py-40 -infoCard-hover">
                                     <div className="infoCard__image">
                                       <Image
                                         width={50}
                                         height={50}
                                         style={{ objectFit: 'cover' }}
                                         src={highlight.image}
                                         alt="Highlight Image"
                                       />
                                     </div>
                                     <h5 className="infoCard__title text-24 lh-1 mt-25">
                                       {highlight.stack}
                                     </h5>
                                     <p className="infoCard__text mt-5">
                                       {highlight.count}
                                     </p>
                                   </div>
                                 </SwiperSlide>
                               ))}
                             </Swiper>
                           </div>
                         </section>
                        )}

                        <section
                          className={`layout-pt-sm layout-pb-sm ${
                            backgroundColor ? backgroundColor : ""
                          }`}
                        >
                          <div className="container">
                            <div className="row y-gap-20 justify-center text-center">
                              <div className="col-auto">
                                <div className="sectionTitle ">
                                  <h2 className="sectionTitle__title ">
                                    Our Clients
                                  </h2>
                                  <p className="sectionTitle__text "></p>
                                </div>
                              </div>
                            </div>

                            <div className="row y-gap-30 pt-50">
                              {showSlider && (
                                <Swiper
                                modules={[Autoplay]}

                                  breakpoints={{
                                    450: {
                                      slidesPerView: 1,
                                    },
                                    768: {
                                      slidesPerView: 2,
                                    },
                                    1200: {
                                      slidesPerView: 3,
                                    },
                                  }}
                                  spaceBetween={50}
                                  autoplay={{ delay: 8000 }}
                                >
                                  {campus.our_client.map((client, i) => (
                                    <SwiperSlide key={i}>
                                      <div className="teamCard -type-1 -teamCard-hover">
                                        <div className="teamCard__image">
                                          <div
                                            style={{
                                              width: "110px",
                                              height: "100px",
                                              overflow: "hidden",
                                              position: "relative",
                                              boxShadow:
                                                "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                            }}
                                          >
                                            <Image
                                              src={client.image}
                                              alt="image"
                                              layout="responsive"
                                              width={300}
                                              height={200}
                                              style={{ objectFit: "cover" }}
                                            />
                                          </div>
                                        </div>
                                        <div className="teamCard__content">
                                          <h4 className="teamCard__title">
                                            <div>
                                              <a className="linkCustom">
                                                {client.name}
                                              </a>
                                            </div>
                                          </h4>
                                        </div>
                                      </div>
                                    </SwiperSlide>
                                  ))}
                                </Swiper>
                              )}
                            </div>
                          </div>
                        </section>

                        <section className="layout-pt-sm layout-pb-sm bg-light-4">
                          <div className="container">
                            <div className="row y-gap-20 justify-between items-center">
                              <div className="row justify-center text-center">
                                <div className="col-auto">
                                  <div className="sectionTitle">
                                    <h2 className="sectionTitle__title">
                                      Execution Overview
                                    </h2>
                                    <p className="sectionTitle__text">
                                      Lorem ipsum dolor sit amet, consectetur.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="pt-60 lg:pt-50 js-section-slider">
                              {showSlider && (
                                <>
                                  <div style={{ marginTop: "10px" }}>
                                    Filter based on Year: <br />
                                    <button
                                      className={`year-button ${
                                        selectedYear === "" ? "selected" : ""
                                      }`}
                                      onClick={() => handleYearFilter("")}
                                      style={{
                                        marginRight: "10px",
                                        backgroundColor:
                                          selectedYear === ""
                                            ? "#725589"
                                            : "#f7f8fb",
                                        padding: "10px",
                                        borderRadius: "8px",
                                        marginTop: "10px",
                                        border: "none",
                                        color:
                                          selectedYear === ""
                                            ? "white"
                                            : "black", // Text color
                                        cursor: "pointer",
                                      }}
                                    >
                                      All Years
                                    </button>
                                    {[...uniqueYears].map((year) => (
                                      <button
                                        key={year}
                                        className={`year-button ${
                                          selectedYear === year
                                            ? "selected"
                                            : ""
                                        }`}
                                        onClick={() => handleYearFilter(year)}
                                        style={{
                                          marginRight: "10px",
                                          backgroundColor:
                                            selectedYear === year
                                              ? "#725589"
                                              : "#f7f8fb",
                                          padding: "10px",
                                          borderRadius: "8px",
                                          marginTop: "10px",
                                          border: "none",
                                          color:
                                            selectedYear === year
                                              ? "white"
                                              : "black", // Text color
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
                                    spaceBetween={80}
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
                                    {campus.execution_overview.map((elm, i) => (
                                      <SwiperSlide
                                        key={i}
                                        className="swiper-slide"
                                      >
                                        <div className="swiper-slide">
                                          <div
                                            className="bg-white rounded-8 shadow-1 px-20 py-20"
                                            data-aos="fade-left"
                                            data-aos-duration={(i + 1) * 400}
                                          >
                                            <div className="d-flex items-center">
                                              <div className="size-60 d-flex flex-column justify-center items-center rounded-8 bg-dark-1 text-center mr-20">
                                                <div className="text-17 lh-15 text-white fw-500">
                                                  {elm.year}
                                                </div>

                                                {/* <div className="lh-1 text-white fw-500">
                              {elm.date
                                .split(" ")[1]
                                .split(",")[0]
                                .toUpperCase()}
                            </div> */}
                                              </div>
                                            </div>
                                            <div
                                              className="linkCustom mt-15"
                                              style={{}}
                                            >
                                              <b>
                                                {" "}
                                                {elm.type[0]} :{" "}
                                                {elm.typeName[0]}
                                              </b>
                                            </div>
                                            <div className="d-flex items-center mt-20">
                                              <div className="icon-location text-14 mr-10"></div>
                                              <div className="text-14 lh-1">
                                                Batch : {elm.batchName}
                                              </div>
                                            </div>
                                            <div className="d-flex items-center mt-20">
                                              <div className="icon-location text-14 mr-10"></div>
                                              <div className="text-14 lh-1">
                                                Satck : {elm.stack.stack}
                                              </div>
                                            </div>
                                            <div className="d-flex items-center mt-20">
                                              <div className="icon-location text-14 mr-10"></div>
                                              <div className="text-14 lh-1">
                                                Duartion : {elm.duration}
                                              </div>
                                            </div>
                                            <div className="d-flex items-center mt-20">
                                              <div className="icon-location text-14 mr-10"></div>
                                              <div className="text-14 lh-1">
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
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
