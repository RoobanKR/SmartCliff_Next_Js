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
import { CalendarMonth, ChevronLeft, ChevronRight, Layers } from "@mui/icons-material";
 
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
 
  // Calculate total candidates from displayData
  const totalCandidates = displayData.reduce(
    (total, item) => total + (item.sections?.[0]?.count || 0),
    0
  );
 
  const [maxSectionHeight, setMaxSectionHeight] = useState(0);
  const slideRefs = useRef([]);
  const sectionRefs = useRef([]);
 
  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, displayData.length);
 
    // Create a flat array to store all section refs
    const allSectionsCount = displayData.reduce((count, company) => count + (company.sections?.length || 0), 0);
    sectionRefs.current = sectionRefs.current.slice(0, allSectionsCount);
  }, [displayData]);
 
  // Calculate heights after render
  useEffect(() => {
    // Wait for next render cycle to ensure all elements are properly rendered
    const timer = setTimeout(() => {
      // Find max height for main slides
      const heights = slideRefs.current
        .filter(ref => ref !== null && ref !== undefined)
        .map(ref => ref.offsetHeight || 0);
 
      if (heights.length > 0) {
        setMaxHeight(Math.max(...heights));
      }
 
      // Find max height for section divs
      const sectionHeights = sectionRefs.current
        .filter(ref => ref !== null && ref !== undefined)
        .map(ref => ref.offsetHeight || 0);
 
      if (sectionHeights.length > 0) {
        setMaxSectionHeight(Math.max(...sectionHeights));
      }
    }, 300); // Short delay to ensure content has rendered
 
    return () => clearTimeout(timer);
  }, [displayData]);
 
  let sectionRefIndex = 0;
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
                padding: window.innerWidth < 768 ? "20px 10px" : "20px 50px",
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
                    color: " #5B2c6F",
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
                      backgroundColor: "#8F87F1",
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
                  marginLeft: window.innerWidth < 768 ? "0px" : "70px",
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
                      backgroundColor: "#8F87F1",
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
              style={{
                marginTop: window.innerWidth < 768 ? "-20px" : "-30px", color: "#EC5228", fontWeight: "bold",
                marginLeft: window.innerWidth < 768 ? "0px" : "30px",
              }}
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
              {displayData.map((company, index) => (
                <SwiperSlide key={index} style={{ padding: "10px" }}>
                  <div
                    ref={(el) => (slideRefs.current[index] = el)}
                    key={index}
                    style={{
                      borderRadius: "12px",
                      padding: "20px",
                      backgroundColor: " #FFFFFF",
                      textAlign: "center",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.3s ease-in-out",
                      cursor: "pointer",
                      border: "1px solid #DDD",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: maxHeight || "auto",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = "0px 8px 20px rgba(0, 0, 0, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0px 4px 12px rgba(0, 0, 0, 0.1)";
                    }}
                  >
                    <div style={{ width: "100%", flexGrow: 1, padding: "1rem", textAlign: "center" }}>
                      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
                        <img
                          src={company.image}
                          alt={company.name}
                          style={{ height: "3rem", objectFit: "contain" }}
                        />
                      </div>
                      {/* Section Slider */}
                      <div style={{ padding: "0 5px", position: "relative" }}>
                        {company.sections && company.sections.length > 1 ? (
                          <>
                            <Swiper
                              modules={[Navigation]}
                              navigation={{
                                nextEl: `.section-next-${index}`,
                                prevEl: `.section-prev-${index}`,
                              }}
                              spaceBetween={10}
                              slidesPerView={1}
                              style={{ width: "100%" }}
                            >
                              {company.sections.map((section, sectionIndex) => {
                                const currentSectionIndex = sectionRefIndex++;
                                return (
                                  <SwiperSlide key={sectionIndex}>
                                    <div
                                      ref={(el) =>
                                      (sectionRefs.current[
                                        currentSectionIndex
                                      ] = el)
                                      }
                                      style={{
                                        backgroundColor: "rgb(154, 123, 216)",
                                        color: "white",
                                        borderRadius: "0.375rem",
                                        padding: "10px 0px",
                                        marginBottom: "1rem",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        height: maxSectionHeight || "auto",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: "1rem",
                                          marginBottom: "0.5rem",
                                          whiteSpace: "pre-line",
                                        }}
                                      >
                                        {section.title &&
                                          section.title
                                            .split(",")
                                            .map((part, i) => (
                                              <span key={i}>
                                                {part.trim()}
                                                <br />
                                              </span>
                                            ))}
                                      </p>
 
                                      <div
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "1.875rem",
                                        }}
                                      >
                                        {section.count}
                                      </div>
                                    </div>
                                  </SwiperSlide>
                                );
                              })}
                            </Swiper>
 
                            {/* Navigation Arrows */}
                            <div
                              className={`section-prev-${index}`}
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "-20px",
                                transform: "translateY(-50%)",
                                width: "36px",
                                height: "36px",
                                background: "rgba(255, 255, 255, 0.9)", // Light translucent white
                                borderRadius: "50%",
                                border: "1px solid rgba(0, 0, 0, 0.1)", // Soft thin border
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                zIndex: 10,
                                transition: "all 0.3s ease-in-out",
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(255, 255, 255, 1)";
                                e.currentTarget.style.border =
                                  "1px solid #FF8C00"; // Orange border
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(255, 255, 255, 0.9)";
                                e.currentTarget.style.border =
                                  "1px solid rgba(0, 0, 0, 0.1)";
                              }}
                            >
                              <ChevronLeft
                                style={{ fontSize: "24px", color: " #FF8C00" }}
                              />
                            </div>
 
                            <div
                              className={`section-next-${index}`}
                              style={{
                                position: "absolute",
                                top: "50%",
                                right: "-20px",
                                transform: "translateY(-50%)",
                                width: "36px",
                                height: "36px",
                                background: "rgba(255, 255, 255, 0.9)", // Light translucent white
                                borderRadius: "50%",
                                border: "1px solid rgba(0, 0, 0, 0.1)", // Soft thin border
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                zIndex: 10,
                                transition: "all 0.3s ease-in-out",
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(255, 255, 255, 1)";
                                e.currentTarget.style.border =
                                  "1px solid #FF8C00"; // Orange border
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(255, 255, 255, 0.9)";
                                e.currentTarget.style.border =
                                  "1px solid rgba(0, 0, 0, 0.1)";
                              }}
                            >
                              <ChevronRight
                                style={{ fontSize: "24px", color: " #FF8C00" }}
                              />
                            </div>
                          </>
 
                        ) : (
                          // Single section case - no slider needed
                          company.sections && company.sections.map((section, sectionIndex) => {
                            const currentSectionIndex = sectionRefIndex++;
                            return (
                              <>
                                <div
                                  ref={(el) => (sectionRefs.current[currentSectionIndex] = el)}
                                  key={sectionIndex}
                                  style={{
                                    background: "rgba(154, 123, 216, 0.15)", // Light purple translucent background
                                    color: "#4B0082", // Deep purple text for contrast
                                    borderRadius: "0.375rem",
                                    marginBottom: "1rem",
                                    backdropFilter: "blur(10px)", // Glassmorphism effect
                                    border: "2px solid transparent",
                                    backgroundImage:
                                      "linear-gradient(white, white), linear-gradient(135deg, #9A7BD8, #B8A2EC)",
                                    backgroundClip: "padding-box, border-box",
                                    height: maxSectionHeight || "auto",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center", // Center content vertically
                                    alignItems: "center", // Center content horizontally
                                    textAlign: "center", // Ensure text is centered
                                  }}
                                >
                                  <p
                                    style={{
                                      fontSize: "1rem",
                                      whiteSpace: "pre-line",
                                      marginBottom: "0.5rem",
                                      width: "100%",
                                      padding: "30px",
                                      textAlign: "left", // Center the text properly
                                    }}
                                  >
                                    {section.title &&
                                      section.title
                                        .split(",")
                                        .map((part, i, arr) => (
                                          <span key={i}>
                                            ✨ {part.trim()}
                                            {i < arr.length - 1 && (
                                              <hr
                                                style={{
                                                  margin: "8px 0",
                                                  border: "0.5px solid #C4A7E7",
                                                }}
                                              />
                                            )}
                                          </span>
                                        ))}
 
                                  </p>
                                </div>
                                <div
                                  style={{
                                    background: "rgb(25, 36, 72)",
                                    color: "rgb(255, 255, 255)",
                                    borderRadius: "12px",
                                    padding: "25px",
                                    fontWeight: "bold",
                                    fontSize: "2rem",
                                    width: "100%",
                                    textAlign: "center",
                                    boxShadow:
                                      "0px 6px 20px rgba(0, 0, 0, 0.1)",
                                    transition: "all 0.3s ease-in-out",
                                    position: "relative",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                      "translateY(-5px)";
                                    e.currentTarget.style.boxShadow =
                                      "0px 12px 25px rgba(0, 0, 0, 0.15)";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                      "translateY(0)";
                                    e.currentTarget.style.boxShadow =
                                      "0px 6px 20px rgba(0, 0, 0, 0.1)";
                                  }}
                                >
                                  {section.count}
                                </div>
                              </>
                            );
                          })
                        )}
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
    </section>
  );
}
 
 