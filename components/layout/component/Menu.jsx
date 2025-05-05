import React, { useState, useEffect } from "react";
import Link from "next/link";
import MobileFooter from "./MobileFooter";
import { menuList } from "@/data/menu";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchDegreeProgramData } from "@/redux/slices/mca/degreeProgram/DegreeProgram";
import { fetchServices } from "@/redux/slices/services/services/Services";
import { getAllBusinessServices } from "@/redux/slices/services/services/businessServices";
import CoursesDropdown from "./CourseDropDown";
import ServicesDropdown from "./ServicesDropdown";
import BusinessDropdown from "./BusinessDropdown";
import { fetchCourses } from "@/redux/slices/course/course";
import { fetchCategories } from "@/redux/slices/category/category";

export default function Menu({ allClasses, headerPosition, onServiceSelect }) {
  const dispatch = useDispatch();
  const [menuItem, setMenuItem] = useState("");
  const [submenu, setSubmenu] = useState("");
  const [activeLink, setActiveLink] = useState("/");
  const [hoveredLink, setHoveredLink] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    dispatch(getAllBusinessServices());
    dispatch(fetchDegreeProgramData());
    dispatch(fetchServices());
    dispatch(fetchCategories());
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    // Set the active link based on pathname initially
    setActiveLink(pathname);

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

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  // Custom link component with animated bottom border
  const NavLink = ({ href, children, className = "" }) => {
    const isActive = activeLink === href;
    const isHovered = hoveredLink === href;

    return (
      <Link
        data-barba
        href={href}
        className={`nav-link ${className} ${isActive ? "active-link" : ""}`}
        onClick={() => handleLinkClick(href)}
        onMouseOver={() => setHoveredLink(href)}
        onMouseOut={() => setHoveredLink(null)}
        style={{
          position: "relative",
          display: "inline-block",
          padding: "6px 12px",
          margin: "4px 0",
          transition: "all 0.3s ease",
          textDecoration: "none",
          color: isActive || isHovered ? "#F3D66A" : "#FFFFFF",
          WebkitTextFillColor: isActive || isHovered ? "#F3D66A" : "#FFFFFF",
          marginRight: "10px",
        }}
      >
        {children}
        <span
          className="bottom-border"
          style={{
            position: "absolute",
            bottom: "0",
            left: "50%",
            width: isActive || isHovered ? "100%" : "0",
            height: "2px",
            backgroundColor: "#F3D66A",
            transition: "width 0.3s ease, left 0.3s ease",
            transform: "translateX(-50%)",
            transformOrigin: "center",
          }}
        />
      </Link>
    );
  };

  return (
    <div
      className={`header-menu js-mobile-menu-toggle ${
        headerPosition ? headerPosition : ""
      }`}
    >
      <div className="header-menu__content">
        <div className="mobile-bg js-mobile-bg"></div>
        <div className="menu js-navList" style={{ marginRight: "-30px" }}>
          <style jsx global>{`
            .nav-link:hover .bottom-border {
              width: 80%;
              left: 50%;
            }

            .active-link .bottom-border {
              width: 100%;
              left: 50%;
              animation: borderGlow 1.5s infinite alternate;
            }

            @keyframes borderGlow {
              from {
                box-shadow: 0 0 2px #f3d66a;
              }
              to {
                box-shadow: 0 0 8px #f3d66a;
              }
            }
          `}</style>

          <ul className={allClasses ? allClasses : ""}>
            <li>
              <NavLink href="/">Home</NavLink>
            </li>

            <li className="menu-item-has-children">
              <NavLink href="/aboutUs">About Us</NavLink>
            </li>

            <ServicesDropdown />
            <CoursesDropdown />
            <BusinessDropdown />

            <li className="menu-item-has-children">
              <NavLink href="/gallery">Gallery</NavLink>
            </li>

            <li className="menu-item-has-children">
              <NavLink href="/career">Career</NavLink>
            </li>

            <li className="menu-item-has-children">
              <NavLink href="/contact">Contact</NavLink>
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
