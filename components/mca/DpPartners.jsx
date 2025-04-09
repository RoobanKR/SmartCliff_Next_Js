import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOurPartners } from "@/redux/slices/degreeProgram/dpPartner";
import { useParams } from "next/navigation";
export default function PartnersSection({ ids }) {
  const dispatch = useDispatch();
  const params = useParams();
  const programId = params.id;
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { ourPartners, loading, error } = useSelector(
    (state) => state.ourPartners
  );
  const finalPartners =
    ourPartners?.filter((partner) => partner.degree_program._id === ids) || [];

  return (
    <motion.section
      style={{
        padding: "25px 20px",
        background: "#f9fafb",
        color: "#1e293b",
        fontFamily: "'Poppins', sans-serif",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            marginBottom: "40px",
            position: "relative",
          }}
        >
          <div className="program-subtitle">
            <span className="subtitle-line"></span>
            <span className="subtitle-text"> Our Partners</span>
            <span className="subtitle-line"></span>
          </div>
        </div>

        <motion.div
          style={{
            display: finalPartners.length < 4 ? "flex" : "grid",
            justifyContent: finalPartners.length < 4 ? "center" : "initial",
            flexWrap: finalPartners.length < 4 ? "wrap" : "initial",
            gap: "30px",
            gridTemplateColumns:
              finalPartners.length < 4
                ? undefined
                : "repeat(auto-fill, minmax(260px, 1fr))",
          }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {finalPartners.map((partner, index) => (
            <motion.div
              key={index}
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "30px 20px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
                textAlign: "center",
                transition: "transform 0.3s",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03 }}
            >
              <div>
              <img
                  src={partner.image}
                  alt={partner.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "contain", // 'cover' ensures the image fills the container without distortion
                    display: "block",
                    marginBottom: "20px",
                    marginInline: "auto",
                    borderRadius: "8px", // optional: gives slightly rounded corners
                  }}
                />
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  {partner.companyName}
                </h3>

                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: " #16a34a",
                    backgroundColor: "#e0f2f1", // light gray background
                    borderRadius: "9px", // fully rounded badge
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                >
                  {partner.type}
                </span>

                <p
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    marginTop: "10px",
                  }}
                >
                  {partner.description ||
                    "Trusted industry leader and innovator."}
                </p>
              </div>

              <a
                href={partner.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: "25px",
                  padding: "10px 18px",
                  background: "transparent",
                  color: "#3b82f6",
                  border: "2px solid #3b82f6",
                  borderRadius: "30px",
                  fontWeight: 500,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#3b82f6";
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#3b82f6";
                }}
              >
                Visit Website
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <style jsx>{`
        .program-subtitle {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
          width: 100%;
        }

        .subtitle-line {
          height: 2px;
          width: 100px;
          background-color: #5b2c6f;
          opacity: 0.5;
        }

        .subtitle-text {
          font-size: 2.5rem;
          margin: 0 15px;
          color: #5b2c6f;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        @media (max-width: 640px) {
          .subtitle-line {
            width: 60px;
          }

          .subtitle-text {
            font-size: 1.5rem;
            margin: 0 10px;
            text-align: center;
          }
        }

        @media (min-width: 641px) and (max-width: 1023px) {
          .subtitle-text {
            font-size: 2rem;
          }
        }
        @media (max-width: 768px) {
          .coursesCard {
            max-width: 100%; // Full width on smaller screens
          }
        }
      `}</style>
    </motion.section>
  );
}
