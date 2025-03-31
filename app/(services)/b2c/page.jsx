"use client";
import React, { useState, useEffect } from "react";
import Preloader from "@/components/common/Preloader";
import {
  fetchServices,
} from "@/redux/slices/services/services/Services";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFAQs } from "@/redux/slices/faq/faq";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import B2bMainPage from "@/components/services/B2bMainPage";
import { useParams } from "next/navigation";
import FooterTwo from "@/components/layout/footers/Footer";

export default function HomeNine() {
  const dispatch = useDispatch();
  // const { slug } = useParams();
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchAllFAQs());
  }, [dispatch]);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };


  return (
    <>
      <div className="main-content homeModeChange ">
        <Preloader />
        <HeaderTwo onServiceSelect={handleServiceSelect} />
        <div style={{ marginTop: '60px' }}>
          <B2bMainPage selectedService={selectedService} />
        </div>
        <div style={{ marginTop: '60px' }}>
          <FooterTwo />
        </div>
      </div>
    </>
  );
}
