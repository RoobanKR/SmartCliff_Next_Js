"use client";
import Hirefromus from "@/components/business/hirefromus";
import Banner from "@/components/common/Banner";
import Preloader from "@/components/common/Preloader";
import FooterTwo from "@/components/layout/footers/Footer";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import React, { useRef } from "react";
import jsonData from "../../../public/assets/json/Banner.json";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import FormSection from "@/components/business/hirefromus/formSection";
import SkillsetTable3 from "@/components/business/institute/whychooseus";
import Client from "@/components/business/institute/client";

export default function page({ params }) {
  return (
    <div className="main-content">
      <Preloader />
      <HeaderTwo />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <SkillsetTable3 />
        <Client/>
        <FooterTwo />
      </div>
    </div>
  );
}
