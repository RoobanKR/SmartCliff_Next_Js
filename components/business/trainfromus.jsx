"use client";

import React, { useState, useEffect } from "react";
import Table from "./Table";
import { coursesData } from "@/data/courses";
import Advantage from "./Advantage";
import TrainFromUs from "./TrainfromusAddForm";
import KeyElements from "./KeyElements";
import EngagementGovernance from "./EngagementGovernance";

const Trainfromus = ({ path, id }) => {
  const [pageItem, setPageItem] = useState(coursesData[0]);

  useEffect(() => {
    setPageItem(coursesData.find((elm) => elm.id == id) || coursesData[0]);
  }, [id]);

  return (
    <>
      <TrainFromUs />
      {/* <div style={{ overflowX: "auto" }}>
                <Table />
              </div> */}
      {/* <Advantage /> */}
      {/* <KeyElements /> */}
      {/* <EngagementGovernance /> */}
    </>
  );
};

export default Trainfromus;
