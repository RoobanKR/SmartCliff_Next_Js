"use client";
import Image from "next/image";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

import React from "react";
import { featureTwo } from "../../../data/features";
import { slidesData } from "../../../data/hero";
import { useRouter } from "next/navigation";

export default function HeroTwo() {
  const router = useRouter();
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    setShowSlider(true);
  }, []);
  return (
    <section className="mainSlider -type-1 js-mainSlider customizedHeroBackground">
      <div className="swiper-wrapper-two">
        {showSlider && (
          <Swiper
            // {...setting}

            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: ".hero-slider-next",
              prevEl: ".hero-slider-prev",
            }}
            spaceBetween={0}
            slidesPerView={1}
            breakpoints={{
              // when window width is >= 576px
              450: {
                slidesPerView: 1,
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 1,
              },
              1200: {
                // when window width is >= 992px
                slidesPerView: 1,
              },
            }}
            speed={1200}
          >
            {slidesData.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="swiper-slide hightFull">
                  <div className="mainSlider__bg">
                    <div
                      className="bg-image js-lazy customedBg"
                      style={{ backgroundImage: `url(${item.bgImage})` }}
                    ></div>
                  </div>
                </div>
              </SwiperSlide>
              // 140,90
            ))}
          </Swiper>
        )}
      </div>

      <div className="container">
        <div className="row justify-center text-center ">
          <div className="col-sm-6 col-sm-9">
            <div
              className="mainSlider__content"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <h1
                className="mainSlider__title text-white"
                style={{ fontFamily: "Serif" }}
              >
                Empowering{" "}
                <span className="underline" style={{ color: "#f97c69" }}>
                  10 Million +
                </span>{" "}
                youth to bridge the Digital Skills gap and forge{" "}
                <span className="text-outline-yellowie-1 underline">
                  Carrers
                </span>{" "}
                in future technology.{" "}
              </h1>

              <p
                className="mainSlider__text text-white"
                style={{ fontFamily: "Serif" }}
              >
                More than 1,000 Placements Student
              </p>
            </div>
          </div>
        </div>

        <div className="row y-gap-20 justify-center mainSlider__items pt-30">
          {featureTwo.map((elm, i) => (
            <div key={i} className="col-xl-3 col-md-4 col-sm-6">
              <div className="mainSlider-item text-center">
                <div
                  key={i}
                  className="col-xl-3 col-md-4 col-sm-6"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "white",
                    margin: "0 auto",
                  }}
                >
                  <Image width={30} height={30} src={elm.imgSrc} alt="icon" />
                </div>

                <h4
                  className="text-20 fw-500 lh-18 text-white mt-8"
                  style={{ fontFamily: "Serif" }}
                >
                  {elm.title}
                </h4>
                <p
                  className="text-15 text-white"
                  style={{ fontFamily: "Serif" }}
                >
                  {elm.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="swiper-prev hero-slider-prev button -white-20 text-white size-60 rounded-full d-flex justify-center items-center js-prev">
        <i className="icon icon-arrow-left text-24"></i>
      </button>

      <button className="swiper-next hero-slider-next button -white-20 text-white size-60 rounded-full d-flex justify-center items-center js-next">
        <i className="icon icon-arrow-right text-24"></i>
      </button>
    </section>
  );
}
