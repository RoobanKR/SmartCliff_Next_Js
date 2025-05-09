"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { fetchDegreeProgramData } from "@/redux/slices/mca/degreeProgram/DegreeProgram";
import {
  fetchServices,
  selectServices,
} from "@/redux/slices/services/services/Services";
import jsonData from "../../public/assets/json/Banner.json";
import { selectBusinessServices } from "@/redux/slices/services/services/businessServices";
import { getAllServiceClients } from "@/redux/slices/services/services/clientServices";
import { FaCalendarAlt } from "react-icons/fa";
import Banner from "../common/Banner";
import { fetchAllCompanies } from "@/redux/slices/companyDetails/companyDetails";

export default function CsrDegreeProgram({serviceId }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const degreeProgramData = useSelector(
    (state) => state.degreeProgram.degreeProgramData
  );
  console.log("CsrDegreeProgram rendering with serviceId:", serviceId);

  const degreeCompanyDetails = useSelector(
    (state) => state.companies.companies
  );

  const services = useSelector(selectServices);
  const servicesBusiness = useSelector(selectBusinessServices);

  const [yearFilter, setYearFilter] = useState(""); // State for selected year
  const [loadingStates, setLoadingStates] = useState({});

  const fullUrl = typeof window !== "undefined" ? window.location.href : "";
  const segments = fullUrl.split("/").filter(Boolean);
  const lastSegment = segments.pop();
  const secondLastSegment = segments.pop();
  const onematchingData = servicesBusiness.find(
    (i) => i.slug === secondLastSegment
  );
  const matchId = services.filter(
    (i) => i.business_services._id === onematchingData._id
  );
  const twomatchingService = services.find((i) => i.slug === lastSegment);
  const final = matchId.find(
    (service) => service.slug === twomatchingService?.slug
  );

  const matchedDegrees = degreeProgramData.filter(
    (service) => service.service?._id === final?._id
  );

  const matchedDegree = degreeCompanyDetails.filter(
    (service) => service.service?._id === final?._id
  );


  useEffect(() => {
    dispatch(fetchServices());
    dispatch(getAllServiceClients());
    dispatch(fetchDegreeProgramData());
    dispatch(fetchAllCompanies());
  }, [dispatch]);
  // Extract unique years from degree programs
  const uniqueYears = [
    ...new Set(matchedDegree?.map((item) => item.year)),
  ].sort((a, b) => b - a);

  // Filter data based on selected year
  const filteredPrograms = yearFilter
    ? matchedDegree?.filter((program) => program.year === yearFilter)
    : matchedDegree;

  const handleProgramClick = (programId, e) => {
    e.preventDefault(); // Prevent default Link behavior

    // Set loading state for this specific program
    setLoadingStates((prev) => ({
      ...prev,
      [programId]: true,
    }));

    // Navigate programmatically
    router.push(`${pathname}/${programId}`);

    // Note: We don't need to reset loading state as the component will unmount during navigation
  };
  if (!matchedDegree || matchedDegree.length === 0) {
    return (
      <div style={{ 
        padding: "50px 0", 
        textAlign: "center",
        minHeight: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <h3 style={{ fontSize: "24px", color: "#333", marginBottom: "15px" }}>
          No Company Data Available
        </h3>
        <p style={{ fontSize: "16px", color: "#666", maxWidth: "600px", margin: "0 auto" }}>
          There are currently no company details available for this service. Please check back later.
        </p>
      </div>
    );
  }
  
  const featuredItems = filteredPrograms || [];
  return (
    <>
      {/* <div className="banner__content mt-60">
        {jsonData[3] && (
          <Banner
            title={jsonData[12].title}
            description={jsonData[12].description}
            imageUrl={jsonData[12].imageUrl}
          />
        )}
      </div> */}

      {/* Filter Section */}
      {featuredItems.length > 0 && (
        
        <div
          style={{
            position: "sticky",
            marginTop: "10px",
            animation: "slideInDown 0.6s ease 0.5s forwards",
          }}
        >
           <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            textAlign: "center",
          }}
          
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
                    fontSize: window.innerWidth < 768 ? "20px" : "29px",
                    margin: 0,
                    marginBottom: "20px"
                  }}
                >
                  Execution Overview
                </h2>
              </div>
            </div>

            <p
              style={{
                marginTop: window.innerWidth < 768 ? "-20px" : "-30px", color: "#EC5228", fontWeight: "bold",
                marginLeft: window.innerWidth < 768 ? "0px" : "30px",
              }}
            >

            </p>
          </div>
        </div>
          <div className="container">
            <div
              style={{
                display: "flex",
                // justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "15px",
              }}
            >
              <h4
                style={{
                  margin: "0",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#333",
                }}
              >
                Filter by Year:
              </h4>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  style={{
                    padding: "10px 20px",
                    borderRadius: "30px",
                    border: "none",
                    background: yearFilter === "" ? "rgb(48, 96, 114)" : "transparent",
                    color: yearFilter === "" ? "white" : "#333",
                    fontWeight: "600",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow:
                    yearFilter === ""
                      ? "0 5px 15px rgba(91, 44, 111, 0.2)"
                      : "none",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onClick={() => setYearFilter("")}
                  onMouseEnter={(e) => {
                    if (yearFilter !== "") {
                      e.currentTarget.style.background = "#f0f0f0";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (yearFilter !== "") {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  All Years
                </button>

                {uniqueYears.map((year) => (
                  <button
                    key={year}
                    style={{
                      padding: "10px 20px",
                      borderRadius: "30px",
                      border: "none",
                      background:
                        yearFilter === year ? "rgb(48, 96, 114)" : "transparent",
                      color: yearFilter === year ? "white" : "#333",
                      fontWeight: "600",
                      fontSize: "14px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow:
                      yearFilter === year
                        ? "0 5px 15px rgba(91, 44, 111, 0.2)"
                        : "none",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onClick={() => setYearFilter(year)}
                    onMouseEnter={(e) => {
                      if (yearFilter !== year) {
                        e.currentTarget.style.background = "#f0f0f0";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (yearFilter !== year) {
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Programs Grid */}
      <section
        style={{
          padding: "30px 0",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                window.innerWidth <= 768
                  ? "1fr"
                  : "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "30px",
              margin: "0 auto",
            }}
          >
            {featuredItems.map((program, index) => (
              <div
                key={program._id}
                style={{
                  opacity: "0",
                  transform: `perspective(1000px) rotateY(10deg) translateZ(-50px)`,
                  animation: `cardAppear 0.6s ease ${index * 0.1}s forwards`,
                  height: "100%", // Fixed height for the entire card
                
                }}
              >
                <div
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    backgroundColor: "white",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.07)",
                    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transform: "translateY(0) scale(1)",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-15px) scale(1.02)";
                    e.currentTarget.style.boxShadow = "0 20px 40px rgba(91, 44, 111, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.07)";
                  }}
                >
                  {/* Card ribbon */}
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "-35px",
                      background: "rgb(48, 96, 114)",
                      color: "white",
                      padding: "5px 40px",
                      transform: "rotate(45deg)",
                      fontWeight: "600",
                      fontSize: "12px",
                      boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                      zIndex: "2",
                    }}
                  >
                    {program.year}
                  </div>
                  {/* Image container - fixed height */}
                  <div
                    style={{
                      height: "160px", // Fixed height for image container
                      overflow: "hidden",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "20px",
                      backgroundColor: "#f8f9fa", // Light background for better contrast
                    }}
                  >
                    <img
                      src={program.logo}
                      alt={program.program_name}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain", // Ensures image fits while maintaining aspect ratio
                        display: "block",
                        transition: "transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                    {/* Gradient overlay */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "0",
                        left: "0",
                        width: "100%",
                        height: "60%",
                        background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
                        opacity: "0",
                        transition: "opacity 0.4s ease",
                        display: "flex",
                        alignItems: "flex-end",
                        padding: "20px",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "1";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "0";
                      }}
                    >
                      <h3
                        style={{
                          color: "white",
                          margin: "0",
                          fontSize: "18px",
                          fontWeight: "700",
                          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                        }}
                      >
                        {program.companyName}
                      </h3>
                    </div>
                  </div>
                  {/* Content - fixed height */}
                  <div
                    style={{
                      padding: "20px",
                      display: "flex",
                      flexDirection: "column",
                      flex: "1", // Takes remaining space
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: "700",
                          margin: "0 0 10px",
                          color: "#333",
                          lineHeight: "1.4",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {program.companyName}
                      </h3>

                      <div
                        style={{
                          overflow: "hidden",
                          fontSize: "14px",
                          color: "#666",
                          lineHeight: "1.5",
                        }}
                      >
                        {program.description}
                      </div>
                    </div>

                    <a
                      href={`${pathname}/${program._id}`}
                      onClick={(e) => handleProgramClick(program._id, e)}
                      style={{
                        display: "inline-block",
                        marginTop: "15px",
                        padding: "12px 0",
                        textAlign: "center",
                        width: "100%",
                        borderRadius: "10px",
                        background: "linear-gradient(to right, #306072,rgb(68, 150, 173))",
                        color: "white",
                        fontWeight: "600",
                        textDecoration: "none",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        fontSize: "14px",
                        border: "none",
                        transition: "all 0.3s ease",
                        position: "relative",
                        overflow: "hidden",
                        cursor: loadingStates[program._id] ? "wait" : "pointer",
                      }}
                      onMouseEnter={(e) => {
                        if (!loadingStates[program._id]) {
                          e.currentTarget.style.boxShadow = "0 5px 15px rgba(91, 44, 111, 0.3)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {loadingStates[program._id] ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              width: "20px",
                              height: "20px",
                              border: "3px solid rgba(255, 255, 255, 0.3)",
                              borderTop: "3px solid white",
                              borderRadius: "50%",
                              animation: "spin 1s linear infinite",
                              position: "relative",
                              zIndex: "1",
                            }}
                          ></span>
                          <span
                            style={{
                              color: "white",
                              position: "relative",
                              zIndex: "1",
                            }}
                          >
                            Loading...
                          </span>
                        </div>
                      ) : (
                        <span
                          style={{
                            color: "white",
                            position: "relative",
                            zIndex: "1",
                          }}
                        >
                          Explore Program
                        </span>
                      )}

                      <span
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          top: "0",
                          left: "-100%",
                          background: "linear-gradient(to right, #8E44AD, #5B2C6F)",
                          transition: "all 0.4s ease",
                          zIndex: "0",
                        }}
                        onMouseEnter={(e) => {
                          if (!loadingStates[program._id]) {
                            e.currentTarget.style.left = "0";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.left = "-100%";
                        }}
                      ></span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No results message */}
        </div>
        
      </section>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes scaleXIn {
          from {
            opacity: 0;
            transform: scaleX(0);
          }
          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        @keyframes cardAppear {
          from {
            opacity: 0;
            transform: perspective(1000px) rotateY(10deg) translateZ(-50px);
          }
          to {
            opacity: 1;
            transform: perspective(1000px) rotateY(0) translateZ(0);
          }
        }

        @keyframes float {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, 20px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
      `}</style>
    </>
  );
}
