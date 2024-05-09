import React from "react";
import Link from "next/link";
export default function Hiring() {
  return (
    <section
      className="layout-pt-sm layout-pb-sm"
      style={{ background: "#fff0ce" }}
    >
      <div className="container">
        <div className="row y-gap-20 justify-between items-center">
          <div className="col-xl-4 col-lg-5">
            <h2 className="text-30 lh-15 text-black">
              Make an impact while growing your
              <span className="" style={{ color: "#f2775e" }}>
                {" "}
                career
              </span>{" "}
            </h2>
          </div>

          <div className="col-auto">
            <Link
              href="/hiring"
              className="button px-30 h-50 -outline-dark-11 text-orange-1"
              style={{ color: "#f2775e" }}
            >
              View Openings
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
