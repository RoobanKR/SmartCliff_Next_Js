"use client";

import React from "react";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import FooterTwo from "@/components/layout/footers/Footer";
import Banner from "@/components/common/Banner";
import jsonData from "../../../public/assets/json/Banner.json";
import Partnerships from "@/components/business/TrustedComapnies";
import InstitutServices from "@/components/business/InstituteService";
import InstituteAddForm from "@/components/business/InstituteAddForm";
import Instituteabout1 from "@/components/business/Instituteabout1";

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
        <Instituteabout1 />
        <InstitutServices />
        <Partnerships />
        <FooterTwo />
      </div>
    </>
  );
}
