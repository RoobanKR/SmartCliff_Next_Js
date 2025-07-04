import Banner from "@/components/common/Banner";
import Preloader from "@/components/common/Preloader";
import FooterTwo from "@/components/layout/footers/Footer";
import React from "react";
import jsonData from "../../../public/assets/json/Banner.json";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import CareerSlideOne from "@/components/career/careerslide1";

export const metadata = {
  title: "Career | SmartCliff",
  description: "Discover In-Demand Careers Today!",
  openGraph: {
    title: "Career | SmartCliff",
    description: "Discover In-Demand Careers Today!",
    url: "https://smartcliff.in/career",
    type: "website",
    images: [
      {
        url: "https://smartcliff.in/images/career-preview.webp", // Replace with an actual preview image URL if available
        width: 1200,
        height: 630,
        alt: "SmartCliff Career Preview",
      },
    ],
  },
};

export default function page() {
  return (
    <div className="main-content">
      <Preloader />
      <HeaderTwo />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <div className="banner__content mt-80">
          <Banner
            title={jsonData[8].title}
            description={jsonData[8].description}
            imageUrl={jsonData[8].imageUrl}
          />
        </div>

        <CareerSlideOne />
        <FooterTwo />
      </div>
    </div>
  );
}

