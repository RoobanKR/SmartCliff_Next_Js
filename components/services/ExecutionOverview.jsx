
import React, { useState, useEffect } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExecutionOverview } from "@/redux/slices/services/executionOverview/ExecutionOverview";
import { selectServices } from "@/redux/slices/services/services/Services";
import { selectBusinessServices } from "@/redux/slices/services/services/businessServices";
import { getAllServiceProcess, selectProcessServices } from "@/redux/slices/services/services/processServices";
import { getAllServiceAbout } from "@/redux/slices/services/services/aboutServices";
import { getAllServiceClients, selectServiceClients } from "@/redux/slices/services/services/clientServices";

export default function ExecutionOverview1({ serviceId }) {
  const dispatch = useDispatch();
  const [showSlider, setShowSlider] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [displayData, setDisplayData] = useState([]);
  const [matchedServiceAbouts, setMatchedServiceAbouts] = useState([]);
  const clients = useSelector(selectServiceClients);
  const executionOverviews = useSelector((state) => state.executionOverviews.executionOverviews);
  const services = useSelector(selectServices);
  const servicesBusiness = useSelector(selectBusinessServices);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(getAllServiceClients()),
        dispatch(fetchExecutionOverview()),
        dispatch(getAllServiceAbout()),
        dispatch(getAllServiceProcess())
      ]);
      setShowSlider(true);
    };

    fetchData();
  }, [dispatch]); // Only depend on dispatch

  useEffect(() => {
    if (!services.length || !servicesBusiness.length) return;

    const fullUrl = typeof window !== "undefined" ? window.location.href : "";
    const segments = fullUrl.split("/").filter(Boolean);
    const lastSegment = segments.pop();
    const secondLastSegment = segments.pop();

    const onematchingData = servicesBusiness.find((i) => i.slug === secondLastSegment);
    const twomatchingService = services.find((i) => i.slug === lastSegment);

    if (!onematchingData || !twomatchingService) return;

    const matchedServices = services.filter(
      (service) => service.business_services?._id === onematchingData?._id
    );

    const finalMatchedService = matchedServices.find(
      (service) => service.slug === twomatchingService?.slug
    );

    if (finalMatchedService && executionOverviews.length) {
      const filtered = executionOverviews.filter(
        (i) => i.service._id === finalMatchedService._id
      );
      setMatchedServiceAbouts(filtered);
    }
  }, [services, servicesBusiness, executionOverviews]);


  // Set initial data and handle year filtering
  useEffect(() => {
    if (selectedYear === null) {
      setDisplayData(matchedServiceAbouts);
    } else {
      const yearData = matchedServiceAbouts.filter((item) => item.year === selectedYear);
      setDisplayData(yearData);
    }
  }, [selectedYear, matchedServiceAbouts]);

  // Get unique years
  const uniqueYears = Array.from(
    new Set(matchedServiceAbouts.map((overview) => overview.year))
  ).sort((a, b) => b - a);

  // Handle year filter
  const handleYearFilter = (year) => {
    setSelectedYear(year);
  };

  return (
    <section className="layout-pt-sm layout-pb-sm ">
      <div className="container">
        <div className="row y-gap-20 justify-between items-center">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle">
                <h2 className="text-25">
                  Execution Overview
                </h2>
                <p className="sectionTitle__text" >
                  Lorem ipsum dolor sit amet, consectetur.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:pt-50 js-section-slider">
          {showSlider && (
            <>
              <div >
                Filter based on Year: <br />
                <button
                  className={`year-button ${selectedYear === null ? "selected" : ""}`}
                  onClick={() => handleYearFilter(null)}
                  style={{
                    marginRight: "10px",
                    backgroundColor: selectedYear === null ? "#725589" : "#f7f8fb",
                    padding: "10px",
                    borderRadius: "8px",
                    color: selectedYear === null ? "white" : "black",
                    marginTop: "10px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  All Years
                </button>
                {uniqueYears.map((year) => (
                  <button
                    key={year}
                    className={`year-button ${selectedYear === year ? "selected" : ""}`}
                    onClick={() => handleYearFilter(year)}
                    style={{
                      marginRight: "10px",
                      backgroundColor: selectedYear === year ? "#725589" : "#f7f8fb",
                      padding: "10px",
                      borderRadius: "8px",
                      marginTop: "10px",
                      border: "none",
                      color: selectedYear === year ? "white" : "black",
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
                  450: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1200: {
                    slidesPerView: 4,
                  },
                }}
              >
                {displayData.map((elm, i) => (
                  <SwiperSlide key={i} className="swiper-slide">
                    <div className="swiper-slide">
                      <div
                        className="bg-white rounded-8 shadow-1 px-20 py-20"
                        data-aos="fade-left"
                        data-aos-duration={(i + 1) * 400}
                      >
                        <div className="d-flex items-center">
                          <div className="size-60 d-flex flex-column justify-center items-center rounded-8 bg-dark-1 text-center mr-20">
                            <div className="text-17 lh-15 text-white fw-500" >
                              {elm.year}
                            </div>
                          </div>
                          <div className="linkCustom" >
                            {elm.type[0]} : {elm.typeName[0]}
                          </div>
                        </div>
                        <div className="d-flex items-center mt-20">
                          <div className="icon-location text-14 mr-10"></div>
                          <div className="text-14 lh-1" >
                            Batch : {elm.batchName}
                          </div>
                        </div>
                        <div className="d-flex items-center mt-20">
                          <div className="icon-location text-14 mr-10"></div>
                          <div className="text-14 lh-1" >
                            Stack : {elm.stack.stack}
                          </div>
                        </div>
                        <div className="d-flex items-center mt-20">
                          <div className="icon-location text-14 mr-10"></div>
                          <div className="text-14 lh-1" >
                            Duration : {elm.duration}
                          </div>
                        </div>
                        <div className="d-flex items-center mt-20">
                          <div className="icon-location text-14 mr-10"></div>
                          <div className="text-14 lh-1" >
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