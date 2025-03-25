import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function AdmissionProcess() {
  const featureOne = [
    { id: 1, title: "Advanced AI & Machine Learning" },
    { id: 2, title: "Industry-Based Case Studies" },
    { id: 3, title: "Hands-on Practical Training" },
    { id: 4, title: "Internships with Top Companies" },
  ];

  return (
    <section className="layout-pt-sm layout-pb-sm">
      <div className="container">
        <div className="row y-gap-30 justify-between items-center">
          <div className="col-xl-5 col-lg-6 col-md-10 order-2 order-lg-1">
            <div className="about-content">
              <h2 className="about-content__title customSized" data-aos="fade-up">
                <span style={{ color: "#f2775e" }}>Build</span> a strong foundation with our curriculum.
              </h2>
              <p className="about-content__text" data-aos="fade-up">
                Use the list below to bring attention to your product’s key
                <br /> differentiator.
              </p>
              <div className="y-gap-20 pt-30">
                {featureOne.map((elm) => (
                  <div key={elm.id} className="d-flex items-center" data-aos="fade-up">
                    <div className="about-content-list__icon">
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
                    <div className="about-content-list__title">{elm.title}</div>
                  </div>
                ))}
              </div>

              <div className="d-inline-block mt-30">
                <a
                  href="/assets/img/curriculam.jpg"
                  download
                  className="button -md -dark-1 text-white"
                >
                  Download Curriculum
                </a>
              </div>
            </div>
          </div>

          <div className="col-xl-5 col-lg-6 order-1 order-lg-2" data-aos="fade-up">
            <div className="about-image">
              <Image
                width={750}
                height={850}
                style={{ height: "100%", width: "100%" }}
                src="/assets/img/curriculam2.jpg"
                alt="Curriculum Image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
