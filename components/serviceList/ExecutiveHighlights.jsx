import React, { useEffect, useState } from "react";
import Image from "next/image";
import { schoolAchievement } from "@/data/achievements";
import { fetchExecutionHighlights } from "@/redux/slices/services/executionHighlights/Execution_Highlights";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useParams } from "next/navigation";
export default function ExecutiveHighlights1() {
  const dispatch = useDispatch();
  const [showSlider, setShowSlider] = useState(false);
  const executionHighlights = useSelector(
    (state) => state.executionHighlights.executionHighlights
  );
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchExecutionHighlights());
  }, [dispatch]);

  useEffect(() => {}, [executionHighlights]);

  const filteredHighlights = executionHighlights.filter(
    (executionHighlights) => executionHighlights.service._id === id
  );

  return (
    <section
      className="layout-pt-md layout-pb-sm section-bg"
      style={{ fontFamily: "Serif" }}
    >
      <div className="section-bg__item"></div>

      <div className="container">
        <div className="row y-gap-20 justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">Execution Highlights</h2>

              <p className="sectionTitle__text "></p>
            </div>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{ delay: 3000 }}
          slidesPerView={4} // Show four slides at a time
          spaceBetween={30}
          navigation={{
            nextEl: ".swiper-next",
            prevEl: ".swiper-prev",
          }}
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
          pagination={{ clickable: true }} // Pagination dots
          speed={1200} // Animation speed
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
