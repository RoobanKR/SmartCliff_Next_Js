"use client";
import React from "react";
import Menu from "../component/Menu";
import MobileMenu from "../component/MobileMenu";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import SearchToggle from "../component/SearchToggle";
import Socials from "@/components/common/Socials";

export default function HeaderSeven({ onServiceSelect }) {
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);

  // Handler function to receive service data from Menu
  const handleServiceSelect = (service) => {
    if (onServiceSelect) {
      onServiceSelect(service);
    }
  };

  return (
    <header className="header -type-5 js-header">
      {/* <div
        className="d-flex items-center py-10"
        style={{ background: "#789DBC" }}
      >
        <div className="container">
          <div className="row y-gap-5 justify-between items-center">
            <div className="col-auto">
              <div className="d-flex x-gap-40 y-gap-10 items-center">
                <div className="d-flex items-center text-white md:d-none">
                  <div className="icon-email mr-10"></div>
                  <div className="text13 lh-1">+91 894 049 9888</div>
                </div>
                <div className="d-flex items-center text-white">
                  <div className="icon-email mr-10"></div>
                  <div className="text13 lh-1">enquiry@smartcliff.in</div>
                </div>
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex x-gap-30 y-gap-10">
                <div>
                  <div className="d-flex x-gap-20 items-center text-white">
                    <Socials textSize={"text-11"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="header__container" style={{ zIndex: 1000 }}>
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
            </div>
          </div>
          <div className="col-auto">
            <div className="header-right d-flex items-center">
              <div className="header-right__icons text-white d-flex items-center">
                <Menu
                  allClasses={"menu__nav text-dark-1 -is-active"}
                  onServiceSelect={handleServiceSelect}
                />
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
                {/* <SearchToggle /> */}
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
              ></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
