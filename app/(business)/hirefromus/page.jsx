import Hirefromus from "@/components/business/hirefromus";
import Banner from "@/components/common/Banner";
import Preloader from "@/components/common/Preloader";
import FooterTwo from "@/components/layout/footers/Footer";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import React from "react";
import jsonData from "../../../public/assets/json/Banner.json";

export default function page({ params }) {
  return (
    <div className="main-content  ">
      <Preloader />
      <HeaderSeven />
      <div className="content-wrapper  js-content-wrapper mt-90">
        <Banner
          title={jsonData[4].title}
          description={jsonData[4].description}
          imageUrl={jsonData[4].imageUrl}
        />
        <Hirefromus id={params.id} />
        <FooterTwo />
      </div>
    </div>
  );
}
