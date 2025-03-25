"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDegreeProgramData } from "@/redux/slices/mca/degreeProgram/DegreeProgram";
import { fetchAllFAQs } from "@/redux/slices/faq/faq";
import { useParams } from "next/navigation";
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

SwiperCore.use([Navigation, Pagination]);

export default function Page() {
  const dispatch = useDispatch();
  const params = useParams();
  const programId = params.id;
  const { ourPartners, loading, error } = useSelector(
    (state) => state.ourPartners
  );
  const faq = useSelector((state) => state.faq.faq);
  const aboutCollegeData = useSelector(
    (state) => state.aboutCollege.aboutCollegeData
  );
  const { id } = useParams();
  const { ourSponsors } = useSelector((state) => state.ourSponsors);
  const [isMobileView, setIsMobileView] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // **Refs for sections**
  const aboutRef = useRef(null);
  const partnersRef = useRef(null);
  const highlightsRef = useRef(null);
  const sponsorsRef = useRef(null);
  const faqRef = useRef(null);

  const handleResize = () => {
    setIsMobileView(window.innerWidth < 768);
  };

  useEffect(() => {
    dispatch(fetchDegreeProgramData());
    dispatch(fetchAllOurSponsors());
    dispatch(fetchAboutCollegeData());
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

  const finalSponsor =
    ourSponsors?.filter(
      (partner) => partner.degree_program._id === programId
    ) || [];

  console.log("finalPartners", finalPartners);

  useEffect(() => {
    const handleScroll = () => {
      const sectionRefs = [
        { label: "About", ref: aboutRef },
        { label: "Partners", ref: partnersRef },
        { label: "Highlights", ref: highlightsRef },
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

  return (
    <div className="main-content overflow-hidden">
      <Preloader />
      <HeaderTwo />

      {/* Navigation Bar */}
      <div
        className="navigation-controls"
        style={{
          position: "fixed",
          top: "75px",
          zIndex: "10",
          backgroundColor: "rgb(229, 226, 236)",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="back-button"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            color: "black",
            border: "2px solid black",
            padding: "6px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            transition: "all 0.4s ease",
            marginRight: "30px",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="button-text">Back</span>
        </button>

        {/* Navigation Links */}
        <div
          className="nav-links"
          style={{
            display: "flex",
            gap: "30px",
          }}
        >
          {[
            { label: "About", ref: aboutRef },
            ...(finalPartners.length > 0
              ? [{ label: "Partners", ref: partnersRef }]
              : []),
            { label: "Highlights", ref: highlightsRef },
            ...(finalSponsor.length > 0
              ? [{ label: "Sponsors", ref: sponsorsRef }]
              : []),
            { label: "FAQ", ref: faqRef },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.ref, item.label)}
              className={`nav-button ${
                activeSection === item.label ? "active" : ""
              }`}
              style={{
                position: "relative",
                background: "none",
                border: "none",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                paddingBottom: "6px",
                transition: "color 0.3s ease",
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
                  height: "3px",
                  backgroundColor: "#000",
                  transition: "width 0.3s ease-in-out",
                }}
              />
            </button>
          ))}
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
        {finalPartners.length > 0 && (
          <div ref={partnersRef} id="partners">
            <ProgrammeHighlights />
          </div>
        )}
        <TestimonialsSection />
        <TargetStudentsSection />
        {/* Sponsors Section */}
        {finalSponsor.length > 0 && (
          <div ref={sponsorsRef} id="sponsors">
            <SponsorsSection />
          </div>
        )}

        {/* FAQ Section */}
        <div ref={faqRef} id="faq">
          <FAQComponent faq={filteredFAQ} />
        </div>

        <br />
        <FooterTwo />
      </div>
    </div>
  );
}
