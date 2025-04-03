"use client";
import { getAllHomeServicesCount } from "@/redux/slices/home/homeService/homeService";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

const AnimatedCounter = ({
  startValue = 0,
  endValue = 0,
  duration = 2000,
  isVisible = false,
}) => {
  const [count, setCount] = useState(startValue);

  useEffect(() => {
    if (!isVisible || endValue === 0) {
      setCount(startValue);
      return;
    }

    setCount(startValue);
    const steps = Math.floor(duration / 16);
    const increment = (endValue - startValue) / steps;
    let currentCount = startValue;
    let timer;

    const updateCounter = () => {
      currentCount += increment;

      if (
        (increment > 0 && currentCount >= endValue) ||
        (increment < 0 && currentCount <= endValue)
      ) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.round(currentCount));
      }
    };

    timer = setInterval(updateCounter, 16);

    return () => clearInterval(timer);
  }, [startValue, endValue, duration, isVisible]);

  return <>{count}</>;
};

export default function HeroSection() {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const counterSectionRef = useRef(null);
  const { homeServices, loading, error } = useSelector(
    (state) => state.homeServices
  );

  // Fetch home services count
  useEffect(() => {
    dispatch(getAllHomeServicesCount());
  }, [dispatch]);

  // Set up Intersection Observer to detect when counter section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (counterSectionRef.current) {
      observer.observe(counterSectionRef.current);
    }

    return () => {
      if (counterSectionRef.current) {
        observer.unobserve(counterSectionRef.current);
      }
    };
  }, [counterSectionRef]);

  // Initialize counters
  const counters = {
    b2b: 0,
    b2i: 0,
    csr: 0,
    b2c: 0,
  };

  // Populate counters based on fetched home services
  if (homeServices.length > 0) {
    homeServices.forEach((service) => {
      if (service.slug === "B2B") {
        counters.b2b = parseInt(service.count, 10);
      } else if (service.slug === "B2I") {
        counters.b2i = parseInt(service.count, 10);
      } else if (service.slug === "CSR") {
        counters.csr = parseInt(service.count, 10);
      } else if (service.slug === "B2C") {
        counters.b2c = parseInt(service.count, 10);
      }
    });
  }

  // Calculate total count
  const totalCount = counters.b2b + counters.b2i + counters.csr + counters.b2c;

  return (
    <div
      className="hero-section"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem",
        color: "black",
      }}
    >
      {/* Main content container */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
        }}
      >
        {/* Left Content */}
        <div
          style={{
            flex: "1 1 350px",
            minWidth: "280px",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(1.8rem, 5vw, 2.6rem)",
              fontWeight: "bold",
              marginBottom: "1rem",
              lineHeight: "1.2",
            }}
          >
            <span style={{ color: "#f27757" }}> Unbeatable Execution!</span> /
            Our Success Metrics!
          </h1>
          <h3
            style={{
              fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
              fontWeight: "500",
              opacity: 0.8,
            }}
          >
            We take pride in our seamless and results-driven execution.{" "}
          </h3>
          <p
            style={{
              fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
              marginTop: "1rem",
              opacity: 0.8,
            }}
          >
            Unbeatable Execution! / Our Success Metrics! We take pride in our
            seamless and results-driven execution. With a well-structured
            approach, expert trainers, and industry-relevant content, we deliver
            impactful learning experiences that drive success.
          </p>
          <h3
            style={{
              fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
              fontWeight: "900",
              marginTop: "1rem",
              opacity: 0.8,
            }}
          >
            Our impact speaks for itself!{" "}
          </h3>

          {/* Statistics Section */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              marginTop: "2rem",
              justifyContent: "center",
            }}
            ref={counterSectionRef}
          >
            <div
              style={{
                flex: "1 1 130px",
                minWidth: "130px",
                maxWidth: "180px",
                marginBottom: "1rem",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(1.6rem, 4vw, 2rem)",
                  fontWeight: "bold",
                  color: "#f27757",
                }}
              >
                <AnimatedCounter
                  startValue={0}
                  endValue={counters.b2b}
                  duration={2000}
                  isVisible={isVisible}
                />
                +
              </h2>
              <p style={{ fontSize: "1rem", opacity: 0.8 }}>
                Business to Business
              </p>
              <p style={{ fontSize: "1rem", opacity: 0.8 }}>(B2B)</p>
            </div>

            <div
              style={{
                flex: "1 1 130px",
                minWidth: "130px",
                maxWidth: "180px",
                marginBottom: "1rem",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(1.6rem, 4vw, 2rem)",
                  fontWeight: "bold",
                  color: "#f27757",
                }}
              >
                <AnimatedCounter
                  startValue={0}
                  endValue={counters.b2i}
                  duration={2000}
                  isVisible={isVisible}
                />
                +
              </h2>
              <p style={{ fontSize: "1rem", opacity: 0.8 }}>
                Business to Institute
              </p>
              <p style={{ fontSize: "1rem", opacity: 0.8 }}>(B2I)</p>
            </div>

            <div
              style={{
                flex: "1 1 130px",
                minWidth: "130px",
                maxWidth: "180px",
                marginBottom: "1rem",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(1.6rem, 4vw, 2rem)",
                  fontWeight: "bold",
                  color: "#f27757",
                }}
              >
                <AnimatedCounter
                  startValue={0}
                  endValue={counters.csr}
                  duration={2000}
                  isVisible={isVisible}
                />
                +
              </h2>
              <p style={{ fontSize: "1rem", opacity: 0.8 }}>
                Corporate Social Responsibility
              </p>
              <p style={{ fontSize: "1rem", opacity: 0.8 }}>(CSR)</p>
            </div>

            <div
              style={{
                flex: "1 1 130px",
                minWidth: "130px",
                maxWidth: "180px",
                marginBottom: "1rem",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(1.6rem, 4vw, 2rem)",
                  fontWeight: "bold",
                  color: "#f27757",
                }}
              >
                <AnimatedCounter
                  startValue={0}
                  endValue={counters.b2c}
                  duration={2000}
                  isVisible={isVisible}
                />
                +
              </h2>
              <p style={{ fontSize: "1rem", opacity: 0.8 }}>
                Business to Client
              </p>
              <p style={{ fontSize: "1rem", opacity: 0.8 }}>(B2C)</p>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div
          style={{
            flex: "0 1 320px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <Image
            src="/assets/img/home-1/newhero/team.png"
            alt="Team Illustration"
            width={320}
            height={250}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
      </div>
      <div
        style={{
          width: "96vw",
          margin: "1.5rem 0",
          textAlign: "center",
          marginTop: "1rem",
          padding: "2rem",
          background: "linear-gradient(135deg, #FFF1DB 0%, #FCE6C9 100%)", // Soft Gradient
          borderRadius: "16px",
          boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.15)", // Deeper shadow for depth
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle Background Decorations */}
        <div
          style={{
            position: "absolute",
            top: "-30px",
            left: "-30px",
            width: "80px",
            height: "80px",
            background: "#f27757",
            opacity: 0.2,
            borderRadius: "50%",
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            bottom: "-40px",
            right: "-40px",
            width: "100px",
            height: "100px",
            background: "#405D72",
            opacity: 0.15,
            borderRadius: "50%",
          }}
        ></div>

        <h2
          style={{
            fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
            fontWeight: "bold",
            color: "#f27757", // Primary color
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              color: "#405D72", // Muted navy for heading
              textDecoration: "underline",
              paddingBottom: "4px",
              position: "relative",
            }}
          >
            Total Execution
            <span
              style={{
                position: "absolute",
                width: "100%",
                height: "3px",
                background: "#f27757", // Underline in primary color
                bottom: "-3px",
                left: "0",
              }}
            ></span>
          </span>

          {/* Animated Counter Section */}
          <span
            style={{
              fontSize: "2.8rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              color: "#f27757",
              padding: "8px 16px",
              borderRadius: "12px",
              backdropFilter: "blur(6px)", // Glassmorphism
              transition: "transform 0.3s ease-in-out",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <i
              className="icon-bar-chart"
              style={{
                marginRight: "10px",
                fontSize: "2rem",
                color: "#f27757",
              }}
            ></i>
            <AnimatedCounter
              startValue={0}
              endValue={totalCount}
              duration={2000}
              isVisible={isVisible}
            />
          </span>
        </h2>
      </div>
      {/* Media queries for responsive design */}
      <style jsx>{`
        @media (max-width: 768px) {
          .hero-section {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
