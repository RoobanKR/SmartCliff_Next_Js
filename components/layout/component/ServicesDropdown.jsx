import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  getAllBusinessServices,
  selectBusinessServices,
} from "@/redux/slices/services/services/businessServices";
import {
  fetchServices,
  selectServices,
} from "@/redux/slices/services/services/Services";
import { usePathname, useRouter } from "next/navigation";
import EnquiryModal from "@/components/common/EnquiryModal";
import { FaTimes } from "react-icons/fa";
 
// SVG Components for card decorations
const ScatteredSquaresIcon = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="10" y="10" width="20" height="20" fill="#FF4500" />
    <rect x="70" y="10" width="20" height="20" fill="#32CD32" />
    <rect x="40" y="40" width="20" height="20" fill="#FFD700" />
    <rect x="10" y="70" width="20" height="20" fill="#1E90FF" />
    <rect x="70" y="70" width="20" height="20" fill="#FF69B4" />
  </svg>
);
 
const CirclesIcon = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="60" cy="40" r="30" fill="#FFD966" />
    <circle cx="30" cy="70" r="20" fill="#FF6666" />
    <circle cx="70" cy="70" r="15" fill="#65C466" />
  </svg>
);
 
const ScatteredStarsIcon = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon
      points="20,10 25,25 40,25 28,35 33,50 20,40 7,50 12,35 0,25 15,25"
      fill="#FFD700"
    />
    <polygon
      points="80,20 85,35 100,35 88,45 93,60 80,50 67,60 72,45 60,35 75,35"
      fill="#FF4500"
    />
    <polygon
      points="50,60 55,75 70,75 58,85 63,100 50,90 37,100 42,85 30,75 45,75"
      fill="#1E90FF"
    />
  </svg>
);
 
const ScatteredCirclesIcon = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="20" r="15" fill="#FF4500" />
    <circle cx="80" cy="20" r="10" fill="#1E90FF" />
    <circle cx="40" cy="60" r="20" fill="#32CD32" />
    <circle cx="75" cy="75" r="12" fill="#FFD700" />
  </svg>
);
 
const LoadingSpinner = () => {
  const [dotCount, setDotCount] = useState(1);
 
  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev < 3 ? prev + 1 : 1));
    }, 300); // Change dot count every 300ms
 
    return () => clearInterval(interval);
  }, []);
 
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        className="animate-spin"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          animation: "spin 1s linear infinite",
          transformOrigin: "center",
        }}
      >
        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
        <circle cx="12" cy="12" r="10" stroke="#f2f2f2" strokeWidth="3" />
        <path
          d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12"
          stroke="#0047AB"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
 
const SequentialDots = () => {
  const [dots, setDots] = useState(1);
 
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev < 3 ? prev + 1 : 1));
    }, 300);
 
    return () => clearInterval(interval);
  }, []);
 
  return (
    <span
      style={{
        width: "24px",
        display: "inline-block",
        textAlign: "left",
      }}
    >
      {".".repeat(dots)}
    </span>
  );
};
 
const ServicesDropdown = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [hoveredLink, setHoveredLink] = useState(null);
  const services = useSelector(selectServices);
  const businessServices = useSelector(selectBusinessServices);
  const [hoveredService, setHoveredService] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [loadingServiceId, setLoadingServiceId] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isActive = (path) => pathname.startsWith(path);
 
  useEffect(() => {
    dispatch(getAllBusinessServices());
    dispatch(fetchServices());
  }, [dispatch]);
 
  useEffect(() => {
    if (
      isDropdownOpen &&
      businessServices &&
      businessServices.length > 0 &&
      !hoveredService
    ) {
      setHoveredService(businessServices[0]._id);
    }
  }, [isDropdownOpen, businessServices, hoveredService]);
 
  // Track navigation events
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsNavigating(true);
    };
 
    const handleRouteChangeComplete = () => {
      setIsNavigating(false);
      setLoadingServiceId(null);
    };
 
    // Subscribe to router events
    window.addEventListener("beforeunload", handleRouteChangeStart);
 
    // For Next.js App Router
    const handlePathnameChange = () => {
      if (isNavigating) {
        handleRouteChangeComplete();
      }
    };
 
    // Check if pathname has changed
    const currentPathname = pathname;
    let previousPathname = currentPathname;
 
    const pathnameObserver = setInterval(() => {
      const newPathname = window.location.pathname;
      if (previousPathname !== newPathname) {
        previousPathname = newPathname;
        handlePathnameChange();
      }
    }, 100);
 
    return () => {
      window.removeEventListener("beforeunload", handleRouteChangeStart);
      clearInterval(pathnameObserver);
    };
  }, [pathname, isNavigating]);
 
  // Find the current business service for slug
  const getCurrentBusinessService = (serviceId) => {
    return businessServices?.find((service) => service._id === serviceId);
  };
 
  // Function to get a decoration for a card based on index
  const getCardDecoration = (index) => {
    // Cycle through 3 decoration styles
    const decorationIndex = index % 4;
 
    switch (decorationIndex) {
      case 0:
        return <ScatteredCirclesIcon />;
      case 1:
        return <ScatteredStarsIcon />;
      case 2:
        return <CirclesIcon />;
      default:
        return <ScatteredSquaresIcon />;
    }
  };
  const handleLearnMoreClick = (
    serviceId,
    businessServiceSlug,
    serviceSlug
  ) => {
    // Check if it's the specific service we want to handle differently
    if (businessServiceSlug === "b2c" && serviceSlug === "enquiryform") {
      setIsModalOpen(true); // Open the modal instead of showing alert
      return; // Prevent navigation
    }
 
    // Normal behavior for other services
    setLoadingServiceId(serviceId);
    setIsNavigating(true);
  };
 
  const closeModal = () => {
    setIsModalOpen(false);
  };
 
  return (
    <li
      className="menu-item-has-children"
      onMouseEnter={() => {
        setIsDropdownOpen(true);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsDropdownOpen(false);
        setIsHovered(false);
      }}
    >
      <a
        data-barba
        className="serviceMainLink"
        style={{ cursor: "pointer", marginTop: "3px" }}
        onMouseOver={() => setHoveredLink("services")}
        onMouseOut={() => setHoveredLink(null)}
      >
        <span
          style={{
            color: isHovered || isActive("/services") ? "#F3D66A" : "#fff", // Soft yellow text for active or hover
          }}
        >
          Services
        </span>
        <motion.i
          className="icon-chevron-down text-13 ml-10"
          animate={isDropdownOpen ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            color: isHovered || isActive("/services") ? "#F3D66A" : "#fff", // Soft yellow for icon on hover/active
          }}
        />
      </a>
 
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            className="mega-dropdown-container"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: "60px",
              left: "120px",
              width: "80%",
              boxShadow: "0px 10px 50px rgba(0, 0, 0, 0.1)",
              zIndex: "1000",
              padding: "10px 20px",
              borderRadius: "12px",
              background: "white",
              border: "1px solid #e0e0e0",
            }}
          >
            <div
              className="mega-dropdown-wrapper"
              style={{
                display: "flex",
                maxWidth: "1400px",
                margin: "0 auto",
              }}
            >
              {/* Left sidebar */}
              <div
                className="services-sidebar"
                style={{
                  width: "260px",
                  backgroundColor: "#f9f9f9",
                  borderRight: "1px solid #eaeaea",
                  height: "450px",
                  overflowY: "auto",
                  overflowX: "hidden",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#ccc transparent",
                }}
              >
                <ul
                  style={{
                    listStyle: "none",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  {businessServices?.map((service) => (
                    <motion.li
                      key={service._id}
                      onMouseEnter={() => setHoveredService(service._id)}
                      style={{
                        padding: "0",
                        borderBottom: "1px solid #eaeaea",
                        backgroundColor:
                          hoveredService === service._id
                            ? "#fff"
                            : "transparent",
                        color:
                          hoveredService === service._id ? "#f2775e" : "black",
                        transition: "all 0.2s ease",
                        transform:
                          hoveredService === service._id
                            ? "scale(1.05)"
                            : "scale(1)",
                      }}
                    >
                      <a
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "12px 20px",
                          textDecoration: "none",
                          color:
                            hoveredService === service._id ? "#333" : "#555",
                          fontWeight:
                            hoveredService === service._id ? "500" : "400",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div
                            style={{
                              width: "28px",
                              height: "28px",
                              marginRight: "14px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Image
                              width={510}
                              height={360}
                              style={{
                                width: "30px",
                                height: "30px",
                                transition: "filter 0.3s ease",
                              }}
                              src={service.logo}
                              alt="image"
                            />
                          </div>
                          <span style={{ fontSize: "14px" }}>
                            {service.name}
                          </span>
                        </div>
                        <i
                          className="icon-chevron-right"
                          style={{
                            fontSize: "12px",
                            marginLeft: "5px",
                          }}
                        ></i>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
 
              {/* Right content area - UPDATED with decorative elements */}
              <div
                className="services-content"
                style={{
                  flex: "1",
                  padding: "20px 30px",
                  overflowY: "auto",
                  height: "450px",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#ccc transparent",
                  backgroundColor: "#fff",
                }}
              >
                {hoveredService && (
                  <>
                    {/* Find the current business service to get its slug */}
                    {(() => {
                      const currentBusinessService =
                        getCurrentBusinessService(hoveredService);
                      return currentBusinessService?.slug === "csr" ? (
                        <div
                          style={{
                            gridColumn: "span 2",
                            background:
                              "linear-gradient(to bottom right,rgb(254, 255, 240), #FFFFFF)",
                            padding: "28px",
                            borderRadius: "16px",
                            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.05)",
                            borderLeft: "6px solid #F5C45E",
                            borderRight: "6px solid #F5C45E",
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            transition:
                              "transform 0.2s ease, box-shadow 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                              "translateY(-4px)";
                            e.currentTarget.style.boxShadow =
                              "0 12px 24px rgba(0, 0, 0, 0.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                              "0 6px 16px rgba(0, 0, 0, 0.05)";
                          }}
                        >
                          {/* Title */}
                          <h2
                            style={{
                              fontSize: "20px",
                              fontWeight: 700,
                              color: "#1E3A8A",
                              marginBottom: "14px",
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            {currentBusinessService?.title}
                            <span
                              style={{
                                display: "block",
                                width: "40px",
                                height: "3px",
                                backgroundColor: "#F5C45E",
                                marginTop: "6px",
                                borderRadius: "2px",
                              }}
                            />
                          </h2>
 
                          {/* Description Box */}
                          <div
                            style={{
                              border: "1px dashed rgb(254, 246, 191)",
                              backgroundColor: "rgb(240, 239, 234)",
                              padding: "16px",
                              borderRadius: "8px",
                              marginBottom: "20px",
                            }}
                          >
                            <p
                              style={{
                                fontSize: "14.5px",
                                color: "#1E40AF",
                                lineHeight: "1.75",
                                textAlign: "justify",
                              }}
                            >
                              {currentBusinessService?.description}
                            </p>
                          </div>
 
                          {/* Only display the first matching service */}
                          {(() => {
                            const firstService = services.find(
                              (service) =>
                                service.business_services &&
                                service.business_services._id === hoveredService
                            );
 
                            if (!firstService) return null;
 
                            const currentBusinessService =
                              getCurrentBusinessService(hoveredService);
                            const serviceUrl = `/${currentBusinessService?.slug}/${firstService.slug}`;
 
                            return (
                              <Link
                                key={firstService._id}
                                href={serviceUrl}
                                passHref
                                onClick={(e) => {
                                  handleLearnMoreClick(
                                    firstService._id,
                                    currentBusinessService?.slug,
                                    firstService.slug
                                  );
                               
                                }}
                                style={{
                                  textDecoration: "none",
                                  color: "inherit",
                                }}
                              >
                                <span
                                  onClick={(e) => {
                                    handleLearnMoreClick(
                                      currentBusinessService?.slug
                                    );
                                  }}
                                  style={{
                                    color: "#AD8F72",
                                    fontSize: "14.5px",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                    textUnderlineOffset: "4px",
                                    transition: "color 0.3s ease",
                                    alignSelf: "flex-start",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.color = "#916E50";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.color = "#AD8F72";
                                  }}
                                >
                                  Read More
                                </span>
                              </Link>
                            );
                          })()}
                        </div>
                      ) : // Show other business service details
                      services?.filter(
                        (service) =>
                          service.business_services &&
                          service.business_services._id === hoveredService
                      ).length > 0 ? (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(2, 1fr)",
                          gap: "20px",
                        }}
                      >
                        {services
                          .filter(
                            (service) =>
                              service.business_services &&
                              service.business_services._id === hoveredService
                          )
                          .map((service, index) => {
                            const currentBusinessService =
                              getCurrentBusinessService(hoveredService);
                            const isLoading =
                              loadingServiceId === service._id;
                            const serviceUrl = `/${currentBusinessService?.slug}/${service.slug}`;

                            // Check if this is a B2C enquiry form
                            const isB2CEnquiry =
                              currentBusinessService?.slug === "b2c" &&
                              service.slug === "enquiryform";

                            // For B2C enquiry form, render the full width special card
                            if (isB2CEnquiry) {
                              return (
                                <div
                                  key={service._id}
                                  style={{
                                    gridColumn: "span 2",
                                    background:
                                      "linear-gradient(to bottom right,rgb(254, 255, 240), #FFFFFF)",
                                    padding: "32px",
                                    borderRadius: "16px",
                                    boxShadow:
                                      "0 6px 16px rgba(0, 0, 0, 0.05)",
                                    borderLeft: "6px solid #F5C45E",
                                    borderRight: "6px solid #F5C45E",
                                    position: "relative",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    transition:
                                      "transform 0.2s ease, box-shadow 0.2s ease",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                      "translateY(-4px)";
                                    e.currentTarget.style.boxShadow =
                                      "0 12px 24px rgba(0, 0, 0, 0.1)";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                      "translateY(0)";
                                    e.currentTarget.style.boxShadow =
                                      "0 6px 16px rgba(0, 0, 0, 0.05)";
                                  }}
                                >
                                  {/* Title */}
                                  <h2
                                    style={{
                                      fontSize: "20px",
                                      fontWeight: 700,
                                      color: "#1E3A8A", // Darker blue for contrast
                                      marginBottom: "14px",
                                      position: "relative",
                                      display: "inline-block",
                                    }}
                                  >
                                    {service.title}
                                    <span
                                      style={{
                                        display: "block",
                                        width: "40px",
                                        height: "3px",
                                        backgroundColor: "#F5C45E", // Blue underline
                                        marginTop: "6px",
                                        borderRadius: "2px",
                                      }}
                                    />
                                  </h2>

                                  {/* Description Box */}
                                  <div
                                    style={{
                                      border: "1px dashed rgb(254, 246, 191)",
                                      backgroundColor: "rgb(240, 239, 234)",
                                      padding: "16px",
                                      borderRadius: "8px",
                                      marginBottom: "20px",
                                    }}
                                  >
                                    <p
                                      style={{
                                        fontSize: "14.5px",
                                        color: "#1E40AF",
                                        lineHeight: "1.75",
                                        textAlign: "justify",
                                      }}
                                      dangerouslySetInnerHTML={{
                                        __html: (
                                          service.description ||
                                          `Reach out to us through this service for personalized support.`
                                        ).replace(
                                          "SmartCliff empowers aspiring professionals with future-ready training programs",
                                          `<strong style="color:#1E3A8A;">SmartCliff empowers aspiring professionals with future-ready training programs</strong>`
                                        ),
                                      }}
                                    />
                                  </div>

                                  {/* Button */}
                                  <span
                                    onClick={(e) => {
                                      handleLearnMoreClick(
                                        service._id,
                                        currentBusinessService?.slug,
                                        service.slug
                                      );
                                      e.preventDefault();
                                    }}
                                    style={{
                                      color: "#AD8F72",
                                      fontSize: "14.5px",
                                      fontWeight: 600,
                                      cursor: "pointer",
                                      textDecoration: "underline",
                                      textUnderlineOffset: "4px",
                                      transition: "color 0.3s ease",
                                      alignSelf: "flex-start",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.color = "#916E50"; // Slightly darker on hover
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.color = "#AD8F72";
                                    }}
                                  >
                                    Enquiry Now
                                  </span>
                                </div>
                              );
                            }

                            // For all other service cards, render the standard card
                            return (
                              <Link
                                key={service._id}
                                href={serviceUrl}
                                passHref
                                onClick={(e) => {
                                  handleLearnMoreClick(
                                    service._id,
                                    currentBusinessService?.slug,
                                    service.slug
                                  );

                                  // Prevent default if it's our special case
                                  if (isB2CEnquiry) {
                                    e.preventDefault();
                                  }
                                }}
                                style={{
                                  textDecoration: "none",
                                  color: "inherit",
                                }}
                              >
                                <div
                                  style={{
                                    background: "#fff",
                                    borderRadius: "16px",
                                    boxShadow:
                                      "5px 1px 5px 0 rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.19)",
                                    overflow: "hidden",
                                    height: "180px",
                                    maxWidth: "400px",
                                    display: "flex",
                                    flexDirection: "column",
                                    transition:
                                      "transform 0.3s ease, box-shadow 0.3s ease",
                                    padding: "20px 20px",
                                    position: "relative",
                                    border: "1px solid #f0f0f0",
                                  }}
                                  className="hover:shadow-lg hover:-translate-y-1"
                                >
                                  {/* Decorative element positioned at right side */}
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: "120px",
                                      right: "-20px",
                                      opacity: 0.9,
                                      zIndex: "0",
                                    }}
                                  >
                                    {getCardDecoration(index)}
                                  </div>
                                  {/* Content container with an image on the left */}
                                  <div
                                    style={{
                                      zIndex: "1",
                                    }}
                                  >
                                    {/* Service Image (Left of heading) */}
                                    <div
                                      style={{
                                        display: "flex",
                                        zIndex: "1",
                                      }}
                                    >
                                      <div
                                        style={{
                                          flexShrink: "0",
                                          width: "50px",
                                          height: "50px",
                                          marginRight: "15px",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          borderRadius: "50%",
                                          overflow: "hidden",
                                        }}
                                      >
                                        {service.icon ? (
                                          <Image
                                            src={service.icon}
                                            alt={service.title}
                                            width={30}
                                            height={30}
                                            style={{ objectFit: "cover" }}
                                          />
                                        ) : (
                                          <i
                                            className="icon-briefcase"
                                            style={{
                                              fontSize: "28px",
                                              color: "#498bfa",
                                            }}
                                          ></i>
                                        )}
                                      </div>
                                      <h3
                                        style={{
                                          fontSize: "15px",
                                          fontWeight: "600",
                                          color: "#002856",
                                          marginTop: "8px",
                                          marginBottom: "10px",
                                          lineHeight: "1.3",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          display: "-webkit-box",
                                          WebkitLineClamp: "2",
                                          WebkitBoxOrient: "vertical",
                                        }}
                                      >
                                        {service.title}
                                      </h3>
                                    </div>

                                    {/* Text Content */}
                                    <div style={{ flex: "1" }}>
                                      {/* Description */}
                                      <p
                                        style={{
                                          fontSize: "12px",
                                          color: "#6B7280",
                                          margin: "0 0 12px 0",
                                          lineHeight: "1.5",
                                          flex: "1",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          display: "-webkit-box",
                                          WebkitLineClamp: "3",
                                          WebkitBoxOrient: "vertical",
                                        }}
                                      >
                                        {service.description ||
                                          `Comprehensive ${service.title} solutions tailored to your business needs.`}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Learn More button */}
                                  {service.title !== "Degree Program" && (
                                    <div
                                      style={{
                                        marginTop: "auto",
                                        display: "flex",
                                        alignItems: "center",
                                        position: "relative",
                                        zIndex: "1",
                                      }}
                                    >
                                      {isLoading ? (
                                        <>
                                          <LoadingSpinner />
                                          <span style={{ marginLeft: "8px" }}>
                                            Loading
                                            <SequentialDots />
                                          </span>
                                        </>
                                      ) : (
                                        <>
                                          <span
                                            style={{
                                              fontSize: "14px",
                                              fontWeight: "500",
                                              color: "#0047AB",
                                              display: "flex",
                                              alignItems: "center",
                                            }}
                                          >
                                            {isB2CEnquiry
                                              ? "Enquiry Now"
                                              : "Read More"}
                                          </span>
                                          <i
                                            className="icon-chevron-right"
                                            style={{
                                              fontSize: "11px",
                                              marginLeft: "8px",
                                              color: "#0047AB",
                                              transition:
                                                "transform 0.2s ease",
                                            }}
                                          ></i>
                                        </>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </Link>
                            );
                          })}
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "350px",
                          color: "#777",
                        }}
                      >
                        <i
                          className="icon-briefcase"
                          style={{
                            fontSize: "40px",
                            color: "#ddd",
                            marginBottom: "15px",
                          }}
                        ></i>
                        {hoveredService
                          ? "No services available in this category"
                          : "Select a category to view services"}
                      </div>
                    );
                  })()}
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    {/* <EnquiryModal isOpen={isModalOpen} onClose={closeModal} /> */}

    {isModalOpen && (
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          backdropFilter: "blur(5px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 100000,
          overflowY: "hidden",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Modal Box - Perfectly Centered */}
        <motion.div
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            padding: "20px 30px",
            borderRadius: "20px",
            width: "500px",
            height: "95%",
            position: "relative",
            zIndex: 10000,
            display: "flex",
            flexDirection: "column", // Ensure proper layout
          }}
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Modal Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
              position: "sticky",
              top: "0",
              backgroundColor: "white",
              zIndex: 100,
              paddingBottom: "10px",
            }}
          >
            <h1
              style={{
                fontSize: "30px",
                fontWeight: "normal",
                fontFamily: "'Dancing Script', cursive",
                color: "#000",
                margin: "0",
                position: "relative",
                padding: "0 0 10px 0",
              }}
            >
              Enquiry Form
              <span
                style={{
                  position: "absolute",
                  left: "0",
                  bottom: "0",
                  height: "5px",
                  width: "55px",
                  backgroundColor: "black",
                }}
              ></span>
              {/* Bottom Thin Line */}
              <span
                style={{
                  position: "absolute",
                  left: "0",
                  bottom: "2px",
                  height: "1px",
                  width: "95%",
                  maxWidth: "255px",
                  backgroundColor: "black",
                }}
              ></span>
            </h1>

            <button
              type="button"
              onClick={() => closeModal(false)}
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "8px",
                padding: "4px 6px",
                border: "none",
                backgroundColor: "#b91616",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                color: "white",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <FaTimes />
            </button>
          </div>

          {/* Modal Content */}
          <div
            style={{
              flexGrow: 1, // Takes remaining height
              overflowY: "auto",
              paddingRight: "10px",
              scrollbarWidth: "thin",
            }}
          >
            <EnquiryModal isOpen={isModalOpen} onClose={closeModal} />
          </div>
        </motion.div>
      </motion.div>
    )}
  </li>
);
};

export default ServicesDropdown;

