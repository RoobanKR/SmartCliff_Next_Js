import { getAllSkillVerticals } from "@/redux/slices/mca/skillVertical/skillVertical";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TableComponent = ({ selectedSubmain, collegeId }) => {
  const dispatch = useDispatch();
  const skillVertical = useSelector(
    (state) => state.skillVertical.skillVerticals
  );

  useEffect(() => {
    dispatch(getAllSkillVerticals());
  }, [dispatch]);

  const filteredSkillVertical = skillVertical.filter(
    (i) => i.college?._id === collegeId
  );

  const matchedSkillVerticals = filteredSkillVertical.reduce((acc, item) => {
    const matchingItems = item.skillVerticals.filter(
      (subItem) => subItem.name === selectedSubmain.inner_subheading
    );
    if (matchingItems.length > 0) acc.push(...matchingItems);
    return acc;
  }, []);

  const [activeTab, setActiveTab] = useState("Prerequisites");

  const getTableData = () => {
    if (!matchedSkillVerticals.length) return [];

    const currentVertical = matchedSkillVerticals[0];

    if (activeTab === "Prerequisites" && currentVertical.prerequisites) {
      return currentVertical.prerequisites.map((subject) => ({
        name: subject,
        type: "prerequisite",
      }));
    } else if (activeTab === "Core Vertical Subjects") {
      const result = [];

      // Add core subjects
      if (currentVertical.coreSubjects) {
        currentVertical.coreSubjects.forEach((subject) => {
          result.push({ name: subject, type: "core" });
        });
      }

      // Add mini projects
      if (
        currentVertical.miniProjects &&
        currentVertical.miniProjects.length > 0
      ) {
        currentVertical.miniProjects.forEach((project, index) => {
          result.push({
            name: project.name,
            type: "miniproject",
            descriptions: project.description || [],
          });

          // Add descriptions as sub-items if they exist
          if (project.description && project.description.length > 0) {
            project.description.forEach((desc) => {
              result.push({
                name: desc,
                type: "description",
                isSubItem: true,
              });
            });
          }
        });
      }

      // Add major project
      if (currentVertical.majorProject) {
        result.push({
          name: currentVertical.majorProject.name,
          type: "majorproject",
        });
      }

      return result;
    }

    return [];
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        overflow: "hidden",
        width: "100%",
        maxWidth: "950px",
        margin: "24px auto",
        marginTop: "-30px",
        borderRadius: "16px",
      }}
    >
      {/* Submain Heading */}
      <div
        style={{
          position: "relative",
          padding: "15px 0px 5px 0px",
          marginBottom: "10px",
        }}
      >
        <h2
          style={{
            margin: "0",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span style={{ marginRight: "0px" }}>🎓</span>
          {selectedSubmain.inner_heading}
          <span
            style={{
              content: '""',
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
              content: '""',
              position: "absolute",
              left: "0",
              bottom: "2px",
              height: "1px",
              width: "95%",
              maxWidth: "255px",
              backgroundColor: "black",
            }}
          ></span>
        </h2>
      </div>

      {/* Header Section with Gradient */}
      <div
        style={{
          position: "relative",
          background: "linear-gradient(135deg, #3730a3 0%, #7c3aed 100%)",
          padding: "clamp(20px, 4vw, 25px) 24px",
          color: "white",
          textAlign: "center",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "clamp(22px, 5vw, 32px)",
              fontWeight: "800",
              marginBottom: "18px",
              letterSpacing: "0.5px",
              color: "white",
              textShadow: "0 7px 4px rgba(0, 0, 0, 0.2)",
              overflowWrap: "break-word",
            }}
          >
            {selectedSubmain.inner_subheading}
          </h1>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              padding: "5px 20px",
              borderRadius: "30px",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <span style={{ fontSize: "20px", marginRight: "10px" }}>👥</span>
            <span style={{ fontWeight: "600" }}>
              {matchedSkillVerticals.length > 0
                ? matchedSkillVerticals[0].batchSize
                : "N/A"}
            </span>
          </div>
        </div>

        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(4px)",
            display: "none",
            "@media (min-width: 768px)": {
              display: "block",
            },
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "15px",
            left: "15px",
            width: "25px",
            height: "25px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(4px)",
            display: "none",
            "@media (min-width: 768px)": {
              display: "block",
            },
          }}
        ></div>
      </div>

      {/* Tab Navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: window.innerWidth < 640 ? "column" : "row",
          gap: "12px",
          padding: "16px",
        }}
      >
        {/* Using window.innerWidth as a reactive approach for conditional styling */}
        <TabButton
          label="Prerequisites"
          emoji="📚"
          isActive={activeTab === "Prerequisites"}
          onClick={() => setActiveTab("Prerequisites")}
        />
        <TabButton
          label="Core Vertical Subjects"
          emoji="🔧"
          isActive={activeTab === "Core Vertical Subjects"}
          onClick={() => setActiveTab("Core Vertical Subjects")}
        />
      </div>

      {/* Content Area */}
      <div style={{ padding: "20px 16px" }}>
        <h2
          style={{
            fontSize: "clamp(18px, 4vw, 22px)",
            fontWeight: "700",
            marginTop: "0",
            marginBottom: "20px",
            color: "#1e293b",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              minWidth: "32px",
              height: "32px",
              backgroundColor: "#e0e7ff",
              borderRadius: "8px",
              marginRight: "12px",
              color: "#4338ca",
            }}
          >
            {activeTab === "Prerequisites" ? "📘" : "⚙️"}
          </span>
          {activeTab}
        </h2>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
          }}
        >
          {getTableData().length > 0 ? (
            getTableData().map((subject, index) => (
              <SubjectItem
                key={index}
                subject={subject}
                index={index}
                totalItems={getTableData().length}
              />
            ))
          ) : (
            <div
              style={{
                padding: "24px",
                textAlign: "center",
                color: "#64748b",
              }}
            >
              No data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Tab Button Component for better organization
const TabButton = ({ label, emoji, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 15px",
        borderRadius: "10px",
        transition: "all 0.25s ease",
        border: "none",
        cursor: "pointer",
        backgroundColor: isActive ? "#4338ca" : "#f1f5f9",
        color: isActive ? "white" : "#475569",
        fontWeight: "600",
        boxShadow: isActive
          ? "0 6px 16px rgba(67, 56, 202, 0.25)"
          : "0 2px 6px rgba(0, 0, 0, 0.05)",
        width: "100%",
        maxWidth: "280px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      <span style={{ fontSize: "20px", marginRight: "10px", flexShrink: 0 }}>
        {emoji}
      </span>
      <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
        {label}
      </span>
    </button>
  );
};

// Subject Item Component for better organization
const SubjectItem = ({ subject, index, totalItems }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getBackgroundColor = () => {
    if (isHovered) return "#eff6ff";
    if (subject.isSubItem) return "#f8fafc";
    if (subject.type === "miniproject") return "#f0fdf4";
    if (subject.type === "majorproject") return "#ecfdf5";
    return index % 2 === 0 ? "white" : "#f8fafc";
  };

  return (
    <div
      style={{
        padding: "16px",
        display: "flex",
        alignItems: "center",
        borderBottom: index === totalItems - 1 ? "none" : "1px solid #f1f5f9",
        backgroundColor: getBackgroundColor(),
        transform: isHovered ? "translateX(4px)" : "translateX(0)",
        transition: "all 0.2s ease",
        ...(subject.type === "miniproject" && {
          borderLeft: "4px solid #16a34a",
        }),
        ...(subject.type === "majorproject" && {
          borderLeft: "4px solid #047857",
        }),
        ...(subject.isSubItem && {
          paddingLeft: "40px",
          borderLeft: "4px solid #e0e7ff",
          "@media (min-width: 640px)": {
            paddingLeft: "60px",
          },
        }),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          width: "32px",
          height: "32px",
          minWidth: "32px", // Prevent icon from shrinking
          borderRadius: "8px",
          backgroundColor: getIconBackground(subject.type),
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "12px",
          fontSize: "16px",
          color: getIconColor(subject.type),
          "@media (min-width: 640px)": {
            width: "36px",
            height: "36px",
            fontSize: "18px",
            marginRight: "16px",
          },
        }}
      >
        {getIcon(subject.type)}
      </div>
      <span
        style={{
          color: "#334155",
          fontWeight: subject.isSubItem ? "400" : "500",
          fontSize: "14px",
          fontStyle: subject.isSubItem ? "italic" : "normal",
          wordBreak: "break-word",
          "@media (min-width: 640px)": {
            fontSize: "16px",
          },
        }}
      >
        {subject.name}
      </span>
    </div>
  );
};

// Helper functions for icon display
function getIconBackground(type) {
  switch (type) {
    case "prerequisite":
      return "#e0e7ff"; // Light indigo
    case "core":
      return "#f0fdf4"; // Light green
    case "miniproject":
      return "#f0fdf4"; // Light green
    case "majorproject":
      return "#ecfdf5"; // Darker light green
    case "description":
      return "#e0f2fe"; // Light blue
    default:
      return "#e0e7ff";
  }
}

function getIconColor(type) {
  switch (type) {
    case "prerequisite":
      return "#4338ca"; // Indigo
    case "core":
      return "#16a34a"; // Green
    case "miniproject":
      return "#16a34a"; // Green
    case "majorproject":
      return "#047857"; // Darker green
    case "description":
      return "#0284c7"; // Blue
    default:
      return "#4338ca";
  }
}

function getIcon(type) {
  switch (type) {
    case "prerequisite":
      return "📘";
    case "core":
      return "⚙️";
    case "miniproject":
      return "📂";
    case "majorproject":
      return "📊";
    case "description":
      return "📄";
    default:
      return "📘";
  }
}

export default TableComponent;
