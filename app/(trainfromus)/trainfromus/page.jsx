"use client";
import Preloader from "@/components/common/Preloader";
import FooterTwo from "@/components/layout/footers/Footer";
import React, { useEffect } from "react";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import FormSection from "@/components/business/hirefromus/formSection";
import SkillsetTable2 from "@/components/business/trainfromus/whychooseus";
import Client from "@/components/business/trainfromus/client";
import { useDispatch, useSelector } from "react-redux";
import { getAllClient } from "@/redux/slices/bussiness/client/Client";

export default function page() {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients.clients);
  const trainFromUsData = clients.filter(
    (client) => client.type === "trainfromus"
  );


  useEffect(() => {
    dispatch(getAllClient());
  }, [dispatch]);

  return (
    <div className="main-content  ">
      <Preloader />
      <HeaderTwo />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <SkillsetTable2 />
        {trainFromUsData.length > 0 && (
          <Client trainFromUsData={trainFromUsData} />
        )}
        <FooterTwo />
      </div>
    </div>
  );
}
