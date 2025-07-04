"use client";
import Preloader from "@/components/common/Preloader";
import FooterTwo from "@/components/layout/footers/Footer";
import React, { useEffect, useRef } from "react";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import Whychooseuus from "@/components/business/hirefromus/whychooseus";
import FormSection from "@/components/business/hirefromus/formSection";
import Client from "@/components/business/hirefromus/client";
import { useDispatch, useSelector } from "react-redux";
import { getAllClient } from "@/redux/slices/bussiness/client/Client";


export default function page({ params }) {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients.clients);
  const trainFromUsData = clients.filter(client => client.type === "hirefromus");

  useEffect(() => {
    dispatch(getAllClient());
  }, [dispatch]);

  return (
    <div className="main-content">
      <Preloader />
      <HeaderTwo />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <Whychooseuus />
        <FormSection />
        {trainFromUsData.length > 0 && (
          <Client trainFromUsData={trainFromUsData} />
        )}
        <FooterTwo />
      </div>
    </div>
  );
}
