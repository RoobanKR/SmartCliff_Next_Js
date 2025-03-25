"use client";
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function LearningSolutions({ matchedServiceAbouts }) {
  return (
    <section className="layout-pb-md js-mouse-move-container">
      <div className="container">
        <div className="row y-gap-30 align-items-start">
          {matchedServiceAbouts.map((item, index) => (
            <div className="col-lg-6 order-2 order-lg-1">
              <h2 className="text-25 lg:text-10 md:text-30 text-dark-1">
                {item.heading}
              </h2>
              <p className="text-dark-1 mt-10">{item.subHeading}</p>

              <div className="row y-gap-20 pt-30">
                {item.feature.map((elm, i) => (
                  <div key={i} className="col-12">
                    <div className="featureIcon -type-1 d-flex">
                      <div
                        className={`featureIcon__icon ${elm.iconBg}`}
                        style={{
                          width: "70px", // Adjust width if needed
                          height: "70px", // Adjust height if needed
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%", // Optional: if you want a circular icon
                          backgroundColor: "#f5f0ff",
                        }}
                      >
                        <Image
                          width={30}
                          height={30}
                          src={elm.icon || "/fallback-icon.jpg"}
                          alt="icon"
                        />
                      </div>
                      <div className="featureIcon__content ml-20 mt-10">
                        <h4 className="text-17 fw-500">{elm.title}</h4>
                        <p className="mt-5">
                          {elm.description.split(" ").slice(0, 5).join(" ")}{" "}
                          <br className="lg:d-none" />
                          {elm.description.split(" ").slice(5).join(" ")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="col-lg-6 order-1 order-lg-2">
            <div className="elements-image">
              {/* Main Dynamic Image */}
              {matchedServiceAbouts[0]?.images?.length > 0 && (
                <div
                  data-move="60"
                  className="elements-image__main mb-20 js-mouse-move"
                >
                  <img
                    className="js-mouse-move rounded"
                    style={{ height: "400px", width: "350px" }}
                    data-move="40"
                    src={
                      matchedServiceAbouts[0].images[0] || "/fallback-image.jpg"
                    }
                    alt="Main image"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

