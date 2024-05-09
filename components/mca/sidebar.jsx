"use client";

import { fetchDegreeProgramData } from "@/redux/slices/mca/degreeProgram/DegreeProgram";
import {
  fetchServices,
  selectServices,
} from "@/redux/slices/services/services/Services";
import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Sidebar3() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const services = useSelector(selectServices);
  const degreeProgramData = useSelector(
    (state) => state.degreeProgram.degreeProgramData
  );

  useEffect(() => {
    dispatch(fetchDegreeProgramData());
  }, [dispatch]);

  return (
    <div className="sidebar -base-sidebar">
      <div className="sidebar__inner">
        <div>
          <div className="text-16 lh-1 fw-500 text-dark-1 mb-30">
            Degree Program
          </div>
          <div>
            {degreeProgramData.map((degreeProgram, index) => (
              <div
                key={index}
                className="sidebar__item -is-active"
                style={{ marginBottom: "10px" }}
              >
                <Link
                  href={`/${degreeProgram._id}`}
                  className="-dark-sidebar-white d-flex items-center text-17 lh-1 fw-500 text-purple-1"
                >
                  <img
                    src={degreeProgram.image}
                    alt={degreeProgram.title}
                    className="mr-15"
                    style={{ width: "20px", height: "20px" }}
                  />{" "}
                  {degreeProgram.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
