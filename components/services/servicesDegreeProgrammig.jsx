"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchDegreeProgramData } from "@/redux/slices/mca/degreeProgram/DegreeProgram";

export default function ServiceDegreeProgram() {
  const dispatch = useDispatch();
  const router = useRouter();
  const degreeProgramData = useSelector(
    (state) => state.degreeProgram.degreeProgramData
  );

  useEffect(() => {
    dispatch(fetchDegreeProgramData());
  }, [dispatch]);

  const featuredItems = degreeProgramData?.slice(0, 2) || [];
  const remainingItems = degreeProgramData?.slice(2) || [];

  return (
    <>
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div>
                  <h4 className="">Degree Program</h4>
                </div>
                <div>
                  <p className="page-header__text">
                    We're on a mission to deliver engaging, curated courses at a reasonable price.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-xs layout-pb-md">
        <div className="container">
          {/* First two items centered */}
          <div className="row justify-center">
            {featuredItems.map((elm, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div className="eventCard -type-1">
                  <div className="eventCard__img">
                    <Image
                      width={510}
                      height={360}
                      src={elm.images[1]}
                      alt="image"
                    />
                  </div>
                  <div className="eventCard__bg bg-white">
                    <div className="eventCard__content y-gap-10">
                      <div className="eventCard__inner">
                        <h4 className="eventCard__title text-17 fw-500">
                          <Link
                            className="linkCustom"
                            href={`/${elm.slug}/${elm._id}`}
                          >
                            {elm.program_name}
                          </Link>
                        </h4>
                        <div className="d-flex x-gap-15 pt-10">
                          {/* <div className="d-flex items-center">
                            <div className="icon-calendar-2 text-16 mr-8"></div>
                            <div className="text-14">{elm.date || "26.Jun.2025"}</div>
                          </div> */}
                          <div className="d-flex items-center">
                            <div className="icon-location text-16 mr-8"></div>
                            <div className="text-14">{elm.location || "Coimbatore,TN"}</div>
                          </div>
                        </div>
                      </div>
                      <div className="eventCard__button">
                        <Link
                          href={`/${elm.slug}/${elm._id}`}
                          className="button -sm -rounded -outline-purple-1 text-purple-1 px-25"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Remaining items in normal grid */}
          <div className="row y-gap-30">
            {remainingItems.map((elm, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div className="eventCard -type-1">
                  <div className="eventCard__img">
                    <Image
                      width={510}
                      height={360}
                      src={elm.images[1]}
                      alt="image"
                    />
                  </div>
                  <div className="eventCard__bg bg-white">
                    <div className="eventCard__content y-gap-10">
                      <div className="eventCard__inner">
                        <h4 className="eventCard__title text-17 fw-500">
                          <Link
                            className="linkCustom"
                            href={`/${elm.slug}/${elm._id}`}
                          >
                            {elm.program_name}
                          </Link>
                        </h4>
                        <div className="d-flex x-gap-15 pt-10">
                          {/* <div className="d-flex items-center">
                            <div className="icon-calendar-2 text-16 mr-8"></div>
                            <div className="text-14">{elm.date || "26.Jun.2025"}</div>
                          </div> */}
                          <div className="d-flex items-center">
                            <div className="icon-location text-16 mr-8"></div>
                            <div className="text-14">{elm.location || "Coimbatore,TN"}</div>
                          </div>
                        </div>
                      </div>
                      <div className="eventCard__button">
                        <Link
                          href={`/${elm.slug}/${elm._id}`}
                          className="button -sm -rounded -outline-purple-1 text-purple-1 px-25"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}