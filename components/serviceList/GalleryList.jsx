"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGallery } from "@/redux/slices/gallery/gallery";
import { fetchServices } from "@/redux/slices/services/services/Services";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function News() {
  const [currentYear, setCurrentYear] = useState("All Years");
  const dispatch = useDispatch();
  const router = useRouter();
  const gallery = useSelector((state) => state.gallery.gallery);
  const [pageItems, setPageItems] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    dispatch(getAllGallery());
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    if (gallery.length > 0) {
      const filteredItems =
        currentYear === "All Years"
          ? gallery
          : gallery.filter((elm) => elm.year === currentYear);
      setPageItems(filteredItems.slice(0, 3));
    }
  }, [currentYear, gallery]);

  return (
    <section
      className="layout-pt-sm layout-pb-sm"
      style={{ position: "relative" }}
    >
      <div className="container">
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 10, // Ensures it's on top of other content
          }}
        >
          <Image
            src="/assets/img/about/img1.svg"
            alt="SYG"
            width={80}
            height={80}
          />
        </div>
        <div className="row justify-content-center align-items-center text-center">
          <div className="col-12 d-flex justify-content-between align-items-center flex-wrap">
            {/* Centered Heading */}
            <div
              className="flex-grow-1 d-flex justify-content-center"
              style={{
                marginRight: window.innerWidth >= 992 ? "-140px" : "0px", // lg (992px and above)
              }}
            >
              <div className="sectionTitle text-center">
                <h2
                  style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Gallery
                </h2>
                <p className="sectionTitle__text">
                  Explore our latest events and moments.
                </p>
              </div>
            </div>

            {/* Right-Aligned Button */}
            <div>
              <button
                style={{
                  backgroundColor: "transparent",
                  color: "#F2775E",
                  border: "2px solid #F2775E",
                  padding: "5px 10px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#F2775E";
                  e.target.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#F2775E";
                  e.target.style.border = "2px solid #F2775E";
                }}
                onClick={() => router.push("/service_Gallery")}
              >
                View All Gallery
              </button>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 pt-30">
          {pageItems.map((item, index) => (
            <div
              key={index}
              className="col-lg-4 col-md-6"
              data-aos="fade-left"
              data-aos-duration={(index + 1) * 400}
            >
              <div
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "8px",
                  height: "300px",
                  perspective: "1000px",
                  boxShadow:
                    "1em 0.5em 2em rgba(17, 34, 51, 0.2), 0 0 5em rgba(17, 34, 51, 0.2) inset",
                  cursor: "pointer",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Main Image with Rolling Effect */}
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                    transition:
                      "transform 0.8s ease-in-out, opacity 0.5s ease-in-out",
                    transform:
                      hoveredItem === index
                        ? "rotateY(50deg) translateX(120%) scale(0.8)"
                        : "rotateY(0deg) translateX(0) scale(1)",
                    opacity: hoveredItem === index ? 0 : 1,
                    position: "relative",
                    zIndex: 1,
                  }}
                  src={item.image}
                  alt={item.name}
                />

                {/* Content overlay (displays on hover) */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    zIndex: 10,
                    opacity: hoveredItem === index ? 1 : 0,
                    transition: "opacity 0.6s ease-in-out",
                    pointerEvents: "none",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.9)",
                      padding: "15px",
                      borderRadius: "8px",
                      width: "80%",
                      textAlign: "center",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                      transform:
                        hoveredItem === index
                          ? "translateY(0)"
                          : "translateY(20px)",
                      transition: "transform 0.5s ease-in-out 0.2s",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "bold",
                        marginBottom: "5px",
                        color: "#555",
                        fontSize: "14px",
                      }}
                    >
                      {item.category}
                    </div>
                    <h3
                      style={{
                        color: "#F2775E",
                        margin: "10px 0",
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      {item.name}
                    </h3>
                    <div
                      style={{
                        marginBottom: "5px",
                        fontSize: "14px",
                        lineHeight: "1.4",
                        color: "#333",
                      }}
                    >
                      {item.description}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "#777",
                      }}
                    >
                      {item.month} {item.year}
                    </div>
                  </div>
                </div>

                {/* Side shadow effect on hover */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "10px",
                    height: "100%",
                    background:
                      "linear-gradient(to left, rgba(0,0,0,0.3), transparent)",
                    opacity: hoveredItem === index ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out",
                    zIndex: 2,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
