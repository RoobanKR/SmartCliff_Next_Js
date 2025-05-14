import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";

export default function PartnersSection({ ids }) {
  const dispatch = useDispatch();
  const params = useParams();
  const programId = params.id;
  const { ourPartners } = useSelector((state) => state.ourPartners);
  const finalPartners =
    ourPartners?.filter((partner) => partner.degree_program._id === ids) || [];

  return (
    <motion.section
      style={{
        padding: "40px 20px",
        background: "#f0f4f8",
        color: "#333",
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
        <div className="program-subtitle">
          <span className="subtitle-line"></span>
          <span className="subtitle-text">Our Partners</span>
          <span className="subtitle-line"></span>
        </div>

        <motion.div
          style={{
            display: finalPartners.length < 4 ? "flex" : "grid",
            justifyContent: finalPartners.length < 4 ? "center" : "initial",
            flexWrap: finalPartners.length < 4 ? "wrap" : "initial",
            gap: "1px",
            gridTemplateColumns:
              finalPartners.length < 4
                ? undefined
                : "repeat(auto-fill, minmax(250px, 1fr))",
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
                background: " #ffffff",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                textAlign: "center",
                transition: "transform 0.3s, box-shadow 0.3s",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "90%",
              }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              // whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(0,0,0,0.15)" }}
            >
              <div>
                <img
                  src={partner.image}
                  alt={partner.name}
                  style={{
                    width: "80%",
                    height: "150px",
                    objectFit: "contain",
                    display: "block",
                    margin: "0 auto 15px",
                    borderRadius: "8px",
                  }}
                />
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  {partner.companyName}
                </h3>

                <span
                  style={{
                    display: "inline-block",
                    padding: "6px 14px",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#16a34a",
                    backgroundColor: "#e0f2f1",
                    borderRadius: "12px",
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                >
                  {partner.type}
                </span>
              </div>

              <a
                href={partner.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: "15px",
                  padding: "8px 12px",
                  background: "#3b82f6",
                  color: "#ffffff",
                  borderRadius: "20px",
                  fontWeight: 500,
                  fontSize: "14px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  textDecoration: "none",
                  transition: "background  0.3s ease, transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Visit Website
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
          margin: 20px 0;
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
      `}</style>
    </motion.section>
  );
}