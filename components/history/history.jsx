"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getAllYearlyServices } from "@/redux/slices/history/hsitory";

const serviceColors = {
  B2B: "#1976d2", // Blue
  B2I: "#ed6c02", // Orange
  CSR: "#d32f2f", // Red
  B2C: "#2e7d32", // Green - Added for B2C
};

const History = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector(
    (state) => state.yearlyService
  );

  useEffect(() => {
    dispatch(getAllYearlyServices());
  }, [dispatch]);

  // Process and organize the data with proper immutability
  const processTimelineData = () => {
    if (!services || services.length === 0) {
      return [];
    }

    const processedData = [];
    const yearMap = {};

    // First pass: collect all unique years and their services
    services.forEach((item) => {
      if (!yearMap[item.year]) {
        // Create a new object for this year
        yearMap[item.year] = {
          year: item.year,
          services: item.services.map((service) => ({
            businessService: service.businessService,
            service: [...service.service],
            _id: service._id,
          })),
        };
      } else {
        // For each service in the duplicate year entry
        item.services.forEach((service) => {
          const existingServiceIndex = yearMap[item.year].services.findIndex(
            (s) => s.businessService === service.businessService
          );

          if (existingServiceIndex >= 0) {
            // Create a new service object with merged services array
            const existingService =
              yearMap[item.year].services[existingServiceIndex];
            const uniqueServices = [
              ...new Set([...existingService.service, ...service.service]),
            ];

            // Replace the old service object with a new one
            yearMap[item.year].services[existingServiceIndex] = {
              ...existingService,
              service: uniqueServices,
            };
          } else {
            // Add new business service (create a new object)
            yearMap[item.year].services.push({
              businessService: service.businessService,
              service: [...service.service],
              _id: service._id,
            });
          }
        });
      }
    });

    // Convert to array and sort by year
    Object.values(yearMap).forEach((item) => {
      processedData.push({ ...item });
    });

    return processedData.sort((a, b) => {
      // Extract the first year from the range (e.g., "2021" from "2021-22")
      const yearA = parseInt(a.year.split("-")[0]);
      const yearB = parseInt(b.year.split("-")[0]);
      return yearA - yearB;
    });
  };

  const timelineData = processTimelineData();

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Loading timeline data...
      </div>
    );

  if (error)
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
        Error loading timeline: {error}
      </div>
    );

  if (!timelineData || timelineData.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        No timeline data available.
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "5px auto", padding: "2px" }}>
      <div className="program-header">
        <div className="program-subtitle">
          <span className="subtitle-line"></span>
          <span className="subtitle-text">Our History Evolution</span>
          <span className="subtitle-line"></span>
        </div>
      </div>
      <br></br>
      {/* Center line */}
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: "50%",
            marginLeft: "-2px",
            top: 0,
            bottom: 0,
            width: "4px",
            background: "#e0e0e0",
          }}
        />

        {timelineData.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isEven ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{
                display: "flex",
                justifyContent: isEven ? "flex-end" : "flex-start",
                marginBottom: "50px",
                position: "relative",
                paddingLeft: isEven ? "0" : "50%",
                paddingRight: isEven ? "50%" : "0",
              }}
            >
              {/* Circle Indicator */}
              <motion.div
                style={{
                  width: "18px",
                  height: "18px",
                  backgroundColor: "#1976d2",
                  borderRadius: "50%",
                  position: "absolute",
                  left: "calc(50% - 9px)",
                  top: "12px",
                  zIndex: 2,
                  border: "3px solid white",
                  boxShadow: "0 0 0 4px #E3F2FD",
                }}
                animate={{ scale: [0.9, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />

              {/* Timeline Card */}
              <div
                style={{
                  width: "90%",
                  maxWidth: "500px",
                  padding: "20px",
                  background: "#ffffff",
                  borderRadius: "12px",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                  position: "relative",
                  ...(isEven ? { right: "30px" } : { left: "30px" }),
                }}
              >
                {/* Triangle pointer */}
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    [isEven ? "right" : "left"]: "-10px",
                    width: 0,
                    height: 0,
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    [isEven ? "borderRight" : "borderLeft"]: "10px solid white",
                  }}
                />

                {/* Year Header */}
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    borderBottom: "2px solid #1976d2",
                    paddingBottom: "6px",
                    marginBottom: "16px",
                    color: "#333",
                    textAlign: isEven ? "left" : "right",
                  }}
                >
                  {item.year}
                </h3>

                {/* Service Boxes */}
                {item.services.map((service, idx) =>
                  service.service && service.service.length > 0 ? (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.03 }}
                      style={{
                        marginBottom: "12px",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        backgroundColor:
                          serviceColors[service.businessService] || "#0288d1",
                        color: "#fff",
                      }}
                    >
                      <strong style={{ fontSize: "16px" }}>
                        {service.businessService}
                      </strong>
                      <div
                        style={{
                          marginTop: "8px",
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "6px",
                        }}
                      >
                        {service.service.map((s, i) => (
                          <span
                            key={i}
                            style={{
                              padding: "6px 10px",
                              background: "rgba(255,255,255,0.2)",
                              borderRadius: "6px",
                              fontSize: "13px",
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ) : null
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      <style jsx>{`
        .program-container {
          font-family: "Poppins", sans-serif;
          padding: 0px 20px;
        }
 
        .program-wrapper {
         \
          margin: 0 auto;
        }
 
        .program-header {
          text-align: center;
        }
 
        .program-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 20px;
          color: #2d2d3a;
          position: relative;
          display: inline-block;
        }
 
        .program-title::after {
          content: "";
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, rgb(0, 0, 0), rgb(0, 0, 0));
          border-radius: 3px;
        }
 
        .program-subtitle {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
        }
 
        .subtitle-line {
          height: 2px;
          width: 100px;
          background-color: #5b2c6f;
          opacity: 0.5;
        }
 
        .subtitle-text {
          font-size: 2.2rem;
          margin: 0 15px;
          color: #5b2c6f;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
 
        .program-swiper-container {
          position: relative;
          padding-bottom: 60px; /* Space for pagination dots */
        }
 
        .program-card {
          background: white;
          border-radius: 16px;
          padding: 30px 25px;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          border: 1px solid transparent;
          display: flex;
          flex-direction: column;
          align-items: center;
         
        }
 
        .program-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(90deg, #EF5A6F, #F3CA52, #80C4E9, #536493);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
 
        .program-card:hover,
        .program-card.active {
          transform: translateY(-10px);
        }
 
        .program-card:hover::before,
        .program-card.active::before {
          transform: scaleX(1);
        }
 
        .program-image-container {
          width: 100px;
          height: 100px;
          background: #f5f0ff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto 20px;
          box-shadow: 0 5px 15px rgba(75, 0, 130, 0.1);
          transition: all 0.3s ease;
        }
 
        .program-card:hover .program-image-container,
        .program-card.active .program-image-container {
          transform: scale(1.1);
        }
 
        .program-icon {
          width: 60px;
          height: 60px;
          object-fit: contain;
          transition: all 0.3s ease;
          filter: brightness(1);
        }
 
        .program-card:hover .program-icon,
        .program-card.active .program-icon {
        }
 
        .program-name {
          font-size: 1.5rem;
          color: #4b0082;
          font-weight: 600;
          margin-bottom: 15px;
          transition: all 0.3s ease;
          text-align: center;
        }
 
        .program-card:hover .program-name,
        .program-card.active .program-name {
        }
 
        .program-description {
          color: #555;
          font-size: 1rem;
          line-height: 1.6;
          text-align: center;
        }
 
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 50px 0;
        }
 
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(75, 0, 130, 0.1);
          border-radius: 50%;
          border-top-color: #8a2be2;
          animation: spin 1s ease-in-out infinite;
          margin-bottom: 20px;
        }
 
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
 
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 50px 0;
          color: #5b2c6f;
        }
 
        .error-icon {
          width: 50px;
          height: 50px;
          margin-bottom: 20px;
          color: #5b2c6f;
        }
 
        .retry-button {
          margin-top: 20px;
          padding: 10px 25px;
          background-color: #4b0082;
          color: white;
          border: none;
          border-radius: 5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
 
        .retry-button:hover {
          background-color: #8a2be2;
        }
 
        .no-programs {
          grid-column: 1 / -1;
          text-align: center;
          padding: 40px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        }
        .swiper-pagination-bullet {
          background: #8a2be2;
          opacity: 0.3;
        }
 
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: #4b0082;
        }
           @media (max-width: 640px) {
         

          .subtitle-text {
            font-size: 1.5rem;
             margin: 0 10px;
             text-align:center;
          }
        }
      `}</style>
    </div>
  );
};

export default History;
