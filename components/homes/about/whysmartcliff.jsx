"use client";
import { learningPathSix } from "@/data/learningPaths";
import { getAllAboutUs } from "@/redux/slices/aboutUs/aboutUs";
import { getAllWCU } from "@/redux/slices/whyThis/whyThis";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function WhySmartcliff() {
  const dispatch = useDispatch();
  const all = useSelector((state) => state.wcu.wcuItems);
  useEffect(() => {
    dispatch(getAllWCU());
  }, [dispatch]);

  return (
    <section className="layout-pt-sm layout-pb-md">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">
                Why <span style={{ color: "#f2775e" }}>Smartcliff</span>
                {""} ?
              </h2>

              <p className="sectionTitle__text ">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod.
              </p>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 justify-between pt-20 lg:pt-30">
          {all.map((elm, i) => (
            <div key={i} className="col-lg-4 col-md-6">
              <div className="coursesCard -type-3 px-0 text-center">
                <div className="">
                  {/* <i className={elm.iconClass}></i> */}
                  <img
                    src={elm.icon}
                    alt={elm.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="coursesCard__content mt-30">
                  <h5 className="coursesCard__title text-18 lh-1 fw-500">
                    {elm.title}
                  </h5>
                  <p
  className="coursesCard__text text-14 mt-10"
  style={{ textAlign: "justify" }}
>
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
