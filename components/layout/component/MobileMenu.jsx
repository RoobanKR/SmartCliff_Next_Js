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
import { menuList } from "@/data/menu";
import { FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

export default function MobileMenu({ setActiveMobileMenu, activeMobileMenu }) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const services = useSelector(selectServices);
  const businessServices = useSelector(selectBusinessServices);
  const categories = useSelector(selectCategories);
  const courses = useSelector((state) => state.courses.courses);

  const [showMenu, setShowMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use separate state variables for different dropdown levels
  const [activeMainDropdown, setActiveMainDropdown] = useState(null);
  const [activeServiceBusiness, setActiveServiceBusiness] = useState(null);
  const [activeProgramCategory, setActiveProgramCategory] = useState(null);
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
            slug: service.slug,
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
          links: menuList[0].links[0].links.map((item) => ({
            label: item.label,
            href: item.href,
          })),
        },
        ...menuList[0].links
          .filter((item) => item.href)
          .map((item) => ({
            title: item.label,
            href: item.href,
          })),
      ],
    },
    { title: "History", href: "/history" },
    { title: "Career", href: "/career" },
    { title: "Contact", href: "/contact" },
  ];

  // Helper function to check if path is active
  const isActive = (path) => pathname.startsWith(path);

  // Helper function to handle main dropdown toggles
  const handleMainDropdownToggle = (title) => {
    // If the same dropdown is clicked, close it
    if (activeMainDropdown === title) {
      setActiveMainDropdown(null);
    } else {
      // Open the clicked dropdown and reset sub-level dropdowns
      setActiveMainDropdown(title);
      setActiveServiceBusiness(null);
      setActiveProgramCategory(null);
      setActiveCorporateDropdown(false);
    }
  };

  // Open modal function
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close modal function
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle link click for links that might contain "enquiryform"
  const handleLinkClick = (e, href) => {
    if (href.includes("enquiryform")) {
      e.preventDefault();
      openModal(); // Open the modal instead of alert
    } else {
      setActiveMobileMenu(false);
    }
  };

  return (
    <>
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
                        onClick={() => handleMainDropdownToggle(item.title)}
                      >
                        <span
                          className={
                            activeMainDropdown === item.title
                              ? "activeMenu"
                              : "inActiveMenu"
                          }
                        >
                          {item.title}
                        </span>
                        <i
                          className={`icon-chevron-right text-13 ml-10 ${
                            activeMainDropdown === item.title ? "active" : ""
                          }`}
                        ></i>
                      </div>

                      {/* Business Dropdown */}
                      {item.title === "Business" &&
                        activeMainDropdown === "Business" && (
                          <div className="toggle active">
                            {item.links.map((subItem, index) => (
                              <div key={index}>
                                {subItem.links ? (
                                  // Corporate Submenu
                                  <div
                                    className="title pl-20"
                                    onClick={() =>
                                      setActiveCorporateDropdown(
                                        !activeCorporateDropdown
                                      )
                                    }
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
                                      className={`icon-chevron-right text-13 ml-10 ${
                                        activeCorporateDropdown ? "active" : ""
                                      }`}
                                    ></i>
                                  </div>
                                ) : (
                                  // Direct Business Menu Items
                                  <Link
                                    href={subItem.href}
                                    className="title pl-20"
                                    onClick={(e) =>
                                      handleLinkClick(e, subItem.href)
                                    }
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
                                        className={`link ${
                                          isActive(link.href)
                                            ? "activeMenu"
                                            : "inActiveMenu"
                                        }`}
                                        onClick={(e) =>
                                          handleLinkClick(e, link.href)
                                        }
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

                      {/* Services Dropdown */}
                      {item.title === "Services" &&
                        activeMainDropdown === "Services" && (
                          <div className="toggle active">
                            {item.links?.map((business, index) => (
                              <div key={index}>
                                <div
                                  className="title pl-20"
                                  onClick={() => {
                                    setActiveServiceBusiness(
                                      activeServiceBusiness === business.id
                                        ? null
                                        : business.id
                                    );
                                  }}
                                >
                                  <span
                                    className={
                                      activeServiceBusiness === business.id
                                        ? "activeMenu"
                                        : "inActiveMenu"
                                    }
                                  >
                                    {business.title}
                                  </span>
                                  <i
                                    className={`icon-chevron-right text-13 ml-10 ${
                                      activeServiceBusiness === business.id
                                        ? "active"
                                        : ""
                                    }`}
                                  ></i>
                                </div>

                                {activeServiceBusiness === business.id && (
                                  <div className="pl-30">
                                    {business.links?.map(
                                      (service, serviceIndex) => (
                                        <Link
                                          key={serviceIndex}
                                          href={service.href}
                                          className={`link ${
                                            pathname === service.href
                                              ? "activeMenu"
                                              : "inActiveMenu"
                                          }`}
                                          onClick={(e) =>
                                            handleLinkClick(e, service.href)
                                          }
                                          style={{
                                            display: "block",
                                            padding: "10px 0",
                                          }}
                                        >
                                          {service.label}
                                        </Link>
                                      )
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                      {/* Programs Dropdown */}
                      {item.title === "Programs" &&
                        activeMainDropdown === "Programs" && (
                          <div className="toggle active">
                            {item.links?.map((category, index) => (
                              <div key={index}>
                                <div
                                  className="title pl-20"
                                  onClick={() => {
                                    setActiveProgramCategory(
                                      activeProgramCategory === category.id
                                        ? null
                                        : category.id
                                    );
                                  }}
                                >
                                  <span
                                    className={
                                      activeProgramCategory === category.id
                                        ? "activeMenu"
                                        : "inActiveMenu"
                                    }
                                  >
                                    {category.title}
                                  </span>
                                  <i
                                    className={`icon-chevron-right text-13 ml-10 ${
                                      activeProgramCategory === category.id
                                        ? "active"
                                        : ""
                                    }`}
                                  ></i>
                                </div>

                                {activeProgramCategory === category.id && (
                                  <div className="pl-30">
                                    {category.links?.map(
                                      (course, courseIndex) => (
                                        <Link
                                          key={courseIndex}
                                          href={course.href}
                                          className={`link ${
                                            pathname === course.href
                                              ? "activeMenu"
                                              : "inActiveMenu"
                                          }`}
                                          onClick={(e) =>
                                            handleLinkClick(e, course.href)
                                          }
                                          style={{
                                            display: "block",
                                            padding: "10px 0",
                                          }}
                                        >
                                          {course.label}
                                        </Link>
                                      )
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="title"
                      onClick={(e) => handleLinkClick(e, item.href)}
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

      {/* Enquiry Modal with proper overlay styling */}
      {isModalOpen && (
        <motion.div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(5px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100000,
            overflowY: "hidden",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Modal Box - Perfectly Centered */}
          <motion.div
            style={{
              backgroundColor: "rgb(255, 255, 255)",
              padding: "20px 30px",
              borderRadius: "20px",
              width: "500px",
              height: "95%",
              position: "relative",
              zIndex: 10000,
              display: "flex",
              flexDirection: "column", // Ensure proper layout
            }}
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
                position: "sticky",
                top: "0",
                backgroundColor: "white",
                zIndex: 100,
                paddingBottom: "10px",
              }}
            >
              <h1
                style={{
                  fontSize: "30px",
                  fontWeight: "normal",
                  fontFamily: "'Dancing Script', cursive",
                  color: "#000",
                  margin: "0",
                  position: "relative",
                  padding: "0 0 10px 0",
                }}
              >
                Enquiry Form
                <span
                  style={{
                    position: "absolute",
                    left: "0",
                    bottom: "0",
                    height: "5px",
                    width: "55px",
                    backgroundColor: "black",
                  }}
                ></span>
                {/* Bottom Thin Line */}
                <span
                  style={{
                    position: "absolute",
                    left: "0",
                    bottom: "2px",
                    height: "1px",
                    width: "95%",
                    maxWidth: "255px",
                    backgroundColor: "black",
                  }}
                ></span>
              </h1>

              <button
                type="button"
                onClick={closeModal}
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "8px",
                  padding: "4px 6px",
                  border: "none",
                  backgroundColor: "#b91616",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  color: "white",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Content */}
            <div
              style={{
                flexGrow: 1, // Takes remaining height
                overflowY: "auto",
                paddingRight: "10px",
                scrollbarWidth: "thin",
              }}
            >
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
