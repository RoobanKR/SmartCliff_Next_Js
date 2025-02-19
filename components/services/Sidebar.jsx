"use client";
import { getAllServiceAbout } from "@/redux/slices/services/services/aboutServices";
import { selectBusinessServices } from "@/redux/slices/services/services/businessServices";
import {
  fetchServices,
  selectServices,
} from "@/redux/slices/services/services/Services";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
export default function Sidebar() {
  const dispatch = useDispatch();
  const services = useSelector(selectServices);
  const servicesBusiness = useSelector(selectBusinessServices);
  // Get data from Redux state
  // Fetch data on component mount
  useEffect(() => {
    dispatch(getAllServiceAbout());
  }, [dispatch]);
  const fullUrl = window.location.href;
  const segments = fullUrl.split("/").filter(Boolean); // Remove empty segments
  const lastSegment = segments.pop(); // Get the last segment
  const secondLastSegment = segments.pop(); // Get the second last segment
  const onematchingData = servicesBusiness.find(
    (i) => i.slug === secondLastSegment
  );
  const matchedService = servicesBusiness.find(
    (service) => service.slug === secondLastSegment
  );
  const matchedServices = services.filter(
    (service) => service.business_services._id === onematchingData?._id
  );
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => { }, [services]);

  return (
    <div
      className="sidebar"
      style={{
        marginTop: "20px",
      }}
    >
      <div className="sidebar__inner">
        <div>
          {/* Title Section */}
          <div className="flex items-center" style={{ marginBottom: "12px" }}>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#5B2C6F", // Deep violet
              }}
            >
              {matchedService
                ? `${matchedService.title} (${matchedService.name})`
                : "Service Not Found"}
            </h2>
          </div>
          {/* Service List */}
          <div style={{ marginTop: "20px" }}>
            {matchedServices?.map((service, index) => {
              const isActive = service.slug === lastSegment;

              return (
                <div
                  key={index}
                  style={{
                    marginBottom: "12px",
                    padding: "10px",
                    borderRadius: "8px",
                    background: isActive ? "#5B2C6F" : "#fff",
                    transition: "background 0.3s ease",
                    boxShadow: isActive
                      ? "0 4px 8px rgba(0, 0, 0, 0.15)"
                      : "none",
                  }}
                >
                  <Link
                    href={`/${secondLastSegment}/${service.slug}`}
                    className="d-flex items-center"
                  >
                  <img
  src={service?.icon}
  alt={service?.title}
  style={{
    marginRight: "12px",
    width: "24px",
    height: "24px",
    borderRadius: "6px",
    background: "#fff",
    padding: "4px",
  }}
/>

                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "16px",
                        fontWeight: "500",
                        textDecoration: "none",
                        color: isActive ? "#fff" : "#5B2C6F", // White for active, Violet for inactive
                        transition: "color 0.3s ease",
                      }}
                    >
                      {" "}
                      {service.title}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

