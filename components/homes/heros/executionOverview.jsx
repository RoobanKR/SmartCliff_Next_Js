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
      ref={counterSectionRef}
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
             With a well-structured
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
              <p
                style={{
                  fontSize: "clamp(1rem, 1vw, 4rem)",
                  fontWeight: "600",
                  opacity: 0.8,
                }}
              >
                Business to Business
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  opacity: 0.8,
                }}
              >
                (B2B)
              </p>
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
              <p
                style={{
                  fontSize: "clamp(1rem, 1vw, 4rem)",
                  fontWeight: "600",
                  opacity: 0.8,
                }}
              >
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
              <p
                style={{
                  fontSize: "clamp(1rem, 1vw, 4rem)",
                  fontWeight: "600",
                  opacity: 0.8,
                }}
              >
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
              <p
                style={{
                  fontSize: "clamp(1rem, 1vw, 4rem)",
                  fontWeight: "600",
                  opacity: 0.8,
                }}
              >
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
          width: "100%",
          margin: "1.5rem auto",
          padding: "0.5rem",
          background: "linear-gradient(135deg, #FFF1DB 0%, #FCE6C9 100%)",
          borderRadius: "14px",
          position: "relative",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {/* Image Section */}
        <div
          style={{
            flex: "1 1 260px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/assets/img/home-1/newhero/Collab.png"
            alt="Learning Illustration"
            style={{
              maxWidth: "45%",
              height: "auto",
            }}
          />
        </div>

        {/* Text Section */}
        <div
          style={{
            flex: "1 1 260px",
            paddingRight: "0.75rem",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.2rem, 3.5vw, 1.8rem)",
              color: "#405D72",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            Empowering Growth Through Real Execution
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              color: "#555",
              maxWidth: "400px",
              lineHeight: "1.4",
            }}
          >
            Every execution counts. From enrollments to completions, our total
            execution reflects real outcomes, not just signups. This is where
            learning meets results.
          </p>

          {/* Count */}
          <div
            style={{
              marginTop: "1rem",
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: 700,
              color: "#f27757",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <i
              className="icon-users"
              style={{ fontSize: "1.5rem", color: "#f27757" }}
            />
            <AnimatedCounter
              startValue={0}
              endValue={totalCount}
              duration={2000}
              isVisible={isVisible}
            />
            <span style={{ fontSize: "0.95rem", color: "#405D72" }}>
              Total Execution
            </span>
          </div>
        </div>
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
