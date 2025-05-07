"use client";

import { useState, useEffect } from "react";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getAllClient } from "@/redux/slices/bussiness/client/Client";

export default function Client() {
  const [showSlider, setShowSlider] = useState(false);
  const [swiperRef, setSwiperRef] = useState(null);
  const dispatch = useDispatch();

  const clients = useSelector((state) => state.clients.clients);
  const homeData = clients.filter((client) => client.type === "home");

  useEffect(() => {
    dispatch(getAllClient());
  }, [dispatch]);

  useEffect(() => {
    setShowSlider(true);
  }, []);

  const handlePrevClick = () => {
    if (swiperRef) {
      swiperRef.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperRef) {
      swiperRef.slideNext();
    }
  };

  return (
    <section className="layout-pt-sm layout-pb-sm">
      <div className="container">
        <div className="row y-gap-20 justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle">
              <h2
                style={{
                  fontSize: "34px",
                  fontWeight: "bold",
                  color: "#334155",
                }}
              >
                Our trained professionals work alongside the best in the{" "}
                <span style={{ color: "#f2775e" }}>industry</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="pt-30 sm:pt-30">
          <div className="overflow-hidden js-section-slider">
            {showSlider && (
              <div style={{ position: "relative", width: "100%" }}>
                <button
                  className="arrow-left-hover"
                  onClick={handlePrevClick}
                  style={{
                    fontSize: 24,
                    position: "absolute",
                    top: "50%",
                    left: "8px",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    background: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "50%",
                    border: "none",
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  }}
                  aria-label="Previous slide"
                >
                  <i className="icon icon-arrow-left"></i>
                </button>

                <button
                  className="arrow-right-hover"
                  onClick={handleNextClick}
                  style={{
                    fontSize: 24,
                    position: "absolute",
                    top: "50%",
                    right: "8px",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    background: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "50%",
                    border: "none",
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  }}
                  aria-label="Next slide"
                >
                  <i className="icon icon-arrow-right"></i>
                </button>

                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  pagination={{ el: ".pagination-skils", clickable: true }}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  spaceBetween={30}
                  slidesPerView={1}
                  breakpoints={{
                    450: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1200: { slidesPerView: 4 }, // Adjusted for larger screens
                  }}
                  loop={false}
                  onSwiper={(swiper) => setSwiperRef(swiper)}
                  style={{ padding: "0 20px" }} // Adjusted padding for better responsiveness
                >
                  {homeData.map((elm, i) => (
                    <SwiperSlide key={i}>
                      <div
                        className="swiper-slide h-100 overflow-visible"
                        style={{ width: "100%", padding: "8px" }} // Changed width to 100% for better responsiveness
                      >
                        <div
                          className="infoCard"
                          style={{
                            background:
                              "linear-gradient(to bottom right, #F9F9F9, #FFFDF9)",
                            borderRadius: "12px",
                            border: "1px solid #E0E0E0",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            height: "120px",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            transition:
                              "transform 0.3s ease, box-shadow 0.3s ease",
                            overflow: "hidden",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                              "translateY(-4px)";
                            e.currentTarget.style.boxShadow =
                              "0 12px 24px rgba(0, 0, 0, 0.15)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                              "0 4px 12px rgba(0, 0, 0, 0.1)";
                          }}
                        >
                          {/* Image Section */}
                          <div
                            style={{
                              width: "40%",
                              height: "100%",
                              backgroundColor: "#fff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRight: "1px solid #E0E0E0",
                              padding: "8px",
                            }}
                          >
                            <Image
                              width={140}
                              height={100}
                              style={{
                                objectFit: "contain",
                                maxHeight: "100%",
                                maxWidth: "100%",
                              }}
                              src={elm.image}
                              alt="Service Image"
                            />
                          </div>

                          {/* Title Section */}
                          <div
                            style={{
                              width: "60%",
                              padding: "8px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              textAlign: "center",
                            }}
                          >
                            <h5
                              style={{
                                fontSize: "14px",
                                color: "#4B4B4B",
                                fontWeight: 600,
                                letterSpacing: "0.3px",
                                lineHeight: "1.2",
                              }}
                            >
                              {elm.name}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}