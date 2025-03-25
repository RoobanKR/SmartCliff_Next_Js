"use client";
import PageLinksTwo from "@/components/common/PageLinksTwo";
import Preloader from "@/components/common/Preloader";
import FooterTwo from "@/components/layout/footers/Footer";
import Header from "@/components/layout/headers/Header";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import AllGalleryList from "@/components/serviceList/allgallery";
import GalleryList from "@/components/serviceList/GalleryList";
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
