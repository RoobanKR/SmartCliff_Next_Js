import Preloader from "@/components/common/Preloader";
import FooterTwo from "@/components/layout/footers/Footer";
import jsonData from "../../../public/assets/json/Banner.json";
import Banner from "@/components/common/Banner";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import PrivacyPolicy from "@/components/common/privacy-policy";

export default function AboutPage() {
  return (
    <>
      <Preloader />
      <HeaderTwo />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <div className="banner__content mt-60">
          {jsonData[3] && (
            <Banner
              title={jsonData[15].title}
              description={jsonData[15].description}
              imageUrl={jsonData[15].imageUrl}
            />
          )}
        </div>
        <PrivacyPolicy />
        <FooterTwo />
      </div>
    </>
  );
}
