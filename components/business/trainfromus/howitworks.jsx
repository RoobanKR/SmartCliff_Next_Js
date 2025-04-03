"use client";

import { fetchAllHowItWorks } from "@/redux/slices/bussiness/howItWorks/howItWorks";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function HowItWorks() {
  const dispatch = useDispatch();
  const { howItWorks, loading, error } = useSelector(
    (state) => state.howItWorks
  );

  useEffect(() => {
    dispatch(fetchAllHowItWorks());
  }, [dispatch]);

  const hireFromUsData = howItWorks.filter(
    (works) => works.type === "trainfromus"
  );

  return (
    <div
      style={{
        padding: "30px 5%",
        textAlign: "center",
        color: "#1E293B",
      }}
    >
      <h2 style={{ fontSize: "34px", fontWeight: "bold", color: "#334155" }}>
        How It Works
      </h2>
      <p style={{ fontSize: "18px", marginBottom: "40px", color: "#475569" }}>
        A simple and effective hiring process to get the best talent.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {hireFromUsData.map((step, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#FFFFFF",
              padding: "25px",
              borderRadius: "10px",
              textAlign: "center",
              border: "1px solid #CBD5E1",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
              transition: "transform 0.3s ease-in-out",
              position: "relative",
            }}
          >
            <div
              style={{
                fontSize: "38px",
                marginBottom: "15px",
                color: "#FACC15",
              }}
            >
              <Image width={50} height={50} src={step.image} alt="icon" />
            </div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#1E293B",
              }}
            >
              {step.title}
            </h3>
            <p style={{ fontSize: "16px", color: "#64748B" }}>
              {step.description}
            </p>
            <span
              style={{
                position: "absolute",
                top: "10px",
                right: "15px",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#94A3B8",
              }}
            >
              Step {index + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
