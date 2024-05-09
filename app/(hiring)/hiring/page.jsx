import Preloader from "@/components/common/Preloader";
import EventsTwo from "@/components/homes/event/Event";
import FooterTwo from "@/components/layout/footers/Footer";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import React from "react";

export default function page() {
  return (
    <div className="main-content  ">
      <Preloader />

      <HeaderSeven />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <br></br> <br></br>
        <EventsTwo />
        <FooterTwo />
      </div>
    </div>
  );
}
