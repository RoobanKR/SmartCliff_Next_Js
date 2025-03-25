import Preloader from "@/components/common/Preloader";
import FooterTwo from "@/components/layout/footers/Footer";
import React from "react";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import HeroSection from "@/components/business/trainfromus/home";
import Whychooseuus from "@/components/business/trainfromus/whychooseus";
import HiringCategories from "@/components/business/trainfromus/category";
import HowItWorks from "@/components/business/trainfromus/howitworks";
import FrequentlyAskedQuestion from "@/components/homes/faq/Faq";
import Client from "@/components/business/trainfromus/client";

export default function page({ params }) {
  return (
    <div className="main-content  ">
      <Preloader />
      <HeaderTwo />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <div className="mt-60">
      
          <HeroSection />
        </div>
        <Whychooseuus />
        <HiringCategories />
        <HowItWorks />
                <Client />
        
        <FrequentlyAskedQuestion />
        <FooterTwo />
      </div>
    </div>
  );
}
