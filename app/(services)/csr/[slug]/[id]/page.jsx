"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";

// Layout components
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import FooterTwo from "@/components/layout/footers/Footer";
import Preloader from "@/components/common/Preloader";

// MCA components
import About from "@/components/mca/About";
import PartnersSection from "@/components/mca/DpPartners";
import SponsorsSection from "@/components/mca/DpSponsor";
import ProgrammeHighlights from "@/components/mca/csr/programHighlights";
import TestimonialsSection from "@/components/mca/csr/programOutcome";
import TargetStudentsSection from "@/components/mca/csr/targetStudents";
import FAQComponent from "@/components/courseSingle/Faq";

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

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();
  const programId = useParams().id;

  // State
  const [activeSection, setActiveSection] = useState("");
  const [programRefs, setProgramRefs] = useState({});
  const [selectedProgramId, setSelectedProgramId] = useState(programId);
  const [isMobileView, setIsMobileView] = useState(false);
  const navLinksRef = useRef(null);

  // Section refs
  const aboutRef = useRef(null);
  const partnersRef = useRef(null);
  const highlightsRef = useRef(null);
  const outcomeRef = useRef(null);
  const targetRef = useRef(null);
  const sponsorsRef = useRef(null);
  const faqRef = useRef(null);
  const sectionNavRef = useRef(null);

  // Redux selectors
  const { ourPartners } = useSelector((state) => state.ourPartners);
  const { ourSponsors } = useSelector((state) => state.ourSponsors);
  const ourProgram = useSelector((state) => state.ourProgram.ourProgram);
  const outcomes = useSelector((state) => state.outcomes.outcomes);
  const { targetStudents } = useSelector((state) => state.targetStudent);
  const degreeProgramData = useSelector(
    (state) => state.degreeProgram.degreeProgramData
  );
  const faq = useSelector((state) => state.faq.faq);
  const aboutCollegeData = useSelector(
    (state) => state.aboutCollege.aboutCollegeData
  );

  // Matched program data based on URL id
  const matchedData = degreeProgramData.filter(
    (item) => item.company?._id === id
  );

  // Filtered data based on selected program ID
  const finalPartners =
    ourPartners?.filter(
      (partner) => partner.degree_program._id === selectedProgramId
    ) || [];
  const finalHighlights =
    ourProgram?.filter(
      (highlight) => highlight.degree_program._id === selectedProgramId
    ) || [];
  const finalProgramOutcome =
    outcomes?.filter(
      (outcome) => outcome.degree_program._id === selectedProgramId
    ) || [];
  const finalTarget =
    targetStudents?.filter(
      (target) => target.degree_program._id === selectedProgramId
    ) || [];
  const finalSponsor =
    ourSponsors?.filter(
      (sponsor) => sponsor.degree_program._id === selectedProgramId
    ) || [];
  const selectedAboutCollege = aboutCollegeData.find(
    (program) => program._id === selectedProgramId
  );
  const filteredFAQ = faq.filter(
    (item) =>
      selectedAboutCollege &&
      String(item.degree_program) === String(selectedAboutCollege._id)
  );

  // Section navigation active state
  const [activeSectionNav, setActiveSectionNav] = useState("About");

  // Fetch data on component mount
  useEffect(() => {
    const actions = [
      fetchDegreeProgramData(),
      fetchAllOurSponsors(),
      fetchAboutCollegeData(),
      fetchOurPrograms(),
      getAllOutcomes(),
      getAllTargetStudents(),
      fetchAllFAQs(),
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
        { label: "About", ref: aboutRef },
        { label: "Partners", ref: partnersRef },
        { label: "Highlights", ref: highlightsRef },
        { label: "Program Outcome", ref: outcomeRef },
        { label: "Target Students", ref: targetRef },
        { label: "Sponsors", ref: sponsorsRef },
        { label: "FAQ", ref: faqRef },
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

  const handleBack = () => {
    const fullUrl = window.location.pathname;
    const segments = fullUrl.split("/").filter(Boolean);
    segments.pop();
    const previousRoute = segments.length > 0 ? `/${segments.join("/")}` : "/";
    router.push(previousRoute);
  };

  return (
    <div className="main-content overflow-hidden">
      <Preloader />
      <HeaderTwo />

      {/* Navigation Bar */}
      <div
        className="navigation-controls"
        style={{
          position: "fixed",
          top: isMobileView ? "60px" : "65px",
          zIndex: "10",
          backgroundColor: "rgb(229, 226, 236)",
          padding: isMobileView ? "6px 0" : "8px 0",
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginTop: "10px",
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
            gap: "5px",
            color: "black",
            border: "2px solid black",
            padding: isMobileView ? "3px 5px" : "6px 12px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: isMobileView ? "10px" : "14px",
            fontWeight: "600",
            transition: "all 0.3s ease",
            marginLeft: "8px",
          }}
        >
          <svg
            width={isMobileView ? "12" : "18"}
            height={isMobileView ? "12" : "18"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="button-text">Back</span>
        </button>

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
          top: isMobileView ? "110px" : "130px",
          zIndex: "9",
          backgroundColor: "rgb(199, 199, 216)",
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
              { label: "About", ref: aboutRef },
              ...(finalPartners.length > 0
                ? [{ label: "Partners", ref: partnersRef }]
                : []),
              ...(finalHighlights.length > 0
                ? [{ label: "Highlights", ref: highlightsRef }]
                : []),
              ...(finalProgramOutcome.length > 0
                ? [{ label: "Program Outcome", ref: outcomeRef }]
                : []),
              ...(finalTarget.length > 0
                ? [{ label: "Target Students", ref: targetRef }]
                : []),
              ...(finalSponsor.length > 0
                ? [{ label: "Sponsors", ref: sponsorsRef }]
                : []),
              ...(filteredFAQ.length > 0
                ? [{ label: "FAQ", ref: faqRef }]
                : []),
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToContentSection(item.ref, item.label)}
                className={`section-button ${
                  activeSectionNav === item.label ? "active" : ""
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

      <div
        className="content-wrapper js-content-wrapper overflow-hidden mt-80"
        style={{ marginTop: "160px" }}
      >
        {/* Content Sections with refs */}
        <div ref={aboutRef}>
          <About ids={selectedProgramId} />
        </div>

        {finalPartners.length > 0 && (
          <div ref={partnersRef}>
            <PartnersSection ids={selectedProgramId} />
          </div>
        )}

        {finalHighlights.length > 0 && (
          <div ref={highlightsRef}>
            <ProgrammeHighlights ids={selectedProgramId} />
          </div>
        )}

        {finalProgramOutcome.length > 0 && (
          <div ref={outcomeRef}>
            <TestimonialsSection ids={selectedProgramId} />
          </div>
        )}

        {finalTarget.length > 0 && (
          <div ref={targetRef}>
            <TargetStudentsSection ids={selectedProgramId} />
          </div>
        )}

        {finalSponsor.length > 0 && (
          <div ref={sponsorsRef}>
            <SponsorsSection ids={selectedProgramId} />
          </div>
        )}

        {filteredFAQ.length > 0 && (
          <div ref={faqRef}>
            <FAQComponent faq={filteredFAQ} />
          </div>
        )}

        <br />
        <FooterTwo />
      </div>
    </div>
  );
}
