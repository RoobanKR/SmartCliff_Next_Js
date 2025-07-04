import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import CourseDetailsSix from "@/components/courseSingle/CourseDetails";
import CourseSlider from "@/components/courseSingle/CourseSlider";
import FooterTwo from "@/components/layout/footers/Footer";

import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import React from "react";

export default function page({ params }) {
  <Preloader />;
  return (
    <div className="main-content  ">
      <HeaderTwo />
      <div className="content-wrapper  js-content-wrapper overflow-hidden">
        {/* <PageLinks/> */}
        <CourseDetailsSix id={params.id} />
        <CourseSlider />
        <FooterTwo />
      </div>
    </div>
  );
}
