import { getAlEngagedGovernance } from "@/redux/slices/hiring/engagedGovernance/engagedGovernance";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function EngagementGovernance() {
  const dispatch = useDispatch();

  const engagedGovernance = useSelector(
    (state) => state.engagedGovernance.engagedGovernance
  );

  useEffect(() => {
    dispatch(getAlEngagedGovernance());
  }, [dispatch]);

  console.log("engagedGovernance", engagedGovernance);

  return (
    <section className="layout-pt-sm layout-pb-sm">
      {engagedGovernance && engagedGovernance.length > 0 && (
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
          <br />
          <section className="cta -type-1 layout-pt-lg layout-pb-lg">
            {engagedGovernance[0].image && (
              <div data-parallax="0.6" className="cta__bg">
                <div
                  data-parallax-target
                  className="bg-image js-lazy"
                  style={{
                    backgroundImage: `url(${engagedGovernance[0].image})`,
                  }}
                ></div>
              </div>
            )}
          </section>
        </div>
      )}
    </section>
  );
}
