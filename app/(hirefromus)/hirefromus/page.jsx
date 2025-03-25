"use client";
import Hirefromus from "@/components/business/hirefromus";
import Banner from "@/components/common/Banner";
import Preloader from "@/components/common/Preloader";
import FooterTwo from "@/components/layout/footers/Footer";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import React from "react";
import jsonData from "../../../public/assets/json/Banner.json";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import HeroSection from "@/components/business/hirefromus/home";
import Whychooseuus from "@/components/business/hirefromus/whychooseus";
import HiringCategories from "@/components/business/hirefromus/category";
import HowItWorks from "@/components/business/hirefromus/howitworks";
import FrequentlyAskedQuestion from "@/components/homes/faq/Faq";

export default function page({ params }) {
  return (
    <div className="main-content">
      <Preloader />
      <HeaderTwo />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <div className="mt-60">
          <HeroSection />
        </div>
        <Whychooseuus />
        <HiringCategories />
        <HowItWorks />
        <FrequentlyAskedQuestion />
        <FooterTwo />
      </div>

      {/* Start Hiring Button - Vertical with Tilted Letters */}
      <div
        style={{
          position: "fixed",
          right: "10px", // Stick to the right edge with small padding
          top: "50%", // Center vertically
          transform: "translateY(-50%)", // Adjust position
          zIndex: 999,
        }}
      >
        <button
          onClick={() => alert("Start Hiring Clicked!")}
          style={{
            backgroundColor: "#F2775E",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "6px 10px",
            fontSize: "12px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            transition: "0.3s ease-in-out",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#e8543e")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#F2775E")
          }
        >
          {"HIRING"
            .split("")
            .reverse()
            .map((letter, index) => (
              <span
                key={`start-${index}`}
                style={{
                  display: "inline-block",
                  transform: "rotate(270deg)",
                  fontSize: "12px",
                  fontWeight: "bold",
                  lineHeight: "12px",
                }}
              >
                {letter}
              </span>
            ))}
          <span style={{ height: "6px" }} />{" "}
          {/* Adds gap between "START" & "HIRING" */}
          {"START"
            .split("")
            .reverse()
            .map((letter, index) => (
              <span
                key={`hiring-${index}`}
                style={{
                  display: "inline-block",
                  transform: "rotate(270deg)",
                  fontSize: "12px",
                  fontWeight: "bold",
                  lineHeight: "12px",
                }}
              >
                {letter}
              </span>
            ))}
        </button>
      </div>
    </div>
  );
}
