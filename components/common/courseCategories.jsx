"use client";
import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "@/redux/slices/category/category";

export default function CourseCategories() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const courses = useSelector((state) => state.courses.courses);

  const coursesByCategory = {};
  if (courses && courses.length) {
    courses.forEach((course) => {
      const categoryId =
        course.category?._id ||
        (typeof course.category === "object" && course.category?._id) ||
        course.category;

      if (!coursesByCategory[categoryId]) {
        coursesByCategory[categoryId] = [];
      }
      coursesByCategory[categoryId].push(course);
    });
  }

  return (
    <section className="layout-pt-sm layout-pb-sm">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="text-30 lh-15 ">Course Categories</h2>

              <p className="sectionTitle__text ">
                Lorem ipsum dolor sit amet, consectetur.
              </p>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 pt-30 lg:pt-20">
          {categories &&
            categories.map((category) => {
              const courseCount = coursesByCategory[category._id]?.length || 0;

              return (
                <div
                  //   href={`/courses-list-${category._id > 8 ? 1 : category._id}`}
                  key={category._id}
                  className="col-lg-4 col-md-6 col-sm-12 linkCustomTwo"
                >
                  <div className="categoryCard -type-3">
                    <div
                      className="categoryCard__icon bg-light-3 mr-20"
                      style={{
                        width: "50px", // Adjust size as needed
                        height: "50px",
                        borderRadius: "50%", // Ensures a perfect circle
                        overflow: "hidden", // Prevents image from overflowing
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f3f3f3", // Light background for better contrast
                      }}
                    >
                      <img
                        src={category.image}
                        alt={category.category_name}
                        style={{
                          width: "50%", // Adjust this to control image size inside circle
                          height: "50%",
                          objectFit: "contain", // Ensures the entire image fits inside without cropping
                        }}
                      />
                    </div>

                    <div className="categoryCard__content">
                      <h4 className="categoryCard__title text-17 fw-500">
                        {category.category_name}
                      </h4>
                      {/* ✅ Display course count only once */}
                      <div className="categoryCard__text text-14 text-gray-500 mt-5">
                        {courseCount > 0
                          ? `(${courseCount} Courses)`
                          : "(No courses available)"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
