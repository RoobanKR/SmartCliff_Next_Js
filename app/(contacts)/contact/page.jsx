import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import Contact from "@/components/contacts/Contact";
import FooterTwo from "@/components/layout/footers/Footer";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import React from "react";

export default function page() {
  return (
    <div className="main-content  ">
      <Preloader />

      <HeaderSeven />
      <div className="content-wrapper js-content-wrapper overflow-hidden pt-5">
        <Contact />

        <FooterTwo />
      </div>
    </div>
  );
}
