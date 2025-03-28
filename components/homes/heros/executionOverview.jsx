"use client";
import { fetchExecutionHighlights } from "@/redux/slices/services/executionHighlights/Execution_Highlights";
import { fetchExecutionOverview } from "@/redux/slices/services/executionOverview/ExecutionOverview";
import { selectBusinessServices } from "@/redux/slices/services/services/businessServices";
import { selectServices } from "@/redux/slices/services/services/Services";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AnimatedCounter = ({
  startValue = 0,
  endValue = 0,
  duration = 2000,
  isVisible = false,
}) => {
  const [count, setCount] = useState(startValue);

  useEffect(() => {
    // Only start animation if component is visible and endValue is set
    if (!isVisible || endValue === 0) {
      setCount(startValue);
      return;
    }

    // Reset to start value when section becomes visible
    setCount(startValue);

    // Calculate animation steps
    const steps = Math.floor(duration / 16); // ~60fps
    const increment = (endValue - startValue) / steps;
    let currentCount = startValue;
    let timer;

    const updateCounter = () => {
      currentCount += increment;

      if (
        (increment > 0 && currentCount >= endValue) ||
        (increment < 0 && currentCount <= endValue)
      ) {
        // We've reached or passed the target
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
  const [selectedYear, setSelectedYear] = useState(null);
  const [displayData, setDisplayData] = useState([]);
  const [matchedServiceAbouts, setMatchedServiceAbouts] = useState([]);
  const executionOverviews = useSelector(
    (state) => state.executionOverviews.executionOverviews
  );

  const executionHighlights = useSelector(
    (state) => state.executionHighlights.executionHighlights
  );
  const services = useSelector(selectServices);
  const servicesBusiness = useSelector(selectBusinessServices);
  const [isVisible, setIsVisible] = useState(false);
  const counterSectionRef = useRef(null);

  // Counters for different business types
  const [counters, setCounters] = useState({
    b2b: 0,
    b2i: 0,
    b2c: 0,
    csr: 0,
  });

  // Set up Intersection Observer to detect when counter section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            // Reset visibility when section leaves viewport
            setIsVisible(false);
          }
        });
      },
      {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.1, // trigger when at least 10% of the element is visible
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

  useEffect(() => {
    dispatch(fetchExecutionOverview());
    dispatch(fetchExecutionHighlights());
  }, [dispatch]);

  useEffect(() => {
    if (!services.length || !servicesBusiness.length) return;

    const fullUrl = typeof window !== "undefined" ? window.location.href : "";
    const segments = fullUrl.split("/").filter(Boolean);
    const lastSegment = segments.pop();
    const secondLastSegment = segments.pop();

    const onematchingData = servicesBusiness.find(
      (i) => i.slug === secondLastSegment
    );
    const twomatchingService = services.find((i) => i.slug === lastSegment);

    if (!onematchingData || !twomatchingService) return;

    const matchedServices = services.filter(
      (service) => service.business_services?._id === onematchingData?._id
    );

    const finalMatchedService = matchedServices.find(
      (service) => service.slug === twomatchingService?.slug
    );

    if (finalMatchedService && executionOverviews.length) {
      const filtered = executionOverviews.filter(
        (i) => i.service._id === finalMatchedService._id
      );
      setMatchedServiceAbouts(filtered);
    }
  }, [services, servicesBusiness, executionOverviews]);

  // Set initial data and handle year filtering
  useEffect(() => {
    if (selectedYear === null) {
      setDisplayData(
        matchedServiceAbouts.length > 0
          ? matchedServiceAbouts
          : executionOverviews
      );
    }
  }, [selectedYear, matchedServiceAbouts, executionOverviews]);

  // Calculate totals for different business service types
  useEffect(() => {
    if (!executionOverviews.length || !servicesBusiness.length) return;

    // Initialize counters
    const newCounters = {
      b2b: 0,
      b2i: 0,
      b2c: 0,
      csr: 0,
    };

    // Loop through all execution overviews
    executionOverviews.forEach((overview) => {
      // Find the service associated with this overview
      const service = services.find((s) => s._id === overview.service?._id);

      if (service && service.business_services) {
        // Find the business service type
        const businessService = servicesBusiness.find(
          (bs) => bs._id === service.business_services._id
        );

        if (businessService) {
          // Categorize based on business service name/type
          const businessType = businessService.name?.toLowerCase() || "";

          if (businessType.includes("corporate")) {
            newCounters.b2b += overview.batch_size;
          } else if (businessType.includes("institute")) {
            newCounters.b2i += overview.batch_size;
          } else if (businessType.includes("learner")) {
            newCounters.b2c += overview.batch_size;
          } else if (businessType.includes("csr")) {
            newCounters.csr += overview.batch_size;
          }
        }
      }
    });

    console.log("counters.b2b:", counters.b2b);

    setCounters(newCounters);
  }, [executionOverviews, services, servicesBusiness]);
  useEffect(() => {
    console.log("Updated counters:", counters);
  }, [counters]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "black",
        padding: "3rem",
        gap: "3rem",
      }}
    >
      {/* Left Content */}
      <div style={{ flex: 1 }}>
        <h1
          style={{
            fontSize: "2.6rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            lineHeight: "1.2",
          }}
        >
          Unbeatable execution
          <br />
          Made for the <span style={{ color: "#f27757" }}>institutes</span>
        </h1>
        {/* Subtitle */}
        <h3 style={{ fontSize: "1.5rem", fontWeight: "500", opacity: 0.8 }}>
          Empowering institutions with efficiency, automation, and seamless
          workflows.
        </h3>
        {/* Short Description */}
        <p style={{ fontSize: "1.1rem", marginTop: "1rem", opacity: 0.8 }}>
          Trusted by millions, our platform simplifies your operations, enhances
          user experience, and scales effortlessly across the globe.
        </p>
        {/* Statistics Section */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            marginTop: "2rem",
          }}
          ref={counterSectionRef}
        >
          <>
            <div style={{ minWidth: "150px" }}>
              <h2
                style={{
                  fontSize: "2rem",
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

            <div style={{ minWidth: "150px" }}>
              <h2
                style={{
                  fontSize: "2rem",
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
                Business to institute
              </p>
              <p style={{ fontSize: "1rem", opacity: 0.8 }}>(B2I)</p>
            </div>

            <div style={{ minWidth: "150px" }}>
              <h2
                style={{
                  fontSize: "2rem",
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

            <div style={{ minWidth: "150px" }}>
              <h2
                style={{
                  fontSize: "2rem",
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
          </>
        </div>
        {/* Call-To-Action Button */}
        {/* <button
          style={{
            marginTop: "3rem",
            padding: "0.8rem 2rem",
            fontSize: "1rem",
            border: "2px solid black",
            background: "transparent",
            color: "black",
            cursor: "pointer",
          }}
        >
          MORE ABOUT Smartcliff →
        </button>{" "} */}
      </div>

      {/* Right Side - Image */}
      <div>
        <Image
          src="/assets/img/home-1/newhero/team.png"
          alt="Zoho Illustration"
          width={320}
          height={250}
        />
      </div>

      {/* Styles for the button */}
      <style jsx>{`
        .cta-button {
          margin-top: 2rem;
          padding: 12px 24px;
          font-size: 1.2rem;
          font-weight: bold;
          background-color: #405d72;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .cta-button:hover {
          background-color: #6482ad;
        }
      `}</style>
    </div>
  );
}

