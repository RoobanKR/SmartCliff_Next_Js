"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDegreeProgramData } from "@/redux/slices/mca/degreeProgram/DegreeProgram";
import { fetchAllFAQs } from "@/redux/slices/faq/faq";
import { useParams, useRouter } from "next/navigation";
import FAQComponent from "@/components/courseSingle/Faq";
import FooterTwo from "@/components/layout/footers/Footer";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import Preloader from "@/components/common/Preloader";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import { fetchAboutCollegeData } from "@/redux/slices/mca/aboutCollege/aboutCollege";
import About from "@/components/mca/About";
import PartnersSection from "@/components/mca/DpPartners";
import SponsorsSection from "@/components/mca/DpSponsor";
import { fetchAllOurPartners } from "@/redux/slices/degreeProgram/dpPartner";
import { fetchAllOurSponsors } from "@/redux/slices/degreeProgram/dpSponsor";
import ProgrammeHighlights from "@/components/mca/csr/programHighlights";
import TestimonialsSection from "@/components/mca/csr/programOutcome";
import TargetStudentsSection from "@/components/mca/csr/targetStudents";
import { fetchOurPrograms } from "@/redux/slices/mca/ourProgram/ourProgram";
import { getAllOutcomes } from "@/redux/slices/mca/outcomes/Outcomes";
import { getAllTargetStudents } from "@/redux/slices/mca/targetStudent/targetStudent";

SwiperCore.use([Navigation, Pagination]);

export default function Page() {
  const dispatch = useDispatch();
  const params = useParams();
  const programId = params.id;
  const router = useRouter();

  const { ourPartners } = useSelector(
    (state) => state.ourPartners
  );
  const ourProgram = useSelector((state) => state.ourProgram.ourProgram);
  const outcomes = useSelector((state) => state.outcomes.outcomes);
  const { targetStudents, loading, error } = useSelector(
    (state) => state.targetStudent
  );


  const faq = useSelector((state) => state.faq.faq);
  const aboutCollegeData = useSelector(
    (state) => state.aboutCollege.aboutCollegeData
  );
  const { id } = useParams();
  const { ourSponsors } = useSelector((state) => state.ourSponsors);
  // const [isMobileView, setIsMobileView] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // **Refs for sections**
  const aboutRef = useRef(null);
  const partnersRef = useRef(null);
  const highlightsRef = useRef(null);
  const programsRef = useRef(null);
  const targetsRef = useRef(null);
  const sponsorsRef = useRef(null);
  const faqRef = useRef(null);

  const handleResize = () => {
    setIsMobileView(window.innerWidth < 768);
  };

  useEffect(() => {
    dispatch(fetchDegreeProgramData());
    dispatch(fetchAllOurSponsors());
    dispatch(fetchAboutCollegeData());
    dispatch(fetchOurPrograms());
    dispatch(getAllOutcomes());
    dispatch(getAllTargetStudents());
    dispatch(fetchAllFAQs());
    dispatch(fetchAllOurPartners());
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  const finalPartners =
    ourPartners?.filter(
      (partner) => partner.degree_program._id === programId
    ) || [];

  const finalHightlights =
    ourProgram?.filter(
      (partner) => partner.degree_program._id === programId
    ) || [];

  const finalProgramoutcome =
    outcomes?.filter(
      (partner) => partner.degree_program._id === programId
    ) || [];

  const finalTarget =
    targetStudents?.filter(
      (partner) => partner.degree_program._id === programId
    ) || [];

  const finalSponsor =
    ourSponsors?.filter(
      (partner) => partner.degree_program._id === programId
    ) || [];


  const finalfaq =
    faq?.filter(
      (partner) => partner.degree_program?._id === programId
    ) || [];

  useEffect(() => {
    const handleScroll = () => {
      const sectionRefs = [
        { label: "About", ref: aboutRef },
        { label: "Partners", ref: partnersRef },
        { label: "Highlights", ref: highlightsRef },
        { label: "Programoutcome", ref: programsRef },
        { label: "Target", ref: targetsRef },
        { label: "Sponsors", ref: sponsorsRef },
        { label: "FAQ", ref: faqRef },
      ];

      const scrollPosition = window.scrollY + 200; // Adjust for navbar offset

      for (const section of sectionRefs) {
        if (section.ref.current) {
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
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const selectedAboutCollege = aboutCollegeData.find(
    (program) => program._id === id
  );
  const filteredFAQ = faq.filter(
    (item) =>
      selectedAboutCollege &&
      String(item.degree_program) === String(selectedAboutCollege._id)
  );
  const scrollToSection = (ref, section) => {
    if (ref?.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 150, // Adjust offset for fixed navbar
        behavior: "smooth",
      });
      setActiveSection(section);
    }
  };

  const navLinksRef = useRef(null);

  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [showNavArrows, setShowNavArrows] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (navLinksRef.current) {
      setShowNavArrows(navLinksRef.current.scrollWidth > navLinksRef.current.clientWidth);
    }
  }, [isMobileView]);

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

      {/* Navigation Bar */}
      <div
        className="navigation-controls"
        style={{
          position: "fixed",
          top: "60px",
          zIndex: "10",
          backgroundColor: "rgb(229, 226, 236)",
          padding: window.innerWidth <= 768 ? "6px 0px" : "10px 0px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginTop: window.innerWidth <= 768 ? "10px" : "10px",
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
            padding: window.innerWidth <= 768 ? "3px 5px" : "6px 12px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: window.innerWidth <= 768 ? "10px" : "14px",
            fontWeight: "600",
            transition: "all 0.3s ease",
            marginLeft: "8px",
          }}
        >
          <svg
            width={window.innerWidth <= 768 ? "12" : "18"}
            height={window.innerWidth <= 768 ? "12" : "18"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: "transform 0.3s ease" }}
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span
            className="button-text"
            style={{ transition: "transform 0.3s ease" }}
          >
            Back
          </span>
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
              gap: window.innerWidth <= 768 ? "15px" : "30px",
              overflowX: "auto",
              flex: 1,
              scrollBehavior: "smooth",
              padding: "0 20px",
              whiteSpace: "nowrap",
            }}
          >
            {[
              { label: "About", ref: aboutRef },
              ...(finalPartners.length > 0 ? [{ label: "Partners", ref: partnersRef }] : []),
              ...(finalHightlights.length > 0 ? [{ label: "Highlights", ref: highlightsRef }] : []),
              ...(finalProgramoutcome.length > 0 ? [{ label: "Programoutcome", ref: programsRef }] : []),
              ...(finalTarget.length > 0 ? [{ label: "Target", ref: targetsRef }] : []),
              ...(finalSponsor.length > 0 ? [{ label: "Sponsors", ref: sponsorsRef }] : []),
              ...(finalfaq.length > 0 ? [{ label: "FAQ", ref: faqRef }] : []),
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.ref, item.label)}
                className={`nav-button ${activeSection === item.label ? "active" : ""}`}
                style={{
                  position: "relative",
                  background: "none",
                  border: "none",
                  fontSize: window.innerWidth <= 768 ? "12px" : "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  paddingBottom: "5px",
                  transition: "color 0.3s ease",
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
                    width: activeSection === item.label ? "100%" : "0",
                    height: "2px",
                    backgroundColor: "#000",
                    transition: "width 0.3s ease-in-out",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>


      <div className="content-wrapper js-content-wrapper overflow-hidden mt-80">
        {/* About Section */}
        <div ref={aboutRef} id="about">
          <About />
        </div>
        {/* Partners Section */}
        {finalPartners.length > 0 && (
          <div ref={partnersRef} id="partners">
            <PartnersSection />
          </div>
        )}
        {finalHightlights.length > 0 && (
          <div ref={highlightsRef} id="Highlights">
            <ProgrammeHighlights />
          </div>
        )}
        {finalProgramoutcome.length > 0 && (
          <div ref={programsRef} id="Programoutcome">
            <TestimonialsSection />
          </div>
        )}
        {finalTarget.length > 0 && (
          <div ref={targetsRef} id="Target">
            <TargetStudentsSection />
          </div>
        )}
        {/* Sponsors Section */}
        {finalSponsor.length > 0 && (
          <div ref={sponsorsRef} id="sponsors">
            <SponsorsSection />
          </div>
        )}
        {/* FAQ Section */}
        {finalfaq.length > 0 && (
          <div ref={faqRef} id="faq">
            <FAQComponent faq={filteredFAQ} />
          </div>
        )}
        <br />
        <FooterTwo />
      </div>
    </div>
  );
}
