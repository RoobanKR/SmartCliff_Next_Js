import Banner from "@/components/common/Banner";
import Preloader from "@/components/common/Preloader";
import FooterTwo from "@/components/layout/footers/Footer";
import React from "react";
import jsonData from "../../../public/assets/json/Banner.json";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import History from "@/components/history/history";

export default function page() {
  return (
    <div className="main-content  ">
      <Preloader />
      <HeaderTwo />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <div className="banner__content mt-60">
          <Banner
            title={jsonData[13].title}
            description={jsonData[13].description}
            imageUrl={jsonData[11].imageUrl}
          />
        </div>

        <History />
        <FooterTwo />
      </div>
    </div>
  );
}
