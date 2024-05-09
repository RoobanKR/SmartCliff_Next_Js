import React, { useEffect, useState } from "react";
import Image from "next/image";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay, Pagination]);

export default function TestimonialCard({ data }) {
  const [rating, setRating] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    for (let i = Math.round(data.rating); i >= 1; i--) {
      setRating((prev) => [...prev, "star"]);
    }
  }, []);

  // Function to toggle expanded state
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Function to render review content with limited lines
  const renderReviewContent = () => {
    const reviewText = data.review;
    if (expanded || reviewText.length <= 319) {
      return <p>{reviewText}</p>;
    } else {
      // Display only the first 3 lines
      return (
        <>
          <p>{reviewText.slice(0, 319)}</p>
          <button onClick={toggleExpanded}>View More</button>
        </>
      );
    }
  };

  return (
    <Swiper
      className="testimonial-swiper"
      spaceBetween={30}
      slidesPerView={1}
      autoplay={{ delay: 1000 }}
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 1,
        },
      }}
      pagination={{ clickable: true }}
    >
      <SwiperSlide>
        <div className="swiper-slide" style={{ fontFamily: "Serif" }}>
          <div
            className="testimonials -type-3 sm:px-20 sm:py-40"
            style={{ background: "#f1f2f4" }}
          >
            <div className="row y-gap-30 md:text-center md:justify-center">
              <div className="col-md-auto ml-50">
                <div
                  className="testimonials__image-container"
                  style={{ boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)" }}
                >
                  <Image
                    width={170}
                    height={160}
                    src={data.image}
                    alt="image"
                  />
                </div>
              </div>

              <div className="col-md-auto ml-50 mt-15">
                <div className="text-30 lh-1 text-dark-1 fw-500">
                  Name: {data.name}
                </div>
                <div className="text-33 lh-1 mt-10">
                  Service: {data?.service?.title} {data?.stack?.name}
                </div>
                <div className="testimonials__text text-16 lh-17 fw-500 mt-15">
                  {renderReviewContent()}
                </div>
                {expanded && (
                  <button onClick={toggleExpanded}>View Less</button>
                )}
                {!expanded && data.review.split("\n").length > 3 && (
                  <button onClick={toggleExpanded}>View More</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
