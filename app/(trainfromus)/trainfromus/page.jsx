import Preloader from "@/components/common/Preloader";
import FooterTwo from "@/components/layout/footers/Footer";
import React from "react";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import FormSection from "@/components/business/hirefromus/formSection";
import SkillsetTable2 from "@/components/business/trainfromus/whychooseus";
import Client from "@/components/business/trainfromus/client";

export default function page() {
  return (
    <div className="main-content  ">
      <Preloader />
      <HeaderTwo />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <SkillsetTable2 />
        <Client/>
        <FooterTwo />
      </div>
    </div>
  );
}
