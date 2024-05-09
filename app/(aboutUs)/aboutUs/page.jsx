import Preloader from "@/components/common/Preloader";
import FooterTwo from "@/components/layout/footers/Footer";
import AboutUs from "@/components/homes/about/About";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import jsonData from "../../../public/assets/json/Banner.json";
import Banner from "@/components/common/Banner";
import JoinusBanner from "@/components/homes/about/joinusBanner";
import Partners from "@/components/homes/about/partners";

export default function AboutPage() {
  return (
    <>
      <Preloader />
      <HeaderSeven />
      <div className="dashboard__content pt-0 px-15 pb-0 mt-90">
        <Banner
          title={jsonData[3].title}
          description={jsonData[3].description}
          imageUrl={jsonData[3].imageUrl}
        />
      </div>
      <div className="content-wrapper  js-content-wrapper overflow-hidden">
        <AboutUs />
        <Partners />
        <JoinusBanner />

        <FooterTwo />
      </div>
    </>
  );
}
