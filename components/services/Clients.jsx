import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { getAllClient } from "@/redux/slices/services/client/Client";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay]);

export default function Clients({ backgroundColor, serviceId }) {
  const dispatch = useDispatch();
  const [showSlider, setShowSlider] = useState(false);
  const clients = useSelector((state) => state.clients.clients);

  useEffect(() => {
    dispatch(getAllClient());
  }, [dispatch]);

  useEffect(() => {
    setShowSlider(true);
  }, []);

  const filteredClients = clients.filter(
    (client) => client.service._id === serviceId
  );

  return (
    <section
      className={`layout-pt-sm layout-pb-md ${
        backgroundColor ? backgroundColor : ""
      }`}
    >
      <div className="container">
        <div className="row y-gap-20 justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2
                className="sectionTitle__title "
                style={{ fontFamily: "Serif" }}
              >
                Our Clients
              </h2>
              <p
                className="sectionTitle__text "
                style={{ fontFamily: "Serif" }}
              ></p>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 pt-50" style={{ alignItems: "center" }}>
          {showSlider && (
            <Swiper
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
              spaceBetween={50}
              autoplay={{ delay: 8000 }}
            >
              {filteredClients.map((elm, i) => (
                <SwiperSlide key={i}>
                  <div className="teamCard -type-1 -teamCard-hover">
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
                            style={{ fontFamily: "Serif" }}
                          >
                            {elm.name}
                          </a>
                        </div>
                      </h4>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
}
