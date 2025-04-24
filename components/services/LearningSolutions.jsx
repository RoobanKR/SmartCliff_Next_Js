"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function LearningSolutions({ matchedServiceAbouts }) {
  const imageContainerRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!imageContainerRef.current || !sectionRef.current) return;

    const handleScroll = () => {
      const section = sectionRef.current;
      const imageContainer = imageContainerRef.current;

      const sectionRect = section.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionBottom = sectionRect.bottom;
      const viewportHeight = window.innerHeight;

      // Calculate when to fix and unfix the image
      if (sectionTop <= 100 && sectionBottom >= viewportHeight) {
        // Fix the image
        gsap.to(imageContainer, {
          position: "fixed",
          top: "100px",
          bottom: "auto",
          width: imageContainer.offsetWidth,
          duration: 0.3,
        });
      } else {
        // Reset to absolute positioning at bottom when section exits view
        if (sectionBottom < viewportHeight) {
          gsap.to(imageContainer, {
            position: "absolute",
            top: "auto",
            bottom: "0",
            duration: 0.3,
          });
        } else if (sectionTop > 100) {
          // Reset to absolute positioning at top when section enters view
          gsap.to(imageContainer, {
            position: "absolute",
            top: "0",
            bottom: "auto",
            duration: 0.3,
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="layout-pb-md js-mouse-move-container relative"
      ref={sectionRef}
      style={{ minHeight: "100vh" }}
    >
      <div className="container">
        <div className="row y-gap-30 align-items-start">
          {/* Left Content */}
          {matchedServiceAbouts.map((item, index) => (
            <div key={index} className="col-lg-6 order-2 order-lg-1">
              <h2 className="text-25 lg:text-10 md:text-30 text-dark-1">
                {item.heading}
              </h2>
              <p className="text-dark-1 mt-10" style={{ textAlign: "justify" }}>
                {item.subHeading}
              </p>

              <div className="row y-gap-20 pt-30">
                {item.feature.map((elm, i) => (
                  <div key={i} className="col-12">
                    <div className="featureIcon -type-1 d-flex">
                      <div
                        className={`featureIcon__icon ${elm.iconBg}`}
                        style={{
                          width: "70px",
                          height: "70px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          backgroundColor: "#f5f0ff",
                        }}
                      >
                        <Image
                          width={30}
                          height={30}
                          src={elm.icon || "/fallback-icon.jpg"}
                          alt="icon"
                        />
                      </div>
                      <div className="featureIcon__content ml-20 mt-10">
                        <h4 className="text-17 fw-500">{elm.title}</h4>
                        <p className="mt-5">
                          {elm.description.split(" ").slice(0, 5).join(" ")}{" "}
                          <br className="lg:d-none" />
                          {elm.description.split(" ").slice(5).join(" ")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Right Image */}
          <div className="col-lg-6 order-1 order-lg-2">
            <div
              className="elements-image h-full relative"
              style={{ height: "100%" }}
            >
              {matchedServiceAbouts[0]?.images?.length > 0 && (
                <div
                  ref={imageContainerRef}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "100%",
                  }}
                >
                  <div
                    data-move="60"
                    className="elements-image__main js-mouse-move"
                  >
                    <img
                      className="js-mouse-move rounded responsive-image"
                      data-move="40"
                      src={
                        matchedServiceAbouts[0].images[0] ||
                        "/fallback-image.jpg"
                      }
                      alt="Main image"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
