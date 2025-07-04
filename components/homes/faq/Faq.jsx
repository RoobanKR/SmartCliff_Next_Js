"use client";
import React, { useEffect, useState } from "react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFAQs, selectFAQs, selectStatus } from "@/redux/slices/faq/faq";

export default function FAQComponent({ faq }) {
  const [activeItemId, setActiveItemId] = useState(null);
  const [activeFaq, setActiveFaq] = useState(0);
  const dispatch = useDispatch();
  const faqData = useSelector(selectFAQs);
  const status = useSelector(selectStatus);
  const filteredData = faqData.filter((item) => item.category_name == "common");

  useEffect(() => {
    dispatch(fetchAllFAQs());
  }, [dispatch]);

  useEffect(() => {}, [faqData]);

  useEffect(() => {}, [status]);

  const toggleAccordion = (faqItemId) => {
    setActiveItemId((prev) => (prev === faqItemId ? null : faqItemId));
  };

  return (
    <>
      <div
        id="course-content"
        className="pt-50 lg:pt-40 layout-pb-sm "
        style={{ padding: "20px" }}
      >
        <div className="row y-gap-20 justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="text-25">Frequently Asked Questions</h2>
              <br></br>

              <p className="sectionTitle__text "></p>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="accordion -block-2 text-left js-accordion">
            {filteredData?.map((item, i) => (
              <div key={i}>
                {item.faqItems.map((faqItem, j) => (
                  <div key={faqItem._id}>
                    <div
                      onClick={() => toggleAccordion(faqItem._id)}
                      style={{background:"#dbdbdb"}}
                      className={`accordion__button py-20 mt-10 px-30 ${
                        activeItemId === faqItem._id ? "is-active" : ""
                      }`}
                    >
                      <div className="d-flex items-center">
                        <div className="accordion__icon">
                          <div className="icon">
                            <FontAwesomeIcon icon={faChevronDown} />
                          </div>
                          <div className="icon">
                            <FontAwesomeIcon icon={faChevronUp} />
                          </div>
                        </div>
                        <span className="text-17 fw-500 text-dark-1">
                          {faqItem.question}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`accordion__content ${
                        activeItemId === faqItem._id ? "is-active" : ""
                      }`}
                      style={
                        activeItemId === faqItem._id
                          ? { maxHeight: "700px" }
                          : {}
                      }
                    >
                      <div className="accordion__content__inner px-10 py-10" style={{background:"#ffe9a9",borderRadius: "12px", marginTop:"5px"}}>
                        <div className="y-gap-20">
                          <div className="d-flex justify-between">
                            <div className="d-flex items-center">
                              {/* <div className="d-flex justify-center items-center size-30 rounded-full bg-purple-3 mr-10">
                                <div className="icon-play text-9"></div>
                              </div> */}
                              <div style={{color:"#000"}}>{faqItem.answer}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
