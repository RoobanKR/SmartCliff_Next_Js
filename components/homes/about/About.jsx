"use client"
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { featureOne } from "../../../data/features";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllAboutUs } from "@/redux/slices/aboutUs/aboutUs";

export default function AboutUs() {

  const dispatch = useDispatch();

  const allss = useSelector((state) => state.aboutUs.aboutUsItems);

  useEffect(() => {
    dispatch(getAllAboutUs());
  }, [dispatch]);


  return (
    <section className="layout-pt-xs layout-pb-sm">
      {allss.map((elm, i) => (
        <div className="container">
          <div className="row y-gap-30 items-center">
            <div className="col-xl-6 col-lg-6 order-lg-1">
              <div className="about-content">
                {/* <h2
                  className="about-content__title customSized"
                  data-aos="fade-up"
                >
                  <span style={{ color: "#f2775e" }}>About</span> Us
                </h2> */}
                <p
                  className="about-content__text"
                  // data-aos="fade-up"
                  style={{ textAlign: "justify" }}
                >
                  {elm.title}
                </p>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 order-lg-2">
              <div className="about-image">
                <img
                  src={elm.image}
                  alt="image"
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
            </div>

          </div>
        </div>
      ))}
    </section>
  );
}
