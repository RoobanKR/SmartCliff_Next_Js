import Preloader from "@/components/common/Preloader";
import FooterTwo from "@/components/layout/footers/Footer";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import jsonData from "../../../public/assets/json/Banner.json";
import Banner from "@/components/common/Banner";
import Reviews from "@/components/reviews/Reviews";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";

export default function AboutPage() {
  return (
    <>
      <Preloader />
      <HeaderTwo />
      {/* <div className="content-wrapper js-content-wrapper overflow-hidden"> */}
      {/* <div className=" pt-0 px-15 pb-0  mt-60" style={{ backgroundColor: "#eef3f7" }}> */}
      <div
        className="content-wrapper js-content-wrapper overflow-hidden"
        style={{ backgroundColor: "#eef3f7" }}
      >
        <div
          className="banner__content mt-60"
          style={{ backgroundColor: "#eef3f7" }}
        >
          <Banner
            title={jsonData[9].title}
            description={jsonData[9].description}
            imageUrl={jsonData[9].imageUrl}
          />
        </div>
        <Reviews />
        <FooterTwo />
      </div>
    </>
  );
}
