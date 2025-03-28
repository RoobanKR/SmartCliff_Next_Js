import React, { useState, useEffect, useRef } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExecutionOverview } from "@/redux/slices/services/executionOverview/ExecutionOverview";
import { selectServices } from "@/redux/slices/services/services/Services";
import { selectBusinessServices } from "@/redux/slices/services/services/businessServices";
import {
  getAllServiceProcess,
  selectProcessServices,
} from "@/redux/slices/services/services/processServices";
import { getAllServiceAbout } from "@/redux/slices/services/services/aboutServices";
import {
  getAllServiceClients,
  selectServiceClients,
} from "@/redux/slices/services/services/clientServices";
import Image from "next/image";
import { FaClock, FaUserSecret } from "react-icons/fa";
import { CalendarMonth, Layers } from "@mui/icons-material";

// Animated Counter Component
const AnimatedCounter = ({
  startValue = 0,
  endValue = 0,
  duration = 2000,
  isVisible = false,
}) => {
  const [count, setCount] = useState(startValue);

  useEffect(() => {
    // Only start animation if component is visible and endValue is set
    if (!isVisible || endValue === 0) {
      setCount(startValue);
      return;
    }

    // Reset to start value when section becomes visible
    setCount(startValue);

    // Calculate animation steps
    const steps = Math.floor(duration / 16); // ~60fps
    const increment = (endValue - startValue) / steps;
    let currentCount = startValue;
    let timer;

    const updateCounter = () => {
      currentCount += increment;

      if (
        (increment > 0 && currentCount >= endValue) ||
        (increment < 0 && currentCount <= endValue)
      ) {
        // We've reached or passed the target
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.round(currentCount));
      }
    };

    timer = setInterval(updateCounter, 16);

    return () => clearInterval(timer);
  }, [startValue, endValue, duration, isVisible]);

  return <>{count}</>;
};

export default function ExecutionOverview1({ serviceId }) {
  const dispatch = useDispatch();
  const [showSlider, setShowSlider] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [displayData, setDisplayData] = useState([]);
  const [matchedServiceAbouts, setMatchedServiceAbouts] = useState([]);
  const clients = useSelector(selectServiceClients);
  const executionOverviews = useSelector(
    (state) => state.executionOverviews.executionOverviews
  );
  const services = useSelector(selectServices);
  const servicesBusiness = useSelector(selectBusinessServices);
  const [isVisible, setIsVisible] = useState(false);
  const counterSectionRef = useRef(null);
  const cardRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (cardRef.current) {
      const cardHeight = cardRef.current.offsetHeight;
      setMaxHeight((prevHeight) => Math.max(prevHeight, cardHeight));
    }
  }, []);
  // Set up Intersection Observer to detect when counter section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            // Reset visibility when section leaves viewport
            setIsVisible(false);
          }
        });
      },
      {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.1, // trigger when at least 10% of the element is visible
      }
    );

    if (counterSectionRef.current) {
      observer.observe(counterSectionRef.current);
    }

    return () => {
      if (counterSectionRef.current) {
        observer.unobserve(counterSectionRef.current);
      }
    };
  }, [counterSectionRef]);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(getAllServiceClients()),
        dispatch(fetchExecutionOverview()),
        dispatch(getAllServiceAbout()),
        dispatch(getAllServiceProcess()),
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

    const onematchingData = servicesBusiness.find(
      (i) => i.slug === secondLastSegment
    );
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
        (i) => i.service?._id === finalMatchedService._id
      );
      setMatchedServiceAbouts(filtered);
    }
  }, [services, servicesBusiness, executionOverviews]);

  // Set initial data and handle year filtering
  useEffect(() => {
    if (selectedYear === null) {
      setDisplayData(matchedServiceAbouts);
    } else {
      const yearData = matchedServiceAbouts.filter(
        (item) => item.year === selectedYear
      );
      setDisplayData(yearData);
    }
  }, [selectedYear, matchedServiceAbouts]);

  const swiperStyles = {
    container: {
      position: "relative",
    },
    pagination: {
      bottom: "-10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
    },
    paginationBullet: {
      width: "10px",
      height: "10px",
      backgroundColor: "#ccc",
      borderRadius: "50%",
      opacity: 0.5,
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    paginationBulletActive: {
      width: "20px",
      height: "10px",
      backgroundColor: "#007bff",
      borderRadius: "5px",
      opacity: 1,
    },
    navigationButton: {
      color: "#007bff",
      backgroundColor: "rgba(0, 123, 255, 0.1)",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      transition: "all 0.3s ease",
    },
  };

  // Calculate total candidates
  const totalCandidates = displayData.reduce(
    (total, item) => total + item.batch_size,
    0
  );

  // Updated card styles with modified hover animation
  const cardStyles = {
    card: {
      backgroundColor: "white",
      borderRadius: "16px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      border: "1px solid #E5E7EB",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
      height: "300px",
      cursor: "pointer",
      maxWidth: "320px",
    },
    imageContainer: {
      overflow: "hidden",
      marginBottom: "12px",
      transition: "all 0.3s ease",
    },
    title: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#374151",
      textAlign: "center",
      transition: "transform 0.3s ease",
      marginBottom: "10px",
    },
    overlay: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(91, 44, 111, 0.84)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      opacity: "0",
      transform: "translateY(100%)",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      padding: "20px",
      color: "white",
    },
    detailsGrid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "15px",
      width: "100%",
      marginTop: "5px", // Space after the mini image
    },
    detailItem: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      fontSize: "16px",
      fontWeight: "500",
    },
    icon: {
      width: "20px",
      height: "20px",
      color: "white",
    },
  };

  return (
    <section
      style={{
        paddingTop: "1rem",
        paddingBottom: "1rem",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            textAlign: "center",
          }}
          ref={counterSectionRef}
        >
          <div style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: window.innerWidth < 768 ? "column" : "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: window.innerWidth < 768 ? "20px 10px" : "20px 100px",
                gap: window.innerWidth < 768 ? "30px" : "0",
              }}
            >
              {/* Total Client */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginRight: window.innerWidth < 768 ? "0" : "100px",
                  width: window.innerWidth < 768 ? "100%" : "auto",
                }}
              >
                <span
                  style={{
                    fontSize: window.innerWidth < 768 ? "18px" : "20px",
                    fontWeight: "bold",
                    color: "#5B2c6F",
                  }}
                >
                  Total Client
                </span>
                <hr
                  style={{
                    width: window.innerWidth < 768 ? "60%" : "80%",
                    borderTop: "3px solid #5B2c6F",
                    margin: "5px 0",
                  }}
                />
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: window.innerWidth < 768 ? "100%" : "80%",
                    fontSize: window.innerWidth < 768 ? "16px" : "18px",
                    fontWeight: "bold",
                    color: "#5B2c6F",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: window.innerWidth < 768 ? "60%" : "80%",
                      height: "40px",
                      padding: "3px 10px",
                      backgroundColor: "#5B2c6F",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    <AnimatedCounter
                      startValue={0}
                      endValue={displayData.length}
                      duration={2000}
                      isVisible={isVisible}
                    />
                  </span>
                </span>
              </div>

              {/* Execution Overview */}
              <div
                style={{
                  textAlign: "center",
                  flex: window.innerWidth < 768 ? "0 0 100%" : "1",
                  order: window.innerWidth < 768 ? "-1" : "0",
                }}
              >
                <h2
                  style={{
                    fontSize: window.innerWidth < 768 ? "20px" : "25px",
                    margin: 0,
                  }}
                >
                  Execution Overview
                </h2>
              </div>

              {/* Total Candidate */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginLeft: window.innerWidth < 768 ? "0" : "100px",
                  width: window.innerWidth < 768 ? "100%" : "auto",
                }}
              >
                <span
                  style={{
                    fontSize: window.innerWidth < 768 ? "18px" : "20px",
                    fontWeight: "bold",
                    color: "#5B2c6F",
                  }}
                >
                  Total Candidate
                </span>
                <hr
                  style={{
                    width: window.innerWidth < 768 ? "60%" : "80%",
                    borderTop: "3px solid #5B2c6F",
                    margin: "5px 0",
                  }}
                />
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: window.innerWidth < 768 ? "100%" : "80%",
                    fontSize: window.innerWidth < 768 ? "16px" : "18px",
                    fontWeight: "bold",
                    color: "#5B2c6F",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: window.innerWidth < 768 ? "60%" : "80%",
                      height: "40px",
                      padding: "3px 10px",
                      backgroundColor: "#5B2c6F",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    <AnimatedCounter
                      startValue={0}
                      endValue={totalCandidates}
                      duration={2000}
                      isVisible={isVisible}
                    />
                  </span>
                </span>
              </div>
            </div>

            <p
              style={{ marginTop: window.innerWidth < 768 ? "-20px" : "-30px" }}
            >
              (By Client)
            </p>
          </div>
        </div>

        {showSlider && (
          <>
            <br />

            <Swiper
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
                  slidesPerView: 2,
                },
                1200: {
                  slidesPerView: 3,
                },
              }}
              style={swiperStyles.container}
            >
              {displayData.map((elm, i) => (
                <SwiperSlide key={i} style={{ padding: "10px" }}>
                  <div
                    ref={cardRef}
                    style={{
                      width: "300px",
                      minHeight: `${maxHeight}px`, // Ensures all cards match the tallest card
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                      backgroundColor: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "20px",
                      textAlign: "center",
                    }}
                  >
                    {/* Image Section (Full Width) */}
                    <div
                      style={{
                        width: "100%",
                        height: "200px",
                        marginBottom: "12px",
                      }}
                    >
                      <Image
                        src={elm.image}
                        alt="icon"
                        width={260}
                        height={120}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#333",
                        marginBottom: "12px",
                      }}
                    >
                      {elm.typeName[0]}
                    </h3>

                    {/* Details Section */}
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      {[
                        {
                          icon: <FaUserSecret />,
                          label: "Batch Size",
                          value: elm.batch_size,
                        },
                        {
                          icon: <Layers />,
                          label: "Stack",
                          value: elm.stack.stack,
                        },
                        {
                          icon: <CalendarMonth />,
                          label: "Year",
                          value: elm.year,
                        },
                        {
                          icon: <FaClock />,
                          label: "Duration",
                          value: elm.duration,
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            justifyContent: "flex-start",
                          }}
                        >
                          <span style={{ color: "#5B2C6F", fontSize: "18px" }}>
                            {item.icon}
                          </span>
                          <span
                            style={{
                              color: "#333",
                              fontSize: "14px",
                              fontWeight: "500",
                              textAlign: "left",
                            }}
                          >
                            {item.label}: {item.value}
                          </span>
                        </div>
                      ))}
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
    </section>
  );
}

