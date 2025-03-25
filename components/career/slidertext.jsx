"use client";
import React from "react";
import Image from "next/image";
import { brands } from "@/data/brands";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper";
 
export default function SliderText() {
  const values = [
    "Transparency",
    "Diversity",
    "Teamwork",
    "Recognition",
    "Support",
  ];
 
  return (
    <section className=" bg-light-6" style={{ marginBottom: "15px" }}>
      <div className="container">
        <div className="row y-gap-30 justify-between sm:justify-start items-center">
          <Swiper
            modules={[Navigation, Autoplay]} // Removed Pagination module
            autoplay={{ delay: 3000 }}
            slidesPerView={4}
            spaceBetween={30}
            breakpoints={{
              320: { slidesPerView: 2 },
              450: { slidesPerView: 3 },
              768: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
            speed={1200}
          >
            {values.map((text, i) => (
              <SwiperSlide key={i}>
                <div className="d-flex justify-center items-center px-4">
                  <span
                    style={{
                      color: "#5b2c6f",
                      fontSize: "24px",
                      marginRight: "78px",
                    }}
                  >
                    ★
                  </span>
                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#89898a",
                    }}
                  >
                    {text}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
 
 