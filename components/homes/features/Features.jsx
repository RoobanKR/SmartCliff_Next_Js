"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { featureOne } from "../../../data/features";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllWCU } from "@/redux/slices/whyThis/whyThis";
export default function Features() {
  const dispatch = useDispatch();
  const all = useSelector((state) => state.wcu.wcuItems);

  useEffect(() => {
    dispatch(getAllWCU());
  }, [dispatch]);

  return (
    <section className="layout-pt-sm layout-pb-sm bg-white-1">
      <div className="container">
        <div className="row y-gap-30 justify-between items-center">
          <div className="col-xl-7 col-lg-6 col-md-10 order-2 order-lg-1">
            <div className="about-content">
              <h4
                className="about-content__title customSized"
                data-aos="fade-up"
              >
                <p
                  style={{
                    color: "#f2775e",
                    fontSize: "40px",
                    paddingBottom: "20px",
                  }}
                >
                  Why Choose Us
                </p>
                <p style={{ color: "black", fontSize: "30px" }}>
                  Because Excellence is <br /> Our Standard.
                </p>
              </h4>
              <p className="about-content__text" data-aos="fade-up">
                Use the list below to bring attention to your product’s key
                <br /> differentiator.
              </p>
              <div
                style={{
                  paddingTop: "30px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {all.map((elm, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                    data-aos="fade-up"
                  >
                    <div style={{ flexShrink: 0 }}>
                      <img
                        src={elm.icon}
                        alt={elm.name}
                        style={{
                          width: "35px",
                          height: "35px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div style={{ fontSize: "16px" }}>{elm.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="col-xl-5 col-lg-6 order-1 order-lg-2"
            data-aos="fade-up"
          >
            <div className="about-image">
              <Image
                width={750}
                height={850}
                style={{ height: "100%", width: "100%" }}
                src="/assets/img/home-4/masthead/van.jpg"
                alt="image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
