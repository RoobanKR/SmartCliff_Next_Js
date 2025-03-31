 
"use client";
import React, { useState } from "react";
import { footerLinks } from "../../../data/footerLinks";
import Link from "next/link";
import Socials from "@/components/common/Socials";
import Image from "next/image";
 
export default function FooterLinks({ allClasses }) {
  return (
    <div className="row">
      {/* Logo & Socials - Displayed First */}
      <div className="col-xl-2 col-lg-5 col-md-6 mt-25">
        <div className="footer-header__logo">
          <Image
            width={160}
            height={70}
            src="/assets/img/general/logo1.png"
            alt="logo"
          />
        </div>
 
        <div className="footer-header-socials mt-30">
          <div className="footer-header-socials__list text-white d-flex items-center">
            <Socials
              componentsClass={"size-40 d-flex justify-center items-center "}
            />
          </div>
        </div>
      </div>
 
      {/* Footer Links */}
      {footerLinks.map((elm, i) => (
        <div key={i} className="col-xl-2 col-lg-4 col-md-6">
          <div
            className={allClasses || ""}
            style={{
              borderBottom: "2px solid white", // Set the underline style
              paddingBottom: "3px", // Add space between the title and the underline
              marginBottom: "10px", // Optional: add some space below the title
              width: "130px",
            }}
          >
            {elm.title}
          </div>
          <div className="d-flex y-gap-10 text-white flex-column">
            {elm.links.map((itm, index) => (
              <Link
                key={index}
                href={itm.href}
                style={{
                  textDecoration: "none",
                  padding: "5px 0",
                  display: "block",
                  transition: "color 0.3s ease",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#0056b3")}
                onMouseOut={(e) => (e.currentTarget.style.color = "black")}
              >
                {itm.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
 
      {/* Contact & Newsletter Section */}
      <div className="col-xl-6 col-lg-8 col-md-12">
        <div className="row">
          {/* Contact Section */}
          {/* Contact Section */}
          <div className="col-md-4">
            <div
              className={allClasses || ""}
              style={{
                borderBottom: "2px solid white",
                paddingBottom: "3px",
                marginBottom: "10px",
                width: "130px",
              }}
            >
              Business
            </div>
            <div className="mt-15">
              <Link
                href="/hirefromus"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <span style={{ color: "white" }}>Hire From Us</span>
              </Link>
              <div className="d-flex flex-column mt-10">
                <Link
                  href="/trainfromus"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  <span style={{ color: "white" }}>Train From Us</span>
                </Link>
              </div>
              <div className="d-flex flex-column mt-10">
                <Link
                  href="/institute"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <span style={{ color: "white" }}>Institute</span>
 
                </Link>
              </div>
            </div>
          </div>
 
          <div className="col-md-8 text-white">
            <div
              className={allClasses || ""}
              style={{
                borderBottom: "2px solid white",
                paddingBottom: "3px",
                marginBottom: "10px",
                width: "130px",
              }}
            >
              Contact
            </div>
            <div className="d-flex y-gap-10 flex-column">
              <div className="d-flex align-items-center gap-2">
                <i className="lucide lucide-phone"></i>
                <span>+91 811 007 7033</span>
              </div>
              <div className="d-flex align-items-start gap-2">
                <i className="lucide lucide-map-pin"></i>
                <span>
                SMARTCLIFF LEARNING SOLUTIONS LLP 2nd Floor, 103-107 ThiruVenkata swamy St, RS Puram,CBE-641002                </span>
              </div>
            </div>
          </div>
 
          {/* Newsletter Section - Next to Contact */}
        </div>
      </div>
    </div>
  );
}
 
 
 