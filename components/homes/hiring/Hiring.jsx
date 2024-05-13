"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { events, categories, findEvent, tags } from "@/data/events";
import Link from "next/link";
import Pagination from "@/components/common/Pagination";
import { getAllHiring } from "@/redux/slices/hiring/hiring/hiring";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import PaginationTwo from "@/components/common/PaginationTwo";

export default function Hiring() {
  const [pageItems, setPageItems] = useState([]);
  const [ddActive, setDdActive] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("current");
  const [selectedTag, setSelectedTag] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedStartDate, setSelectedStartDate] = useState("");

  const [searchRole, setSearchRole] = useState("");
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const dispatch = useDispatch();
  const { allHiring } = useSelector((state) => state.hiring);
  const uniqueCategories = Array.from(
    new Set(allHiring.map((hiring) => hiring.status))
  );


  // Filter function based on date

  const uniqueStatuses = [
    "All Statuses",
    ...new Set(allHiring.map((hiring) => hiring.status)),
  ];
  const uniqueStartDates = ["All Dates", ...Array.from(
    new Set(allHiring.map((hiring) => format(new Date(hiring.start_date), "d MMMM, yyyy")))
  )];

  useEffect(() => {
    dispatch(getAllHiring());
  }, [dispatch]);

  const recentUpcomingPosts = allHiring.filter(
    (hiring) => hiring.status === "upcoming"
  );

  const uniqueTags = Array.from(
    new Set(allHiring.flatMap((hiring) => hiring.eligibility))
  );

  const filteredPosts = allHiring.filter((post) => {
    const statusMatch =
      selectedStatus === "All Statuses" || post.status === selectedStatus;
    const tagMatch = !selectedTag || post.eligibility.includes(selectedTag);
    const roleMatch =
      searchRole === "" ||
      post.role.toLowerCase().includes(searchRole.toLowerCase());
      const startDateMatch = selectedStartDate === "All Dates" || selectedStartDate === "" || 
      format(new Date(post.start_date), "d MMMM, yyyy") === selectedStartDate;

    return statusMatch && tagMatch  && roleMatch && startDateMatch;
  });
  const pageCapacity = 2;

  const startIndex = (pageNumber - 1) * pageCapacity;
  const endIndex = startIndex + pageCapacity;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
  console.log("allHiring", allHiring);
  return (
    <>
      <section className="page-header -type-1" style={{ fontFamily: "serif" }}>
        <div className="container">
          <div className="page-header__content">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div>
                  <h1 className="page-header__title">Current Openings</h1>
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

      <section
        className="layout-pt-sm layout-pb-sm"
        style={{ fontFamily: "serif" }}
      >
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-lg-3 lg:order-2">
              <div className="pr-30 lg:pr-0">
                <div className="sidebar -blog -no-border">
                  <div className="sidebar__item">
                    {/* <h5 className="sidebar__title">Find Event</h5> */}

                    <div className="sidebar-content -event">
                      
                      <div className="sidebar-event">
                        <select
                          value={searchRole}
                          onChange={(e) => setSearchRole(e.target.value)}
                          className="sidebar-event__title text-14 lh-1"
                          style={{
                            border: "none",
                            outline: "none",
                            backgroundColor: "#fff",
                            width: "100%",
                            maxWidth: "80%",
                            padding: "0px 12px",
                            paddingRight: "0",
                            WebkitAppearance: "none",
                            MozAppearance: "none",
                            appearance: "none",
                            color: "rgb(115, 109, 109)", // Set the color of the text
                          }}
                        >
                          <option value="">Select role</option>
                          {[...new Set(allHiring.map((item) => item.role))].map(
                            (role, index) => (
                              <option key={index} value={role}>
                                {role}
                              </option>
                            )
                          )}
                        </select>
                        <div className="sidebar-event__icon">
                          <div className="icon icon-search"></div>
                        </div>
                      </div>
          <div
            className="sidebar-event"
            onClick={() => setShowDateDropdown(!showDateDropdown)}
          >
            <input
              value={selectedStartDate}
              readOnly
              placeholder="Search By start date"
              className="sidebar-event__title text-14 lh-1"
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "#fff",
                width: "100%",
                maxWidth: "80%",
                padding: "0px 12px",
                paddingRight: "0",
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
              }}
            />
            <div className="sidebar-event__icon">
              <div className="icon icon-calendar-2"></div>
            </div>
          </div>

          {showDateDropdown && (
            <div
            style={{
              border: "none",
              outline: "none",
              backgroundColor: "#fff",
              width: "100%",
              maxWidth: "80%",
              padding: "0px 12px",
              paddingRight: "0",
              WebkitAppearance: "none",
              MozAppearance: "none",
              appearance: "none",
            }}
            >
              {uniqueStartDates.map((date, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedStartDate(date);
                    setShowDateDropdown(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {date}
                </div>
              ))}
            </div>
          )}
        {/* </div>
      </div> */}


                    </div>
                  </div>

                  <div className="sidebar__item">
                    <h5 className="sidebar__title">Upcomming Hiring</h5>

                    <div className="sidebar-content -recent y-gap-20">
                      {recentUpcomingPosts.map((elm, i) => (
                        <div
                          style={{ textDecoration: "none" }}
                          key={i}
                          className="sidebar-recent d-flex items-center"
                        >
                          <div className="sidebar-recent__image mr-15">
                            <Image
                              width={65}
                              height={65}
                              src={elm.company_logo}
                              alt="image"
                              style={{ width: "60px", height: "60px" }}
                            />
                          </div>

                          <div className="sidebar-recent__content">
                            <h5 className="text-15 lh-15 fw-500">
                              <Link
                                className="linkCustom"
                                href={`/events/${elm.id}`}
                              >
                                {elm.company_name}
                              </Link>
                            </h5>
                            {format(new Date(elm.start_date), "d MMMM, yyyy")}{" "}
                            {/* Format the start date */}
                            <div className="text-13 lh-1 mt-5">{elm.role}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="sidebar__item">
                    <h5 className="sidebar__title">Tags</h5>
                    <div className="sidebar-content -tags">
                      {uniqueTags.map((tag, i) => (
                        <div key={i} className="sidebar-tag">
                          <a
                            className={`text-11 fw-500 text-dark-1 ${
                              selectedTag === tag ? "active" : ""
                            }`}
                            onClick={() => setSelectedTag(tag)}
                            style={{ cursor: "pointer" }}
                          >
                            <span
                              className="tag text-13 fw-400 mr-10"
                              style={{ textTransform: "uppercase" }}
                            >
                              {tag}
                            </span>{" "}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-9 lg:order-1">
              <div className="row y-gap-20 items-center justify-between pb-30">
                <div className="col-auto">
                  <div className="text-14 lh-12">
                    Showing{" "}
                    <span className="text-dark-1 fw-500">
                      {allHiring.length}
                    </span>{" "}
                    total results
                  </div>
                </div>

                <div className="col-auto">
                  <div className="d-flex items-center">
                    <div className="text-14 lh-12 fw-500 text-dark-1 mr-20">
                      Sort by:
                    </div>

                    <div
                      onClick={() => setDdActive((pre) => !pre)}
                      className={`dropdown js-dropdown js-category-active ${
                        ddActive ? "-is-dd-active" : ""
                      }`}
                    >
                      <div
                        className="dropdown__button d-flex items-center text-14 rounded-8 px-20 py-10 text-14 lh-12"
                        data-el-toggle=".js-category-toggle"
                        data-el-toggle-active=".js-category-active"
                      >
                        <span className="js-dropdown-title">
                          {selectedStatus}
                        </span>
                        <i className="icon text-9 ml-40 icon-chevron-down"></i>
                      </div>

                      <div
                        className={`toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle ${
                          ddActive ? "-is-el-visible" : ""
                        }`}
                      >
                        <div className="text-14 y-gap-15 js-dropdown-list">
                          {uniqueStatuses.map((status, i) => (
                            <div
                              key={i}
                              onClick={() => {
                                setSelectedStatus(status);
                                setDdActive(false);
                              }}
                              style={{ cursor: "pointer" }}
                              className={`d-block js-dropdown-link cursor ${
                                selectedStatus === status ? "activeMenu" : ""
                              }`}
                            >
                              {status}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row y-gap-30">
                {/* <h5 className="sidebar__title">Current Hiring</h5> */}
                {filteredPosts.map((post, i) => (
                  <div key={i} className="col-lg-4 col-md-6">
                    <div className="eventCard -type-2 bg-white">
                      <div className="eventCard__img">
                        <Image
                          width={510}
                          height={340}
                          className="w-1/1 rounded-top-8"
                          src={post.company_logo}
                          alt="Company Logo"
                          style={{ width: "510px", height: "150px" }}
                        />
                      </div>

                      <div className="eventCard__content pt-25 pb-30 px-30 d-block">
                        <div className="d-flex items-center">
                          <div className="icon-calendar-2 text-16 mr-8"></div>
                          <div className="text-14 fw-400">
                            {format(new Date(post.start_date), "d MMMM, yyyy")}{" "}
                            To {format(new Date(post.end_date), "d MMMM, yyyy")}
                          </div>
                        </div>
                        <h4 className="eventCard__title text-17 lh-15 fw-500 text-dark-4 mt-15">
                          <Link
                            className="linkCustom"
                            href={`/events/${post.id}`}
                          >
                            Company Name: {post.company_name}
                          </Link>
                        </h4>
                        <div className="d-flex items-center mt-15">
                          <div className="text-14">Role: {post.role}</div>
                        </div>
                        <div className="tags mt-10">
                          <span className="tag text-13 fw-400">
                            Eligibility: {post.eligibility.join(" ")}
                          </span>
                        </div>
                        <div className="eventCard__button mt-10">
                          <Link
                            href={`/hiringApply`}
                            className="button -sm -rounded -outline-purple-1 text-purple-1 px-25"
                          >
                            Enroll
                          </Link>
                        </div>{" "}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row justify-center pt-60 lg:pt-40">
                <div className="col-auto">
                  <PaginationTwo
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    data={filteredPosts}
                    pageCapacity={pageCapacity}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
