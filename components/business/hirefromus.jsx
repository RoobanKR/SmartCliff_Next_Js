"use client";

import React, { useState, useEffect } from "react";
import Table from "./Table";
import { coursesData } from "@/data/courses";
import HirefromusAddForm from "./HirefromusAddForm";
import KeyElements from "./KeyElements";
import EngagementGovernance from "./EngagementGovernance";
import PlacementTestimonial from "./PlacementTestimonial";

const Hirefromus = ({ path, id }) => {
  const [pageItem, setPageItem] = useState(coursesData[0]);

  useEffect(() => {
    setPageItem(coursesData.find((elm) => elm.id == id) || coursesData[0]);
  }, [id]);

  return (
    <div id="js-pin-container" className="js-pin-container">
      <section className="layout-pb-sm">
        <div className="container">
          <div className="row y-gap-50">
            <div className="col">
              <HirefromusAddForm />
              {/* <TrainFromUs /> */}
              {/* <div style={{ overflowX: "auto" }}>
                <Table />
              </div> */}
              {/* <Advantage /> */}
              <KeyElements />
              <div className="content-wrapper  js-content-wrapper overflow-hidden">
                <PlacementTestimonial />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hirefromus;
