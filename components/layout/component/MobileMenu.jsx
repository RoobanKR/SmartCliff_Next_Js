"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServices,
  selectServices,
} from "@/redux/slices/services/services/Services";
import {
  getAllBusinessServices,
  selectBusinessServices,
} from "@/redux/slices/services/services/businessServices";
import {
  fetchCategories,
  selectCategories,
} from "@/redux/slices/category/category";
import { fetchCourses } from "@/redux/slices/course/course";
import { menuList } from "@/data/menu";  // Importing menuList from the same source as BusinessDropdown

export default function MobileMenu({ setActiveMobileMenu, activeMobileMenu }) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const services = useSelector(selectServices);
  const businessServices = useSelector(selectBusinessServices);
  const categories = useSelector(selectCategories);
  const courses = useSelector((state) => state.courses.courses);

  const [showMenu, setShowMenu] = useState(false);
  const [activeBusinessService, setActiveBusinessService] = useState(null);
  const [activeService, setActiveService] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  // New states for Business dropdown
  const [activeBusinessDropdown, setActiveBusinessDropdown] = useState(false);
  const [activeCorporateDropdown, setActiveCorporateDropdown] = useState(false);

  useEffect(() => {
    dispatch(getAllBusinessServices());
    dispatch(fetchServices());
    dispatch(fetchCategories());
    dispatch(fetchCourses());
    setShowMenu(true);
  }, [dispatch]);

  // Group courses by category
  const coursesByCategory = {};
  if (courses && courses.length) {
    courses.forEach((course) => {
      const categoryId =
        course.category?._id ||
        (typeof course.category === "object" && course.category?._id) ||
        course.category;

      if (!coursesByCategory[categoryId]) {
        coursesByCategory[categoryId] = [];
      }
      coursesByCategory[categoryId].push(course);
    });
  }

  // Main menu items with Services, Programs, and Business dropdowns
  const staticMenuItems = [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/aboutUs" },
    {
      title: "Services",
      isDropdown: true,
      links: businessServices?.map((business) => ({
        title: business.name,
        id: business._id,
        slug: business.slug,
        links: services
          ?.filter((service) => service.business_services?._id === business._id)
          .map((service) => ({
            label: service.title,
            href: `/${business.slug}/${service.slug}`,
          })),
      })),
    },
    {
      title: "Programs",
      isDropdown: true,
      links: categories?.map((category) => ({
        title: category.category_name,
        id: category._id,
        links: coursesByCategory[category._id]?.map((course) => ({
          label: course.course_name,
          href: `/courses/${course.slug}`,
        })),
      })),
    },
    {
      title: "Business",
      isDropdown: true,
      links: [
        {
          title: "Corporate",
          links: menuList[4].links[0].links.map(item => ({
            label: item.label,
            href: item.href
          }))
        },
        ...menuList[4].links.filter(item => item.href).map(item => ({
          title: item.label,
          href: item.href
        }))
      ]
    },
    { title: "Review", href: "/reviews" },
    { title: "Career", href: "/career" },
    { title: "Contact", href: "/contact" },
  ];

  // Helper function to check if path is active
  const isActive = (path) => pathname.startsWith(path);

  return (
    <div
      className={`header-menu js-mobile-menu-toggle ${activeMobileMenu ? "-is-el-visible" : ""
        }`}
    >
      <div className="header-menu__content">
        <div className="mobile-bg js-mobile-bg"></div>

        {showMenu && activeMobileMenu && (
          <div className="mobileMenu text-dark-1">
            {staticMenuItems.map((item, i) => (
              <div key={i} className="submenuOne">
                {item.isDropdown ? (
                  <>
                    <div
                      className="title"
                      onClick={() => {
                        // Reset other dropdowns
                        setActiveBusinessService(null);
                        setActiveService(null);
                        setActiveCategory(null);

                        // Toggle specific dropdown
                        if (item.title === "Services") {
                          setActiveBusinessService(
                            activeBusinessService === item.title ? null : item.title
                          );
                        } else if (item.title === "Programs") {
                          setActiveCategory(
                            activeCategory === item.title ? null : item.title
                          );
                        } else if (item.title === "Business") {
                          setActiveBusinessDropdown(
                            !activeBusinessDropdown
                          );
                        }
                      }}
                    >
                      <span
                        className={
                          (item.title === "Services" && activeBusinessService === item.title) ||
                            (item.title === "Programs" && activeCategory === item.title) ||
                            (item.title === "Business" && activeBusinessDropdown)
                            ? "activeMenu"
                            : "inActiveMenu"
                        }
                      >
                        {item.title}
                      </span>
                      <i
                        className={`icon-chevron-right text-13 ml-10 ${(item.title === "Services" && activeBusinessService === item.title) ||
                          (item.title === "Programs" && activeCategory === item.title) ||
                          (item.title === "Business" && activeBusinessDropdown)
                          ? "active"
                          : ""
                          }`}
                      ></i>
                    </div>

                    {/* Business Dropdown */}
                    {item.title === "Business" && activeBusinessDropdown && (
                      <div className="toggle active">
                        {item.links.map((subItem, index) => (
                          <div key={index}>
                            {subItem.links ? (
                              // Corporate Submenu
                              <div
                                className="title pl-20"
                                onClick={() => setActiveCorporateDropdown(!activeCorporateDropdown)}
                              >
                                <span
                                  className={
                                    activeCorporateDropdown
                                      ? "activeMenu"
                                      : "inActiveMenu"
                                  }
                                >
                                  {subItem.title}
                                </span>
                                <i
                                  className={`icon-chevron-right text-13 ml-10 ${activeCorporateDropdown ? "active" : ""
                                    }`}
                                ></i>
                              </div>
                            ) : (
                              // Direct Business Menu Items
                              <Link
                                href={subItem.href}
                                className="title pl-20"
                                onClick={() => setActiveMobileMenu(false)}
                              >
                                <span
                                  className={
                                    isActive(subItem.href)
                                      ? "activeMenu"
                                      : "inActiveMenu"
                                  }
                                >
                                  {subItem.title}
                                </span>
                              </Link>
                            )}

                            {/* Corporate Submenu Dropdown */}
                            {subItem.links && activeCorporateDropdown && (
                              <div className="pl-30">
                                {subItem.links.map((link, linkIndex) => (
                                  <Link
                                    key={linkIndex}
                                    href={link.href}
                                    className={`link ${isActive(link.href)
                                      ? "activeMenu"
                                      : "inActiveMenu"
                                      }`}
                                    onClick={() => setActiveMobileMenu(false)}
                                    style={{
                                      display: "block",
                                      padding: "10px 0",
                                    }}
                                  >
                                    {link.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Existing Services and Programs Dropdowns */}
                    {(item.title === "Services" || item.title === "Programs") &&
                      ((item.title === "Services" && activeBusinessService === item.title) ||
                        (item.title === "Programs" && activeCategory === item.title)) &&
                      item.links?.map((subItem, index) => (
                        <div key={index} className="toggle active">
                          <div
                            className="title pl-20"
                            onClick={() => {
                              if (item.title === "Services") {
                                setActiveService((prev) =>
                                  prev === subItem.id ? null : subItem.id
                                );
                              } else if (item.title === "Programs") {
                                setActiveCategory((prev) =>
                                  prev === subItem.id ? null : subItem.id
                                );
                              }
                            }}
                          >
                            <span
                              className={
                                (item.title === "Services" &&
                                  activeService === subItem.id) ||
                                  (item.title === "Programs" &&
                                    activeCategory === subItem.id)
                                  ? "activeMenu"
                                  : "inActiveMenu"
                              }
                            >
                              {subItem.title}
                            </span>
                            <i
                              className={`icon-chevron-right text-13 ml-10 ${(item.title === "Services" &&
                                activeService === subItem.id) ||
                                (item.title === "Programs" &&
                                  activeCategory === subItem.id)
                                ? "active"
                                : ""
                                }`}
                            ></i>
                          </div>

                          {((item.title === "Services" &&
                            activeService === subItem.id) ||
                            (item.title === "Programs" &&
                              activeCategory === subItem.id)) && (
                              <div className="pl-30">
                                {subItem.links?.map((link, linkIndex) => (
                                  <Link
                                    key={linkIndex}
                                    href={link.href}
                                    className={`link ${pathname === link.href
                                      ? "activeMenu"
                                      : "inActiveMenu"
                                      }`}
                                    onClick={() => setActiveMobileMenu(false)}
                                    style={{
                                      display: "block",
                                      padding: "10px 0",
                                    }}
                                  >
                                    {link.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                        </div>
                      ))}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="title"
                    onClick={() => setActiveMobileMenu(false)}
                  >
                    <span
                      className={
                        pathname === item.href ? "activeMenu" : "inActiveMenu"
                      }
                    >
                      {item.title}
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        className="header-menu-close"
        onClick={() => setActiveMobileMenu(false)}
        data-el-toggle=".js-mobile-menu-toggle"
      >
        <div className="size-40 d-flex items-center justify-center rounded-full bg-white">
          <div className="icon-close text-dark-1 text-16"></div>
        </div>
      </div>

      <div
        className="header-menu-bg"
        onClick={() => setActiveMobileMenu(false)}
      ></div>
    </div>
  );
}