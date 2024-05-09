import React, { useState, useEffect } from "react";
import Link from "next/link";
import MobileFooter from "./MobileFooter";
import Image from "next/image";
import { menuList } from "@/data/menu";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchDegreeProgramData } from "@/redux/slices/mca/degreeProgram/DegreeProgram";

export default function Menu({ allClasses, headerPosition }) {
  const dispatch = useDispatch();
  const [menuItem, setMenuItem] = useState("");
  const [submenu, setSubmenu] = useState("");
  const [hoveredLink, setHoveredLink] = useState(null);
  const pathname = usePathname();
  const degreeProgramData = useSelector(
    (state) => state.degreeProgram.degreeProgramData
  );
  const [hoveredProgram, setHoveredProgram] = useState("");

  useEffect(() => {
    dispatch(fetchDegreeProgramData());
  }, [dispatch]);

  useEffect(() => {
    menuList.forEach((elm) => {
      elm?.links?.forEach((elm2) => {
        if (elm2.href?.split("/")[1] == pathname.split("/")[1]) {
          setMenuItem(elm.title);
        } else {
          elm2?.links?.map((elm3) => {
            if (elm3.href?.split("/")[1] == pathname.split("/")[1]) {
              setMenuItem(elm.title);
              setSubmenu(elm2.title);
            }
          });
        }
      });
    });
  }, []);

  return (
    <div
      className={`header-menu js-mobile-menu-toggle ${
        headerPosition ? headerPosition : ""
      }`}
      style={{ fontFamily: "serif" }}
    >
      <div className="header-menu__content">
        <div className="mobile-bg js-mobile-bg"></div>

        <div
          className="d-none xl:d-flex items-center px-20 py-20 border-bottom-light"
          style={{ fontFamily: "serif" }}
        >
          <Link href="/login" className=".text-orange-1">
            Log in
          </Link>
          <Link href="/signup" className="text-dark-1 ml-30">
            Sign Up
          </Link>
        </div>

        <div className="menu js-navList">
          <ul className={`${allClasses ? allClasses : ""}`}>
            <li className="menu-item-has-children">
              <Link
                data-barba
                href="/"
                className={pathname === "/" ? "activeMenu" : ""}
                onMouseOver={() => setHoveredLink("/")}
                onMouseOut={() => setHoveredLink(null)}
              >
                <span
                  style={{
                    color:
                      (pathname === "/" || hoveredLink === "/") && "#f2775e",
                  }}
                >
                  Home
                </span>
              </Link>
            </li>
            <li className="menu-item-has-children">
              <Link
                data-barba
                href="/aboutUs"
                className={pathname === "/aboutUs" ? "activeMenu" : ""}
                onMouseOver={() => setHoveredLink("aboutUs")}
                onMouseOut={() => setHoveredLink(null)}
              >
                <span
                  style={{
                    color:
                      (pathname === "/aboutUs" || hoveredLink === "aboutUs") &&
                      "#f2775e",
                  }}
                >
                  About Us
                </span>
              </Link>
            </li>

            <li className="menu-item-has-children">
              <Link
                data-barba
                href="/services"
                className={pathname === "/services" ? "activeMenu" : ""}
                onMouseOver={() => setHoveredLink("services")}
                onMouseOut={() => setHoveredLink(null)}
              >
                <span
                  style={{
                    color:
                      (pathname === "/services" ||
                        hoveredLink === "services") &&
                      "#f2775e",
                  }}
                >
                  Services
                </span>
              </Link>
            </li>

            <li className="menu-item-has-children -has-mega-menu">
              <Link
                data-barba
                href="/courses"
                className={menuItem === "Courses" ? "activeMenu" : ""}
                onMouseOver={() => setHoveredLink("courses")}
                onMouseOut={() => setHoveredLink(null)}
              >
                <span
                  style={{
                    color:
                      (pathname === "/Courses" || hoveredLink === "courses") &&
                      "#f2775e",
                  }}
                >
                  Courses
                </span>
              </Link>
            </li>
            <li className="menu-item-has-children">
              <a
                className={menuItem === "Degree Program" ? "activeMenu" : ""}
                href="#"
                style={{ position: "relative" }}
                onMouseOver={() =>
                  (document.getElementById("degreeProgram").style.color =
                    "#f2775e")
                }
                onMouseOut={() =>
                  document
                    .getElementById("degreeProgram")
                    .style.removeProperty("color")
                }
              >
                <span
                  id="degreeProgram"
                  style={{
                    color: menuItem === "Degree Program" ? "#f2775e" : "",
                  }}
                >
                  Degree Program
                </span>{" "}
                <i className="icon-chevron-right text-13 ml-10"></i>
              </a>
              <ul className="subnav">
                <li className="menu__backButton js-nav-list-back">
                  <a
                    href="#"
                    style={{
                      color: menuItem === "Degree Program" ? "#f2775e" : "",
                    }}
                  >
                    <i className="icon-chevron-left text-13 mr-10"></i> Degree
                    Program
                  </a>
                </li>
                {degreeProgramData.map((program) => (
                  <li key={program._id}>
                    <Link href={`/${program.slug}/${program._id}`}>
                      <div
                        className={
                          pathname.split("/")[1] === program.program_name
                            ? "activeMenu"
                            : "inActiveMenu"
                        }
                        style={{
                          color:
                            pathname.split("/")[1] === program.program_name
                              ? "#f2775e !important"
                              : hoveredProgram === program.program_name
                              ? "#f2775e !important"
                              : "",
                        }}
                        onMouseOver={() =>
                          setHoveredProgram(program.program_name)
                        }
                        onMouseOut={() => setHoveredProgram("")}
                      >
                        {program.program_name}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="menu-item-has-children -has-mega-menu">
              <Link
                data-barba
                href="/hiring"
                className={menuItem === "Hiring" ? "activeMenu" : ""}
                onMouseOver={() => setHoveredLink("Hiring")}
                onMouseOut={() => setHoveredLink(null)}
              >
                <span
                  style={{
                    color:
                      (pathname === "/hiring" || hoveredLink === "Hiring") &&
                      "#f2775e",
                  }}
                >
                  Hiring
                </span>
              </Link>
            </li>

            <li className="menu-item-has-children">
              <Link
                data-barba
                href="#"
                className={menuItem == "Pages" ? "activeMenu" : ""}
              >
                Business <i className="icon-chevron-right text-13 ml-10"></i>
              </Link>

              <ul className="subnav">
                <li className="menu__backButton js-nav-list-back">
                  <Link href="#">
                    <i className="icon-chevron-left text-13 mr-10"></i> Business
                  </Link>
                </li>
                <li className="menu-item-has-children">
                  <Link
                    href="#"
                    className={
                      submenu == "About Us" ? "activeMenu" : "inActiveMenu"
                    }
                  >
                    Corporate<div className="icon-chevron-right text-11"></div>
                  </Link>

                  <ul className="subnav">
                    <li className="menu__backButton js-nav-list-back">
                      <Link href="#">
                        <i className="icon-chevron-left text-13 mr-10"></i>
                        Corporate
                      </Link>
                    </li>

                    {menuList[4].links[0].links.map((elm, i) => (
                      <li
                        key={i}
                        className={
                          pathname.split("/")[1] == elm.href.split("/")[1]
                            ? "activeMenu"
                            : "inActiveMenu"
                        }
                      >
                        <Link key={i} data-barba href={elm.href}>
                          {elm.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                {menuList[4].links
                  .filter((el) => el.href)
                  .map((elm, i) => (
                    <li
                      key={i}
                      className={
                        pathname.split("/")[1] == elm.href.split("/")[1]
                          ? "activeMenu"
                          : "inActiveMenu"
                      }
                    >
                      <Link key={i} data-barba href={elm.href}>
                        {elm.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </li>
          </ul>
        </div>

        {/* mobile footer start */}
        <MobileFooter />
        {/* mobile footer end */}
      </div>

      <div
        className="header-menu-close"
        data-el-toggle=".js-mobile-menu-toggle"
      >
        <div className="size-40 d-flex items-center justify-center rounded-full bg-white">
          <div className="icon-close text-dark-1 text-16"></div>
        </div>
      </div>

      <div className="header-menu-bg"></div>
    </div>
  );
}
