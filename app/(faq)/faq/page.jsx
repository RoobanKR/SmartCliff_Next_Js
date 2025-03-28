import Preloader from "@/components/common/Preloader";
import FooterTwo from "@/components/layout/footers/Footer";
import jsonData from "../../../public/assets/json/Banner.json";
import Banner from "@/components/common/Banner";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import FAQComponent from "@/components/homes/faq/Faq";

export default function FaqPage() {
  return (
    <>
      <Preloader />
      <HeaderTwo />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <div className="banner__content mt-60">
          {jsonData[14] && (
            <Banner
              title={jsonData[14].title}
              description={jsonData[14].description}
              imageUrl={jsonData[14].imageUrl}
            />
          )}
        </div>
        <FAQComponent />
      

        <FooterTwo />
      </div>
    </>
  );
}
