"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourses, selectCourses } from "@/redux/slices/course/course";
import { useRouter } from "next/navigation";
import {
  fetchCategories,
  selectCategories,
} from "@/redux/slices/category/category";

export default function CategoriesTwo() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    router.push(`/courses`);
  };
  return (
    <section
      className="layout-pt-md layout-pb-md"
      style={{ background: "#FFF0EE" }}
    >
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle">
              <h2
                className="sectionTitle__title"
                style={{ fontFamily: "Serif" }}
              >
                Top Categories
              </h2>
              <p className="sectionTitle__text" style={{ fontFamily: "Serif" }}>
                Expand your knowledge with informative resources and educational
                content
              </p>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 pt-50">
          {categories.map((category, i) => (
            <div className="col-lg-4 col-md-6" key={i}>
              <div
                onClick={() => handleCategoryClick(category.category_name)}
                className="linkCustomTwo"
              >
                <div className="categoryCard -type-1">
                  <div
                    className="categoryCard__image"
                    style={{ position: "relative" }}
                  >
                    {category.image && category.image.length > 0 ? (
                      <div
                        className="bg-image ratio ratio-30:16 js-lazy"
                        style={{
                          backgroundImage: `url(${category.image})`,
                          // filter: "blur(10px)",
                        }}
                      ></div>
                    ) : (
                      <div
                        className="bg-image ratio ratio-30:16"
                        style={{
                          backgroundImage: `url('/fallback-image.jpg')`,
                        }}
                      ></div>
                    )}
                    <div
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        background: "rgba(0, 0, 0, 0.5)",
                        zIndex: "1",
                      }}
                    ></div>
                  </div>

                  <div className="categoryCard__content text-center">
                    <h4
                      className="categoryCard__title text-20 lh-15 fw-500 text-white"
                      style={{ fontFamily: "Serif" }}
                    >
                      {category?.category_name}
                    </h4>
                    <div
                      className="categoryCard__subtitle text-16 text-white lh-1 mt-5 p-2"
                      style={{ fontFamily: "Serif" }}
                    >
                      {category?.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
