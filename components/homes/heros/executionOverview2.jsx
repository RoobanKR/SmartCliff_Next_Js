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
                  width: "280px",
                  margin: "12px auto",
                  padding: "14px 10px",
                  borderRadius: "24px",
                  background: "linear-gradient(145deg, #F3E8FF, #ECE0FA)", // Soft lilac gradient
                  boxShadow: "0 10px 30px rgba(91, 44, 111, 0.07)", // shadow in theme
                  position: "relative",
                  textAlign: "center",
                  overflow: "hidden",
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {/* Violet Glow Bubble */}
                <div
                  style={{
                    position: "absolute",
                    top: "-30px",
                    left: "-30px",
                    width: "130px",
                    height: "130px",
                    background:
                      "radial-gradient(circle, rgba(91, 44, 111, 0.35), transparent 70%)",
                    borderRadius: "50%",
                    filter: "blur(40px)",
                    zIndex: 0,
                  }}
                />

                {/* Icon Bubble */}
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    margin: "0 auto",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #7B4BB7, #B087DC)", // violet gradient
                    boxShadow: "0 6px 20px rgba(91, 44, 111, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1,
                  }}
                >
                  <Image
                    src={highlight.image}
                    alt="icon"
                    width={42}
                    height={42}
                  />
                </div>

                {/* Heading */}
                <h3
                  style={{
                    marginTop: "16px",
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#5B2C6F",
                    zIndex: 1,
                  }}
                >
                  {highlight.stack}
                </h3>

                {/* Count */}
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#7B4BB7",
                    zIndex: 1,
                    marginTop: "4px",
                  }}
                >
                  {highlight.count}
                </p>
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
