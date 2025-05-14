import React from "react";
import Image from "next/image";

export default function StepsOne({ processSteps }) {
  return (
    <section
      className="layout-pt-sm layout-pb-sm"
      style={{ position: "relative", zIndex: 5 }}
    >
      <div className="container">
        <div className="row y-gap-10 justify-center text-center">
          <div className="col-auto">
            <div className="">
              <h2 className="text-25 lg:text-10 md:text-30 text-dark-1">
                Service Process
              </h2>
            </div>
          </div>
        </div>

        {/* Process Steps in Rows of 3 */}
        <div className="d-flex flex-column gap-40 pt-20 lg:pt-40">
          {Array.from({ length: Math.ceil(processSteps.length / 3) }).map(
            (_, rowIndex) => (
              <div key={rowIndex} className="row y-gap-50 justify-center">
                {processSteps
                  .slice(rowIndex * 3, rowIndex * 3 + 3)
                  .map((step, index) => (
                    <React.Fragment key={index}>
                      {/* Process Step */}
                      <div className="col-xl-2 col-lg-3 col-md-6">
                        <div
                          className="d-flex flex-column items-center text-center"
                          style={{ marginTop: "20px" }}
                        >
                          <div className="relative size-120 d-flex justify-center items-center rounded-full bg-light-4">
                            <img
                              src={step.icon} // Ensure this path is correct based on your backend setup
                              alt={step.heading}
                              style={{
                                width: "50px",
                                height: "50px",
                              }}
                            />

                            <div className="side-badge">
                              <div className="size-35 d-flex justify-center items-center rounded-full bg-dark-1 -dark-bg-purple-1">
                                <span className="text-14 fw-500 text-white">
                                  0{rowIndex * 3 + index + 1}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-13 fw-600 text-dark-1 mt-10">
                            {step.heading}
                          </div>
                        </div>
                      </div>

                      {/* Arrow Between Steps (only within the same row) */}
                      {index < 2 &&
                        rowIndex * 3 + index + 1 < processSteps.length && (
                          <div className="col-auto xl:d-none">
                            <div
                              className="pt-30"
                              style={{ marginTop: "40px" }}
                            >
                              <Image
                                width={142}
                                height={21}
                                src={`/assets/img/misc/lines/${
                                  rowIndex * 3 + index + 1
                                }.svg`} // Change path if needed
                                alt="arrow"
                              />
                            </div>
                          </div>
                        )}
                    </React.Fragment>
                  ))}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
