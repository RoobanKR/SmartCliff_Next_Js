import Preloader from "@/components/common/Preloader";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import FooterTwo from "@/components/layout/footers/Footer";
import HeroTwo from "@/components/homes/heros/HeroTwo";
import FrequentlyAskedQuestion from "@/components/homes/faq/Faq";
import Hiring from "@/components/homes/heros/Hiring";
import TestimonialsEight from "@/components/common/testimonial8";
import ExecutionOvervirewHome from "@/components/homes/heros/executionOverview";
import CategoriesHomeOne from "@/components/homes/heros/serviceOverview";
import WhySmartcliff from "@/components/homes/about/whysmartcliff";
import ExecutiveOverview2 from "@/components/homes/heros/executionOverview2";

export default function HomePage() {
  return (
    <>
      <Preloader />
      <HeaderTwo />
      <div className="content-wrapper  js-content-wrapper overflow-hidden">
        <HeroTwo />
        <ExecutionOvervirewHome />
        <ExecutiveOverview2 />
        <WhySmartcliff />
        <CategoriesHomeOne />
        <TestimonialsEight />
        <Hiring />
        <FrequentlyAskedQuestion />
        <FooterTwo />
      </div>
    </>
  );
}
