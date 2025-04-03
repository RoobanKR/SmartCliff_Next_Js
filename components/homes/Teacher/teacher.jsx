"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { teachers, marketingCoordinator } from "../../../data/instractors";
import { teachingFeatures } from "../../../data/features";
import Link from "next/link";
import { selectBusinessServices } from "@/redux/slices/services/services/businessServices";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { getAllHomeServicesCount } from "@/redux/slices/home/homeService/homeService";
import { getAllWCU } from "@/redux/slices/whyThis/whyThis";
export default function Teachers() {
  const dispatch = useDispatch();

  const servicesBusiness = useSelector(selectBusinessServices);

  const aboutService = useSelector((state) => state.homeServices.homeServices);
  const all = useSelector((state) => state.wcu.wcuItems);

  useEffect(() => {
    dispatch(getAllHomeServicesCount());
    dispatch(getAllWCU());
  }, [dispatch]);

  return (
    <>
      <section className="section-bg layout-pt-sm layout-pb-xs bg-light-4">
        <div className="section-bg__item -full">
          <div
            className="bg-image js-lazy"
            style={{ backgroundImage: "url(/assets/img/home-6/svg/bg.png)" }}
          ></div>
        </div>

        <div className="container">
          <div className="row y-gap-30 justify-between items-center">
            <div className="col-xl-6 col-lg-7">
              <div className="composition -type-2">
                <div className="-el-1">
                  <div className="bg-white rounded-8 px-40 py-40">
                    <div className="text-18 text-dark-1 lh-11 fw-500">
                      <span className="text-purple-1">Smartcliff</span> Services{" "}
                    </div>

                    <div className="y-gap-20 pt-25">
                      {servicesBusiness.map((elm, i) => (
                        <div key={i} className="d-flex items-center">
                          <Image
                            width={45}
                            height={45}
                            src={elm.image}
                            alt="image"
                          />
                          <div className="ml-20">
                            <div className="text-15 text-dark-1 lh-11 fw-500">
                              {elm.title}
                            </div>
                            <div className="text-13 lh-1 mt-5">
                              ({elm.name})
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="-el-2">
                  <div className="bg-white rounded-8">
                    <Image
                      width={300}
                      height={300}
                      className="w-1/1"
                      src={marketingCoordinator.imgSrc}
                      alt="image"
                    />
                    <div className="px-20 py-20">
                      <div className="text-17 fw-500 text-dark-1">
                        <Link
                          className="linkCustom"
                          href={`/instructors/${marketingCoordinator.id}`}
                        >
                          {marketingCoordinator.name}
                        </Link>
                      </div>
                      <div className="text-15 lh-1 mt-5">Founder</div>
                      <div className="d-flex x-gap-15 pt-15">
                        <div className="d-flex items-center">
                          <div className="icon-star text-11 text-yellow-1 mr-10"></div>
                          <div className="text-13 lh-12 text-yellow-1">
                            {marketingCoordinator.rating}
                          </div>
                        </div>

                        <div className="d-flex items-center">
                          <Image
                            width={16}
                            height={16}
                            className="shrink-0 mr-10"
                            src="/assets/img/team/icons/1.svg"
                            alt="icon"
                          />
                          <div className="text-13 lh-12">
                            {marketingCoordinator.students} Services
                          </div>
                        </div>

                        <div className="d-flex items-center">
                          <Image
                            width={12}
                            height={12}
                            className="shrink-0 mr-10"
                            src="/assets/img/team/icons/2.svg"
                            alt="icon"
                          />
                          <div className="text-13 lh-12">
                            {marketingCoordinator.courses} Course
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5 col-md-10">
              {aboutService.map((elm, index) => (
                <div key={index}>
                  <h2 className="text-30 lh-15">{elm.heading}</h2>
                  <p className="mt-10">{elm.description}</p>
                </div>
              ))}
              <div className="y-gap-20 pt-25">
                {aboutService.length > 0 &&
                  aboutService[0].feature.map((elm, i) => (
                    <div key={elm._id.$oid} className="d-flex items-center">
                      <div className="d-flex items-center justify-center size-25 rounded-full bg-purple-1 mr-15">
                        <span
                          className="text-white"
                          style={{
                            fontSize: "10px",
                            fontWeight: "300",
                          }}
                          aria-hidden="true"
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </span>
                      </div>
                      <div className="fw-500 text-dark-1">{elm.title}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="svg-shape">
        <svg
          width="1925"
          height="261"
          viewBox="0 0 1925 261"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1924.67 0L1922.7 7.03707C1911.58 46.7293 1877.25 75.5353 1836.23 79.5878L0 261V0H1924.67Z"
            fill="#F7F8FB"
          />
        </svg>
      </div>
    </>
  );
}
