"use client";
 
import { useState, useEffect } from "react";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getAllClient } from "@/redux/slices/bussiness/client/Client";
 
export default function ServiceClient() {
  const dispatch = useDispatch();
  const [showSlider, setShowSlider] = useState(false);
  const [swiperRef, setSwiperRef] = useState(null);
 
  useEffect(() => {
    setShowSlider(true);
  }, []);
 
  const clients = useSelector((state) => state.clients.clients);
  const trainFromUsData = clients.filter(client => client.type === "institute");
 
  useEffect(() => {
    dispatch(getAllClient());
  }, [dispatch]);
 
  // Navigation handlers
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
              <h2 style={{ fontSize: "34px", fontWeight: "bold", color: "#334155" }}>Our Valued Clients</h2>
              <p className="sectionTitle__text">
                We partner with diverse industries, including manufacturing, IT, healthcare, retail, and finance, to provide skilled, job-ready talent. Trusted by startups to large enterprises, our hiring and training solutions ensure businesses get industry-ready professionals who drive growth.
              </p>
            </div>
          </div>
        </div>
 
        <div className="pt-30 sm:pt-30">
          <div className="overflow-hidden js-section-slider">
            <div className="swiper-wrapper">
              {showSlider && (
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  pagination={{ el: ".pagination-skils", clickable: true }}
                  navigation={{ nextEl: ".js-courses-next-one", prevEl: ".js-courses-prev-one" }}
                  autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay added here
                  spaceBetween={30}
                  slidesPerView={1}
                  breakpoints={{
                    450: { slidesPerView: 2 },
                    768: { slidesPerView: 4 },
                    1200: { slidesPerView: 4 },
                  }}
                  onSwiper={(swiper) => setSwiperRef(swiper)}
                >
                  {trainFromUsData.map((elm, i) => (
                    <SwiperSlide key={i}>
                      <div className="swiper-slide h-100 overflow-visible">
                        <div className="infoCard -type-1" data-aos="fade-left" data-aos-duration={(i + 1) * 300}>
                          <div className="infoCard__image">
                            <Image width={150} height={100} style={{ width: "100%", objectFit: "contain" }} src={elm.image} alt="image" />
                          </div>
                          <h5 className="infoCard__title text-17 lh-15 mt-10">{elm.name}</h5>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
 
            <div className="d-flex justify-center x-gap-15 items-center pt-30 lg:pt-30">
              <div className="col-auto">
                <button className="d-flex items-center text-24 arrow-left-hover" onClick={handlePrevClick} style={{ display: "flex", alignItems: "center" }}>
                  <i className="icon icon-arrow-left"></i>
                </button>
              </div>
              <div className="col-auto">
                <div className="pagination-skils -arrows js-pagination"></div>
              </div>
              <div className="col-auto">
                <button className="d-flex items-center text-24 arrow-right-hover" onClick={handleNextClick} style={{ display: "flex", alignItems: "center" }}>
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
 
 