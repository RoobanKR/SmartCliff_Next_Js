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
    <>
      <HirefromusAddForm />
      {/* <TrainFromUs /> */}
      {/* <div style={{ overflowX: "auto" }}>
                <Table />
              </div> */}
      {/* <Advantage /> */}
      {/* <KeyElements /> */}
      {/* <div className="content-wrapper  js-content-wrapper overflow-hidden">
                <PlacementTestimonial />
              </div> */}
    </>
  );
};

export default Hirefromus;
