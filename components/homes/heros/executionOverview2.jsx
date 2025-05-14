"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import { getAllHomeExecutionHighlights } from "@/redux/slices/home/homeExecutionHighlights/homeExecutionHighlights";
 
export default function ExecutiveOverview2() {
  const dispatch = useDispatch();
  const homeExecutionHighlights = useSelector(
    (state) => state.homeExecutionHighlights.homeExecutionHighlights
  );
  useEffect(() => {
    dispatch(getAllHomeExecutionHighlights());
  }, [dispatch]);
 
  const swiperStyles = {
    container: {
      padding: "0px 0",
      position: "relative",
    },
    pagination: {
      bottom: "-10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
    },
    paginationBullet: {
      width: "10px",
      height: "10px",
      backgroundColor: "#ccc",
      borderRadius: "50%",
      opacity: 0.5,
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    paginationBulletActive: {
      width: "20px",
      height: "10px",
      backgroundColor: "#007bff",
      borderRadius: "5px",
      opacity: 1,
    },
    navigationButton: {
      color: "#007bff",
      backgroundColor: "rgba(0, 123, 255, 0.1)",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      transition: "all 0.3s ease",
    },
  };
  const colors = ["#A2D2FF"];
 
  return (
    <section
      style={{
        paddingTop: "0rem",
        paddingBottom: "1rem",
        // backgroundColor: "#f8f9fa",
      }}
    >
      <div className="p-4">
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{
            el: ".executive-pagination",
            clickable: true,
          }}
          navigation={{
            nextEl: ".icon-arrow-right-executive",
            prevEl: ".icon-arrow-left-executive",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          style={swiperStyles.container}
        >
          {homeExecutionHighlights?.map((highlight, i) => (
            <SwiperSlide key={i}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  maxWidth: "440px",
                  margin: "24px auto",
                  padding: "24px",
                  borderRadius: "20px",
                  backgroundColor: "#f9fafb", // subtle background
                  border: "1px solid #e5e7eb", // light border
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
                  transition: "box-shadow 0.3s ease, transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 16px 32px rgba(0, 0, 0, 0.08)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0, 0, 0, 0.05)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Top Section */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "16px",
                      background: "linear-gradient(135deg, #eef2ff, #e0e7ff)", // lavender blue
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    }}
                  >
                    <Image
                      src={highlight.image}
                      alt="icon"
                      width={34}
                      height={34}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
 
                  <div>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "20px",
                        fontWeight: 600,
                        color: "#1f2937", // slate-800
                      }}
                    >
                      {highlight.stack}
                    </h3>
                    
                  </div>
                </div>
 
                {/* Divider */}
                <div
                  style={{
                    margin: "20px 0",
                    height: "1px",
                    backgroundColor: "#e5e7eb",
                  }}
                />
 
                {/* Bottom Stats Section */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      backgroundColor: "#3b82f6",
                      color: "white",
                      padding: "8px 16px",
                      fontSize: "14px",
                      fontWeight: 500,
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#2563eb";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#3b82f6";
                    }}
                  >
                    {highlight.count} Students
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
 
        {/* Navigation Controls */}
        <div className="d-flex justify-center x-gap-15 items-center pt-40">
          <div className="col-auto">
            <button className="d-flex items-center text-24 arrow-left-hover js-prev icon-arrow-left-executive">
              <i className="icon icon-arrow-left"></i>
            </button>
          </div>
          <div className="col-auto">
            <div className="pagination -arrows js-pagination executive-pagination"></div>
          </div>
          <div className="col-auto">
            <button className="d-flex items-center text-24 arrow-right-hover js-next icon-arrow-right-executive">
              <i className="icon icon-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
 
 