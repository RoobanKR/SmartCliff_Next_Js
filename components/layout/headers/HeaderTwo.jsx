"use client";
import React, { useEffect } from "react";
import Menu from "../component/Menu";
import MobileMenu from "../component/MobileMenu";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import SearchToggle from "../component/SearchToggle";

export default function HeaderTwo({ onServiceSelect }) {
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const [bgColor, setBgColor] = useState("#5b2c6f"); // Initially white

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setBgColor("#5b2c6f"); // Change color when scrolled down
      } else {
        setBgColor("#5b2c6f"); // Revert to white when at the top
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);

  // Handler function to receive service data from Menu
  const handleServiceSelect = (service) => {
    if (onServiceSelect) {
      onServiceSelect(service);
    }
  };

  return (
    <header
      className="header -type-5 js-header"
      style={{ background: bgColor }}
    >
      <div className="header__container" style={{ zIndex: 1000 }}>
        <div className="row justify-between items-center">
          <div className="col-auto">
            <div className="header-left d-flex items-center">
              <div className="header__logo ">
                <Link href="/">
                  <Image
                    width={140}
                    height={50}
                    src="/assets/img/general/logo1.png"
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
              </div>
              <div className="header-right__icons  d-flex items-center">
                {/* <SearchToggle /> */}
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
