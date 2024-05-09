import Preloader from "@/components/common/Preloader";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import CategoriesTwo from "@/components/homes/categories/Categories";
import FooterTwo from "@/components/layout/footers/Footer";
import Batches from "@/components/homes/batches/Batches";
import HeroTwo from "@/components/homes/heros/HeroTwo";
import Features from "@/components/homes/features/Features";
import FrequentlyAskedQuestion from "@/components/homes/faq/Faq";
import Hiring from "@/components/homes/heros/Hiring";

export default function HomePage() {
  return (
    <>
      <Preloader />
      <HeaderTwo />

      <div className="content-wrapper  js-content-wrapper overflow-hidden">
        <HeroTwo />
        <CategoriesTwo />
        <Batches />
        <Features />
        <Hiring />
        <FrequentlyAskedQuestion />
        <FooterTwo />
      </div>
    </>
  );
}
