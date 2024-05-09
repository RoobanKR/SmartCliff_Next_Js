import Banner from "@/components/common/Banner";
import Preloader from "@/components/common/Preloader";
import FooterTwo from "@/components/layout/footers/Footer";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import React from "react";
import jsonData from "../../../public/assets/json/Banner.json";
import Trainfromus from "@/components/business/trainfromus";

export default function page({ params }) {
  return (
    <div className="main-content  ">
      <Preloader />
      <HeaderSeven />
      <div className="content-wrapper  js-content-wrapper mt-90">
        <Banner
          title={jsonData[5].title}
          description={jsonData[5].description}
          imageUrl={jsonData[5].imageUrl}
        />
        <Trainfromus id={params.id} />
        <FooterTwo />
      </div>
    </div>
  );
}
