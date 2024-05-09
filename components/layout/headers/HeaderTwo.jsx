"use client";

import React from "react";
import Menu from "../component/Menu";
import MobileMenu from "../component/MobileMenu";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import SearchToggle from "../component/SearchToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

export default function HeaderTwo() {
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <header
      className="header -type-5 js-header"
      style={{ fontFamily: "serif" }}
    >
      <div className="d-flex items-center bg-purple-1 py-10">
        <div className="container">
          <div className="row y-gap-5 justify-between items-center">
            <div className="col-auto">
              <div className="d-flex x-gap-40 y-gap-10 items-center">
                <div className="d-flex items-center text-white md:d-none">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="phone-icon mr-10 thin"
                  />{" "}
                  <div className="text13 lh-1">+91 811 007 7033</div>
                </div>

                <div className="d-flex items-center text-white">
                  <div className="icon-email mr-10"></div>
                  <div className="text13 lh-1">enquiry@smartcliff.in</div>
                </div>
                <Link href="/service_Gallery">
                  <div className="d-flex items-center text-white">
                    <div className="icon-video-file mr-10"></div>
                    <div className="text13 lh-1">Gallery</div>
                  </div>
                </Link>

                <Link href="https://smartclifflms.info/login/index.php">
                  <div className="d-flex items-center text-white">
                    <div className="icon-puzzle "></div>
                    <div className="ml-10">LMS</div>
                  </div>
                </Link>

                <Link href="/csr">
                  <div className="d-flex items-center text-white">
                    <div className="icon-bar-chart-2"></div>
                    <div className="ml-10">CSR</div>
                  </div>
                </Link>
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex x-gap-30 y-gap-10">
                <div>
                  <div className="d-flex x-gap-20 items-center text-white">
                    {/* <Socials textSize={"text-11"} /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header__container py-10" style={{ zIndex: 1000 }}>
        <div className="row justify-between items-center">
          <div className="col-auto">
            <div className="header-left d-flex items-center">
              <div className="header__logo ">
                <Link href="/">
                  <Image
                    width={140}
                    height={50}
                    src="/assets/img/general/logo.png"
                    alt="logo"
                  />
                </Link>
              </div>

              {/* <div className="header-search-field ml-30">
                <form onSubmit={handleSubmit}>
                  <div className="header-search-field__group">
                    <input
                      required
                      type="text"
                      placeholder="What do you want to learn?"
                    />
                    <button type="submit">
                      <i className="icon icon-search"></i>
                    </button>
                  </div>
                </form>
              </div> */}
            </div>
          </div>

          <div className="col-auto">
            <div className="header-right d-flex items-center">
              <div className="header-right__icons text-white d-flex items-center">
                <Menu allClasses={"menu__nav text-dark-1 -is-active"} />
                <MobileMenu
                  setActiveMobileMenu={setActiveMobileMenu}
                  activeMobileMenu={activeMobileMenu}
                />

                <div className="d-none xl:d-block ml-20">
                  <button
                    onClick={() => setActiveMobileMenu(true)}
                    className="text-dark-1 items-center"
                    data-el-toggle=".js-mobile-menu-toggle"
                  >
                    <i className="text-11 icon icon-mobile-menu"></i>
                  </button>
                </div>
              </div>
              <div className="header-right__icons text-white d-flex items-center">
                <SearchToggle />

                <div className="d-none xl:d-block ml-20">
                  <button
                    onClick={() => setActiveMobileMenu(true)}
                    className="text-white items-center"
                    data-el-toggle=".js-mobile-menu-toggle"
                  >
                    <i className="text-11 icon icon-mobile-menu"></i>
                  </button>
                </div>
              </div>
              <div
                className="header-right__buttons d-flex items-center ml-30 xl:ml-20 md:d-none"
                style={{ fontFamily: "serif" }}
              >
                <Link
                  href="/login"
                  className="button px-30 h-50 -outline-dark-11 text-orange-1"
                  style={{ color: "#f2775e" }}
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="button px-30 h-50 -dark-11 text-white ml-10"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
