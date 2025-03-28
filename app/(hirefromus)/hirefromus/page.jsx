"use client";
import Hirefromus from "@/components/business/hirefromus";
import Banner from "@/components/common/Banner";
import Preloader from "@/components/common/Preloader";
import FooterTwo from "@/components/layout/footers/Footer";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import React, { useRef } from "react";
import jsonData from "../../../public/assets/json/Banner.json";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import HeroSection from "@/components/business/hirefromus/home";
import Whychooseuus from "@/components/business/hirefromus/whychooseus";
import HiringCategories from "@/components/business/hirefromus/category";
import HowItWorks from "@/components/business/hirefromus/howitworks";
import FrequentlyAskedQuestion from "@/components/homes/faq/Faq";
import FormSection from "@/components/business/hirefromus/formSection";

export default function page({ params }) {
  return (
    <div className="main-content">
      <Preloader />
      <HeaderTwo />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <Whychooseuus />
        <FormSection />
        <FrequentlyAskedQuestion />
        <FooterTwo />
      </div>
    </div>
  );
}
