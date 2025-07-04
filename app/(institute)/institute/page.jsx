"use client";
import Banner from "@/components/common/Banner";
import Preloader from "@/components/common/Preloader";
import FooterTwo from "@/components/layout/footers/Footer";
import React, { useEffect, useRef } from "react";
import jsonData from "../../../public/assets/json/Banner.json";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import FormSection from "@/components/business/hirefromus/formSection";
import SkillsetTable3 from "@/components/business/institute/whychooseus";
import Client from "@/components/business/institute/client";
import { useDispatch, useSelector } from "react-redux";
import { getAllClient } from "@/redux/slices/bussiness/client/Client";

export default function page({ params }) {
  const dispatch = useDispatch();

  const clients = useSelector((state) => state.clients.clients);

  const instituteFromUsData = clients.filter(
    (client) => client.type === "institute"
  );

  useEffect(() => {
    dispatch(getAllClient());
  }, [dispatch]);
  return (
    <div className="main-content">
      <Preloader />
      <HeaderTwo />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <SkillsetTable3 />
        {instituteFromUsData.length > 0 && (
          <Client instituteFromUsData={instituteFromUsData} />
        )}
        <FooterTwo />
      </div>
    </div>
  );
}
