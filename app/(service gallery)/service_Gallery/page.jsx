"use client";
import FooterTwo from "@/components/layout/footers/Footer";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import AllGalleryList from "@/components/serviceList/Allgallery";
import React from "react";

export default function page() {
  return (
    <div className="main-content  ">
      <HeaderTwo />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <AllGalleryList />

        <FooterTwo />
      </div>
    </div>
  );
}
