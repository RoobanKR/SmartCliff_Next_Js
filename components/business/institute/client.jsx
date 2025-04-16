"use client";

import { useState, useEffect } from "react";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React from "react";
import Image from "next/image";

export default function Client({ instituteFromUsData }) {
  const [showSlider, setShowSlider] = useState(false);
  const [swiperRef, setSwiperRef] = useState(null);

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
              <h2 className="sectionTitle__title">
                Our Valued <span style={{ color: "#f2775e" }}>Clients</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="pt-30 sm:pt-30">
          <div className="overflow-hidden js-section-slider">
            {showSlider && (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                pagination={{ el: ".pagination-skils", clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  450: { slidesPerView: 2 },
                  768: { slidesPerView: 4 },
                  1200: { slidesPerView: 4 },
                }}
                loop={false}
                onSwiper={(swiper) => setSwiperRef(swiper)} // ✅ Capture instance
              >
                {instituteFromUsData.map((elm, i) => (
                  <SwiperSlide key={i}>
                    <div
                      className="swiper-slide h-100 overflow-visible"
                      style={{ width: "240px", padding: "10px" }}
                    >
                      <div
                        className="infoCard"
                        style={{
                          background:
                            "linear-gradient(to bottom right, #F9F9F9, #FFFDF9)",
                          borderRadius: "16px",
                          border: "1px solid #E0E0E0",
                          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                          height: "330px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-6px)";
                          e.currentTarget.style.boxShadow =
                            "0 18px 36px rgba(0, 0, 0, 0.2)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow =
                            "0 8px 24px rgba(0, 0, 0, 0.15)";
                        }}
                      >
                        {/* Image Section */}
                        <div
                          style={{
                            height: "160px",
                            backgroundColor: "#fff",
                            borderTopLeftRadius: "16px",
                            borderTopRightRadius: "16px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "16px",
                            borderBottom: "1px solid #E0E0E0",
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
                            padding: "20px 16px",
                            textAlign: "center",
                            flexGrow: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minHeight: "90px",
                          }}
                        >
                          <h5
                            style={{
                              fontSize: "16px",
                              color: "#4B4B4B",
                              fontWeight: 600,
                              letterSpacing: "0.3px",
                              lineHeight: "1.4",
                            }}
                          >
                            {elm.name}
                          </h5>
                        </div>

                        {/* Bottom Accent */}
                        <div
                          style={{
                            height: "8px",
                            width: "100%",
                            backgroundColor: "#DAC0A3",
                            borderBottomLeftRadius: "16px",
                            borderBottomRightRadius: "16px",
                          }}
                        ></div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            {/* Manual arrows & pagination */}
            <div className="d-flex justify-center x-gap-15 items-center pt-30 lg:pt-30">
              <div className="col-auto">
                <button
                  className="d-flex items-center text-24 arrow-left-hover"
                  onClick={handlePrevClick}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <i className="icon icon-arrow-left"></i>
                </button>
              </div>
              <div className="col-auto">
                <div className="pagination-skils -arrows js-pagination"></div>
              </div>
              <div className="col-auto">
                <button
                  className="d-flex items-center text-24 arrow-right-hover"
                  onClick={handleNextClick}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <i className="icon icon-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
