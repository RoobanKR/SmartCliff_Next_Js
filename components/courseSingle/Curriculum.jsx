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

const Curriculum = ({ matchedCourse, level }) => {
  const [openCard, setOpenCard] = useState(null);
  const [filteredLevels, setFilteredLevels] = useState([]);

  useEffect(() => {
    if (matchedCourse?.course_level) {
      const filtered = matchedCourse.course_level.filter(
        (lvl) => lvl.level === level
      );
      setFilteredLevels(filtered);
    }
  }, [matchedCourse, level]);

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
        {filteredLevels.length > 0 ? (
          filteredLevels.map((levelData, levelIndex) => (
            <div key={levelIndex}>
              {levelData.lessons.map((lesson, lessonIndex) => (
                <div
                  key={lessonIndex}
                  style={{
                    marginBottom: "12px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                    transition: "0.3s ease-in-out",
                  }}
                >
                  {/* Lesson Header */}
                  <div
                    onClick={() => toggleCard(`${levelIndex}-${lessonIndex}`)}
                    style={{
                      padding: "16px",
                      backgroundColor:
                        openCard === `${levelIndex}-${lessonIndex}`
                          ? "#f2775e"
                          : "#5b2c6f",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      color: "white",
                      transition: "background-color 0.3s ease",
                      flexWrap: "wrap",
                    }}
                  >
                    {/* Lesson Title & Icon */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        flex: 1,
                        minWidth: "200px",
                      }}
                    >
                      <Code style={{ fontSize: "20px" }} />
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "16px",
                          fontWeight: "bold",
                          flex: 1,
                          color: "white",
                        }}
                      >
                        {lesson.title}
                      </h3>
                    </div>
                    {/* Right Side - Duration & Expand Icon */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      {/* Duration Badge */}
                      <div
                        style={{
                          backgroundColor:
                            openCard === `${levelIndex}-${lessonIndex}`
                              ? "#eef2f6"
                              : "#f5f0ff",
                          color: "#565656",
                          fontSize: "12px",
                          fontWeight: "bold",
                          padding: "6px 12px",
                          borderRadius: "20px",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <AccessTime style={{ fontSize: "16px" }} />
                        {lesson.duration ? `${lesson.duration} hrs` : "N/A"}
                      </div>

                      {/* Expand/Collapse Icon */}
                      <div style={{ fontSize: "20px" }}>
                        {openCard === `${levelIndex}-${lessonIndex}` ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Lesson Content (Dropdown) */}
                  <div
                    style={{
                      maxHeight:
                        openCard === `${levelIndex}-${lessonIndex}`
                          ? "250px"
                          : "0",
                      overflow: "auto",
                      transition: "max-height 0.4s ease-in-out",
                      backgroundColor: "#f9f9f9",
                      padding:
                        openCard === `${levelIndex}-${lessonIndex}`
                          ? "16px"
                          : "0",
                      borderTop: "1px solid #ddd",
                    }}
                  >
                    {openCard === `${levelIndex}-${lessonIndex}` && (
                      <div>
                        <h4
                          style={{
                            fontSize: "15px",
                            fontWeight: "bold",
                            color: "#333",
                            marginBottom: "8px",
                            borderBottom: "2px solid #ddd",
                          }}
                        >
                          <Description
                            style={{
                              fontSize: "30px",
                              marginRight: "5px",
                              color: "#5b2c6f",
                            }}
                          />
                          Programming Language Fundamentals:
                        </h4>
                        {Array.isArray(lesson.content) &&
                          lesson.content.length > 0 ? (
                          <ul
                            style={{
                              paddingLeft: "20px",
                              marginTop: "8px",
                              listStyleType: "none",
                            }}
                          >
                            {lesson.content.map((item, index) => (
                              <li
                                key={index}
                                style={{
                                  marginBottom: "6px",
                                  fontSize: "14px",
                                  display: "flex",
                                  gap: "8px",
                                }}
                              >
                                <CheckCircle
                                  style={{ color: "#5b2c6f", fontSize: "18px" }}
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p
                            style={{
                              fontSize: "14px",
                              fontStyle: "italic",
                              color: "#888",
                            }}
                          >
                            No description available
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p
            style={{
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            No lessons available for{" "}
            <span style={{ color: "#ff5722" }}>{level}</span>.
          </p>
        )}
      </div>
      {/* Right Side - Instructor Panel */}
      <div
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
      </div>
    </div>
  );

};

export default Curriculum;
