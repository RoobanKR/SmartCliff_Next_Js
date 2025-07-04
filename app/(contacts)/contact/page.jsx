import Banner from "@/components/common/Banner";
import Preloader from "@/components/common/Preloader";
import Contact from "@/components/contacts/Contact";
import FooterTwo from "@/components/layout/footers/Footer";
import React from "react";
import jsonData from "../../../public/assets/json/Banner.json";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";

export const metadata = {
  title: "Contact Us | SmartCliff",
  description: "Get in touch with us today.",
  openGraph: {
    title: "Contact Us | SmartCliff",
    description: "Get in touch with us today.",
    url: "https://smartcliff.in/contact",
    type: "website",
    images: [
      {
        url: "https://smartcliff.in/images/contact-preview.webp", // Replace this with your actual image URL
        width: 1200,
        height: 630,
        alt: "SmartCliff Contact Page Preview",
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

