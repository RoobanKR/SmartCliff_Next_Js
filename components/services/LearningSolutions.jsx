"use client";
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect } from "react";

export default function LearningSolutions({ matchedServiceAbouts }) {
  return (
    <section className="layout-pb-md js-mouse-move-container">
      <div className="container">
        <div className="row y-gap-30 align-items-center">
          {matchedServiceAbouts.map((item, index) => (
            <div key={index} className="col-lg-6 order-2 order-lg-1">
              <h2 className="text-25 lg:text-10 md:text-30 text-dark-1">
                {item.heading}
              </h2>
              <p className="text-dark-1 mt-10" style={{ textAlign: "justify" }}>{item.subHeading}</p>
              <div className="row y-gap-20 pt-30">
                {item.feature.map((elm, i) => (
                  <div key={i} className="col-12">
                    <div className="featureIcon -type-1 d-flex align-items-center">
                      <div
                        className={`featureIcon__icon ${elm.iconBg}`}
                        style={{
                          width: "70px",
                          height: "70px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          backgroundColor: "#f5f0ff",
                          flexShrink: 0
                        }}
                      >
                        <Image
                          width={30}
                          height={30}
                          src={elm.icon || "/fallback-icon.jpg"}
                          alt="icon"
                        />
                      </div>
                      <div className="featureIcon__content ml-20">
                        <h4 className="text-17 fw-500">{elm.title}</h4>
                        <p className="mt-2">
                          {Array.isArray(elm.description) ? (
                            elm.description.map((desc, index) => (
                              <span key={index}>
                                {desc}
                                {index < elm.description.length - 1 && <br />}
                              </span>
                            ))
                          ) : (
                            <span>{elm.description}</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="col-lg-6 order-1 order-lg-2 d-flex justify-content-center align-items-center">
            <div className="elements-image">
              {/* Main Dynamic Image */}
              {matchedServiceAbouts[0]?.images?.length > 0 && (
                <div
                  data-move="60"
                  className="elements-image__main js-mouse-move"
                >
                  <img
                    className="js-mouse-move rounded responsive-image"
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
