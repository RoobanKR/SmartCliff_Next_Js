"use client";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

import React from "react";
import { featureTwo } from "../../../data/features";
import { slidesData } from "../../../data/hero";
import { useRouter } from "next/navigation";
import HeroUITwo from "./heroUI2";
import HeroUIOne from "./heroUI1";
import HeroUIFour from "./heroUI4";
import HeroUIThree from "./heroUI3";
export default function HeroTwo() {
  const router = useRouter();
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    setShowSlider(true);
  }, []);

  return (
    <section
      className="mainSlider -type-1 js-mainSlider customizedHeroBackground"
      style={{
        width: "100%",
        height: "100vh", // Full viewport height
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {showSlider && (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]} // Include Autoplay
          navigation={{
            nextEl: ".hero-slider-next",
            prevEl: ".hero-slider-prev",
          }}
          spaceBetween={0}
          slidesPerView={1}
          speed={1200}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{ clickable: true }}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          {/* Slide 1: HeroUITwo */}
          <SwiperSlide>
            <div
              className="swiper-slide"
              style={{
                width: "auto",
                height: "auto",
                justifyContent: "center",
                background: "#f0f0f0",
              }}
            >
              <HeroUITwo />
            </div>
          </SwiperSlide>
          {/* Slide 2: HeroUIOne */}
          <SwiperSlide>
            <div
              className="swiper-slide"
              style={{
                width: "100%",
                height: "100vh",
                justifyContent: "center",
                background: "#e0e0e0",
              }}
            >
              <HeroUIOne />
            </div>
          </SwiperSlide>
          {/* Slide 3: HeroUIOne */}
          <SwiperSlide>
            <div
              className="swiper-slide"
              style={{
                width: "100%",
                height: "100vh",
                justifyContent: "center",
                background: "#e0e0e0",
              }}
            >
              <HeroUIThree />
            </div>
          </SwiperSlide>{" "}
          {/* Slide 4: HeroUIOne */}
          <SwiperSlide>
            <div
              className="swiper-slide"
              style={{
                width: "100%",
                height: "100vh",
                justifyContent: "center",
                background: "#e0e0e0",
              }}
            >
              <HeroUIFour />
            </div>
          </SwiperSlide>
        </Swiper>
      )}

      {/* Navigation Buttons */}
      <button
        className="swiper-prev hero-slider-prev button -white-20 text-white size-60 rounded-full d-flex justify-center items-center"
        style={{
          position: "absolute",
          top: "50%",
          left: "20px",
          transform: "translateY(-50%)",
          zIndex: 10,
          background: "rgba(0,0,0,0.5)",
          border: "none",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        <i className="icon icon-arrow-left text-24"></i>
      </button>

      <button
        className="swiper-next hero-slider-next button -white-20 text-white size-60 rounded-full d-flex justify-center items-center"
        style={{
          position: "absolute",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          zIndex: 10,
          background: "rgba(0,0,0,0.5)",
          border: "none",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        <i className="icon icon-arrow-right text-24"></i>
      </button>
    </section>
  );
}
