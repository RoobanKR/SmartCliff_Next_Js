"use client";
import React, { useEffect } from "react";
import Image from "next/image";
export default function LearningJourney({ hireFromUsData }) {
  return (
    <section className="layout-pt-sm layout-pb-sm">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle">
              <h2 className="sectionTitle__title">
                Our <span style={{ color: "#f2775e" }}>Institution</span> Training
                Models
              </h2>
              <p className="sectionTitle__text">
                Elevate your graduates to industry-ready professionals
              </p>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 justify-between pt-60 lg:pt-50">
          {hireFromUsData.map((elm, i) => (
            <div key={i} className="col-lg-3 col-md-6">
              <div className="coursesCard -type-3 text-center">
                <div className="coursesCard__icon bg-green-3">
                  <Image width={50} height={50} src={elm.image} alt="icon" />
                </div>

                <div className="coursesCard__content mt-30">
                  <h5 className="coursesCard__title text-18 lh-1 fw-500">
                    {elm.title}
                  </h5>
                  <p className="coursesCard__text text-14 mt-10">
                    {elm.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
