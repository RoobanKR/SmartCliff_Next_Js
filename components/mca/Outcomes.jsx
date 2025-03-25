import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getAllOutcomes } from "@/redux/slices/mca/outcomes/Outcomes";
import { useParams } from "next/navigation";

export default function Outcomes({ collegeId }) {
  const dispatch = useDispatch();
  const outcomes = useSelector((state) => state.outcomes.outcomes);
  const { id } = useParams();

  const filteredoutcomes = outcomes.filter(
    (outcomes) => outcomes.degree_program && outcomes.degree_program._id === id
  );

  const matchedOutcomes = outcomes.filter(
    (program) => program.college?._id === collegeId
  );

  useEffect(() => {
    dispatch(getAllOutcomes());
  }, [dispatch]);

  return (
    <section
      style={{
        padding: "10px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 15px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          <div className="program-subtitle">
            <span className="subtitle-line"></span>
            <span className="subtitle-text"> Program Outcomes</span>
            <span className="subtitle-line"></span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "stretch",
            gap: "70px",
            margin: "0 auto",
          }}
        >
          {matchedOutcomes.map((elm, i) => {
            // Define colors based on index (cycling through blue, magenta, yellow)
            const colors = ["#C7D9DD", "#C1D8C3", "#6A9C89"];
            const colorIndex = i % colors.length;
            const arrowColors = ["#33B7E8", "#E91E96"];
            const arrowColorIndex = i % arrowColors.length;

            return (
              <div
                key={i}
                style={{
                  width: "340px",
                  height: "350px",
                  position: "relative",
                  marginBottom: "30px",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {/* Dashed border container */}
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      border: `3px dashed ${colors[colorIndex]}`,
                      borderRadius: "20px",
                      padding: "12px",
                      boxSizing: "border-box",
                    }}
                  >
                    {/* Solid colored box inside */}
                    <div
                      style={{
                        backgroundColor: colors[colorIndex],
                        borderRadius: "15px",
                        padding: "40px 25px",
                        height: "100%",
                        minHeight: "250px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                      }}
                    >
                      {/* Icon container */}
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          backgroundColor: "white",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: "20px",
                        }}
                      >
                        <Image
                          width={30}
                          height={30}
                          src={elm.icon || "/assets/img/icons/check.svg"}
                          alt="icon"
                        />
                      </div>

                      {/* Title */}
                      <h3
                        style={{
                          fontSize: "24px",
                          fontWeight: "700",
                          marginBottom: "15px",
                          color: "white",
                          textTransform: "uppercase",
                        }}
                      >
                        {elm.title}
                      </h3>
                    </div>
                  </div>

                  {/* Arrow to the next box */}
                  {i !== matchedOutcomes.length - 1 && (i + 1) % 3 !== 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "-70px",
                        padding: "10px",
                        transform: "translateY(-50%)",
                        zIndex: "1",
                      }}
                    >
                      <svg width="40" height="40" viewBox="0 0 40 40">
                        <path
                          d="M0 20 L30 20 L20 10"
                          stroke={colors[colorIndex]}
                          strokeWidth="4"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20 30 L30 20"
                          stroke={colors[colorIndex]}
                          strokeWidth="4"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Down arrow for end of row, except last row */}
                  {(i + 1) % 3 === 0 && i !== matchedOutcomes.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-40px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: "1",
                      }}
                    >
                      <svg width="40" height="40" viewBox="0 0 40 40">
                        <path
                          d="M20 0 L20 30 L10 20"
                          stroke={colors[colorIndex]}
                          strokeWidth="4"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M30 20 L20 30"
                          stroke={colors[colorIndex]}
                          strokeWidth="4"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Left-to-right arrow for start of new row, except first row */}
                  {i !== 0 && i % 3 === 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-40px",
                        right: "50%",
                        width: "calc(100% + 60px)",
                        height: "40px",
                        zIndex: "1",
                      }}
                    ></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>
        {`
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
             @media (max-width: 640px) {
         

          .subtitle-text {
            font-size: 1.5rem;
             margin: 0 10px;
             text-align:center;
          }
        `}
      </style>
    </section>
  );
}
