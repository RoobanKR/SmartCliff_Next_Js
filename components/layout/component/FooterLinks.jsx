"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Socials from "@/components/common/Socials";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFooterData,
  selectFooterStatus,
  fetchFooterData,
} from "@/redux/slices/footer/footer";

export default function FooterLinks({ allClasses }) {
  const dispatch = useDispatch();
  const footerData = useSelector(selectFooterData);
  const status = useSelector(selectFooterStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchFooterData());
    }
  }, [dispatch, status]);

  // Show loading or nothing while fetching
  if (status === "loading" || !footerData) return null; // or a loading spinner

  const { logo, socials, quickLinks, support, business, contact } = footerData;

  return (
    <div className="row">
      {/* Logo & Socials */}
      <div className="col-xl-2 col-lg-5 col-md-6 mt-25">
        <div className="footer-header__logo">
          <Image width={160} height={70} src={logo} alt="logo" />
        </div>

        <div className="footer-header-socials mt-30">
          <div className="footer-header-socials__list text-white d-flex items-center">
            <Socials
              componentsClass="size-40 d-flex justify-center items-center"
              socials={socials}
            />
          </div>
        </div>
      </div>

      {/* Quick Links & Support */}
      {[...(quickLinks || []), ...(support || [])].map((section, i) => (
        <div key={i} className="col-xl-2 col-lg-4 col-md-6">
          <div
            className={allClasses || ""}
            style={{
              borderBottom: "2px solid white",
              paddingBottom: "3px",
              marginBottom: "10px",
              width: "130px",
            }}
          >
            {section.title}
          </div>
          <div className="d-flex y-gap-10 text-white flex-column">
            {section.links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                style={{
                  textDecoration: "none",
                  padding: "5px 0",
                  display: "block",
                  transition: "color 0.3s ease",
                  color: "white",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#0056b3")}
                onMouseOut={(e) => (e.currentTarget.style.color = "white")}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* Business Section */}
      <div className="col-xl-2 col-lg-4 col-md-12">
        <div
          className={allClasses || ""}
          style={{
            borderBottom: "2px solid white",
            paddingBottom: "3px",
            marginBottom: "10px",
            width: "130px",
          }}
        >
          {business.title}
        </div>
        <div style={{ marginTop: "15px" }}>
          {business.sections.map((section, i) => (
            <div key={i} style={{ marginBottom: "15px" }}>
              <div
                style={{
                  fontWeight: "bold",
                  color: "white",
                  width: "150px",
                }}
              >
                {section.title}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "10px",
                  paddingLeft: "20px",
                }}
              >
                {section.links.map((link, j) => (
                  <Link
                    key={j}
                    href={link.href}
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      marginBottom: "5px",
                    }}
                  >
                    <span style={{ color: "white" }}> - {link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="col-md-8 col-lg-4 text-white">
        <div
          className={allClasses || ""}
          style={{
            borderBottom: "2px solid white",
            paddingBottom: "3px",
            marginBottom: "10px",
            width: "130px",
          }}
        >
          {contact.title}
        </div>
        <div className="d-flex y-gap-10 flex-column">
          <div className="d-flex align-items-center gap-2">
            <i className="lucide lucide-phone"></i>
            <span>{contact.phone}</span>
          </div>
          <div className="d-flex align-items-start gap-2">
            <i className="lucide lucide-map-pin"></i>
            <span>{contact.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
