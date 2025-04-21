"use client";
import { useDispatch, useSelector } from "react-redux";
import FAQComponent from "./Faq";
import { useEffect, useRef, useState } from "react";
import { Star, StarBorder, StarHalf } from "@mui/icons-material";
import { fetchAllFAQs } from "@/redux/slices/faq/faq";

export default function CourseDetailsSix() {
  const selectedCourse = useSelector((state) => state.courses.courses);

  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(1); // Default to Course Outline
  const [isMobileView, setIsMobileView] = useState(false);
  const [courseSlug, setCourseSlug] = useState(null);
  const matchedCourse = selectedCourse.find(
    (course) => course.slug === courseSlug
  );
  const faq = useSelector((state) => state.faq.faq);
  const matchedCourseId = matchedCourse ? matchedCourse._id : null;
  const matchedFaqData = faq.filter((i) => i.course?._id === matchedCourseId);

  // Updated menu items based on the new requirements
  const [menuItems, setMenuItems] = useState([
    { id: 1, text: "course outline", isActive: true },
    { id: 2, text: "course summary", isActive: false },
    { id: 3, text: "software tools", isActive: false },
    { id: 4, text: "FAQ", isActive: false },
  ]);

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

  const handleTabClick = (id) => {
    setActiveTab(id);

    // Update active status in menuItems
    const updatedMenuItems = menuItems.map((item) => ({
      ...item,
      isActive: item.id === id,
    }));
    setMenuItems(updatedMenuItems);
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
                          onClick={() => handleTabClick(elm.id)}
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
                    {renderTabContent(activeTab)}
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
                          onClick={() => handleTabClick(elm.id)}
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
                      {renderTabContent(activeTab)}
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

  // Render content based on active tab
  const renderTabContent = (tabId) => {
    switch (tabId) {
      case 1: // Course Outline
        return <CourseOutline matchedCourse={matchedCourse} />;
      case 2: // Course Summary
        return <CourseSummary matchedCourse={matchedCourse} />;
      case 3: // Software Tools
        return <SoftwareTools matchedCourse={matchedCourse} />;
      case 4: // FAQ
        return <FAQComponent faq={matchedFaqData} />;
      default:
        return null;
    }
  };

  // Course Outline Component
  const CourseOutline = ({ matchedCourse }) => {
    if (!matchedCourse || !matchedCourse.courseOutline?.modules) {
      return <p>No course outline available.</p>;
    }

    return (
      <div style={{ padding: "20px" }}>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {matchedCourse.courseOutline.modules.map((module, index) => (
            <li
              key={index}
              style={{
                marginBottom: "10px",
                padding: "12px 15px",
                backgroundColor: "#f9f9f9",
                borderLeft: "4px solid #5b2c6f",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    backgroundColor: "#5b2c6f",
                    color: "white",
                    borderRadius: "50%",
                    minWidth: "32px",
                    minHeight: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "10px",
                    fontSize: "1rem", // responsive font size
                    lineHeight: "1",
                    flexShrink: 0,
                  }}
                >
                  {index + 1}
                </span>
                <span style={{ fontSize: "16px" }}>{module}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Course Summary Component
  const CourseSummary = ({ matchedCourse }) => {
    if (
      !matchedCourse ||
      !matchedCourse.courseSummary ||
      matchedCourse.courseSummary.length === 0
    ) {
      return <p>No course summary available.</p>;
    }

    return (
      <div style={{ padding: "20px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#5b2c6f", color: "white" }}>
              <th
                style={{
                  padding: "12px 15px",
                  textAlign: "left",
                  borderRadius: "8px 0 0 0",
                }}
              >
                Course Elements
              </th>
              <th
                style={{
                  padding: "12px 15px",
                  textAlign: "center",
                  borderRadius: "0 8px 0 0",
                }}
              >
                Hours
              </th>
            </tr>
          </thead>
          <tbody>
            {matchedCourse.courseSummary.map((item, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: item.elements === "Total in Hours" ? "#e8daef" : index % 2 === 0 ? "#f9f9f9" : "white",
                  borderBottom: "1px solid #ddd",
                  fontWeight: item.elements === "Total in Hours" ? "bold" : "normal",
                }}
              >
                <td style={{ padding: "12px 15px" }}>{item.elements}</td>
                <td style={{ padding: "12px 15px", textAlign: "center" }}>
                  {item.hours} hrs
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Software Tools Component
  const SoftwareTools = ({ matchedCourse }) => {
    // This is placeholder. In a real implementation, you would fetch tool/software data
    // For now, we're creating a visual representation based on the data structure
    return (
      <div style={{ padding: "20px" }}>
        {matchedCourse &&
          matchedCourse.tool_software &&
          matchedCourse.tool_software.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: "20px",
            }}
          >
            {matchedCourse.tool_software.map((tool, index) => (
              <div
                key={index}
                style={{
                  padding: "10px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* <div
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#5b2c6f",
                    // borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "10px",
                  }}
                > */}
                <img
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    objectFit: "contain",
                    marginBottom: "0.5rem",
                  }}
                  src={tool.image}
                  alt={tool.software_name}
                />{" "}
                {/* </div> */}
                <p style={{ textAlign: "center", margin: 0 }}>
                  {tool.software_name}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No software tools available for this course.</p>
        )}
      </div>
    );
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


