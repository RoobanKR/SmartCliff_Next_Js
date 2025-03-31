"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLearningJourneys } from "@/redux/slices/bussiness/learningJourney/learningJourney";
import { CircularProgress } from "@mui/material";
import {
  getAllBusinessServices,
  selectBusinessServices,
} from "@/redux/slices/services/services/businessServices";
import {
  fetchServices,
  selectServices,
} from "@/redux/slices/services/services/Services";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LearningJourney() {
  const dispatch = useDispatch();
  const router = useRouter();

  const services = useSelector(selectServices);
  const businessServices = useSelector(selectBusinessServices);
  const { learningJourneys, loading } = useSelector(
    (state) => state.learningJourney
  );

  useEffect(() => {
    dispatch(fetchAllLearningJourneys());
    dispatch(getAllBusinessServices());
    dispatch(fetchServices());
  }, [dispatch]);

  console.log("Business Services:", businessServices);

  // Find the institute service
  const instituteService = businessServices?.find(
    (service) => service?.name?.toLowerCase() === "institute"
  );

  // Extract the ID of the institute service
  const instituteServiceId = instituteService?._id || null;
  console.log("Found Institute Service:", instituteService);
  console.log("Institute Service ID:", instituteServiceId);

  if (loading || !businessServices || businessServices.length === 0) {
    return <CircularProgress />;
  }

  return (
    <section className="layout-pt-sm layout-pb-sm">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle">
              <h2 className="sectionTitle__title">
                <span style={{ color: "#f2775e" }}>Explore</span> &{" "}
                <span style={{ color: "#f2775e" }}>Elevate</span> Your Skills!
              </h2>
              <p className="sectionTitle__text">
                Discover tailored learning opportunities designed to enhance
                your expertise and open doors to new career possibilities.
              </p>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 justify-between pt-60 lg:pt-50">
          {services
            ?.filter(
              (mainservice) =>
                mainservice.business_services?.name?.toLowerCase() ===
                "institute"
            )
            .map((mainservice, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <div className="coursesCard -type-3 text-center">
                  <div className="coursesCard__icon bg-green-3">
                    <Image
                      width={50}
                      height={50}
                      src={mainservice.icon}
                      alt="icon"
                    />
                  </div>

                  <div className="coursesCard__content mt-30">
                    <Link
                      href={`/b2i/${mainservice.slug}`}
                      className="coursesCard__title text-18 lh-1 fw-500 text-blue-600 cursor-pointer"
                      style={{ textDecoration: "underline" }} // Adds underline effect
                    >
                      {mainservice.title}
                    </Link>

                    <p
                      className="coursesCard__text text-14 mt-10"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3, // Limits to 4 lines
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {mainservice.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
