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

const ScatteredShapesIcon = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Top-left star - Bright Orange */}
    <polygon
      points="25,10 30,25 45,25 35,35 40,50 25,40 10,50 15,35 5,25 20,25"
      fill="#FFA500"
    />

    {/* Top-right pentagon - Light Green */}
    <polygon points="75,10 85,25 80,40 70,40 65,25" fill="#98FB98" />

    {/* Center rotated ellipse - Light Blue */}
    <ellipse
      cx="50"
      cy="50"
      rx="20"
      ry="10"
      transform="rotate(45 50 50)"
      fill="#ADD8E6"
    />

    {/* Bottom-left triangle - Bright Pink */}
    <polygon points="15,75 30,90 0,90" fill="#FF1493" />

    {/* Bottom-right rectangle - Bright Yellow */}
    <rect x="65" y="70" width="25" height="15" fill="#FFFF00" />
  </svg>
);

const ScatteredSquaresIcon = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="10" y="10" width="20" height="20" fill="#FF4500" />
    <rect x="70" y="10" width="20" height="20" fill="#32CD32" />
    <rect x="40" y="40" width="20" height="20" fill="#FFD700" />
    <rect x="10" y="70" width="20" height="20" fill="#1E90FF" />
    <rect x="70" y="70" width="20" height="20" fill="#FF69B4" />
  </svg>
);

const HexagonScatteredIcon = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Top-left Hexagon */}
    <polygon
      points="30,15 40,10 50,15 55,25 50,35 40,40 30,35 25,25"
      fill="#FF1493" // Deep Pink
    />

    {/* Top-right Hexagon */}
    <polygon
      points="70,15 80,10 90,15 95,25 90,35 80,40 70,35 65,25"
      fill="#1E90FF" // Dodger Blue
    />

    {/* Center Hexagon */}
    <polygon
      points="45,40 55,35 65,40 70,50 65,60 55,65 45,60 40,50"
      fill="#32CD32" // Lime Green
    />

    {/* Bottom-left Hexagon */}
    <polygon
      points="25,55 35,50 45,55 50,65 45,75 35,80 25,75 20,65"
      fill="#FFD700" // Gold
    />

    {/* Bottom-right Hexagon */}
    <polygon
      points="75,55 85,50 95,55 100,65 95,75 85,80 75,75 70,65"
      fill="#FF4500" // Orange Red
    />
  </svg>
);

const ScatteredCircleIcon = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Top-left Circle */}
    <circle cx="25" cy="25" r="10" fill="#FF6347" /> {/* Tomato Red */}
    {/* Top-right Circle */}
    <circle cx="75" cy="25" r="12" fill="#00BFFF" /> {/* Deep Sky Blue */}
    {/* Center Circle */}
    <circle cx="50" cy="50" r="14" fill="#32CD32" /> {/* Lime Green */}
    {/* Bottom-left Circle */}
    <circle cx="25" cy="75" r="9" fill="#FFD700" /> {/* Gold */}
    {/* Bottom-right Circle */}
    <circle cx="75" cy="75" r="11" fill="#FF1493" /> {/* Deep Pink */}
  </svg>
);

const ScatteredStarIcon = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Top-left Star */}
    <polygon
      points="30,10 35,25 20,15 40,15 25,25"
      fill="#FF4500" // Dark Red (Firebrick)
    />

    {/* Top-right Star */}
    <polygon
      points="70,10 75,25 60,15 80,15 65,25"
      fill="#32CD32" // Dark Red (Dark Red)
    />

    {/* Center Star */}
    <polygon
      points="50,35 55,50 40,45 60,45 45,50"
      fill="#FFD700" // Dark Green (Dark Green)
    />

    {/* Bottom-left Star */}
    <polygon
      points="20,70 25,85 10,75 30,75 15,85"
      fill="#1E90FF" // Dark Blue (Midnight Blue)
    />

    {/* Bottom-right Star */}
    <polygon
      points="70,70 75,85 60,75 80,75 65,85"
      fill="#FF69B4" // Purple (Purple)
    />
  </svg>
);

const OverlappingHexagonsIcon = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* First hexagon (middle) */}
    <polygon
      points="50,15 60,20 60,30 50,35 40,30 40,20"
      fill="#2C3E50" // Midnight Blue
    />

    {/* Second hexagon (top-left) */}
    <polygon
      points="30,5 40,10 40,20 30,25 20,20 20,10"
      fill="#34495E" // Wet Asphalt
    />

    {/* Third hexagon (top-right) */}
    <polygon
      points="70,5 80,10 80,20 70,25 60,20 60,10"
      fill="#1ABC9C" // Turquoise
    />

    {/* Fourth hexagon (bottom-left) */}
    <polygon
      points="30,55 40,60 40,70 30,75 20,70 20,60"
      fill="#8E44AD" // Purple
    />

    {/* Fifth hexagon (bottom-right) */}
    <polygon
      points="70,55 80,60 80,70 70,75 60,70 60,60"
      fill="#E74C3C" // Red
    />
  </svg>
);

const OrbitLayerIcon = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="30" fill="#FFD700" />
    <circle cx="50" cy="50" r="20" fill="#5B2C6F" />
    <circle cx="50" cy="50" r="10" fill="#32CD32" />
    <circle cx="50" cy="50" r="4" fill="#1E90FF" />
  </svg>
);

const TriangleNestIcon = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer Triangle in Bright Pink */}
    <polygon points="50,20 80,80 20,80" fill="#FF1493" />

    {/* Middle Triangle in Bright Cyan */}
    <polygon points="50,30 70,75 30,75" fill="#00BFFF" />

    {/* Inner Triangle in Bright Yellow */}
    <polygon points="50,40 62,70 38,70" fill="#FFD700" />

    {/* Center Circle in Bright Green */}
    <circle cx="50" cy="64" r="4" fill="#32CD32" />
  </svg>
);

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
  const [hoveredLink, setHoveredLink] = useState(null);
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

  const getCardDecoration = (index) => {
    // Cycle through 3 decoration styles
    const decorationIndex = index % 6;

    switch (decorationIndex) {
      case 0:
        return <ScatteredShapesIcon />;
      case 1:
        return <ScatteredSquaresIcon />;
      case 2:
        return <HexagonScatteredIcon />;
      case 3:
        return <ScatteredCircleIcon />;
      case 4:
        return <ScatteredStarIcon />;
      case 5:
        return <OrbitLayerIcon />;
      default:
        return <SpiralBurstIcon />;
    }
  };

  // Check if a category is the "Placement Training" category
  const isPlacementTraining = (categoryId) => {
    if (!categories) return false;
    const category = categories.find((cat) => cat._id === categoryId);
    return category && category.category_name === "Placement Training";
  };

  // Function to handle course navigation with loading state
  const handleCourseClick = (e, courseId, courseSlug, categoryId) => {
    e.preventDefault();

    // Set loading state for this specific course
    setLoadingStates((prev) => ({
      ...prev,
      [courseId]: true,
    }));

    // If the category is Placement Training, navigate to static route
    if (isPlacementTraining(categoryId)) {
      setTimeout(() => {
        router.push("/b2i/pt");
      }, 800);
    } else {
      // For other categories, use dynamic route
      setTimeout(() => {
        router.push(`/courses/${courseSlug}`);
      }, 800);
    }
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
      <a
        data-barba
        className="courseMainLink"
        style={{ cursor: "pointer",marginTop:"3px" }}
        onMouseOver={() => setHoveredLink("programs")}
        onMouseOut={() => setHoveredLink(null)}
      >
        <span
          style={{
            color: isHovered || isActive("/programs") ? "#F3D66A" : "#fff", // Soft yellow text for active or hover
          }}
        >
          Programs
        </span>
        <motion.i
          className="icon-chevron-down text-13 ml-10"
          animate={isDropdownOpen ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            color: isHovered || isActive("/programs") ? "#F3D66A" : "#fff", // Soft yellow for icon on hover/active
          }}
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
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "20px",
                    }}
                  >
                    {coursesByCategory[hoveredCategory].map((course, index) => (
                      // Inside the CoursesDropdown component

                      // Existing code for the course card section with modifications
                      <div
                        key={course._id}
                        onClick={(e) => {
                          // Only handle click if course isOpen is true
                          if (course.isOpen) {
                            handleCourseClick(
                              e,
                              course._id,
                              course.slug,
                              hoveredCategory
                            );
                          }
                        }}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          cursor: course.isOpen ? "pointer" : "default",
                          opacity: course.isOpen ? 1 : 0.7,
                        }}
                      >
                        <div
                          style={{
                            background: "#fff",
                            borderRadius: "16px",
                            boxShadow:
                              "5px 1px 5px 0 rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.19)",
                            overflow: "hidden",
                            height: "auto",
                            maxHeight: "200px",
                            width: "320px",
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
                              height: "60px",
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
                                  style={{ fontSize: "24px", color: "#a0a7b2" }}
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

                          {/* Course description - Only shown for Placement Training category */}
                          {isPlacementTraining(hoveredCategory) && (
                            <div
                              style={{
                                padding: "15px",
                                flex: "1",
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <p
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
                              </p>

                              {course.isOpen && (
                                <div
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
                                          border:
                                            "2px solid rgba(0, 71, 171, 0.3)",
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
                                </div>
                              )}
                            </div>
                          )}

                          {/* For non-Placement Training courses but with isOpen true, show Learn More button */}
                          {!isPlacementTraining(hoveredCategory) && (
                            <div
                              style={{
                                padding: "15px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {course.isOpen ? (
                                <div
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
                                          border:
                                            "2px solid rgba(0, 71, 171, 0.3)",
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
                                </div>
                              ) : (
                                <>
                                  <span
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      cursor: "not-allowed",
                                      color: "#0047AB",
                                    }}
                                  >
                                    Learn More
                                    <i
                                      className="icon-chevron-right"
                                      style={{
                                        fontSize: "11px",
                                        marginLeft: "8px",
                                        color: "#0047AB",
                                        transition: "transform 0.2s ease",
                                        pointerEvents: "none",
                                      }}
                                    ></i>
                                  </span>
                                </>
                              )}
                            </div>
                          )}

                          {/* Static icon in bottom right corner, 80% visible */}
                          <div
                            style={{
                              position: "absolute",
                              bottom: "-50px",
                              right: "-30px",
                              opacity: 0.8,
                              zIndex: 10,
                            }}
                          >
                            {getCardDecoration(index)}
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
