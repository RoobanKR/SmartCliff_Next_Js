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
      <div className="col-xl-4 col-lg-5 col-md-6 mt-25">
        <div className="footer-header__logo">
          <Image
            width={140}
            height={50}
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
          <div className={allClasses || ""}>{elm.title}</div>
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
      <div className="col-xl-4 col-lg-6 col-md-12">
        <div className="row">
          {/* Contact Section */}
          <div className="col-md-6 text-white">
            <div className={allClasses || ""}>Contact</div>
            <div className="d-flex y-gap-10 flex-column">
              <div className="d-flex align-items-center gap-2">
                <i className="lucide lucide-phone"></i>
                <span>+91 811 007 7033</span>
              </div>
              <div className="d-flex align-items-start gap-2">
                <i className="lucide lucide-map-pin"></i>
                <span>
                  2000, Krishna Colony (opp. to Central Studio), Ramanathapuram,
                  Trichy Road, Coimbatore - 641 005
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter Section - Next to Contact */}
          <div className="col-md-6">
            <div className={allClasses || ""}>Newsletter</div>
            <div className="mt-15">
              <p className="text-white">
                Subscribe to our newsletter for updates.
              </p>
              <div className="d-flex flex-column mt-10">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  style={{
                    padding: "5px",
                    width: "150%", // Increased width
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                  }}
                />
                <button
                  className="btn btn-primary mt-8"
                  style={{
                    padding: "2px 2px", // Reduced padding
                    width: "90px", // Reduced button width
                    backgroundColor: "#f2775e",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    alignSelf: "flex-start", // Align button to the left
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
