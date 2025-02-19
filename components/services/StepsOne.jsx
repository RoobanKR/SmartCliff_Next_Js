
import React, { useEffect } from "react";
import Image from "next/image";

export default function StepsOne({ processSteps }) {
    return (
        <section className="layout-pt-sm layout-pb-sm" style={{ backgroundColor: '#f7f8fb' }}>
            <div className="container">
                <div className="row y-gap-20 justify-center text-center">
                    <div className="col-auto">
                        <div className="sectionTitle">
                            <h2 className=" text-25">Service Process</h2>
                            <p className="sectionTitle__text">
                                10,000+ unique online course list designs
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row y-gap-30 justify-center pt-60 lg:pt-40">
                    {processSteps.map((step, index) => (
                        <React.Fragment key={index}>
                            {/* Process Step */}
                            <div className="col-xl-2 col-lg-3 col-md-6">
                                <div className="d-flex flex-column items-center text-center">
                                    <div className="relative size-120 d-flex justify-center items-center rounded-full bg-light-4">
                                        <Image
                                            width={50}
                                            height={50}
                                            src={`${step.icon}`} // Adjust path based on your backend setup
                                            alt={step.heading}
                                        />
                                        <div className="side-badge">
                                            <div className="size-35 d-flex justify-center items-center rounded-full bg-dark-1 -dark-bg-purple-1">
                                                <span className="text-14 fw-500 text-white">
                                                    0{index + 1}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-17 fw-500 text-dark-1 mt-10">
                                        {step.heading}
                                    </div>
                                </div>
                            </div>

                            {/* Arrow Between Steps */}
                            {index < processSteps.length - 1 && (
                                <div className="col-auto xl:d-none">
                                    <div className="pt-30">
                                        <Image
                                            width={142}
                                            height={21}
                                            src={`/assets/img/misc/lines/${index + 1}.svg`} // Change path if needed
                                            alt="arrow"
                                        />
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
}

