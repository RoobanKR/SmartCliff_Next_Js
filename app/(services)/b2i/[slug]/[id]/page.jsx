"use client";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDegreeProgramData } from "@/redux/slices/mca/degreeProgram/DegreeProgram";
import { fetchAllFAQs } from "@/redux/slices/faq/faq";
import { useParams, useRouter } from "next/navigation";
import Banner from "@/components/common/Banner";
import About from "@/components/mca/About";
import OurProgram from "@/components/mca/OurProgram";
import Outcomes from "@/components/mca/Outcomes";
import FAQComponent from "@/components/courseSingle/Faq";
import Semester from "@/components/mca/Semester";
import Highlights from "@/components/mca/Highlights";
import AdmissionProcess from "@/components/mca/AdmissionProcess";
import FooterTwo from "@/components/layout/footers/Footer";
import Preloader from "@/components/common/Preloader";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";

import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import AboutCollege from "@/components/mca/AboutCollege";
import DegreeCertificationUI from "@/components/mca/Certification";
import { fetchAboutCollegeData } from "@/redux/slices/mca/aboutCollege/aboutCollege";
import { fetchAllColleges } from "@/redux/slices/collegeDetails/collegeDetails";

SwiperCore.use([Navigation, Pagination]);


export default function Page() {
  const dispatch = useDispatch();
  const faq = useSelector((state) => state.faq.faq);
  const { id } = useParams();

  const router = useRouter();
  const [isMobileView, setIsMobileView] = useState(false);
  // College names for the tab
  const [currentCollegeIndex, setCurrentCollegeIndex] = useState(0);
  const [selectedCollegeId, setSelectedCollegeId] = useState(null);
  const [showNavArrows, setShowNavArrows] = useState(false);

  const navigationContainerRef = useRef(null);
  const collegesWrapperRef = useRef(null);

  const collegeDetails = useSelector((state) => state.colleges.colleges);

  const aboutCollegeData = useSelector(
    (state) => state.aboutCollege.aboutCollegeData
  );

  const checkOverflow = () => {
    if (navigationContainerRef.current && collegesWrapperRef.current) {
      const containerWidth = navigationContainerRef.current.clientWidth;
      const contentWidth = collegesWrapperRef.current.scrollWidth;
      setShowNavArrows(contentWidth > containerWidth);
    }
  };

  const handleResize = () => {
    setIsMobileView(window.innerWidth < 768);
    checkOverflow();
  };

  useEffect(() => {
    dispatch(fetchDegreeProgramData());
    dispatch(fetchAboutCollegeData());
    dispatch(fetchAllColleges());
    dispatch(fetchAllFAQs());

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  useEffect(() => {
    if (collegeDetails && collegeDetails.length > 0) {
      setSelectedCollegeId(collegeDetails[currentCollegeIndex]?._id || null);
      // Check for overflow after data is loaded
      setTimeout(checkOverflow, 100);
    }
  }, [collegeDetails, currentCollegeIndex]);

  useEffect(() => {
    // Check overflow when component mounts and when window is resized
    checkOverflow();
  }, [collegeDetails]);


  const selectedAboutCollege = aboutCollegeData.find(
    (program) => program._id === id
  );

  const filteredFAQ = faq.filter(
    (item) =>
      selectedAboutCollege &&
      String(item.degree_program) === String(selectedAboutCollege._id)
  );

  const handlePrevCollege = () => {
    const newIndex =
      currentCollegeIndex === 0
        ? collegeDetails.length - 1
        : currentCollegeIndex - 1;
    setCurrentCollegeIndex(newIndex);
    setSelectedCollegeId(collegeDetails[newIndex]?._id || null);
  };

  const handleNextCollege = () => {
    const newIndex =
      currentCollegeIndex === collegeDetails.length - 1
        ? 0
        : currentCollegeIndex + 1;
    setCurrentCollegeIndex(newIndex);
    setSelectedCollegeId(collegeDetails[newIndex]?._id || null);
  };


  const handleBack = () => {
    if (typeof window !== "undefined") {
      const fullUrl = window.location.pathname; // Get current path
      const segments = fullUrl.split("/").filter(Boolean); // Split into segments
      segments.pop(); // Remove last segment

      const previousRoute = segments.length > 0 ? `/${segments.join("/")}` : "/"; // Reconstruct URL

      router.push(previousRoute); // Navigate back
    }
  };


  return (
    <div className="main-content overflow-hidden">
      <Preloader />
      <HeaderTwo />
      <div className="content-wrapper js-content-wrapper overflow-hidden mt-80">
        <br />

        <div
          className="navigation-controls"
          style={{
            position: "fixed",
            top: "75px",
            zIndex: "10",
            backgroundColor: "rgb(229, 226, 236)",
            padding: "10px 0",
            display: "flex",
            alignItems: "center",
            width: "100%",
            marginTop: window.innerWidth <= 768 ? "-10px" : "0px",
          }}
        >
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="back-button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              color: "black",
              border: "2px solid black",
              padding: window.innerWidth <= 768 ? "4px 7px" : "6px 15px", // Smaller size for mobile
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: window.innerWidth <= 768 ? "12px" : "16px",
              fontWeight: "600",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              marginLeft: "10px",
            }}
          >
            <svg
              width={window.innerWidth <= 768 ? "15" : "20"} // Adjusted size for mobile
              height={window.innerWidth <= 768 ? "15" : "20"}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transition:
                  "transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
              }}
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span
              className="button-text"
              style={{
                transition:
                  "transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
              }}
            >
              Back
            </span>
          </button>

          {/* College Navigation Tab */}
          <div
            ref={navigationContainerRef}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginRight: "20px",
              padding: "8px 16px",
              borderRadius: "8px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {showNavArrows && (
              <button
                onClick={handlePrevCollege}
                style={{
                  backgroundColor: "#5B2C6F",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  flexShrink: 0,
                  zIndex: 2,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}

            <div
              ref={collegesWrapperRef}
              style={{
                display: "flex",
                overflowX: "hidden",
                gap: "10px",
                flex: 1,
              }}
            >
              {collegeDetails?.map((college, index) => (
                <div
                  key={index}
                  style={{
                    padding: "5px 10px",
                    backgroundColor:
                      currentCollegeIndex === index ? "#5B2C6F" : "transparent",
                    color: currentCollegeIndex === index ? "white" : "#5B2C6F",
                    borderRadius: "5px",
                    fontSize: isMobileView ? "12px" : "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transform: `translateX(-${currentCollegeIndex * (isMobileView ? 100 : 120)
                      }px)`,
                    transition:
                      "transform 0.3s ease, background-color 0.3s ease",
                    flexShrink: 0,
                  }}
                  onClick={() => {
                    setCurrentCollegeIndex(index);
                    setSelectedCollegeId(college._id);
                  }}
                >
                  {college.collegeName}
                </div>
              ))}
            </div>

            {showNavArrows && (
              <button
                onClick={handleNextCollege}
                style={{
                  backgroundColor: "#5B2C6F",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  flexShrink: 0,
                  zIndex: 2,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* <About /> */}
        <About collegeId={selectedCollegeId} />
        <AboutCollege collegeId={selectedCollegeId} />
        <OurProgram collegeId={selectedCollegeId} />
        <Semester collegeId={selectedCollegeId} />
        <Outcomes collegeId={selectedCollegeId} />
        <DegreeCertificationUI />
        <AdmissionProcess />
        <FAQComponent faq={filteredFAQ} />
        <br />
        <FooterTwo />
      </div>
    </div>
  );
}
