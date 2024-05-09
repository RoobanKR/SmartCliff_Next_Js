"use client";
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import CourseList from "@/components/courseList/CourseList";

import FooterTwo from "@/components/layout/footers/Footer";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import React, { useState } from "react";
import jsonData from "../../../public/assets/json/Banner.json";
import Banner from "@/components/common/Banner";

export default function page() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { title, description } = jsonData || {};

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
  };
  return (
    <div className="main-content  ">
      <Preloader />
      <HeaderSeven />
      <div style={{ marginTop: "100px" }}>
        <Banner
          title={jsonData[1].title}
          description={jsonData[1].description}
          imageUrl={jsonData[1].imageUrl}
        />
        <div className="content-wrapper  js-content-wrapper overflow-hidden">
          <CourseList selectedCategory={selectedCategory} />
          <FooterTwo />
        </div>
      </div>
    </div>
  );
}
