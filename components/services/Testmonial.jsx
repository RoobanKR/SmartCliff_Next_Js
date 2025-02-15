"use client";

import React, { useState, useEffect } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { testimonialsTwo } from "@/data/tesimonials";
import TestimonialCard from "../common/TestimonialCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { getAllTestimonial } from "@/redux/slices/services/testimonial/Testimonial";

export default function TestimonialsFour({ serviceId }) {
  const [showSlider, setShowSlider] = useState(false);
  const dispatch = useDispatch();
  const testimonials = useSelector((state) => state.testimonial.testimonials);

  useEffect(() => {
    dispatch(getAllTestimonial());
  }, [dispatch]);

  useEffect(() => {}, [testimonials]);

  useEffect(() => {
    setShowSlider(true);
  }, []);

  const filteredtestimonial = testimonials.filter(
    (testimonial) => testimonial.service._id === serviceId
  );

  return (
    <section
      className="layout-pt-sm layout-pb-sm bg-beige-1"
      style={{ fontFamily: "Serif" }}
    >
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title text-black">
                People Say About SmartCliff Services
              </h2>

              <p className="sectionTitle__text text-white"></p>
            </div>
          </div>
        </div>

        <div className="pt-60 lg:pt-50 js-section-slider">
          {showSlider && (
            <Swiper
              className="overflow-visible"
              autoplay={{ delay: 4000 }}
              // {...setting}
              modules={[Navigation, Pagination]}
              pagination={{
                el: ".pagination-testimonial",
                clickable: true,
              }}
              navigation={{
                nextEl: ".icon-arrow-right-testimonial",
                prevEl: ".icon-arrow-left-testimonial",
              }}
              spaceBetween={30}
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
            >
              {filteredtestimonial.map((elm, i) => (
                <SwiperSlide key={i} className="swiper-slide">
                  <TestimonialCard data={elm} index={i} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          <div className="d-flex justify-center x-gap-15 items-center pt-60 lg:pt-40">
            <div className="col-auto">
              <button className="d-flex items-center text-24 arrow-left-hover js-prev icon-arrow-left-testimonial">
                <i className="icon text-white icon-arrow-left"></i>
              </button>
            </div>
            <div className="col-auto">
              <div className="pagination -arrows js-pagination pagination-testimonial"></div>
            </div>
            <div className="col-auto">
              <button className="d-flex items-center text-24 arrow-right-hover js-next icon-arrow-right-testimonial">
                <i className="icon text-white icon-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
