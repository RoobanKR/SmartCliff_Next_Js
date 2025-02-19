import React, { useEffect, useState } from "react";
import { learningPathSix } from "../../data/learningPaths";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  fetchServices,
  selectServices,
} from "@/redux/slices/services/services/Services";
import { useDispatch, useSelector } from "react-redux";
import { selectBusinessServices } from "@/redux/slices/services/services/businessServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function B2bMainPage() {
  const servicesBusiness = useSelector(selectBusinessServices);
  const services = useSelector(selectServices);

  const [matchedService, setMatchedService] = useState(null);
  const [matchingItems, setMatchingItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState({});
  const router = useRouter();

  const handleClick = (e, elm) => {
    e.preventDefault();
    setLoadingItems((prev) => ({ ...prev, [elm._id]: true })); // Set loading for specific item
    router.push(`/${matchedService?.slug}/${elm?.slug}`);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.replace("/", "");

      const service = servicesBusiness.find((service) => service.slug === path);
      if (service) {
        setMatchedService(service);

        const filteredItems = services.filter(
          (item) => item.business_services._id === service._id
        );
        setMatchingItems(filteredItems);
      } else {
      }
    }
  }, [servicesBusiness, services]);

  return (
    <section
      style={{
        padding: "40px 0",
        backgroundColor: "#f9f9f9",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <div style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            {matchedService
              ? `${matchedService.title} (${matchedService.name})`
              : "Service Not Found"}
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#555",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            {matchedService
              ? matchedService.description
              : "Sorry, we couldn't find the service you're looking for."}
          </p>
        </div>

        {/* Dynamic Card Container */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent:
              matchingItems.length === 1
                ? "center"
                : matchingItems.length === 2
                  ? "flex-start" // Aligns two cards to the left without leaving a center gap
                  : "space-between",
            gap: "20px",
            paddingTop: "20px",
          }}
        >
          {matchingItems.length > 0 ? (
            matchingItems.map((elm) => (
              <div
                key={elm._id}
                style={{
                  position: "relative", // Required for absolute positioning of the blur overlay
                  width:
                    matchingItems.length === 1
                      ? "350px"
                      : matchingItems.length === 2
                        ? "calc(50% - 10px)" // Two cards take up 50% width each
                        : "calc(33.333% - 20px)",
                  minWidth: "300px",
                  borderRadius: "10px",
                  overflow: "hidden", // Ensures the blur stays within the card
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  textAlign: "left",
                  transition: "all 0.3s ease", // Smooth transition for hover effects
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0px 6px 20px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0px 4px 10px rgba(0, 0, 0, 0.1)";
                }}
              >
                {/* Background Image with Blur Effect and Dark Overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    backgroundImage: "url('/assets/img/home-1/hero/img1.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(10px)", // Apply blur effect to background
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)", // Apply shadow effect
                  }}
                ></div>
                {/* Dark Overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    backgroundColor: "rgba(189, 120, 249, 0.2)", // Dark overlay with opacity
                    zIndex: "0", // Ensure this stays behind the content
                  }}
                ></div>

                {/* Card Content */}
                <div
                  style={{
                    position: "relative",
                    padding: "20px",
                    zIndex: "1", // Keeps the content on top of the blurred background and overlay
                    color: "#fff", // Ensure text is visible over the blurred background
                  }}
                >
                  {/* Icon and Title Section */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "white",
                        boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={elm.icon}
                        alt={elm.title}
                        style={{ width: "30px", height: "30px" }}
                      />
                    </div>
                    <h5
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#171717", // Ensure title text is white for visibility
                        margin: "0",
                      }}
                    >
                      {elm.title}
                    </h5>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#4e4e4e", // Slightly lighter text for better contrast
                      textAlign: "justify",
                      marginBottom: "10px",
                    }}
                  >
                    {elm.description}
                  </p>

                  {/* View More Link */}
                  <div>
                    <button
                      onClick={(e) => handleClick(e, elm)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontWeight: "500",
                        cursor: "pointer",
                        background: "transparent",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        transition: "all 0.3s ease",
                        color: "#0362c9",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#024b9a";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#0362c9";
                      }}
                    >
                      {loadingItems[elm._id] ? (
                        <FontAwesomeIcon
                          icon={faSpinner}
                          spin
                          style={{ marginRight: "5px" }}
                        />
                      ) : (
                        <>
                          <span>View More</span>
                          <FontAwesomeIcon icon={faArrowRight} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ fontSize: "16px", color: "#777" }}>
              No matching items found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

