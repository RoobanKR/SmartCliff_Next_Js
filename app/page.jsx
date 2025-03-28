import Preloader from "@/components/common/Preloader";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import CategoriesTwo from "@/components/homes/categories/Categories";
import FooterTwo from "@/components/layout/footers/Footer";
import Batches from "@/components/homes/batches/Batches";
import HeroTwo from "@/components/homes/heros/HeroTwo";
import Features from "@/components/homes/features/Features";
import FrequentlyAskedQuestion from "@/components/homes/faq/Faq";
import Hiring from "@/components/homes/heros/Hiring";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import Teachers from "@/components/homes/Teacher/teacher";
import TestimonialsEight from "@/components/common/testimonial8";
import CourseCategories from "@/components/common/courseCategories";
import ExecutionOvervirewHome from "@/components/homes/heros/executionOverview";
import CardGrid from "@/components/homes/heros/serviceOverview";
import CategoriesHomeOne from "@/components/homes/heros/serviceOverview";
import GalleryList from "@/components/serviceList/GalleryList";
import ExecutiveOverview2 from "@/components/homes/heros/executionOverview2";
import BottomBanner from "@/components/homes/heros/bottomBanner";
import WhySmartcliff from "@/components/homes/about/whysmartcliff";

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
