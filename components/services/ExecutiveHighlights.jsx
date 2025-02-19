import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

export default function ExecutiveHighlights({ filteredHighlights }) {
  return (
    <section className="layout-pt-sm layout-pb-sm section-bg" style={{ backgroundColor: '#f7f8fb' }}>
      <div className="section-bg__item"></div>
      <div className="container">
        <div className="row y-gap-20 justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle">
              <h2
                className="text-25"
              >
                Execution Highlights
              </h2>
              <p className="sectionTitle__text mb-10" >
                Executive highlights summarize key accomplishments, providing
                stakeholders with a snapshot of significant developments.
              </p>
            </div>
          </div>
        </div>
        <div className="row y-gap-30 pt-30" style={{ alignItems: "center" }}>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{ delay: 3000 }}
            slidesPerView={4}
            spaceBetween={30}
            breakpoints={{
              320: {
                slidesPerView: 2,
              },
              450: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
            }}
            navigation={{
              nextEl: ".swiper-next",
              prevEl: ".swiper-prev",
            }}
            pagination={{ clickable: true }}
            speed={1200}
          >
            {filteredHighlights?.map((highlight, i) => (
              <SwiperSlide key={i}>
                <div className="infoCard -type-2 text-center py-40 -infoCard-hover" style={{ backgroundColor: '#f5f0ff',marginBottom:'30px' }}>
                  <div className="infoCard__image">
                    <Image
                      src={`${highlight.image}`}
                      alt="image"
                      width={70}
                      height={70}
                      style={{
                        width: "60px",
                        height: "50px",
                      }}
                    />
                  </div>
                  <h5
                    className="infoCard__title text-20 lh-1 mt-25"

                  >
                    {highlight.stack}
                  </h5>
                  <p
                    className="infoCard__text mt-5"

                  >
                    {highlight.count}
                  </p>
                </div>
                <br />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
