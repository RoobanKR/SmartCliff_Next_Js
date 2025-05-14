"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";

// MCA components
import About from "@/components/mca/About";
import PartnersSection from "@/components/mca/DpPartners";
import TargetStudentsSection from "@/components/mca/csr/targetStudents";

// Redux actions
import { fetchDegreeProgramData } from "@/redux/slices/mca/degreeProgram/DegreeProgram";
import { fetchAllFAQs } from "@/redux/slices/faq/faq";
import { fetchAboutCollegeData } from "@/redux/slices/mca/aboutCollege/aboutCollege";
import { fetchAllOurPartners } from "@/redux/slices/degreeProgram/dpPartner";
import { fetchAllOurSponsors } from "@/redux/slices/degreeProgram/dpSponsor";
import { fetchOurPrograms } from "@/redux/slices/mca/ourProgram/ourProgram";
import { getAllOutcomes } from "@/redux/slices/mca/outcomes/Outcomes";
import { getAllTargetStudents } from "@/redux/slices/mca/targetStudent/targetStudent";

SwiperCore.use([Navigation, Pagination]);

export default function Page1({ programId }) {
  const dispatch = useDispatch();

  // State
  const [activeSection, setActiveSection] = useState("");
  const [programRefs, setProgramRefs] = useState({});
  const [selectedProgramId, setSelectedProgramId] = useState(programId);
  const [isMobileView, setIsMobileView] = useState(false);
  const navLinksRef = useRef(null);

  // Section refs
  const aboutRefs = useRef(null);
  const partnersRef = useRef(null);
  const targetRef = useRef(null);
  const sectionNavRef = useRef(null);

  // Redux selectors
  const { ourPartners } = useSelector((state) => state.ourPartners);
  const { targetStudents } = useSelector((state) => state.targetStudent);
  const degreeProgramData = useSelector(
    (state) => state.degreeProgram.degreeProgramData
  );
  // Matched program data based on URL id
  const matchedData = degreeProgramData.filter(
    (item) => item.company?._id === programId
  );
  // Filtered data based on selected program ID
  const finalPartners =
    ourPartners?.filter(
      (partner) => partner.degree_program._id === selectedProgramId
    ) || [];
  const finalTarget =
    targetStudents?.filter(
      (target) => target?.degree_program?._id === selectedProgramId
    ) || [];
  // Section navigation active state
  const [activeSectionNav, setActiveSectionNav] = useState("About");

  // Fetch data on component mount
  useEffect(() => {
    const actions = [
      fetchDegreeProgramData(),
      fetchAllOurSponsors(),
      fetchAboutCollegeData(),
      getAllTargetStudents(),
      fetchAllOurPartners(),
    ];

    actions.forEach((action) => dispatch(action));

    // Handle responsive view
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  useEffect(() => {
    if (matchedData?.length > 0 && !activeSection) {
      // Only set default if no activeSection is already set
      setActiveSection(matchedData[0].program_name);
      setSelectedProgramId(matchedData[0]._id);
    }
  }, [matchedData]);

  // Handle scroll to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      if (!matchedData?.length) return;

      const sectionRefs = matchedData.map((program) => ({
        label: program.program_name,
        ref: programRefs[program._id],
      }));

      const scrollPosition = window.scrollY + 200;

      for (const section of sectionRefs) {
        if (section.ref?.current) {
          const sectionTop = section.ref.current.offsetTop;
          const sectionHeight = section.ref.current.offsetHeight;

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveSection(section.label);
            break;
          }
        }
      }

      // Check which section is in view for the section navigation
      const contentSections = [
        { label: "About", ref: aboutRefs },
        { label: "Partners", ref: partnersRef },
        { label: "Target Students", ref: targetRef },
      ];

      for (const section of contentSections) {
        if (section.ref?.current) {
          const sectionTop = section.ref.current.offsetTop;
          const sectionHeight = section.ref.current.offsetHeight;

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveSectionNav(section.label);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [matchedData, programRefs]);

  // Navigation handlers
  const handleProgramClick = (programId, ref, programName) => {
    setSelectedProgramId(programId);
    setActiveSection(programName);
    scrollToSection(ref, programName);
  };

  const scrollToSection = (ref, section) => {
    if (ref?.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 150,
        behavior: "smooth",
      });
      setActiveSection(section);
    }
  };

  // Section navigation handler
  const scrollToContentSection = (ref, section) => {
    if (ref?.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 180, // Account for both nav bars
        behavior: "smooth",
      });
      setActiveSectionNav(section);
    }
  };

  return (
    <div className="main-content">

      {/* Navigation Bar */}
      <div
        className="navigation-controls"
        style={{
          position: "fixed",
          top: isMobileView ? "45px" : "55px",
          zIndex: "10",
          backgroundColor: "rgb(229, 226, 236)",
          padding: isMobileView ? "6px 0" : "8px 0",
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginTop: "10px",
        }}
      >
        {/* Navigation Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            position: "relative",
            overflow: "hidden",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <div
            ref={navLinksRef}
            className="nav-links"
            style={{
              display: "flex",
              gap: isMobileView ? "15px" : "30px",
              overflowX: "auto",
              flex: 1,
              scrollBehavior: "smooth",
              padding: "0 20px",
              whiteSpace: "nowrap",
            }}
          >
            {matchedData?.length > 0 &&
              matchedData.map((program, index) => {
                const isActive = activeSection === program.program_name;

                return (
                  <button
                    key={program._id}
                    onClick={() =>
                      handleProgramClick(
                        program._id,
                        programRefs[program._id],
                        program.program_name
                      )
                    }
                    className={`nav-button ${isActive ? "active" : ""}`}
                    style={{
                      position: "relative",
                      border: "none",
                      fontSize: isMobileView ? "12px" : "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      padding: "5px 10px",
                      borderRadius: "5px", // Pill shape
                      color: isActive ? "white" : "#5B2C6F",
                      backgroundColor: isActive ? "#5B2C6F" : "transparent", // Active bg
                      transition: "all 0.3s ease",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {program.program_name}
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      {/* Section Navigation Bar - NEW */}
      <div
        ref={sectionNavRef}
        className="section-navigation"
        style={{
          position: "fixed",
          top: isMobileView ? "100px" : "120px",
          zIndex: "9",
          backgroundColor: "#EADBC8",
          padding: isMobileView ? "6px 0" : "8px 0",
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            position: "relative",
            overflow: "hidden",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <div
            className="section-links"
            style={{
              display: "flex",
              gap: isMobileView ? "10px" : "20px",
              overflowX: "auto",
              flex: 1,
              scrollBehavior: "smooth",
              padding: "0 20px",
              whiteSpace: "nowrap",
            }}
          >
            {[
              { label: "About", ref: aboutRefs },
              ...(finalPartners.length > 0
                ? [{ label: "Partners", ref: partnersRef }]
                : []),
              ...(finalTarget.length > 0
                ? [{ label: "Target Students", ref: targetRef }]
                : []),
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToContentSection(item.ref, item.label)}
                className={`section-button ${activeSectionNav === item.label ? "active" : ""
                  }`}
                style={{
                  position: "relative",
                  background: "none",
                  border: "none",
                  fontSize: isMobileView ? "11px" : "14px",
                  fontWeight: activeSectionNav === item.label ? "700" : "600",
                  cursor: "pointer",
                  paddingBottom: "4px",
                  color: activeSectionNav === item.label ? "#1E40AF" : "#666",
                  transition: "all 0.3s ease",
                  flexShrink: 0,
                }}
              >
                {item.label}
                <span
                  className="underline"
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    width: activeSectionNav === item.label ? "100%" : "0",
                    height: "2px",
                    backgroundColor: "#1E40AF",
                    transition: "width 0.3s ease-in-out",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* main content */}
      <div
        className="content-wrapper js-content-wrapper overflow-auto "
        style={{ marginTop: "160px" }}
      >
        {/* Content Sections with refs */}
        <div ref={aboutRefs}>
          <About ids={selectedProgramId} />
        </div>

        {finalPartners.length > 0 && (
          <div ref={partnersRef}>
            <PartnersSection ids={selectedProgramId} />
          </div>
        )}
        {finalTarget.length > 0 && (
          <div ref={targetRef}>
            <TargetStudentsSection ids={selectedProgramId} />
          </div>
        )}
      </div>
    </div>
  );
}

