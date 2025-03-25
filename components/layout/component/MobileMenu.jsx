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

  // Main menu items with Services and Courses dropdowns
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
      title: "Courses",
      isDropdown: true,
      links: categories?.map((category) => ({
        title: category.category_name,
        id: category._id,
        links: coursesByCategory[category._id]?.map((course) => ({
          label: course.course_name,
          href: `/course/${course.slug}`,
        })),
      })),
    },
    { title: "Business", isDropdown: true, links: [] },
    { title: "Review", href: "/" },
    { title: "Career", href: "/" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <div
      className={`header-menu js-mobile-menu-toggle ${
        activeMobileMenu ? "-is-el-visible" : ""
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
                        setActiveBusinessService((prev) =>
                          prev === item.title ? null : item.title
                        );
                        setActiveService(null);
                        setActiveCategory(null);
                      }}
                    >
                      <span
                        className={
                          activeBusinessService === item.title
                            ? "activeMenu"
                            : "inActiveMenu"
                        }
                      >
                        {item.title}
                      </span>
                      <i
                        className={`icon-chevron-right text-13 ml-10 ${
                          activeBusinessService === item.title ? "active" : ""
                        }`}
                      ></i>
                    </div>

                    {activeBusinessService === item.title &&
                      item.links?.map((subItem, index) => (
                        <div key={index} className="toggle active">
                          <div
                            className="title pl-20"
                            onClick={() => {
                              if (item.title === "Services") {
                                setActiveService((prev) =>
                                  prev === subItem.id ? null : subItem.id
                                );
                              } else if (item.title === "Courses") {
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
                                (item.title === "Courses" &&
                                  activeCategory === subItem.id)
                                  ? "activeMenu"
                                  : "inActiveMenu"
                              }
                            >
                              {subItem.title}
                            </span>
                            <i
                              className={`icon-chevron-right text-13 ml-10 ${
                                (item.title === "Services" &&
                                  activeService === subItem.id) ||
                                (item.title === "Courses" &&
                                  activeCategory === subItem.id)
                                  ? "active"
                                  : ""
                              }`}
                            ></i>
                          </div>

                          {((item.title === "Services" &&
                            activeService === subItem.id) ||
                            (item.title === "Courses" &&
                              activeCategory === subItem.id)) && (
                            <div className="pl-30">
                              {subItem.links?.map((link, linkIndex) => (
                                <Link
                                  key={linkIndex}
                                  href={link.href}
                                  className={`link ${
                                    pathname === link.href
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
