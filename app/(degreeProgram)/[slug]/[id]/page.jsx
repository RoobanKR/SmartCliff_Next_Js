"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDegreeProgramData } from "@/redux/slices/mca/degreeProgram/DegreeProgram";
import { fetchAllFAQs } from "@/redux/slices/faq/faq";
import { useParams } from "next/navigation";
import Banner from "@/components/common/Banner";
import About from "@/components/mca/About";
import OurProgram from "@/components/mca/OurProgram";
import Outcomes from "@/components/mca/Outcomes";
import ProgramFees from "@/components/mca/ProgramFees";
import Testimonial from "@/components/mca/Testimonial";
import FAQComponent from "@/components/courseSingle/Faq";
import Semester from "@/components/mca/Semester";
import Highlights from "@/components/mca/Highlights";
import AdmissionProcess from "@/components/mca/AdmissionProcess";
import EligibilityCriteria from "@/components/mca/EligibilityCriteria";
import FooterTwo from "@/components/layout/footers/Footer";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import Preloader from "@/components/common/Preloader";
import jsonData from "../../../../public/assets/json/Banner.json";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";

SwiperCore.use([Navigation, Pagination]);

export default function Page() {
  const dispatch = useDispatch();
  const faq = useSelector((state) => state.faq.faq);
  const { id } = useParams();
  const { title, description } = jsonData || {};
  const [activeTab, setActiveTab] = useState(1);
  const [isMobileView, setIsMobileView] = useState(false);

  const handleResize = () => {
    setIsMobileView(window.innerWidth < 768);
  };

  useEffect(() => {
    dispatch(fetchDegreeProgramData());
    dispatch(fetchAllFAQs());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  const filteredFAQ = faq.filter(
    (item) => item.degree_program && String(item.degree_program) === id
  );

  const menuItems = [
    {
      id: 1,
      href: "#LearningJourney",
      text: "Learning Journey",
      isActive: false,
    },
    { id: 3, href: "#Program-fees", text: "Program Fees", isActive: false },
    {
      id: 5,
      href: "#EligibilityCriteria",
      text: "Smartcliff Eligibility Criteria",
      isActive: false,
    },
    {
      id: 6,
      href: "#AdmissionProcess",
      text: "Admission Process",
      isActive: false,
    },
    {
      id: 7,
      href: "#Faq",
      text: "Faq",
      isActive: false,
    },
  ];

  const renderTabs = () => {
    if (isMobileView) {
      return (
        <>
          <section className="pt-30 layout-pb-md">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="pt-25 pb-30 px-30 bg-white shadow-2 rounded-8 border-light">
                    {menuItems.map((elm) => (
                      <div key={elm.id} className="mb-2">
                        {" "}
                        <button
                          onClick={() => setActiveTab(elm.id)}
                          className="tabs__button js-tabs-button js-update-pin-scene"
                          style={{
                            textDecoration:
                              activeTab === elm.id ? "underline" : "none",
                            textDecorationColor:
                              activeTab === elm.id ? "#f2775e" : "initial",
                            textDecorationThickness:
                              activeTab === elm.id ? "3px" : "initial",
                          }}
                          type="button"
                        >
                          {elm.text}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="pt-30 layout-pb-md">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="pt-25 pb-30 px-30 bg-white shadow-2 rounded-8 border-light">
                    {renderTabContent(activeTab)}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      );
    } else {
      return (
        <section className="pt-30 layout-pb-md">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="pt-25 pb-30 px-30 bg-white shadow-2 rounded-8 border-light">
                  <div className="tabs -active-purple-2 js-tabs pt-0">
                    <div className="tabs__controls d-flex js-tabs-controls">
                      {menuItems.map((elm, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveTab(elm.id)}
                          className={`tabs__button js-tabs-button js-update-pin-scene ${
                            i !== 0 ? "ml-30" : ""
                          } ${activeTab === elm.id ? "is-active" : ""} `}
                          type="button"
                        >
                          {elm.text}
                        </button>
                      ))}
                    </div>
                    <div className="tabs__content   js-tabs-content">
                      {renderTabContent(activeTab)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  };

  const renderTabContent = (tabId) => {
    switch (tabId) {
      case 1:
        return <Semester />;
      case 3:
        return <ProgramFees />;
      case 5:
        return <EligibilityCriteria />;
      case 6:
        return <AdmissionProcess />;
      case 7:
        return <FAQComponent faq={filteredFAQ} />;
      default:
        return null;
    }
  };

  return (
    <div className="main-content">
      <Preloader />
      <HeaderSeven />
      <div className="content-wrapper js-content-wrapper overflow-hidden mt-80">
        <br />
        <Banner
          title={jsonData[2].title}
          description={jsonData[2].description}
          imageUrl={jsonData[2].imageUrl}
        />{" "}
        <About />
        <Highlights />
        <Outcomes />
        <OurProgram />
        {renderTabs()}
        {/* <Testimonial /> */}
        <br />
        <FooterTwo />
      </div>
    </div>
  );
}
