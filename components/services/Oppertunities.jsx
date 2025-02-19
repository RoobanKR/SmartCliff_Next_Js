"use client";

import Image from "next/image";

import React from "react";
import { helpItems } from "@/data/helpItems";
export default function Oppertunitie({ matchedOppertunity }) {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    console.log("matchedOppertunity", matchedOppertunity);

    return (
        <div className="pt-50">
            <section className="page-header" style={{ padding: "10px" }}>
                <div className="container">
                    <div className="page-header__content">
                        <div className="row justify-center text-center">
                            <div className="col-auto">
                                <div>
                                    <h2 className="text-25">Oppertunities</h2>
                                </div>

                                <div>
                                    <p className="page-header__text">
                                        We’re on a mission to deliver engaging, curated courses at a
                                        reasonable price.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="layout-pb-md">
                <div className="container">
                    <div className="row y-gap-30 justify-between pt-10 lg:pt-50">
                        {matchedOppertunity && matchedOppertunity.length > 0 ? (
                            matchedOppertunity.map((opportunity, index) => (
                                <div key={index} className="col-lg-4 col-md-6">
                                    <div className="py-40 px-45 rounded-16" style={{ backgroundColor: "#f5f0ff" }}>
                                        <div className="d-flex justify-center items-center size-70 rounded-full bg-white">
                                            {opportunity.image && (
                                                <Image width={50} height={50} src={opportunity.image} alt="icon" />
                                            )}
                                        </div>
                                        <h4 className="text-20 lh-11 fw-500 mt-25">{opportunity.company_name}</h4>
                                        <p className="mt-10">{opportunity.description}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No opportunities available.</p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

