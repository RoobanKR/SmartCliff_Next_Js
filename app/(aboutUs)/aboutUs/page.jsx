import Preloader from "@/components/common/Preloader";
import FooterTwo from "@/components/layout/footers/Footer";
import AboutUs from "@/components/homes/about/About";
import jsonData from "../../../public/assets/json/Banner.json";
import Banner from "@/components/common/Banner";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import ShineUI from "@/components/homes/about/shinepageui";
import MissionVision from "@/components/homes/about/missionVissionUI";

export const metadata = {
  title: "About Us | SmartCliff",
  description: "Empowering careers, connecting opportunities.",
  openGraph: {
    title: "About Us | SmartCliff",
    description: "Empowering careers, connecting opportunities.",
    url: "https://smartcliff.in/aboutUs",
    type: "website",
    images: [
      {
        url: "https://smartcliff.in/images/about-preview.webp", // Replace with actual image URL
        width: 1200,
        height: 630,
        alt: "SmartCliff About Us Preview",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <Preloader />
      <HeaderTwo />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <div className="banner__content mt-80">
          {jsonData[3] && (
            <Banner
              title={jsonData[3].title}
              description={jsonData[3].description}
              imageUrl={jsonData[3].imageUrl}
            />
          )}
        </div>
        <AboutUs />
        <MissionVision />
        <ShineUI />
        <FooterTwo />
      </div>
    </>
  );
}

