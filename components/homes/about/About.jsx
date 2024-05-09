import React from "react";
import Image from "next/image";
import Link from "next/link";
import { featureOne } from "../../../data/features";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function AboutUs() {
  return (
    <section className="layout-pt-sm layout-pb-sm">
      <div className="container">
        <div className="row y-gap-30 items-center">
          <div className="col-xl-6 col-lg-6 order-lg-1">
            <div className="about-content">
              <h2
                className="about-content__title customSized"
                data-aos="fade-up"
              >
                <span style={{ color: "#f2775e" }}>About</span> Us
              </h2>
              <p
                className="about-content__text"
                data-aos="fade-up"
                style={{ textAlign: "justify" }}
              >
                SmartCliff, Coimbatore in association with Sri Venkateswara
                College of Computer Applications and Management affiliated to
                Anna University, Chennai, is offering an 'Industry-driven' MCA
                Programme. This 2 Year full-time Master's Degree is a
                meticulously curated programme, designed to link students'
                strength to the Industry. The Students enrolled shall undergo
                academic programme as prescribed by Anna University to become
                strong in the fundamentals and get a reinforcement of their
                knowledge of advanced technologies through project- based
                skilling offered by Industry Experts. The systematized course
                modules of this peculiar programme have immediate relevance to
                Industry practices that propel students to high profile careers
                in the Industry. Our Industry connect is sure shot bound to
                assure paid internships and 100% placement. SmartCliff
                ascertains to provide the right pedestal to jump start your
                career.
                <br />
              </p>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 order-lg-2" data-aos="fade-up">
            <div className="about-image">
              <Image
                width={750}
                height={850}
                style={{ height: "100%", width: "100%" }}
                src="/assets/img/home-8/what/fee.jpg"
                alt="image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
