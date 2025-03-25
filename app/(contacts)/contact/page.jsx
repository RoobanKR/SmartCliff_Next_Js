import Banner from "@/components/common/Banner";
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import Contact from "@/components/contacts/Contact";
import FooterTwo from "@/components/layout/footers/Footer";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import React from "react";
import jsonData from "../../../public/assets/json/Banner.json";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import Banner2 from "@/components/common/Banner2";

export default function page() {
  return (
    <div className="main-content  ">
      <Preloader />
      <HeaderTwo />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <div className="banner__content mt-60">
          <Banner
            title={jsonData[7].title}
            description={jsonData[7].description}
            imageUrl={jsonData[7].imageUrl}
          />
        </div>

        <Contact />

        <FooterTwo />
      </div>
    </div>
  );
}
