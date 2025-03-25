"use client";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchVisionMissions } from "@/redux/slices/visionMission/visionMission";

export default function MissionVision() {
  const [expandedCard, setExpandedCard] = useState("");
  const [missionAnimating, setMissionAnimating] = useState(false);
  const [visionAnimating, setVisionAnimating] = useState(false);
  const [missionContentOpacity, setMissionContentOpacity] = useState(1);
  const [visionContentOpacity, setVisionContentOpacity] = useState(1);
  const missionContentRef = useRef(null);
  const visionContentRef = useRef(null);

  const handleToggleMission = () => {
    // Start animation for mission only
    setMissionAnimating(true);
    setMissionContentOpacity(0);

    // After fade out, change the expanded state
    setTimeout(() => {
      setExpandedCard(expandedCard === "mission" ? null : "mission");

      // Begin fade in after content is updated
      setTimeout(() => {
        setMissionContentOpacity(1);

        // Animation complete
        setTimeout(() => {
          setMissionAnimating(false);
        }, 300);
      }, 300);
    }, 300);
  };

  const handleToggleVision = () => {
    // Start animation for vision only
    setVisionAnimating(true);
    setVisionContentOpacity(0);

    // After fade out, change the expanded state
    setTimeout(() => {
      setExpandedCard(expandedCard === "vision" ? null : "vision");

      // Begin fade in after content is updated
      setTimeout(() => {
        setVisionContentOpacity(1);

        // Animation complete
        setTimeout(() => {
          setVisionAnimating(false);
        }, 300);
      }, 300);
    }, 300);
  };

  const dispatch = useDispatch();
  const { visionMissions, loading } = useSelector(
    (state) => state.visionMission
  );

  useEffect(() => {
    dispatch(fetchVisionMissions());
  }, [dispatch]);

  // Find mission and vision data
  const missionData = visionMissions?.find((item) => item.type === "mission");
  const visionData = visionMissions?.find((item) => item.type === "vision");

  // Function to get content for each card
  const getMissionContent = () => {
    if (loading) return "Loading mission...";
    if (!missionData?.description) return "No mission data available";

    return expandedCard === "mission"
      ? missionData.description
      : missionData.description.split(" ").slice(0, 25).join(" ") + "...";
  };

  const getVisionContent = () => {
    if (loading) return "Loading vision...";
    if (!visionData?.description) return "No vision data available";

    return expandedCard === "vision"
      ? visionData.description
      : visionData.description.split(" ").slice(0, 28).join(" ") + "...";
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px 20px", // Added horizontal padding for mobile
        background: "#eef2f5",
        position: "relative",
        overflow: "hidden", // Prevent image overflow
      }}
    >
      {/* Background images - made responsive */}
      <img
        src="/assets/img/about/img2.svg"
        alt="SYG"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "10%",
          maxWidth: "80px",
          minWidth: "40px",
        }}
      />
      <img
        src="/assets/img/about/img2.svg"
        alt="SYG"
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          width: "10%",
          maxWidth: "80px",
          minWidth: "40px",
        }}
      />
      <img
        src="/assets/img/about/img1.svg"
        alt="SYG"
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "10%",
          maxWidth: "80px",
          minWidth: "40px",
        }}
      />
      <img
        src="/assets/img/about/img3.svg"
        alt="SYG"
        style={{
          position: "absolute",
          bottom: "0",
          right: "0",
          width: "10%",
          maxWidth: "80px",
          minWidth: "40px",
        }}
      />

      <h2
        style={{
          margin: "0",
          fontSize: "clamp(18px, 5vw, 22px)", // Responsive font size
          fontWeight: "bold",
          color: "#444",
        }}
      >
        Our Mission & Vision
      </h2>
      <p
        style={{
          margin: "5px auto 40px",
          color: "#777",
          fontSize: "clamp(12px, 4vw, 14px)", // Responsive font size
          maxWidth: "600px", // Prevent very wide text on large screens
        }}
      >
        Empowering Futures, Inspiring Success
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "row", // Default for desktop
          flexWrap: "wrap", // Allow wrapping on smaller screens
          justifyContent: "center",
          gap: "40px 20px", // Vertical gap 40px, horizontal gap 20px
          alignItems: "stretch",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Mission Card */}
        <div
          style={{
            flex: expandedCard === "mission" ? "1 1 600px" : "1 1 260px",
            maxWidth: expandedCard === "mission" ? "100%" : "400px",
            minWidth: "260px", // Minimum width for very small screens
            transition: "all 0.5s ease",
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
            padding: "20px 20px 40px 20px", // Added bottom padding for button
            position: "relative",
            textAlign: "center",
            minHeight: "240px", // Minimum height instead of fixed
            transform: expandedCard === "mission" ? "scale(1.02)" : "scale(1)",
            marginTop: "30px", // Space for the circle icon
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "#f4a424",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: "-30px",
              left: "50%",
              transform: "translateX(-50%)",
              boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)",
              zIndex: 2,
            }}
          >
            <FontAwesomeIcon
              icon={faBullseye}
              style={{ fontSize: "24px", color: "#fff" }}
            />
          </div>
          <h3
            style={{
              marginTop: "40px",
              fontSize: "clamp(16px, 4vw, 18px)", // Responsive font size
              fontWeight: "bold",
              color: "#444",
              marginBottom: "10px",
            }}
          >
            MISSION
          </h3>
          <div
            ref={missionContentRef}
            style={{
              fontSize: "clamp(11px, 3vw, 12px)", // Responsive font size
              color: "#666",
              marginTop: "10px",
              marginBottom: "20px",
              opacity: missionContentOpacity,
              transition: "opacity 0.3s ease",
              maxHeight: expandedCard === "mission" ? "none" : "80px",
              overflow: expandedCard === "mission" ? "auto" : "hidden",
              transform: `translateY(${
                missionContentOpacity === 0 ? "-10px" : "0"
              })`,
              transitionProperty: "opacity, transform",
              transitionDuration: "0.3s",
              textAlign: "justify",
            }}
          >
            {getMissionContent()}
          </div>
          <div
            style={{
              width: "100%",
              height: "40px",
              background: "#f4a424",
              borderRadius: "10px 10px 0 0",
              position: "absolute",
              bottom: "0", // Positioned at the bottom
              left: "0",
              textAlign: "center",
              lineHeight: "40px",
              color: "#fff",
              fontWeight: "bold",
              cursor: missionAnimating ? "default" : "pointer",
              transition: "background-color 0.3s ease",
              opacity: missionAnimating ? 0.7 : 1,
              zIndex: 1, // Ensure it's above content
            }}
            onClick={() => !missionAnimating && handleToggleMission()}
          >
            {expandedCard === "mission" ? "Collapse" : "View More"}
          </div>
        </div>

        {/* Vision Card */}
        <div
          style={{
            flex: expandedCard === "vision" ? "1 1 600px" : "1 1 260px",
            maxWidth: expandedCard === "vision" ? "100%" : "400px",
            minWidth: "260px", // Minimum width for very small screens
            transition: "all 0.5s ease",
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
            padding: "20px 20px 40px 20px", // Added bottom padding for button
            position: "relative",
            textAlign: "center",
            minHeight: "240px", // Minimum height instead of fixed
            transform: expandedCard === "vision" ? "scale(1.02)" : "scale(1)",
            marginTop: "30px", // Space for the circle icon
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "#3b82f6",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: "-30px",
              left: "50%",
              transform: "translateX(-50%)",
              boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)",
              zIndex: 2,
            }}
          >
            <FontAwesomeIcon
              icon={faLightbulb}
              style={{ fontSize: "24px", color: "#fff" }}
            />
          </div>
          <h3
            style={{
              marginTop: "40px",
              fontSize: "clamp(16px, 4vw, 18px)", // Responsive font size
              fontWeight: "bold",
              color: "#444",
              marginBottom: "10px",
            }}
          >
            VISION
          </h3>
          <div
            ref={visionContentRef}
            style={{
              fontSize: "clamp(11px, 3vw, 12px)", // Responsive font size
              color: "#666",
              marginTop: "10px",
              marginBottom: "20px",
              opacity: visionContentOpacity,
              transition: "opacity 0.3s ease",
              maxHeight: expandedCard === "vision" ? "none" : "80px",
              overflow: expandedCard === "vision" ? "auto" : "hidden",
              transform: `translateY(${
                visionContentOpacity === 0 ? "-10px" : "0"
              })`,
              transitionProperty: "opacity, transform",
              transitionDuration: "0.3s",
              textAlign: "justify",
            }}
          >
            {getVisionContent()}
          </div>
          <div
            style={{
              width: "100%",
              height: "40px",
              background: "#3b82f6",
              borderRadius: "10px 10px 0 0",
              position: "absolute",
              bottom: "0", // Positioned at the bottom
              left: "0",
              textAlign: "center",
              lineHeight: "40px",
              color: "#fff",
              fontWeight: "bold",
              cursor: visionAnimating ? "default" : "pointer",
              transition: "background-color 0.3s ease",
              opacity: visionAnimating ? 0.7 : 1,
              zIndex: 1, // Ensure it's above content
            }}
            onClick={() => !visionAnimating && handleToggleVision()}
          >
            {expandedCard === "vision" ? "Collapse" : "View More"}
          </div>
        </div>
      </div>
    </div>
  );
}
