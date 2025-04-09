import React, { useState, useEffect } from "react";
import {
  ExpandLess,
  ExpandMore,
  AccessTime,
  Description,
  Code,
  CheckCircle,
  Laptop,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

const Curriculum = ({ level, matchedCourse }) => {
  const [openCard, setOpenCard] = useState(null);
  const [filteredLevels, setFilteredLevels] = useState([]);
  const selectedCourse = useSelector((state) => state.courses.courses);
  const [courseSlug, setCourseSlug] = useState(null);

  const faq = useSelector((state) => state.faq.faq);
  const matchedCourseId = matchedCourse ? matchedCourse._id : null;
  const matchedFaqData = faq.filter((i) => i.course?._id === matchedCourseId);

  useEffect(() => {
    if (matchedCourse?.course_level) {
      const filtered = matchedCourse.course_level.filter(
        (lvl) => lvl.level === level
      );
      setFilteredLevels(filtered);
    }
  }, [matchedCourse, level]);

  const [menuItems, setMenuItems] = useState([
    { id: 1, text: "course outline", isActive: true },
    { id: 2, text: "course summary", isActive: false },
    { id: 3, text: "software tools", isActive: false },
    { id: 4, text: "FAQ", isActive: false },
  ]);

  const [activeTabId, setActiveTabId] = useState(1); // default to Course Outline

  const handleTabClick = (id) => {
    setActiveTabId((prev) => (prev === id ? null : id));

    const updatedMenuItems = menuItems.map((item) => ({
      ...item,
      isActive: item.id === id ? activeTabId !== id : false,
    }));
    setMenuItems(updatedMenuItems);
  };

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
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    backgroundColor: "#5b2c6f",
                    color: "white",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "10px",
                    fontSize: "14px",
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
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                  borderBottom: "1px solid #ddd",
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
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#5b2c6f",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "10px",
                  }}
                >
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
                </div>
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

  const toggleCard = (index) => {
    setOpenCard(openCard === index ? null : index);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "20px",
        padding: "20px",
        margin: "auto",
        maxWidth: "1200px",
      }}
    >
      {/* Left Side - Lesson Content */}
      <div
        style={{
          flex: "2",
          width: "100%",
        }}
      >
        <div style={{ flex: "2", width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              width: "100%",
            }}
          >
            {menuItems.map((item) => (
              <div key={item.id} style={{ width: "100%" }}>
                <button
                  onClick={() => handleTabClick(item.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    padding: "12px 20px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    backgroundColor: item.isActive ? "#5b2c6f" : "#fff",
                    color: item.isActive ? "#fff" : "#333",
                    fontWeight: item.isActive ? "600" : "normal",
                    fontSize: "16px",
                    cursor: "pointer",
                    gap: "12px",
                    transition: "all 0.3s ease",
                    boxShadow: item.isActive
                      ? "0 2px 6px rgba(0,0,0,0.2)"
                      : "none",
                    textAlign: "left",
                  }}
                >
                  <Code
                    style={{
                      fontSize: "20px",
                      color: item.isActive ? "#fff" : "#5b2c6f",
                    }}
                  />
                  {item.text.charAt(0).toUpperCase() + item.text.slice(1)}
                </button>

                {/* Content below button */}
                {item.isActive && (
                  <div style={{ marginTop: "10px", paddingLeft: "10px" }}>
                    {item.id === 1 && (
                      <CourseOutline
                        matchedCourse={matchedCourse}
                        level={level}
                      />
                    )}
                    {item.id === 2 && (
                      <CourseSummary
                        matchedCourse={matchedCourse}
                        level={level}
                      />
                    )}
                    {item.id === 3 && (
                      <SoftwareTools
                        matchedCourse={matchedCourse}
                        level={level}
                      />
                    )}
                    {item.id === 4 && <p>FAQ content goes here...</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Instructor Panel */}
      {/* <div
        style={{
          flex: "1",
          width: "100%",
          backgroundColor: "white",
          borderRadius: "0.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          padding: "1.25rem",
        }}
      >
        <div style={{ marginBottom: "1.5rem" }}>
          <h4
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "1.125rem",
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: "1rem",
              paddingBottom: "0.5rem",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <Laptop
              style={{
                marginRight: "0.5rem",
                color: "#5b2c6f",
              }}
            />
            Tools & Software
          </h4>
          {filteredLevels.length > 0 &&
          filteredLevels[0]?.tool_software?.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))",
                gap: "1rem",
              }}
            >
              {filteredLevels.map((levelData) =>
                levelData.tool_software.map((tool, toolIndex) => (
                  <div
                    key={toolIndex}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "0.75rem",
                      backgroundColor: "#f9fafb",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <img
                      style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        objectFit: "contain",
                        marginBottom: "0.5rem",
                      }}
                      src={tool.image}
                      alt={tool.software_name}
                    />
                    <p
                      style={{
                        fontSize: "0.75rem",
                        textAlign: "center",
                        fontWeight: "500",
                        color: "#4b5563",
                      }}
                    >
                      {tool.software_name}
                    </p>
                  </div>
                ))
              )}
            </div>
          ) : (
            <p>No tools available.</p>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default Curriculum;
