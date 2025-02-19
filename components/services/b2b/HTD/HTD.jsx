"use client";
import React, { useState, useEffect } from "react";
import Messages from "@/components/layout/component/Messages";
import Preloader from "@/components/common/Preloader";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import Sidebar from "@/components/services/Sidebar";
import FooterTwo from "@/components/layout/footers/Footer";
import Clients from "@/components/services/Clients";
import ExecutionOverview from "@/components/services/ExecutionOverview";
import Gallery from "@/components/services/Gallery";
import {
  fetchServices,
  selectServices,
} from "@/redux/slices/services/services/Services";
import { useDispatch, useSelector } from "react-redux";
import ExecutiveHighlights from "@/components/services/ExecutiveHighlights";
import FAQComponent from "@/components/courseSingle/Faq";
import { fetchAllFAQs } from "@/redux/slices/faq/faq";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import LearningSolutions from "../../LearningSolutions";
import PageLinks from "../pageLink";
import StepsOne from "../../StepsOne";
import { fetchExecutionHighlights } from "@/redux/slices/services/executionHighlights/Execution_Highlights";
import { getAllServiceAbout } from "@/redux/slices/services/services/aboutServices";
import {
  getAllServiceProcess,
  selectProcessServices,
} from "@/redux/slices/services/services/processServices";
import { selectBusinessServices } from "@/redux/slices/services/services/businessServices";
import {
  getAllServiceClients,
  selectServiceClients,
} from "@/redux/slices/services/services/clientServices";
import { fetchExecutionOverview } from "@/redux/slices/services/executionOverview/ExecutionOverview";
import Oppertunitie from "../../Oppertunities";
import {
  getAllServiceOpportunities,
  selectServiceOpportunitiesState,
} from "@/redux/slices/services/services/Oppertunities";
import ServiceDegreeProgram from "../../servicesDegreeProgrammig";
 
export default function HTD() {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const dispatch = useDispatch();
  const services = useSelector(selectServices);
  // const opp = useSelector(selectServiceOpportunitiesState);
  const {
    serviceOpportunities = [],
    loading,
    error,
  } = useSelector((state) => state.serviceOpportunities);
 
  const servicesBusiness = useSelector(selectBusinessServices);
  const serviceProcessData = useSelector(selectProcessServices);
  const clients = useSelector(selectServiceClients);
  const serviceData = useSelector((state) => state.service.serviceData);
  const faq = useSelector((state) => state.faq.faq);
  const { serviceAbouts } = useSelector((state) => state.aboutService);
  const executionOverviews = useSelector(
    (state) => state.executionOverviews.executionOverviews
  );
  const executionHighlights = useSelector(
    (state) => state.executionHighlights.executionHighlights
  );
  useEffect(() => {
    dispatch(getAllServiceClients());
    dispatch(fetchExecutionHighlights());
    dispatch(getAllServiceAbout());
    dispatch(getAllServiceProcess());
    dispatch(fetchExecutionOverview());
    dispatch(fetchServices());
    dispatch(fetchAllFAQs());
    dispatch(getAllServiceOpportunities());
  }, [dispatch]);
 
  console.log("opp", serviceOpportunities);
 
  const fullUrl = typeof window !== "undefined" ? window.location.href : "";
  const segments = fullUrl.split("/").filter(Boolean);
  const lastSegment = segments.pop();
  const secondLastSegment = segments.pop();
 
  const onematchingData = servicesBusiness.find(
    (i) => i.slug === secondLastSegment
  );
  const twomatchingService = services.find((i) => i.slug === lastSegment);
 
  const matchedServices = services.filter(
    (service) => service.business_services._id === onematchingData?._id
  );
  const finalMatchedService = matchedServices.find(
    (service) => service.slug === twomatchingService?.slug
  );
  const matchedexecutionOverviews = executionOverviews.filter(
    (i) => i.service._id === finalMatchedService?._id
  );
  const matchedFaq = faq.filter((i) => i.service === finalMatchedService?._id);
 
  const matchedProcessData = serviceProcessData.filter(
    (i) => i.service === finalMatchedService?._id
  );
  const matchedExecutionHighlights = executionHighlights.filter(
    (i) => i.service?._id === finalMatchedService?._id
  );
 
  const matchedOppertunity = serviceOpportunities.filter(
    (i) => i.service?._id === finalMatchedService?._id
  );
 
  const matchedServiceClient = clients.filter(
    (i) => i.service === finalMatchedService?._id
  );
  const matchedServiceAbouts = serviceAbouts.filter(
    (i) => i.service === finalMatchedService?._id
  );
  const processSteps =
    matchedProcessData.length > 0 ? matchedProcessData[0]?.process || [] : [];
  const filteredHighlights = matchedExecutionHighlights.filter(
    (highlight) => highlight?.service?._id === finalMatchedService._id
  );
  const filteredFAQ = matchedFaq.filter(
    (item) => item.service._id === matchedServices._id
  );
 
  console.log("filteredFAQ", matchedFaq);
 
  useEffect(() => {
    if (window.innerWidth < 990) {
      setIsSidebarClosed(true);
    }
    const handleResize = () => {
      if (window.innerWidth < 990) {
        setIsSidebarClosed(true);
      }
    };
 
    window.addEventListener("resize", handleResize);
 
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
 
  const toggleSidebar = () => {
    setIsSidebarClosed(!isSidebarClosed);
  };
  const goBack = () => {
    if (secondLastSegment) {
      window.location.href = `/${secondLastSegment}`;
    } else {
      window.history.back();
    }
  };
 
  const availableSections = [];
 
  if (matchedServiceAbouts.length > 0) {
    availableSections.push({
      id: "learning-solutions",
      title: "Learning Solutions",
    });
  }
  if (processSteps.length > 0) {
    availableSections.push({ id: "process-steps", title: "Process Steps" });
  }
  if (matchedexecutionOverviews.length > 0) {
    availableSections.push({
      id: "execution-overview",
      title: "Execution Overview",
    });
  }
  if (filteredHighlights.length > 0) {
    availableSections.push({
      id: "execution-highlights",
      title: "Execution Highlights",
    });
  }
  if (matchedOppertunity.length > 0) {
    availableSections.push({ id: "opportunities", title: "Opportunities" });
  }
  if (matchedServiceClient.length > 0) {
    availableSections.push({ id: "clients", title: "Clients" });
  }
  if (filteredFAQ.length > 0) {
    availableSections.push({ id: "faq", title: "FAQ" });
  }
 
  return (
    <>
      <div className="main-content homeModeChange ">
        <Preloader />
        {/*  */}
        <HeaderTwo
          setMessageOpen={setMessageOpen}
          setIsSidebarClosed={setIsSidebarClosed}
        />
        <div
          className={`dashboard -home-9 px-0 js-dashboard-home-9 ${
            isSidebarClosed ? "-is-sidebar-hidden" : ""
          } `}
        >
          <div
            className="dashboard__sidebar -base scroll-bar-1 border-right-light lg:px-30"
            style={{ background: "#F5F0FF" }}
          >
            <div>
              <Sidebar />
            </div>
          </div>
          <div className="dashboard__main content-wrapper  js-content-wrapper overflow-hidden ">
            <div className="dashboard__content pt-0 px-15 pb-0 mt-20">
              {lastSegment === "dp" ? (
                <div>
                  <div
                    className="toggle-sidebar"
                    style={{
                      borderRadius: "12px",
                      padding: "4px 8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      position: "fixed",
                      left: "20px",
                      bottom: "73px",
                      zIndex: "1000",
                    }}
                    onClick={goBack}
                  >
                    <button
                      onClick={goBack}
                      onMouseEnter={(e) => {
                        e.currentTarget.querySelector(
                          ".front"
                        ).style.transform = "translateY(-4px)";
                        e.currentTarget.querySelector(
                          ".shadow"
                        ).style.transform = "translateY(2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.querySelector(
                          ".front"
                        ).style.transform = "translateY(-5px)";
                        e.currentTarget.querySelector(
                          ".shadow"
                        ).style.transform = "translateY(1px)";
                      }}
                      onMouseDown={(e) => {
                        e.currentTarget.querySelector(
                          ".front"
                        ).style.transform = "translateY(-1px)";
                        e.currentTarget.querySelector(
                          ".shadow"
                        ).style.transform = "translateY(0px)";
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.querySelector(
                          ".front"
                        ).style.transform = "translateY(-5px)";
                        e.currentTarget.querySelector(
                          ".shadow"
                        ).style.transform = "translateY(1px)";
                      }}
                      style={{
                        position: "relative",
                        padding: "0",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        outline: "none",
                      }}
                    >
                      <span
                        className="shadow"
                        style={{
                          position: "absolute",
                          top: "0",
                          left: "0",
                          width: "100%",
                          height: "100%",
                          borderRadius: "8px",
                          background: "hsl(0deg 0% 0% / 0.2)",
                          transform: "translateY(1px)",
                          transition: "transform 300ms ease",
                        }}
                      ></span>
                      <span
                        className="edge"
                        style={{
                          position: "absolute",
                          top: "0",
                          left: "0",
                          width: "100%",
                          height: "100%",
                          borderRadius: "8px",
                          background:
                            "linear-gradient(to left, #C8AAAA 0%, #C8AAAA 100%)",
                        }}
                      ></span>
                      <span
                        className="front"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center", // Center the content horizontally
                          gap: "8px",
                          width: "100%", // Ensure the full width is utilized
                          position: "relative",
                          padding: "8px 16px",
                          borderRadius: "8px",
                          fontSize: "0.85rem",
                          color: "#5C4B51", // Darker text color for better contrast
                          background: "#EAE2C6", // Soft yellow-beige background
                          transform: "translateY(-2px)",
                          transition: "transform 300ms ease",
                        }}
                      >
                        <span
                          className="icon-container"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            background: "white", // White icon background
                            color: "#5C4B51", // Dark icon color for visibility
                            transition:
                              "transform 0.5s ease, background 0.5s ease",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faArrowLeft} // Left arrow icon
                            style={{
                              fontSize: "16px",
                              transition: "transform 0.5s ease",
                              transform: "rotate(0deg)",
                            }}
                          />
                        </span>
                        <span
                          className="text-container"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flex: 1,
                            animation: "fadeSlide 0.5s ease",
                          }}
                        >
                          Back
                        </span>{" "}
                      </span>
                    </button>
                  </div>
 
                  <div
                    className="toggle-sidebar"
                    style={{
                      borderRadius: "12px",
                      padding: "4px 8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      position: "fixed",
                      left: "20px",
                      bottom: "20px",
                      zIndex: "1000",
                    }}
                    onClick={toggleSidebar}
                  >
                    <button
                      onClick={toggleSidebar}
                      onMouseEnter={(e) => {
                        e.currentTarget.querySelector(
                          ".front"
                        ).style.transform = "translateY(-4px)";
                        e.currentTarget.querySelector(
                          ".shadow"
                        ).style.transform = "translateY(2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.querySelector(
                          ".front"
                        ).style.transform = "translateY(-5px)";
                        e.currentTarget.querySelector(
                          ".shadow"
                        ).style.transform = "translateY(1px)";
                      }}
                      onMouseDown={(e) => {
                        e.currentTarget.querySelector(
                          ".front"
                        ).style.transform = "translateY(-1px)";
                        e.currentTarget.querySelector(
                          ".shadow"
                        ).style.transform = "translateY(0px)";
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.querySelector(
                          ".front"
                        ).style.transform = "translateY(-5px)";
                        e.currentTarget.querySelector(
                          ".shadow"
                        ).style.transform = "translateY(1px)";
                      }}
                      style={{
                        position: "relative",
                        padding: "0",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        outline: "none",
                      }}
                    >
                      <span
                        className="shadow"
                        style={{
                          position: "absolute",
                          top: "0",
                          left: "0",
                          width: "100%",
                          height: "100%",
                          borderRadius: "8px",
                          background: "hsl(0deg 0% 0% / 0.2)",
                          transform: "translateY(1px)",
                          transition: "transform 300ms ease",
                        }}
                      ></span>
                      <span
                        className="edge"
                        style={{
                          position: "absolute",
                          top: "0",
                          left: "0",
                          width: "100%",
                          height: "100%",
                          borderRadius: "8px",
                          background:
                            "linear-gradient(to left, #C8AAAA 0%, #C8AAAA 100%)",
                        }}
                      ></span>
                      <span
                        className="front"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center", // Center the content horizontally
                          gap: "8px",
                          width: "100%", // Ensure the full width is utilized
                          position: "relative",
                          padding: "8px 16px",
                          borderRadius: "8px",
                          fontSize: "0.85rem",
                          color: "#4C585B", // Updated text color
                          background: "#D9DFC6",
                          transform: "translateY(-2px)",
                          transition: "transform 300ms ease",
                        }}
                      >
                        <span
                          className="icon-container"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            background: "white",
                            color: "#4C585B", // Updated icon color
                            transition:
                              "transform 0.5s ease, background 0.5s ease",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={isSidebarClosed ? faArrowRight : faArrowLeft}
                            style={{
                              fontSize: "16px",
                              transition: "transform 0.5s ease",
                              transform: isSidebarClosed
                                ? "rotate(0deg)"
                                : "rotate(180deg)",
                            }}
                          />
                        </span>
                        <span
                          className="text-container"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center", // Center the text
                            flex: 1, // Take available space
                            animation: "fadeSlide 0.5s ease",
                          }}
                          key={isSidebarClosed ? "open" : "close"}
                        >
                          {isSidebarClosed ? "Open Sidebar" : "Close Sidebar"}
                        </span>
                      </span>
                    </button>
                  </div>
                  <ServiceDegreeProgram />
                </div>
              ) : (
                <div>
                  <div
                    className="toggle-sidebar"
                    style={{
                      borderRadius: "12px",
                      padding: "4px 8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      position: "fixed",
                      left: "20px",
                      bottom: "73px",
                      zIndex: "1000",
                    }}
                    onClick={goBack}
                  >
                    <button
                      onClick={goBack}
                      onMouseEnter={(e) => {
                        e.currentTarget.querySelector(
                          ".front"
                        ).style.transform = "translateY(-4px)";
                        e.currentTarget.querySelector(
                          ".shadow"
                        ).style.transform = "translateY(2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.querySelector(
                          ".front"
                        ).style.transform = "translateY(-5px)";
                        e.currentTarget.querySelector(
                          ".shadow"
                        ).style.transform = "translateY(1px)";
                      }}
                      onMouseDown={(e) => {
                        e.currentTarget.querySelector(
                          ".front"
                        ).style.transform = "translateY(-1px)";
                        e.currentTarget.querySelector(
                          ".shadow"
                        ).style.transform = "translateY(0px)";
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.querySelector(
                          ".front"
                        ).style.transform = "translateY(-5px)";
                        e.currentTarget.querySelector(
                          ".shadow"
                        ).style.transform = "translateY(1px)";
                      }}
                      style={{
                        position: "relative",
                        padding: "0",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        outline: "none",
                      }}
                    >
                      <span
                        className="shadow"
                        style={{
                          position: "absolute",
                          top: "0",
                          left: "0",
                          width: "100%",
                          height: "100%",
                          borderRadius: "8px",
                          background: "hsl(0deg 0% 0% / 0.2)",
                          transform: "translateY(1px)",
                          transition: "transform 300ms ease",
                        }}
                      ></span>
                      <span
                        className="edge"
                        style={{
                          position: "absolute",
                          top: "0",
                          left: "0",
                          width: "100%",
                          height: "100%",
                          borderRadius: "8px",
                          background:
                            "linear-gradient(to left, #C8AAAA 0%, #C8AAAA 100%)",
                        }}
                      ></span>
                      <span
                        className="front"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center", // Center the content horizontally
                          gap: "8px",
                          width: "100%", // Ensure the full width is utilized
                          position: "relative",
                          padding: "8px 16px",
                          borderRadius: "8px",
                          fontSize: "0.85rem",
                          color: "#5C4B51", // Darker text color for better contrast
                          background: "#EAE2C6", // Soft yellow-beige background
                          transform: "translateY(-2px)",
                          transition: "transform 300ms ease",
                        }}
                      >
                        <span
                          className="icon-container"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            background: "white", // White icon background
                            color: "#5C4B51", // Dark icon color for visibility
                            transition:
                              "transform 0.5s ease, background 0.5s ease",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faArrowLeft} // Left arrow icon
                            style={{
                              fontSize: "16px",
                              transition: "transform 0.5s ease",
                              transform: "rotate(0deg)",
                            }}
                          />
                        </span>
                        <span
                          className="text-container"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flex: 1,
                            animation: "fadeSlide 0.5s ease",
                          }}
                        >
                          Back
                        </span>{" "}
                      </span>
                    </button>
                  </div>
 
                  <div
                    className="toggle-sidebar"
                    style={{
                      borderRadius: "12px",
                      padding: "4px 8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      position: "fixed",
                      left: "20px",
                      bottom: "20px",
                      zIndex: "1000",
                    }}
                    onClick={toggleSidebar}
                  >
                    <button
                      onClick={toggleSidebar}
                      onMouseEnter={(e) => {
                        e.currentTarget.querySelector(
                          ".front"
                        ).style.transform = "translateY(-4px)";
                        e.currentTarget.querySelector(
                          ".shadow"
                        ).style.transform = "translateY(2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.querySelector(
                          ".front"
                        ).style.transform = "translateY(-5px)";
                        e.currentTarget.querySelector(
                          ".shadow"
                        ).style.transform = "translateY(1px)";
                      }}
                      onMouseDown={(e) => {
                        e.currentTarget.querySelector(
                          ".front"
                        ).style.transform = "translateY(-1px)";
                        e.currentTarget.querySelector(
                          ".shadow"
                        ).style.transform = "translateY(0px)";
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.querySelector(
                          ".front"
                        ).style.transform = "translateY(-5px)";
                        e.currentTarget.querySelector(
                          ".shadow"
                        ).style.transform = "translateY(1px)";
                      }}
                      style={{
                        position: "relative",
                        padding: "0",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        outline: "none",
                      }}
                    >
                      <span
                        className="shadow"
                        style={{
                          position: "absolute",
                          top: "0",
                          left: "0",
                          width: "100%",
                          height: "100%",
                          borderRadius: "8px",
                          background: "hsl(0deg 0% 0% / 0.2)",
                          transform: "translateY(1px)",
                          transition: "transform 300ms ease",
                        }}
                      ></span>
                      <span
                        className="edge"
                        style={{
                          position: "absolute",
                          top: "0",
                          left: "0",
                          width: "100%",
                          height: "100%",
                          borderRadius: "8px",
                          background:
                            "linear-gradient(to left, #C8AAAA 0%, #C8AAAA 100%)",
                        }}
                      ></span>
                      <span
                        className="front"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center", // Center the content horizontally
                          gap: "8px",
                          width: "100%", // Ensure the full width is utilized
                          position: "relative",
                          padding: "8px 16px",
                          borderRadius: "8px",
                          fontSize: "0.85rem",
                          color: "#4C585B", // Updated text color
                          background: "#D9DFC6",
                          transform: "translateY(-2px)",
                          transition: "transform 300ms ease",
                        }}
                      >
                        <span
                          className="icon-container"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            background: "white",
                            color: "#4C585B", // Updated icon color
                            transition:
                              "transform 0.5s ease, background 0.5s ease",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={isSidebarClosed ? faArrowRight : faArrowLeft}
                            style={{
                              fontSize: "16px",
                              transition: "transform 0.5s ease",
                              transform: isSidebarClosed
                                ? "rotate(0deg)"
                                : "rotate(180deg)",
                            }}
                          />
                        </span>
                        <span
                          className="text-container"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center", // Center the text
                            flex: 1, // Take available space
                            animation: "fadeSlide 0.5s ease",
                          }}
                          key={isSidebarClosed ? "open" : "close"}
                        >
                          {isSidebarClosed ? "Open Sidebar" : "Close Sidebar"}
                        </span>
                      </span>
                    </button>
                  </div>
 
                  <div
                    style={{
                      position: "fixed",
                      zIndex: 10,
                      width: "100%",
                    }}
                  >
                    <PageLinks sections={availableSections} />
                  </div>
 
                  <div style={{ paddingTop: "120px" }}>
                    {matchedServiceAbouts.length > 0 && (
                      <div id="learning-solutions">
                        <LearningSolutions
                          matchedServiceAbouts={matchedServiceAbouts}
                        />
                      </div>
                    )}
                    {processSteps.length > 0 && (
                      <div id="process-steps">
                        <StepsOne processSteps={processSteps} />
                      </div>
                    )}
                    {matchedexecutionOverviews.length > 0 && (
                      <div id="execution-overview">
                        <ExecutionOverview serviceId={services} />
                      </div>
                    )}
                    {filteredHighlights.length > 0 && (
                      <div id="execution-highlights">
                        <ExecutiveHighlights
                          filteredHighlights={filteredHighlights}
                        />
                      </div>
                    )}
                    <div id="opportunities">
                    {matchedOppertunity.length > 0 && (
                      <div id="opportunities">
                        <Oppertunitie matchedOppertunity={matchedOppertunity} />
                      </div>
                    )}
 
                     </div>
                    {matchedServiceClient.length > 0 && (
                      <div id="clients">
                        <Clients filteredClients={matchedServiceClient} />
                      </div>
                    )}
                    {filteredFAQ.length > 0 && (
                      <div id="faq">
                        <FAQComponent faq={filteredFAQ} />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
 
            <FooterTwo />
          </div>
        </div>
        {/* </div> */}
      </div>
      <Messages messageOpen={messageOpen} setMessageOpen={setMessageOpen} />
 
      <style jsx>{`
        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
 
 