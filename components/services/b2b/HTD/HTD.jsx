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
import TrainingTracksTable from "../../TrainingTracksTable";
import {
  getAllPlacementTrainingTracks,
  selectPlacementTrainingTrackState,
} from "@/redux/slices/PlacementTrainingTrack/PlacementTrainingTrack";
import CsrDegreeProgram from "../../servicesDegreeProgrammig1";

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
  const { tracks, isLoading, isError } = useSelector(
    selectPlacementTrainingTrackState
  );

  const [width, setWidth] = useState("100%");

  useEffect(() => {
    // Function to update width based on screen size
    const updateWidth = () => {
      if (window.innerWidth <= 320) {
        setWidth("90%");
      } else if (window.innerWidth <= 768) {
        setWidth("95%");
      } else {
        setWidth("100%");
      }
    };

    // Set width on initial load
    updateWidth();

    // Add event listener for window resize
    window.addEventListener("resize", updateWidth);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    dispatch(getAllServiceClients());
    dispatch(fetchExecutionHighlights());
    dispatch(getAllServiceAbout());
    dispatch(getAllServiceProcess());
    dispatch(fetchExecutionOverview());
    dispatch(fetchServices());
    dispatch(fetchAllFAQs());
    dispatch(getAllServiceOpportunities());
    dispatch(getAllPlacementTrainingTracks());
  }, [dispatch]);

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
    (i) => i.service?._id === finalMatchedService?._id
  );

  const PlacementTraining = tracks.filter(
    (i) => i.service?._id === finalMatchedService?._id
  );

  const matchedFaq = faq.filter(
    (i) => i.service?._id === finalMatchedService?._id
  );

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
    (highlight) => highlight?.service?._id === finalMatchedService?._id
  );
  const getMatchedFaqs = () => {
    const serviceFaqs = faq.filter(
      (i) => i.service?._id === finalMatchedService?._id
    );

    if (serviceFaqs.length > 0) {
      return serviceFaqs;
    }

    return faq.filter((i) => i.business_service?._id === onematchingData?._id);
  };

  const finalFaqs = getMatchedFaqs();

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
      title: "About",
    });
  }
  if (processSteps.length > 0) {
    availableSections.push({ id: "process-steps", title: "Process" });
  }
  if (matchedexecutionOverviews.length > 0) {
    availableSections.push({
      id: "execution-overview",
      title: "Execution Overview (By Client)",
    });
  }
  if (filteredHighlights.length > 0) {
    availableSections.push({
      id: "execution-highlights",
      title: "Execution Overview (By Domain)",
    });
  }
  if (matchedOppertunity.length > 0) {
    availableSections.push({ id: "opportunities", title: "Opportunities" });
  }
  if (matchedServiceClient.length > 0) {
    availableSections.push({ id: "clients", title: "Clients" });
  }
  if (PlacementTraining.length > 0) {
    availableSections.push({ id: "training-tracks", title: "Training Tracks" });
  }
  if (matchedFaq.length > 0) {
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
          className={`dashboard -home-9 px-0 js-dashboard-home-9 ${isSidebarClosed ? "-is-sidebar-hidden" : ""
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
              <div
                className="toggle-sidebar"
                style={{
                  position: "fixed",
                  left: "20px",
                  bottom: "20px",
                  zIndex: "120",
                }}
              >
                <button
                  onClick={toggleSidebar}
                  onMouseEnter={(e) => {
                    e.currentTarget.querySelector(".front").style.transform = "translateY(-3px)";
                    e.currentTarget.querySelector(".shadow").style.transform = "translateY(3px)";
                    e.currentTarget.querySelector(".front").style.background = " #DDA853";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.querySelector(".front").style.transform = "translateY(-1px)";
                    e.currentTarget.querySelector(".shadow").style.transform = "translateY(2px)";
                    e.currentTarget.querySelector(".front").style.background = " #DDA853";
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.querySelector(".front").style.transform = "translateY(0px)";
                    e.currentTarget.querySelector(".shadow").style.transform = "translateY(1px)";
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.querySelector(".front").style.transform = "translateY(-3px)";
                    e.currentTarget.querySelector(".shadow").style.transform = "translateY(3px)";
                  }}
                  style={{
                    position: "relative",
                    padding: "0",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    outline: "none",
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                    transition: "filter 0.2s ease",
                  }}
                >
                  {/* Shadow Effect */}
                  <span
                    className="shadow"
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      borderRadius: "8px",
                      background: "hsl(0deg 0% 0% / 0.15)",
                      transform: "translateY(2px)",
                      transition: "transform 200ms cubic-bezier(0.3, 0.7, 0.4, 1)",
                    }}
                  ></span>

                  {/* Button Edge */}
                  <span
                    className="edge"
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      borderRadius: "8px",
                      background: " #DDA853",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
                    }}
                  ></span>

                  {/* Button Front */}
                  <span
                    className="front"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      position: "relative",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      color: "rgb(255, 255, 255)",
                      background: "#DDA853",
                      transform: "translateY(-1px)",
                      transition: "all 200ms cubic-bezier(0.3, 0.7, 0.4, 1)",
                      boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.1)",
                      textShadow: "0 1px 1px rgba(0,0,0,0.1)",
                    }}
                  >
                    {/* Icon */}
                    <span
                      className="icon-container"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.9)",
                        color: " #000000",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={isSidebarClosed ? faArrowRight : faArrowLeft}
                        style={{
                          fontSize: "12px",
                          transition: "transform 0.2s ease",
                        }}
                      />
                    </span>

                    {/* Button Text */}
                    <span
                      className="text-container"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "opacity 0.2s ease",
                      }}
                      key={isSidebarClosed ? "open" : "close"}
                    >
                      {isSidebarClosed ? "Open Sidebar" : "Close Sidebar"}
                    </span>
                  </span>
                </button>
              </div>

              {secondLastSegment === "b2i" && lastSegment === "dp" ? (
                <ServiceDegreeProgram />
              ) : secondLastSegment === "csr" ? (
                <CsrDegreeProgram />
              ) : (
                <div>
                  <div
                    style={{
                      position: "fixed",
                      zIndex: 10,
                      width: width,
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
                          <Oppertunitie
                            matchedOppertunity={matchedOppertunity}
                          />
                        </div>
                      )}
                    </div>
                    {matchedServiceClient.length > 0 && (
                      <div id="clients">
                        <Clients filteredClients={matchedServiceClient} />
                      </div>
                    )}
                    {PlacementTraining.length > 0 && (
                      <div id="training-tracks">
                        <TrainingTracksTable />
                      </div>
                    )}
                    {matchedFaq.length > 0 && (
                      <div id="faq">
                        <FAQComponent faq={matchedFaq} />
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
