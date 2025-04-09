"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper";

export default function ExecutiveHighlights({ filteredHighlights }) {

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
  const colors = ["#5b2c6f"];

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
          {filteredHighlights?.map((highlight, i) => (
            <SwiperSlide key={i}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 20px", // Left padding for neat alignment
                  borderBottom: "2px solid #D1D5DB",
                  transition: "all 0.3s ease-in-out",
                  cursor: "pointer",
                  boxShadow: `0px 5px 8px ${colors[i % colors.length]}88`, // Enhanced downward shadow
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                  width: "90%", // Reduced width for a compact design
                  maxWidth: "350px", // Prevents excessive stretching
                  margin: "10px auto", // Creates proper space between cards (Top & Bottom)
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {/* Left Section - Icon & Text */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: "45px",
                      height: "45px",
                      background: "#F3F4F6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "8px",
                      border: "1px solid #E5E7EB",
                      paddingLeft: "8px", // Added left padding to the image
                    }}
                  >
                    <Image
                      src={highlight.image}
                      alt="icon"
                      width={28}
                      height={28}
                    />
                  </div>

                  {/* Text */}
                  <div>
                    <h5
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#222",
                        marginBottom: "3px",
                        letterSpacing: "0.3px",
                      }}
                    >
                      {highlight.stack}
                    </h5>
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#555",
                        margin: "0",
                        fontWeight: "500",
                        opacity: "0.85",
                      }}
                    >
                      {highlight.count}
                    </p>
                  </div>
                </div>

                {/* Thin Multi-Color Divider */}
                <div
                  style={{
                    width: "3px",
                    height: "40px",
                    backgroundColor: colors[i % colors.length],
                    borderRadius: "10px",
                    boxShadow: `0px 3px 5px ${colors[i % colors.length]}BB`, // Stronger downward glow
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
