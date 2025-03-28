"use client";
import { useDispatch, useSelector } from "react-redux";
import FAQComponent from "./Faq";
import { useEffect, useRef, useState } from "react";
import { Star, StarBorder, StarHalf } from "@mui/icons-material";
import Curriculum from "./Curriculum";
import { fetchAllFAQs } from "@/redux/slices/faq/faq";

export default function CourseDetailsSix() {
  const selectedCourse = useSelector((state) => state.courses.courses);

  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState("beginner"); // Default Level
  const [isMobileView, setIsMobileView] = useState(false);
  const [courseSlug, setCourseSlug] = useState(null);
  const matchedCourse = selectedCourse.find(
    (course) => course.slug === courseSlug
  );
  const faq = useSelector((state) => state.faq.faq);
  const matchedCourseId = matchedCourse ? matchedCourse._id : null;
  const matchedFaqData = faq.filter((i) => i.course?._id === matchedCourseId);

  // At the beginning of your component, where you declare your state variables
  const [menuItems, setMenuItems] = useState([
    { id: 1, text: "beginner", isActive: true },
    { id: 2, text: "intermediate", isActive: false },
    { id: 3, text: "advanced", isActive: false },
    { id: 4, href: "#FAQ", text: "FAQ", isActive: false },
  ]);

  // Then add this useEffect to update the menuItems when matchedCourse changes
  useEffect(() => {
    if (
      matchedCourse &&
      matchedCourse.course_level &&
      matchedCourse.course_level.length > 0
    ) {
      // Extract just the level text values
      const levelTexts = matchedCourse.course_level.map((item) =>
        item.level.toLowerCase()
      );
      // Update menuItems with these level texts
      const newMenuItems = levelTexts.map((text, index) => ({
        id: index + 1,
        text: text,
        isActive: index === 0, // First one is active by default
      }));

      // Add FAQ at the end
      newMenuItems.push({
        id: newMenuItems.length + 1,
        href: "#FAQ",
        text: "FAQ",
        isActive: false,
      });

      setMenuItems(newMenuItems);

      // Set the default selected level to the first one
      if (levelTexts.length > 0) {
        setSelectedLevel(levelTexts[0]);
      }
    }
  }, [matchedCourse]);

  useEffect(() => {
    dispatch(fetchAllFAQs());
  }, [dispatch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fullUrl = window.location.href;
      const segments = fullUrl.split("/").filter(Boolean);
      const lastSegment = segments.pop();
      setCourseSlug(lastSegment);
    }
    // Handle responsive view detection
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  const handleTabClick = (id, level) => {
    setActiveTab(id);
    setSelectedLevel(level);
  };
  const renderTabs = () => {
    if (isMobileView) {
      return (
        <>
          <section className="pt-20 layout-pb-md">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="pt-25 pb-30 px-30 shadow-2 rounded-8 border-light">
                    {menuItems.map((elm) => (
                      <div key={elm.id} className="mb-2">
                        <button
                          onClick={() => handleTabClick(elm.id, elm.text)}
                          className="tabs__button js-tabs-button js-update-pin-scene"
                          style={{
                            textDecoration:
                              activeTab === elm.id ? "underline" : "none",
                            textDecorationColor:
                              activeTab === elm.id ? "#f2775e" : "initial",
                            textDecorationThickness:
                              activeTab === elm.id ? "3px" : "initial",
                          }}
                          type="button"
                        >
                          {elm.text}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="pt-30 " style={{ backgroundColor: "#f5f0ff" }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="pt-25 pb-30 px-30 shadow-2 rounded-8 border-light">
                    {renderTabContent(activeTab, selectedLevel)}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      );
    } else {
      return (
        <section>
          <div style={{ margin: "10px" }}>
            <div className="row">
              <div className="col-lg-12">
                <div className="pt-15 pb-30 px-30  ">
                  <div className="tabs -active-purple-2 js-tabs pt-0">
                    <h2
                      style={{
                        color: "#5b2c6f",
                        marginBottom: "15px",
                        width: "auto",
                      }}
                    >
                      Your Learning Journey: A Step-by-Step Curriculum
                    </h2>
                    <div
                      className="tabs__controls d-flex js-tabs-controls"
                      style={{ borderBottom: "none" }}
                    >
                      {menuItems.map((elm, i) => (
                        <button
                          key={i}
                          onClick={() => handleTabClick(elm.id, elm.text)}
                          className={`tabs__button js-tabs-button js-update-pin-scene ml-30 ${i !== 0 ? "ml-30" : ""
                            }`}
                          style={{
                            cursor: "pointer",
                            color: activeTab === elm.id ? "#5b2c6f" : "black",
                            borderBottom:
                              activeTab === elm.id
                                ? "3px solid #5b2c6f"
                                : "none",
                            transition:
                              "color 0.3s ease-in-out, border-bottom 0.3s ease-in-out",
                          }}
                          type="button"
                        >
                          {elm.text.toUpperCase()}
                        </button>
                      ))}
                    </div>
                    <div className="tabs__content js-tabs-content">
                      {renderTabContent(activeTab, selectedLevel)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  };
  const renderTabContent = (tabId, level) => {
    switch (tabId) {
      case 1:
      case 2:
      case 3:
        return <Curriculum matchedCourse={matchedCourse} level={level} />;
      case 4:
        return <FAQComponent faq={matchedFaqData} />;
      default:
        return null;
    }
  };
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = 21; // Approximate line height in pixels (adjust as needed)
      const maxHeight = lineHeight * 3; // 3 lines max height
      setShowToggle(textRef.current.scrollHeight > maxHeight);
    }
  }, [matchedCourse?.short_description]);
  return (
    <>
      <section
        style={{
          backgroundColor: "#f5f0ff",
          marginTop: "90px",
          padding: "30px 0",
        }}
      >
        <div
          style={{
            width: "90%",
            margin: "auto",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
            backgroundColor: "#fff",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* Left Section */}
            <div style={{ flex: 1, paddingRight: "20px" }}>
              {matchedCourse && (
                <div>
                  <h2 style={{ color: "#5b2c6f", marginBottom: "10px" }}>
                    {matchedCourse.course_name}
                  </h2>
                  <div>
                    <p
                      ref={textRef}
                      style={{
                        color: "#5b2c6f",
                        fontSize: "14px",
                        lineHeight: "1.5",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        WebkitLineClamp: isExpanded ? "unset" : 3,
                        transition: "all 0.3s ease-in-out",
                        textAlign: "justify",
                      }}
                    >
                      {matchedCourse.short_description}
                    </p>

                    {showToggle && (
                      <span
                        onClick={() => setIsExpanded(!isExpanded)}
                        style={{
                          color: "#007bff", // Blue color for a link-like appearance
                          fontSize: "14px",
                          cursor: "pointer",
                          display: "inline-block",
                          marginTop: "5px",
                          textDecoration: "underline", // Adds underline to indicate clickability
                        }}
                      >
                        {isExpanded ? "View Less ▲" : "View More ▼"}
                      </span>
                    )}
                  </div>

                  {/* Star Ratings */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#f2775e",
                      }}
                    >
                      {[...Array(5)].map((_, i) => {
                        if (
                          i + 1 <=
                          Math.floor(matchedCourse?.course_rating || 0)
                        ) {
                          return (
                            <Star
                              key={i}
                              fontSize="small"
                              style={{ color: "#f2775e" }}
                            />
                          );
                        } else if (i < matchedCourse?.course_rating) {
                          return (
                            <StarHalf
                              key={i}
                              fontSize="small"
                              style={{ color: "#f2775e" }}
                            />
                          );
                        } else {
                          return (
                            <StarBorder
                              key={i}
                              fontSize="small"
                              style={{ color: "#f2775e" }}
                            />
                          );
                        }
                      })}
                    </div>
                    <span style={{ color: "#f2775e" }}>
                      {matchedCourse?.course_rating?.toFixed(2)}/5.00
                    </span>
                  </div>
                </div>
              )}

              {/* Course Details */}

              <div style={{ marginTop: "20px" }}>
                {[
                  {
                    label: "Duration",
                    value: matchedCourse?.duration,
                    icon: "⏳",
                    dataIcon: "⌛",
                  },
                  {
                    label: "Mode of Training",
                    value: matchedCourse?.mode_of_training,
                    icon: "📊",
                    dataIcon:
                      matchedCourse?.mode_of_training === "online"
                        ? "🌍"
                        : "🏢",
                    textColor:
                      matchedCourse?.mode_of_training === "online"
                        ? "#2dbd4c"
                        : "#ff3b55",
                  },
                  {
                    label: "No. of Assessments",
                    value: matchedCourse?.number_of_assessments,
                    icon: "📝",
                    dataIcon: "📄",
                  },
                  {
                    label: "No. of Projects",
                    value: matchedCourse?.projects,
                    icon: "💡",
                    dataIcon: "🚀",
                  },
                ].map((item, index, array) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 0",
                      borderBottom:
                        index === array.length - 1
                          ? "none"
                          : "1px solid #e0e0e0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#5b2c6f",
                        fontSize: "16px",
                      }}
                    >
                      <span style={{ marginRight: "10px", fontSize: "18px" }}>
                        {item.icon}
                      </span>
                      {item.label}
                    </div>
                    <div
                      style={{
                        color: item.textColor || "#5b2c6f",
                        backgroundColor: item.bgColor || "transparent",
                        padding: item.bgColor ? "4px 8px" : "0",
                        borderRadius: "5px",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <span>{item.dataIcon}</span> {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Section (Smaller Image) */}
            <div
              style={{
                width: "250px",
                textAlign: "center",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              {matchedCourse && (
                <img
                  src={matchedCourse.image}
                  alt="Course"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxWidth: "250px",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Course Tabs & Video */}
        {renderTabs()}
      </section>
    </>
  );
}
