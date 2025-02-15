"use client";

import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchBatches } from "@/redux/slices/batch/batches";
import { isAfter, parseISO } from "date-fns";

export default function Batches() {
  const dispatch = useDispatch();

  const batches = useSelector((state) => state.batches.batches);
  const [showSlider, setShowSlider] = useState(false);
  useEffect(() => {
    setShowSlider(true);
  }, []);
  useEffect(() => {
    dispatch(fetchBatches());
  }, [dispatch]);

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const filteredBatches = batches.filter((batch) => {
    const batchStartDate = new Date(batch.start_date);
    batchStartDate.setHours(0, 0, 0, 0);
    return batchStartDate >= currentDate;
  });
  filteredBatches.sort((a, b) => {
    const startDateA = new Date(a.start_date);
    const startDateB = new Date(b.start_date);
    return startDateA - startDateB;
  });
  return (
    <section
      className="layout-pt-sm layout-pb-sm bg-light-3"
      style={{ fontFamily: "serif" }}
    >
      <div className="container">
        <div className="row y-gap-15 justify-between items-end">
          <div className="col-lg-6">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">Upcoming Batchs</h2>

              <p className="sectionTitle__text ">
                Upcoming Batches of Courses around the Tamil Nadu
              </p>
            </div>
          </div>

          <div className="col-auto">
            <div className="d-flex justify-center x-gap-15 items-center">
              <div className="col-auto">
                <button className="d-flex items-center text-24 arrow-left-hover js-events-slider-prev event-slide-prev">
                  <i className="icon  icon-arrow-left"></i>
                </button>
              </div>
              <div className="col-auto">
                <div className="pagination event-pagination -arrows js-events-slider-pagination"></div>
              </div>
              <div className="col-auto">
                <button className="d-flex items-center text-24 arrow-right-hover js-events-slider-next event-slide-next">
                  <i className="icon icon-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-60 lg:pt-40 js-section-slider">
          {showSlider && (
            <Swiper
              className="overflow-visible"
              // {...setting}
              modules={[Navigation, Pagination, Autoplay]}
              pagination={{
                el: ".event-pagination",
                clickable: true,
              }}
              navigation={{
                nextEl: ".event-slide-next",
                prevEl: ".event-slide-prev",
              }}
              // loop={true}
              autoplay={{ delay: 8000 }}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                // when window width is >= 576px
                450: {
                  slidesPerView: 1,
                },
                // when window width is >= 768px
                768: {
                  slidesPerView: 2,
                },
                1200: {
                  // when window width is >= 992px
                  slidesPerView: 3,
                },
              }}
            >
              {filteredBatches.slice(0, 5).map((batch, i) => (
                <SwiperSlide key={i}>
                  <Link
                    href={`/courses/${batch.course.slug}/${batch.course._id}`}
                  >
                    <div className="swiper-slide">
                      <div
                        className="eventCard -type-1"
                        data-aos="fade-left"
                        data-aos-duration={(i + 1) * 500}
                      >
                        <div className="eventCard__img">
                          <Image
                            style={{ width: "730px", height: "200px" }}
                            src={batch.image}
                            width={730}
                            height={530}
                            alt="image"
                          />
                        </div>

                        <div className="eventCard__bg bg-white">
                          <div className="eventCard__content y-gap-10">
                            <div className="eventCard__inner">
                              <h4 className="eventCard__title text-17 fw-500">
                                <Link
                                  className="linkCustom"
                                  href={`/courses/${batch.course.slug}/${batch.course._id}`}
                                >
                                  {batch.course.course_name}
                                </Link>
                              </h4>
                              <div className="d-flex x-gap-15 pt-10">
                                <div className="d-flex items-center">
                                  <div className="icon-calendar-2 text-16 mr-8"></div>
                                  <div className="text-14">
                                    {batch.start_date}
                                  </div>
                                </div>
                                <div className="d-flex items-center">
                                  <div className="icon-location text-16 mr-8"></div>
                                  <div
                                    className="text-14"
                                    style={{ maxWidth: "150px" }}
                                  >
                                    {batch.branch}
                                  </div>
                                </div>
                              </div>
                              <div className="d-flex x-gap-15 pt-10">
                                <div className="d-flex items-center">
                                  <div className="icon-person-3 text-16 mr-8"></div>
                                  <div className="text-14">
                                    Trainer:{" "}
                                    {batch.course.instructor
                                      .map(
                                        (instructor) =>
                                          instructor.name.split(" ")[0]
                                      )
                                      .join(", ")}
                                  </div>
                                </div>
                                <div className="d-flex items-center">
                                  <div className="icon-message text-16 mr-8"></div>
                                  <div className="text-14">{batch.contact}</div>
                                </div>
                              </div>
                            </div>
                            <div className="eventCard__button">
                              <Link
                                href={`applyProgram`}
                                className="button -sm -rounded -purple-1 text-white px-25"
                              >
                                Enroll
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        <div className="row pt-60 lg:pt-40">
          <div className="col-auto">
            <Link
              href="allBatches"
              className="button -icon -outline-purple-6 text-purple-1 fw-500"
            >
              View All Batches
              <span className="icon-arrow-top-right text-14 ml-10"></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
