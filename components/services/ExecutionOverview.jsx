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
        <div className="row justify-center text-center" ref={counterSectionRef}>
          <div className="col-auto">
            <div
              className="sectionTitle d-flex align-items-center justify-content-between w-100"
              style={{ padding: "20px 100px" }}
            >
              {/* Total Client */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginRight: "100px", // Spacing between elements
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#5B2c6F",
                  }}
                >
                  Total Client
                </span>
                <hr
                  style={{
                    width: "80%",
                    borderTop: "3px solid #5B2c6F",
                    margin: "5px 0",
                  }}
                />
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "80%",
                    fontSize: "18px", // Adjusted font size
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
                      width: "80%",
                      height: "40px", // Adjusted height for better spacing
                      padding: "3px 10px", // Optimized padding
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
              <div style={{ textAlign: "center", flex: 1 }}>
                <h2 style={{ fontSize: "25px", margin: 0 }}>
                  Execution Overview
                </h2>
              </div>

              {/* Total Candidate */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginLeft: "100px", // Spacing between elements
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#5B2c6F",
                  }}
                >
                  Total Candidate
                </span>
                <hr
                  style={{
                    width: "80%",
                    borderTop: "3px solid #5B2c6F",
                    margin: "5px 0",
                  }}
                />
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "80%",
                    fontSize: "18px", // Adjusted font size
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
                      width: "80%",
                      height: "40px", // Adjusted height for better spacing
                      padding: "3px 10px", // Optimized padding
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

            <p style={{ marginTop: "-30px" }}>(By Client)</p>
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
                    style={cardStyles.card}
                    data-aos="fade-left"
                    data-aos-duration={400}
                    onMouseEnter={(e) => {
                      // Get elements
                      const overlay = e.currentTarget.querySelector(".overlay");
                      const card = e.currentTarget;
                      const imageContainer =
                        e.currentTarget.querySelector(".image-container");
                      const titleElement =
                        e.currentTarget.querySelector(".title-element");

                      // Clone the image for the overlay
                      const originalImageContainer =
                        card.querySelector(".image-container");
                      const miniImageContainer =
                        originalImageContainer.cloneNode(true);
                      miniImageContainer.classList.add("mini-image");

                      // Style the mini image
                      Object.assign(miniImageContainer.style, {
                        height: "60px",
                        // width: '60px',
                        margin: "0 auto",
                        borderRadius: "8px",
                        overflow: "hidden",
                        position: "absolute",
                        top: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: "2",
                      });

                      // Remove any existing mini images before adding a new one
                      const existingMiniImage =
                        overlay.querySelector(".mini-image");
                      if (existingMiniImage) {
                        existingMiniImage.remove();
                      }

                      // Add the mini image to the overlay
                      overlay.insertBefore(
                        miniImageContainer,
                        overlay.firstChild
                      );

                      // Apply hover styling to overlay
                      overlay.style.opacity = "1";
                      overlay.style.transform = "translateY(0)";
                      overlay.style.justifyContent = "flex-start";
                      overlay.style.paddingTop = "90px"; // Make space for the image

                      // Hide the original content
                      if (imageContainer) {
                        imageContainer.style.opacity = "0";
                      }
                      if (titleElement) {
                        titleElement.style.opacity = "0";
                      }

                      card.style.transform = "translateY(-10px)";
                    }}
                    onMouseLeave={(e) => {
                      // Get elements
                      const overlay = e.currentTarget.querySelector(".overlay");
                      const card = e.currentTarget;
                      const imageContainer =
                        e.currentTarget.querySelector(".image-container");
                      const titleElement =
                        e.currentTarget.querySelector(".title-element");

                      // Reset overlay styling
                      if (overlay) {
                        overlay.style.opacity = "0";
                        overlay.style.transform = "translateY(100%)";
                        overlay.style.paddingTop = "20px";
                        overlay.style.justifyContent = "center";
                      }

                      // Show the original content again
                      if (imageContainer) {
                        imageContainer.style.opacity = "1";
                      }
                      if (titleElement) {
                        titleElement.style.opacity = "1";
                      }

                      // Reset card styling
                      card.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
                      card.style.transform = "translateY(0)";
                    }}
                  >
                    {/* Card Front: Image & Title */}
                    <div
                      className="content-container"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      <div
                        className="image-container"
                        style={cardStyles.imageContainer}
                      >
                        <Image
                          src={elm.image}
                          alt="icon"
                          width={150}
                          height={100}
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </div>
                      <h3 className="title-element" style={cardStyles.title}>
                        {elm.typeName[0]}
                      </h3>
                    </div>

                    {/* Card Back: Overlay with Details */}
                    <div className="overlay" style={cardStyles.overlay}>
                      {/* The mini image will be inserted here dynamically */}
                      <div style={cardStyles.detailsGrid}>
                        <div style={cardStyles.detailItem}>
                          <FaUserSecret style={cardStyles.icon} />
                          <span>Batch Size: {elm.batch_size}</span>
                        </div>
                        <div style={cardStyles.detailItem}>
                          <Layers style={cardStyles.icon} />
                          <span>Stack: {elm.stack.stack}</span>
                        </div>
                        <div style={cardStyles.detailItem}>
                          <CalendarMonth style={cardStyles.icon} />
                          <span>Year: {elm.year}</span>
                        </div>
                        <div style={cardStyles.detailItem}>
                          <FaClock style={cardStyles.icon} />
                          <span>Duration: {elm.duration}</span>
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
    </section>
  );
}
