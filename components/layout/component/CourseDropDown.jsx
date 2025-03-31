import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategories,
  selectCategories,
} from "@/redux/slices/category/category";
import { fetchCourses } from "@/redux/slices/course/course";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
 
const SequentialDots = () => {
  const [dots, setDots] = useState(1);
 
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev < 3 ? prev + 1 : 1));
    }, 300);
 
    return () => clearInterval(interval);
  }, []);
 
  return (
    <span
      style={{
        width: "24px",
        display: "inline-block",
        textAlign: "left",
      }}
    >
      {".".repeat(dots)}
    </span>
  );
};
 
const CoursesDropdown = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const courses = useSelector((state) => state.courses.courses);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
 
  // Loading states for each course
  const [loadingStates, setLoadingStates] = useState({});
 
  const [isHovered, setIsHovered] = useState(false);
 
  useEffect(() => {
    if (
      isDropdownOpen &&
      categories &&
      categories.length > 0 &&
      !hoveredCategory
    ) {
      setHoveredCategory(categories[0]._id);
    }
  }, [isDropdownOpen, categories, hoveredCategory]);
 
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
 
  const isActive = (path) => pathname.startsWith(path);
 
  // Function to handle course navigation with loading state
  const handleCourseClick = (e, courseId, courseSlug) => {
    e.preventDefault();
 
    // Set loading state for this specific course
    setLoadingStates((prev) => ({
      ...prev,
      [courseId]: true,
    }));
 
    // Simulate navigation delay (you can remove this in production)
    setTimeout(() => {
      router.push(`/courses/${courseSlug}`);
    }, 800);
  };
 
  // Function to get icon based on course name
  const getIconFromCourseName = (courseName) => {
    // Default icon if none matches
    return "icon-book-open";
  };
 
  return (
    <li
      className="menu-item-has-children "
      onMouseEnter={() => {
        setIsDropdownOpen(true);
        setIsHovered(true); // Set hovered state to true on mouse enter
      }}
      onMouseLeave={() => {
        setIsDropdownOpen(false);
        setIsHovered(false); // Set hovered state to false on mouse leave
      }}
    >
      <a data-barba className="courseMainLink" style={{ cursor: "pointer" }}>
        <span style={{ color: isHovered ? "#f2775e" : "" }}>Programs</span>
        {/* <i className="icon-chevron-right text-13 ml-10"></i> */}
        <motion.i
          className="icon-chevron-down text-13 ml-10"
          animate={isDropdownOpen ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: isHovered || isActive("/business") ? "#f2775e" : "" }}
        />
      </a>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            className="mega-dropdown-container "
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: "fixed",
              // top: "70px",
              // top: pathname === "/" ? "110px" : "60px",
 
              left: "60px",
              transform: isDropdownOpen
                ? "translateX(-50%) scale(1)"
                : "translateX(-50%) scale(0.95)",
              opacity: isDropdownOpen ? 1 : 0,
              transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
              width: "90%",
              boxShadow: "0px 10px 50px rgba(0, 0, 0, 0.1)",
              zIndex: "1000",
              padding: "10px 20px",
              borderRadius: "12px",
              background: "white",
              border: "1px solid #e0e0e0",
              overflow: "hidden",
            }}
          >
            <div
              className="mega-dropdown-wrapper"
              style={{
                display: "flex",
                maxWidth: "1400px",
                margin: "0 auto",
              }}
            >
              {/* Left sidebar categories */}
              <div
                className="categories-sidebar"
                style={{
                  width: "260px",
                  backgroundColor: "#f9f9f9",
                  borderRight: "1px solid #eaeaea",
                  height: "450px", // Fixed height
                  overflowY: "auto", // Enable scrolling
                  overflowX: "hidden",
                  scrollbarWidth: "thin", // For Firefox
                  scrollbarColor: "#ccc transparent", // Custom scrollbar color
                }}
              >
                <ul
                  style={{
                    listStyle: "none",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  {categories &&
                    categories.map((category) => (
                      <motion.li
                        key={category._id}
                        onMouseEnter={() => setHoveredCategory(category._id)}
                        style={{
                          padding: "0",
                          borderBottom: "1px solid #eaeaea",
                          backgroundColor:
                            hoveredCategory === category._id
                              ? "#fff"
                              : "transparent",
                          color:
                            hoveredCategory === category._id
                              ? "#f2775e"
                              : "black",
                          transition:
                            "background-color 0.2s ease, transform 0.2s ease color 0.2s ease",
                          transform:
                            hoveredCategory === category._id
                              ? "scale(1.05)"
                              : "scale(1)",
                        }}
                      >
                        <a
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "12px 20px",
                            textDecoration: "none",
                            color:
                              hoveredCategory === category._id
                                ? "#333"
                                : "#555",
                            fontWeight:
                              hoveredCategory === category._id ? "500" : "400",
                          }}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div
                              style={{
                                width: "28px",
                                height: "28px",
                                marginRight: "14px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Image
                                width={510}
                                height={360}
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  transition: "filter 0.3s ease",
                                  filter:
                                    hoveredCategory === category._id
                                      ? "brightness(0) saturate(100%) invert(50%) sepia(100%) hue-rotate(10deg)"
                                      : "none",
                                }}
                                src={category.image}
                                alt="image"
                              />
                            </div>
                            <span style={{ fontSize: "14px" }}>
                              {category.category_name}
                            </span>
                          </div>
                          <i
                            className="icon-chevron-right"
                            style={{
                              fontSize: "12px",
                              marginLeft: "5px",
                            }}
                          ></i>
                        </a>
                      </motion.li>
                    ))}
                </ul>
              </div>
 
              {/* Right content area - Course cards */}
              <div
                className="courses-content"
                style={{
                  flex: "1",
                  padding: "20px 30px",
                  overflowY: "auto",
                  height: "450px",
                  scrollbarWidth: "thin", // For Firefox
                  scrollbarColor: "#ccc transparent",
                  backgroundColor: "#fff",
                }}
              >
                {hoveredCategory && coursesByCategory[hoveredCategory] ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "20px",
                    }}
                  >
                    {coursesByCategory[hoveredCategory].map((course) => (
                      <div
                        key={course._id}
                        // onClick={(e) =>
                        //   handleCourseClick(e, course._id, course.slug)
                        // }
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            background: "#fff",
                            borderRadius: "16px",
                            boxShadow:
                              "5px 1px 5px 0 rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.19)",
                            overflow: "hidden",
                            height: "60px", // Fixed height
                            width: "290px", // Fixed width
                            display: "flex",
                            flexDirection: "column",
                            transition:
                              "transform 0.3s ease, box-shadow 0.3s ease",
                            position: "relative",
                            border: "1px solid #f0f0f0",
                          }}
                        >
                          {/* Course header with logo */}
                          <div
                            style={{
                              padding: "15px",
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                              borderBottom: "1px solid #f0f0f0",
                              height: "60px", // Fixed height for header
                            }}
                          >
                            <div
                              style={{
                                width: "30px",
                                height: "30px",
                                backgroundColor: "#f7f7f7",
                                borderRadius: "4px",
                                overflow: "hidden",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {course.image ? (
                                <Image
                                  src={
                                    course.image.startsWith("http")
                                      ? course.image
                                      : `/uploads/${course.image}`
                                  }
                                  alt={course.course_name}
                                  width={32}
                                  height={32}
                                  style={{ objectFit: "contain" }}
                                />
                              ) : (
                                <i
                                  className={getIconFromCourseName(
                                    course.course_name
                                  )}
                                  style={{
                                    fontSize: "24px",
                                    color: "#a0a7b2",
                                  }}
                                ></i>
                              )}
                            </div>
                            <h3
                              style={{
                                fontSize: "14px",
                                fontWeight: "600",
                                margin: "0",
                                color: "#333",
                                lineHeight: "1.4",
                              }}
                            >
                              {course.course_name}
                            </h3>
                          </div>
 
                          {/* Course description */}
                          <div
                            style={{
                              padding: "15px",
                              flex: "1",
                              display: "flex",
                              flexDirection: "column",
                              height: "140px", // Fixed height for description area
                            }}
                          >
                            {/* <p
                              style={{
                                fontSize: "12px",
                                color: "#6B7280",
                                margin: "0 0 12px 0",
                                lineHeight: "1.5",
                                flex: "1",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "3",
                                WebkitBoxOrient: "vertical",
                              }}
                            >
                              {course.short_description ||
                                `Master ${course.course_name} with our comprehensive curriculum designed for industry professionals.`}
                            </p> */}
 
                            {/* Learn More button with loading state */}
                            {/* <div
                              style={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#0047AB",
                                display: "flex",
                                alignItems: "center",
                                position: "relative",
                              }}
                            >
                              {loadingStates[course._id] ? (
                                <>
                                  <span>
                                    Loading
                                    <SequentialDots />
                                  </span>
                                  <span
                                    style={{
                                      marginLeft: "8px",
                                      display: "inline-block",
                                      width: "16px",
                                      height: "16px",
                                      border: "2px solid rgba(0, 71, 171, 0.3)",
                                      borderRadius: "50%",
                                      borderTopColor: "#0047AB",
                                      animation: "spin 1s linear infinite",
                                    }}
                                  />
                                  <style jsx>{`
                                    @keyframes spin {
                                      to {
                                        transform: rotate(360deg);
                                      }
                                    }
                                  `}</style>
                                </>
                              ) : (
                                <>
                                  Learn More
                                  <i
                                    className="icon-chevron-right"
                                    style={{
                                      fontSize: "11px",
                                      marginLeft: "8px",
                                      color: "#0047AB",
                                      transition: "transform 0.2s ease",
                                    }}
                                  ></i>
                                </>
                              )}
                            </div> */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "350px",
                      color: "#777",
                    }}
                  >
                    <i
                      className="icon-book-open"
                      style={{
                        fontSize: "40px",
                        color: "#ddd",
                        marginBottom: "15px",
                      }}
                    ></i>
                    {hoveredCategory
                      ? "No courses available for this category"
                      : "Select a category to view courses"}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};
 
export default CoursesDropdown;
 
 