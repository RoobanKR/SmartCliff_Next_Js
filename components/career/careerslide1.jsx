"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import CareerEnquiryForm from "./careerForm";
import { CircularProgress } from "@mui/material";
import { fetchAllCareers } from "@/redux/slices/career/career";

export default function CareerSlideOne() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { careers, loading, error } = useSelector((state) => state.career);

  useEffect(() => {
    dispatch(fetchAllCareers());
  }, [dispatch]);

  const toggleModal = () => setIsOpen(!isOpen);

  if (loading) {
    return <CircularProgress />;
  }

  const careerData = careers.length > 0 ? careers[0] : null;

  const renderTitle = (title) => {
    if (!title) return null;

    const parts = title.split(/(Courses)/);

    return (
      <h3 className="text-30 md:text-30 lh-11">
        {parts.map((part, index) =>
          part === "Courses" ? (
            <span key={index} style={{ color: "#f07057" }}>
              Courses
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </h3>
    );
  };

  return (
    <section className="layout-pt-xs" style={{ marginTop: "20px" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-12 mb-2">
            {careerData && (
              <div className="composition -type-4">
                <Image
                  style={{ width: "100%", height: "auto" }}
                  ratio
                  src={careerData.image}
                  alt="image"
                  width={500}
                  height={500}
                />
              </div>
            )}
          </div>

          <div className="col-lg-7 col-md-12">
            {careerData && (
              <>
                {renderTitle(careerData.title)}

                <p className="mt-3" style={{ textAlign: "justify" }}>
                  {careerData.description}
                </p>

                <p
                  className="mt-4"
                  style={{ fontSize: "24px", fontWeight: "bold" }}
                >
                  {careerData.subTitle}
                </p>

                <p className="mt-2" style={{ textAlign: "justify" }}>
                  {careerData.subDescription
                    .split(/(Join us|Join Us|JOIN US)/i)
                    .map((part, index) => (
                      <React.Fragment key={index}>
                        {part.match(/Join us|Join Us|JOIN US/i) ? (
                          <span
                            onClick={toggleModal}
                            style={{
                              fontWeight: "bold",
                              cursor: "pointer",
                              color: "#f07057",
                            }}
                          >
                            {part}
                          </span>
                        ) : (
                          part
                        )}
                      </React.Fragment>
                    ))}
                </p>
              </>
            )}
            {isOpen && <CareerEnquiryForm closeModal={toggleModal} />}
          </div>
        </div>
      </div>
    </section>
  );
}
