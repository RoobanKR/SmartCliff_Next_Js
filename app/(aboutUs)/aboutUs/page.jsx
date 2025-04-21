import Preloader from "@/components/common/Preloader";
import FooterTwo from "@/components/layout/footers/Footer";
import AboutUs from "@/components/homes/about/About";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import jsonData from "../../../public/assets/json/Banner.json";
import Banner from "@/components/common/Banner";
import JoinusBanner from "@/components/homes/about/joinusBanner";
import Partners from "@/components/homes/about/partners";
import WhySmartcliff from "@/components/homes/about/whysmartcliff";
import WhyChooseUsAbout1 from "@/components/homes/about/whychooseus1";
import WhyChooseUsAbout2 from "@/components/homes/about/whychooseus2";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import ShineUI from "@/components/homes/about/shinepageui";
import MissionVision from "@/components/homes/about/missionVissionUI";
import Banner2 from "@/components/common/Banner2";

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
        {/* <WhyChooseUsAbout1 /> */}
        {/* <WhyChooseUsAbout2 /> */}
        {/* <Partners /> */}
        {/* <JoinusBanner /> */}

        <FooterTwo />
      </div>
    </>
  );
}
