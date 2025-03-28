import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOurPartners } from "@/redux/slices/degreeProgram/dpPartner";
import { useParams } from "next/navigation";
export default function PartnersSection() {
  const dispatch = useDispatch();
  const params = useParams();
  const programId = params.id;
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { ourPartners, loading, error } = useSelector(
    (state) => state.ourPartners
  );
  const finalPartners =
    ourPartners?.filter(
      (partner) => partner.degree_program._id === programId
    ) || [];

  return (
    <motion.section
      style={{
        padding: "20px 30px",
        background: "linear-gradient(135deg, #111827 0%, #1e3a8a 100%)",
        color: "#fff",
        fontFamily: "'Poppins', sans-serif",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Decorative Background Elements */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.07,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="program-subtitle">
            <span className="subtitle-line"></span>
            <span className="subtitle-text"> Our Partners</span>
            <span className="subtitle-line"></span>
          </div>

          <motion.p
            style={{
              fontSize: "15px",
              color: "#cbd5e1",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: "1.8",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Partnering with world-class institutions to drive innovation and
            create groundbreaking solutions for tomorrow's challenges.
          </motion.p>
        </motion.div>

        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "30px",
          }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {finalPartners.map((partner, index) => (
            <motion.div
              key={index}
              style={{
                position: "relative",
              }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.a
                href={partner.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  height: "100%",
                  background: "rgba(255, 255, 255, 0.04)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  transition: "all 0.4s ease",
                  textDecoration: "none",
                  position: "relative",
                }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2)",
                  background: "rgba(255, 255, 255, 0.08)",
                }}
              >
                {/* Glow effect on hover */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      style={{
                        position: "absolute",
                        top: "-20%",
                        left: "-20%",
                        width: "140%",
                        height: "140%",
                        background:
                          "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0) 70%)",
                        zIndex: 0,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                </AnimatePresence>

                <div
                  style={{
                    padding: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <motion.div
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "20px",
                      padding: "5px",
                      overflow: "hidden", // Ensures the image does not overflow outside the circle
                    }}
                    whileHover={{ rotate: 5, scale: 1.05 }}
                  >
                    <motion.img
                      src={partner.image}
                      alt={partner.name}
                      style={{
                        width: "100%", // Makes sure the image fills the div
                        height: "100%", // Ensures it fills the container height-wise
                        objectFit: "cover", // Crops the image to fill the circle
                        borderRadius: "50%", // Ensures the image takes the circular shape
                      }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>

                  <h4
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      color: "#ffffff",
                      marginBottom: "8px",
                      textAlign: "center",
                    }}
                  >
                    {partner.company}
                  </h4>



                  <motion.div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      background:
                        "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)",
                      color: "white",
                      fontWeight: "600",
                      padding: "10px 20px",
                      borderRadius: "30px",
                      marginTop: "25px",
                      fontSize: "14px",
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 5px 15px rgba(59, 130, 246, 0.4)",
                    }}
                  >
                    <span>Visit Website</span>
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        height: "18px",
                        width: "18px",
                        marginLeft: "8px",
                      }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      initial={{ x: 0 }}
                      animate={{ x: 0 }}
                      whileHover={{ x: 3 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </motion.svg>
                  </motion.div>
                </div>
              </motion.a>
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
          background-color:rgb(255, 255, 255);
          opacity: 0.5;
        }

        .subtitle-text {
          font-size:2.5rem;
          margin: 0 15px;
          color:rgb(255, 255, 255);
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
