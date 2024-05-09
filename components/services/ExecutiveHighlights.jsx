import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchExecutionHighlights } from "@/redux/slices/services/executionHighlights/Execution_Highlights";
import Image from "next/image";

export default function ExecutiveHighlights({ serviceId }) {
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);

  const executionHighlights = useSelector(
    (state) => state.executionHighlights.executionHighlights
  );

  useEffect(() => {
    dispatch(fetchExecutionHighlights());
    setIsClient(true); // Ensure code runs on the client side
  }, [dispatch]);

  if (!isClient) {
    return null; // Avoid server-side rendering issues
  }

  const filteredHighlights = executionHighlights.filter(
    (highlight) => highlight.service._id === serviceId
  );

  return (
    <section className="layout-pt-sm layout-pb-sm section-bg">
      <div className="section-bg__item"></div>
      <div className="container">
        <div className="row y-gap-20 justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle">
              <h2
                className="sectionTitle__title"
                style={{ fontFamily: "Serif" }}
              >
                Execution Highlights
              </h2>
              <p className="sectionTitle__text" style={{ fontFamily: "Serif" }}>
                Executive highlights summarize key accomplishments, providing
                stakeholders with a snapshot of significant developments.
              </p>
            </div>
          </div>
        </div>
        {/* <div className="swiper-buttons">
          <button className="swiper-prev">
            <i className="icon icon-arrow-left text-24"></i>
          </button>

          <button className="swiper-next">
            <i className="icon icon-arrow-right text-24"></i>
          </button>
        </div> */}

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
          {filteredHighlights.map((highlight, i) => (
            <SwiperSlide key={i}>
              <div className="infoCard -type-2 text-center py-40 -infoCard-hover">
                <div className="infoCard__image">
                  <Image
                    src={highlight.image}
                    alt="image"
                    width={100}
                    height={100}
                    style={{
                      width: "80px",
                      height: "60px",
                    }}
                  />
                </div>
                <h5
                  className="infoCard__title text-24 lh-1 mt-25"
                  style={{ fontFamily: "Serif" }}
                >
                  {highlight.stack}
                </h5>
                <p
                  className="infoCard__text mt-5"
                  style={{ fontFamily: "Serif" }}
                >
                  {highlight.count}
                </p>
              </div>
              <br />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
