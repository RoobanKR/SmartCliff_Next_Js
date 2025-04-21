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
      padding: "30px 0",
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
      <div>
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
              slidesPerView: 3,
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
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px",
                  borderRadius: "16px",
                  background:
                    "linear-gradient(135deg, #2C2E54 10%, #1A1C33 90%)", // Deep Indigo Gradient
                  boxShadow: "0px 12px 24px rgba(10, 10, 25, 0.4)", // Depth Effect
                  width: "92%",
                  maxWidth: "420px",
                  margin: "15px auto",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0px 15px 30px rgba(10, 10, 25, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0px 12px 24px rgba(10, 10, 25, 0.4)";
                }}
              >
                {/* Floating Accent Light */}
                <div
                  style={{
                    position: "absolute",
                    top: "-15px",
                    left: "-15px",
                    width: "90px",
                    height: "90px",
                    background: "rgba(122, 72, 199, 0.5)", // Royal Purple Glow
                    filter: "blur(30px)",
                    borderRadius: "50%",
                  }}
                ></div>
 
                {/* Left Section - Icon & Text */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "18px" }}
                >
                  {/* Icon with Glass Effect */}
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      background: "rgba(255, 255, 255, 0.06)", // Glass Effect
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "12px",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    <Image
                      src={highlight.image}
                      alt="icon"
                      width={30}
                      height={30}
                    />
                  </div>
 
                  {/* Text Content */}
                  <div>
                    <h5
                      style={{
                        fontSize: "20px",
                        fontWeight: "500",
                        color: "#FFFFFF", // White Text
                        marginBottom: "5px",
                        letterSpacing: "0.6px",
                      }}
                    >
                      {highlight.stack}
                    </h5>
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#FFA63D", // Golden Amber for Contrast
                        margin: "0",
                        fontWeight: "600",
                      }}
                    >
                      {highlight.count}
                    </p>
                  </div>
                </div>
 
                {/* Neon Accent Divider */}
                <div
                  style={{
                    width: "4px",
                    height: "50px",
                    backgroundColor: "#7A48C7", // Royal Purple Divider
                    borderRadius: "12px",
                    boxShadow: "0px 4px 10px rgba(122, 72, 199, 0.8)", // Neon Glow
                  }}
                />
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
 
 