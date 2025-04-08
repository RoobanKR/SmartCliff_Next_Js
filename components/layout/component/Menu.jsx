import React, { useState, useEffect } from "react";
import Link from "next/link";
import MobileFooter from "./MobileFooter";
import Image from "next/image";
import { menuList } from "@/data/menu";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { fetchDegreeProgramData } from "@/redux/slices/mca/degreeProgram/DegreeProgram";
import {
  fetchServices,
  selectServices,
} from "@/redux/slices/services/services/Services";
import {
  getAllBusinessServices,
  selectBusinessServices,
} from "@/redux/slices/services/services/businessServices";
import CoursesDropdown from "./CourseDropDown";
import ServicesDropdown from "./ServicesDropdown";
import BusinessDropdown from "./BusinessDropdown";
import { fetchCourses } from "@/redux/slices/course/course";
import { fetchCategories } from "@/redux/slices/category/category";
 
export default function Menu({ allClasses, headerPosition, onServiceSelect }) {
  const dispatch = useDispatch();
  const [menuItem, setMenuItem] = useState("");
  const [submenu, setSubmenu] = useState("");
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isBusinessOpen, setIsBusinessOpen] = useState(false);
  const [isCorporateOpen, setIsCorporateOpen] = useState(false);
  const pathname = usePathname();
 
  useEffect(() => {
    dispatch(getAllBusinessServices());
    dispatch(fetchDegreeProgramData());
    dispatch(fetchServices());
    dispatch(fetchCategories());
    dispatch(fetchCourses());
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
  }, [pathname]);
 
  return (
    <div
      className={`header-menu js-mobile-menu-toggle ${
        headerPosition ? headerPosition : ""
      }`}
    >
      <div className="header-menu__content">
        <div className="mobile-bg js-mobile-bg"></div>
 
        <div
          className="d-none xl:d-flex items-center px-20 py-20 border-bottom-light"
          style={{ fontFamily: "serif" }}
        >
          <Link href="/login" className="text-orange-1">
            Log in
          </Link>
          <Link href="/signup" className="text-dark-1 ml-30">
            Sign Up
          </Link>
        </div>
 
        <div className="menu js-navList">
          <ul className={allClasses ? allClasses : ""}>
            <li
              className="menu-item-has-children"
              style={{
                textDecoration: pathname === "/" ? "underline" : "none",
                textUnderlineOffset: "4px", // Adds spacing between text and underline
              }}
            >
              <Link
                data-barba
                href="/"
                className={pathname === "/" ? "activeMenu" : ""}
                onMouseOver={() => setHoveredLink("/")}
                onMouseOut={() => setHoveredLink(null)}
                style={{
                  display: "inline-block",
                  padding: "6px 12px",
                  borderRadius: "5px",
                  border:
                    hoveredLink === "/"
                      ? "2px solid #f2775e"
                      : "2px solid transparent", // Orange border on hover
                  color:
                    hoveredLink === "/"
                      ? "#fff" // White text on hover
                      : pathname === "/"
                      ? "#f2775e" // Active state text color
                      : "#000", // Default text color (black)
                  transition: "all 0.3s ease",
                }}
              >
                Home
              </Link>
            </li>
 
            <li
              className="menu-item-has-children"
              style={{
                textDecoration: pathname === "/aboutUs" ? "underline" : "none",
                textUnderlineOffset: "4px", // Adds spacing between text and underline
              }}
            >
              <Link
                data-barba
                href="/aboutUs"
                className={pathname === "/aboutUs" ? "activeMenu" : ""}
                onMouseOver={() => setHoveredLink("aboutUs")}
                onMouseOut={() => setHoveredLink(null)}
                style={{
                  display: "inline-block",
                  padding: "6px 12px",
                  borderRadius: "5px",
                  border:
                    hoveredLink === "aboutUs"
                      ? "2px solid #f2775e"
                      : "2px solid transparent", // Orange border on hover
                  color:
                    hoveredLink === "aboutUs"
                      ? "#fff" // White text on hover
                      : pathname === "/aboutUs"
                      ? "#f2775e" // Active state text color
                      : "#000", // Default text color (black)
                  transition: "all 0.3s ease",
                }}
              >
                About Us
              </Link>
            </li>
 
            <ServicesDropdown />
            <CoursesDropdown />
            <BusinessDropdown />
 
            <li
              className="menu-item-has-children"
              style={{
                textDecoration: pathname === "/history" ? "underline" : "none",
                textUnderlineOffset: "4px", // Adds spacing between text and underline
              }}
            >
              <Link
                data-barba
                href="/history"
                className={pathname === "/history" ? "activeMenu" : ""}
                onMouseOver={() => setHoveredLink("/history")}
                onMouseOut={() => setHoveredLink(null)}
                style={{
                  display: "inline-block",
                  padding: "6px 12px",
                  borderRadius: "5px",
                  border:
                    hoveredLink === "/history"
                      ? "2px solid #f2775e"
                      : "2px solid transparent", // Orange border on hover
                  color:
                    hoveredLink === "/history"
                      ? "#fff" // White text on hover
                      : pathname === "/history"
                      ? "#f2775e" // Active state text color
                      : "#000", // Default text color (black)
                  transition: "all 0.3s ease",
                }}
              >
                History
              </Link>
            </li>
 
            <li
              className="menu-item-has-children"
              style={{
                textDecoration: pathname === "/career" ? "underline" : "none",
                textUnderlineOffset: "4px", // Adds spacing between text and underline
              }}
            >
              <Link
                data-barba
                href="/career"
                className={pathname === "/career" ? "activeMenu" : ""}
                onMouseOver={() => setHoveredLink("/career")}
                onMouseOut={() => setHoveredLink(null)}
                style={{
                  display: "inline-block",
                  padding: "6px 12px",
                  borderRadius: "5px",
                  border:
                    hoveredLink === "/career"
                      ? "2px solid #f2775e"
                      : "2px solid transparent", // Orange border on hover
                  color:
                    hoveredLink === "/career"
                      ? "#fff" // White text on hover
                      : pathname === "/career"
                      ? "#f2775e" // Active state text color
                      : "#000", // Default text color (black)
                  transition: "all 0.3s ease",
                }}
              >
                Career
              </Link>
            </li>
 
            <li
              className="menu-item-has-children"
              style={{
                textDecoration: pathname === "/contact" ? "underline" : "none",
                textUnderlineOffset: "4px", // Adds spacing between text and underline
              }}
            >
              <Link
                data-barba
                href="/contact"
                className={pathname === "/contact" ? "activeMenu" : ""}
                onMouseOver={() => setHoveredLink("/contact")}
                onMouseOut={() => setHoveredLink(null)}
                style={{
                  display: "inline-block",
                  padding: "6px 12px",
                  borderRadius: "5px",
                  border:
                    hoveredLink === "/contact"
                      ? "2px solid #f2775e"
                      : "2px solid transparent", // Orange border on hover
                  color:
                    hoveredLink === "/contact"
                      ? "#fff" // White text on hover
                      : pathname === "/contact"
                      ? "#f2775e" // Active state text color
                      : "#000", // Default text color (black)
                  transition: "all 0.3s ease",
                }}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <MobileFooter />
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
 
 