"use client";
import { fetchCourses, selectCourses } from "@/redux/slices/course/course";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CourseSlider() {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const [showSlider, setShowSlider] = useState(false);
  const params = useParams();
  const courseSlug = params?.slug || "";
  const [matchedCourse, setMatchedCourse] = useState(null);
  const [coursesWithSameCategory, setCoursesWithSameCategory] = useState([]);

  useEffect(() => {
    dispatch(fetchCourses())
      .then(() => setShowSlider(true))
      .catch((error) => console.error("Error fetching courses:", error));
  }, [dispatch]);

  useEffect(() => {
    if (courses.length > 0) {
      // Find the current course by slug instead of ID
      const matched = courses.find((course) => course.slug === courseSlug);
      setMatchedCourse(matched);

      if (matched && matched.category) {
        const categoryID = matched.category._id;
        // Filter to get courses with the same category but not the current course
        const filteredCourses = courses.filter(
          (course) =>
            course.category &&
            course.category._id === categoryID &&
            course.slug !== courseSlug
        );
        setCoursesWithSameCategory(filteredCourses);
      }
    }
  }, [courseSlug, courses]);

  // Don't render if there are no related courses
  if (!coursesWithSameCategory.length) {
    return null;
  }

  return (
    <section
      className="layout-pt-md layout-pb-lg"
      style={{ fontFamily: "Serif" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">Explore Related Courses</h2>
              <p className="sectionTitle__text ">
                Expand Your Knowledge with These Courses
              </p>
            </div>
          </div>
        </div>
        <div className="relative pt-60 lg:pt-50">
          <div className="overflow-hidden js-section-slider">
            {showSlider && coursesWithSameCategory.length > 0 && (
              <Swiper
                modules={[Navigation, Pagination]}
                navigation={{
                  nextEl: ".js-courses-next-one",
                  prevEl: ".js-courses-prev-one",
                }}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  450: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1200: { slidesPerView: 4 },
                }}
              >
                {coursesWithSameCategory.map((course, index) => (
                  <SwiperSlide key={index}>
                    <div className="swiper-slide">
                      <div className="coursesCard -type-1">
                        <div className="relative">
                          <div
                            className="coursesCard__image overflow-hidden rounded-8"
                            style={{
                              width: "100%",
                              height: "200px",
                              position: "relative",
                            }}
                          >
                            <Image
                              src={course.images?.[0] || course.image}
                              alt={course.course_name}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                            <div className="coursesCard__image_overlay rounded-8"></div>
                          </div>
                        </div>
                        <div className="h-100 pt-15">
                          <div className="text-17 lh-15 fw-500 text-dark-1 mt-10">
                            <Link
                              className="linkCustom"
                              href={`/courses/${course.slug}`}
                            >
                              {course.course_name}
                            </Link>
                          </div>
                          <div className="d-flex x-gap-10 items-center pt-10">
                            <div className="d-flex items-center">
                              <div className="mr-8">
                                <Image
                                  width={16}
                                  height={17}
                                  src="/assets/img/coursesCards/icons/1.svg"
                                  alt="icon"
                                />
                              </div>
                              <div className="text-14 lh-1">
                                {course.projects || course.projects} Projects
                              </div>
                            </div>

                            <div className="d-flex items-center">
                              <div className="mr-8">
                                <Image
                                  width={16}
                                  height={17}
                                  src="/assets/img/coursesCards/icons/2.svg"
                                  alt="icon"
                                />
                              </div>
                              <div className="text-14 lh-1">
                                {course.duration}
                              </div>
                            </div>

                            <div className="d-flex items-center">
                              <div className="mr-8">
                                <Image
                                  width={16}
                                  height={17}
                                  src="/assets/img/coursesCards/icons/3.svg"
                                  alt="icon"
                                />
                              </div>
                              <div className="text-14 lh-1">
                                {course.mode_of_training}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
          {coursesWithSameCategory.length > 0 && (
            <>
              <button className="section-slider-nav -prev -dark-bg-dark-2 -white -absolute size-70 rounded-full shadow-5 js-courses-prev-one">
                <i className="icon icon-arrow-left text-24"></i>
              </button>
              <button className="section-slider-nav -next -dark-bg-dark-2 -white -absolute size-70 rounded-full shadow-5 js-courses-next-one">
                <i className="icon icon-arrow-right text-24"></i>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
