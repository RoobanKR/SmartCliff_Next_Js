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

export default function HTD() {
    const [isSidebarClosed, setIsSidebarClosed] = useState(false);
    const [messageOpen, setMessageOpen] = useState(false);
    const dispatch = useDispatch();
    const services = useSelector(selectServices);
    const serviceData = useSelector((state) => state.service.serviceData);
    const faq = useSelector((state) => state.faq.faq);
    // const { title, description } = jsonData || {};

    useEffect(() => {
        dispatch(fetchServices());
        dispatch(fetchAllFAQs());
    }, [dispatch]);

    const firstService = services[0];

    const filteredFAQ = faq.filter((item) => item.service === services[0]?._id);

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
                    >
                        <div >
                            <Sidebar />
                        </div>
                    </div>
                    <div
                        className="dashboard__main content-wrapper  js-content-wrapper overflow-hidden "

                    >
                        <div className="dashboard__content pt-0 px-15 pb-0 mt-20"
                        >

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
                                        e.currentTarget.querySelector(".front").style.transform =
                                            "translateY(-4px)";
                                        e.currentTarget.querySelector(".shadow").style.transform =
                                            "translateY(2px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.querySelector(".front").style.transform =
                                            "translateY(-5px)";
                                        e.currentTarget.querySelector(".shadow").style.transform =
                                            "translateY(1px)";
                                    }}
                                    onMouseDown={(e) => {
                                        e.currentTarget.querySelector(".front").style.transform =
                                            "translateY(-1px)";
                                        e.currentTarget.querySelector(".shadow").style.transform =
                                            "translateY(0px)";
                                    }}
                                    onMouseUp={(e) => {
                                        e.currentTarget.querySelector(".front").style.transform =
                                            "translateY(-5px)";
                                        e.currentTarget.querySelector(".shadow").style.transform =
                                            "translateY(1px)";
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
                                                "linear-gradient(to left, #5c466c 0%, #725589 100%)",
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
                                            color: "white",
                                            background: "#725589",
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
                                                color: "#725589",
                                                transition: "transform 0.5s ease, background 0.5s ease",
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={isSidebarClosed ? faArrowRight : faArrowLeft}
                                                key={isSidebarClosed ? "arrow-right" : "arrow-left"}
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
                                    marginTop: '-39px',
                                    // left:0,
                                }}
                            >
                                <PageLinks />
                            </div>

                            <LearningSolutions />
                            <StepsOne />
                            <ExecutionOverview serviceId={services[0]?._id} />
                            <ExecutiveHighlights serviceId={services[0]?._id} />
                            <Clients serviceId={services[0]?._id} />
                            <FAQComponent faq={filteredFAQ} />
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

