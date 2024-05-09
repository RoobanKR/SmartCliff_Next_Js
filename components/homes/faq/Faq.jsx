"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { faq } from "../../../data/faq";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Faq from "@/components/common/Faq";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFAQs, selectFAQs, selectStatus } from "@/redux/slices/faq/faq";

export default function FrequentlyAskedQuestion() {
  const [activeFaq, setActiveFaq] = useState(0);
  const dispatch = useDispatch();
  const faqData = useSelector(selectFAQs);
  const status = useSelector(selectStatus);
  const filteredData = faqData.filter((item) => item.category_name == "common");
  console.log("filteredData", filteredData);

  useEffect(() => {
    dispatch(fetchAllFAQs());
  }, [dispatch]);

  useEffect(() => {
    console.log(faqData);
  }, [faqData]);

  useEffect(() => {
    console.log(status);
  }, [status]);

  return (
    <>
      <section className="layout-pt-sm layout-pb-md">
        <div className="container">
          <div className="page-header__content">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div>
                  <h1
                    className="page-header__title"
                    style={{ fontFamily: "Serif" }}
                  >
                    Frequently Asked Questions.
                  </h1>
                </div>

                <div>
                  <p
                    className="page-header__text"
                    style={{ fontFamily: "Serif" }}
                  >
                    We’re on a mission to deliver engaging, curated courses at a
                    reasonable price.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row y-gap-50 justify-between items-center">
            <div
              className="col-lg-3"
              data-aos="fade-up"
              data-aos-duration={350}
            >
              <Image
                width={690}
                height={765}
                style={{ width: "600px", height: "300px" }}
                className="w-1/1"
                src="/assets/img/home-8/what/faqq.jpg"
                alt="image"
              />
            </div>

            <div className="col-lg-9">
              <div className="row justify-center text-center">
                <div className="col-xl-8 col-lg-9 col-md-11">
                  <div className="accordion -block text-left pt-30 lg:pt-40 js-accordion">
                    {filteredData.map((item, index) => (
                      <div key={index}>
                        {item.faqItems.map((faqItem, faqIndex) => (
                          <div
                            key={faqIndex}
                            className={`accordion__item ${
                              activeFaq === faqIndex ? "is-active" : ""
                            }`}
                          >
                            <div className="accordion__button">
                              <div
                                className="accordion__icon"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                  className="icon"
                                  data-feather="plus"
                                  onClick={() => {
                                    setActiveFaq((prev) =>
                                      prev === faqIndex ? null : faqIndex
                                    );
                                  }}
                                >
                                  <FontAwesomeIcon icon={faPlus} />
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                  className="icon"
                                  data-feather="minus"
                                  onClick={() => {
                                    setActiveFaq((prev) =>
                                      prev === faqIndex ? null : faqIndex
                                    );
                                  }}
                                >
                                  <FontAwesomeIcon icon={faMinus} />
                                </div>
                              </div>
                              <span
                                className="text-17 fw-500 text-dark-1"
                                style={{ fontFamily: "Serif" }}
                              >
                                {faqItem.question}
                              </span>
                            </div>
                            <div
                              style={
                                activeFaq === faqIndex
                                  ? { maxHeight: "139px" }
                                  : { maxHeight: 0 }
                              }
                              className="accordion__content"
                            >
                              <div className="accordion__content__inner">
                                <p style={{ fontFamily: "Serif" }}>
                                  {faqItem.answer}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
