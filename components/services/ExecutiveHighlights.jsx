"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper";

export default function ExecutiveHighlights({ filteredHighlights }) {
  const colors = ["#f5f0ff", "#ffffff"];

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

  return (
    <section
      style={{
        paddingTop: "1rem",
        paddingBottom: "1rem",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          <p
            style={{
              color: "#6c757d",
              maxWidth: "600px",
            }}
          >
            (By Domain)
          </p>
        </div>

        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className}" style="
                width: 10px;
                height: 10px;
                backgroundColor: #ccc;
                borderRadius: 50%;
                opacity: 0.5;
                display: inline-block;
                cursor: pointer;
              "></span>`;
            },
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
          {filteredHighlights?.map((highlight, i) => (
            <SwiperSlide key={i}>
              <div
                style={{
                  position: "relative",
                  textAlign: "center",
                  padding: "30px",
                  backgroundColor: colors[i % colors.length],
                  borderRadius: "10px",
                  boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.15)",
                  height: "100%",
                  marginBottom: "50px",
                  transition: "background-color 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  // Change background color on hover
                  e.currentTarget.style.backgroundColor =
                    colors[(i + 1) % colors.length];
                  // Find the icon container and add flip rotation
                  const iconContainer =
                    e.currentTarget.querySelector(".icon-container");
                  if (iconContainer) {
                    iconContainer.style.transform =
                      "translateX(-50%) rotateY(180deg)";
                  }
                }}
                onMouseLeave={(e) => {
                  // Revert background color on mouse leave
                  e.currentTarget.style.backgroundColor =
                    colors[i % colors.length];
                  // Find the icon container and revert flip rotation
                  const iconContainer =
                    e.currentTarget.querySelector(".icon-container");
                  if (iconContainer) {
                    iconContainer.style.transform =
                      "translateX(-50%) rotateY(0deg)";
                  }
                }}
              >
                {/* Circle for the Icon */}
                <div
                  className="icon-container"
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    top: "-30px",
                    width: "60px",
                    height: "60px",
                    backgroundColor: colors[(i + 1) % colors.length],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                    border: "2px solid #ccc",
                    transition: "transform 0.5s ease",
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                  }}
                >
                  <Image
                    src={highlight.image}
                    alt="icon"
                    width={30}
                    height={30}
                    style={{
                      backfaceVisibility: "visible",
                      transform: "rotateY(0deg)",
                    }}
                  />
                </div>

                {/* Card Content */}
                <div style={{ paddingTop: "10px" }}>
                  <h5
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginTop: "5px",
                    }}
                  >
                    {highlight.stack}
                  </h5>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#666",
                      marginTop: "5px",
                    }}
                  >
                    {highlight.count}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
