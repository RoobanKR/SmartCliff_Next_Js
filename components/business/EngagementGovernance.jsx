import Link from "next/link";
import React from "react";

export default function EngagementGovernance() {
  return (
    <section className="layout-pt-sm layout-pb-sm">
      <div className="container">
        <div className="row y-gap-20 justify-between items-end">
          <div className="col-lg-6">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">Engagement Governance</h2>

              <p className="sectionTitle__text ">
                Lorem ipsum dolor sit amet, consectetur.
              </p>
            </div>
          </div>
        </div>
        <br></br>
        <section className="cta -type-1 layout-pt-lg layout-pb-lg">
          <div data-parallax="0.6" className="cta__bg">
            <div
              data-parallax-target
              className="bg-image js-lazy"
              style={{ backgroundImage: "url(/assets/img/home-2/cta/bg.png)" }}
            ></div>
          </div>
        </section>
      </div>
    </section>
  );
}
