"use client";

import React from "react";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import FooterTwo from "@/components/layout/footers/Footer";
import Banner from "@/components/common/Banner";
import jsonData from "../../../public/assets/json/Banner.json";
import InstituteAddForm from "@/components/business/InstituteAddForm";
import KeyElements from "@/components/business/KeyElements";
import InstituteTestimonial from "@/components/business/InstituteTestimonial";

export default function page() {
  return (
    <>
      <HeaderSeven />
      <div className="content-wrapper  js-content-wrapper mt-90">
        <Banner
          title={jsonData[6].title}
          description={jsonData[6].description}
          imageUrl={jsonData[6].imageUrl}
        />
      </div>
      <div className="main-content overflow-hidden   ">
        <InstituteAddForm />
        <KeyElements />
        <div className="content-wrapper  js-content-wrapper overflow-hidden">
          <InstituteTestimonial />
        </div>
        <FooterTwo />
      </div>
    </>
  );
}
