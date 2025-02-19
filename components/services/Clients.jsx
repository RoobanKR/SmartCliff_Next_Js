

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Clients({ backgroundColor, filteredClients }) {
  const [showSlider, setShowSlider] = useState(false);
  useEffect(() => {
    setShowSlider(true);
  }, []);
  return (
    <section
      className={` layout-pb-md bg-light-4  py-20`}
    >
      <div className="container">
        <div className="row y-gap-20 justify-center text-center pt-10 " style={{marginBottom:'-50px'}} >
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2
                className="text-25"
              >
                Our Clients
              </h2>
              <p
                className="sectionTitle__text "
              ></p>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 pt-50" style={{ alignItems: "center" }}>
          {showSlider && (
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
              {filteredClients.map((elm, i) => (
                <SwiperSlide key={i}>
                  <div className="infoCard -type-2 text-center -infoCard-hover">
                    <div
                      className="imageWrapper"
                      style={{
                        width: "110px",
                        height: "100px",
                        overflow: "hidden",
                        position: "relative",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Image
                        src={elm.image}
                        alt="image"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                      />
                    </div>

                    <div className="teamCard__content">
                      <h4 className="teamCard__title">
                        <div>
                          <a
                            className="linkCustom"
                          >
                            {elm.name}
                          </a>
                        </div>
                      </h4>
                    </div>
                  </div>
                  <br />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section >
  );
}