"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function HeroUIThree() {
  const containerRef = useRef(null);

  useEffect(() => {
    const colors = ["#AB886D", "#99B080", "#F9B572", "#D69ADE", "#98D2C0"];
    const numBalls = 30;
    const container = containerRef.current;

    if (!container) return;

    const balls = [];

    for (let i = 0; i < numBalls; i++) {
      let ball = document.createElement("div");
      ball.classList.add("ball");
      ball.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      ball.style.left = `${Math.random() * 100}%`; // Spread across full width
      ball.style.top = `${Math.random() * 100}%`; // Spread across full height
      let size = `${Math.random() * 0.7 + 0.3}em`; // Smaller balls (0.3em to 1em)
      ball.style.width = size;
      ball.style.height = size;
      ball.style.position = "absolute";
      ball.style.borderRadius = "50%"; // Perfectly circular
      ball.style.opacity = "10"; // No shadow effect

      balls.push(ball);
      container.appendChild(ball);
    }

    // Faster Animation
    balls.forEach((el, i) => {
      let to = {
        x: Math.random() * (i % 2 === 0 ? -15 : 15), // Moves more dynamically
        y: Math.random() * (i % 2 === 0 ? -15 : 15),
      };

      el.animate(
        [
          { transform: "translate(0, 0)" },
          { transform: `translate(${to.x}px, ${to.y}px)` },
        ],
        {
          duration: (Math.random() + 0.5) * 1500, // Faster movement
          direction: "alternate",
          fill: "both",
          iterations: Infinity,
          easing: "ease-in-out",
        }
      );
    });

    return () => {
      balls.forEach((ball) => ball.remove());
    };
  }, []);

  const features = [
    {
      title: "Expert-Led Courses",
      description: "Learn from top professionals in various fields.",
      imgSrc: "https://cdn-icons-png.flaticon.com/512/2333/2333100.png",
    },
    {
      title: "Certified Programs",
      description: "Get industry-recognized certificates to boost your career.",
      imgSrc: "https://cdn-icons-png.flaticon.com/512/3135/3135767.png",
    },
    {
      title: "Supportive Community",
      description: "Connect with peers and mentors to grow together.",
      imgSrc: "https://cdn-icons-png.flaticon.com/512/1995/1995574.png",
    },
  ];

  return (
    <>
      {/* Global Styles */}
      <style jsx global>{`
        /* Responsive styles */
        @media (max-width: 768px) {
          .hero-container {
            padding: 10px 15px !important;
          }

          .hero-title {
            font-size: 36px !important;
            margin-bottom: 35px !important;
            line-height: 1.2 !important;
          }

          .features-grid {
            grid-template-columns: 1fr !important;
            max-width: 100% !important;
            gap: 25px !important;
            padding: 5px !important;
          }

          .feature-image {
            width: 50px !important;
            height: 50px !important;
          }

          .feature-title {
            font-size: 18px !important;
          }

          .feature-description {
            font-size: 14px !important;
          }

          .corner-decoration {
            width: 80px !important;
            height: 80px !important;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 30px !important;
          }

          .hero-container {
            padding: 85px 10px 20px 10px !important;
          }

          .corner-decoration {
            width: 60px !important;
            height: 60px !important;
          }
        }
      `}</style>

      <div
        className="hero-container"
        style={{
          position: "relative",
          minHeight: "100vh",
          backgroundColor: "#F5F7FA",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          overflow: "hidden",
          textAlign: "center",
        }}
        // ref={containerRef}
      >
        {/* Background Image */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Image
            src="/assets/img/home-1/newhero/bckimg1.png"
            alt="Background"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>

        {/* Floating Decorative Elements */}
        <div
          className="corner-decoration"
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            zIndex: 1,
          }}
        >
          <Image
            src="/assets/img/home-1/newhero/topcorner.svg"
            alt="Top Corner"
            width={100}
            height={100}
            unoptimized
          />
        </div>

        <div
          className="corner-decoration"
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            zIndex: 1,
          }}
        >
          <Image
            src="/assets/img/home-1/newhero/bottomcorner.svg"
            alt="Bottom Corner"
            width={130}
            height={130}
            unoptimized
          />
        </div>

        {/* Main Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "900px",
            width: "100%",
          }}
        >
          <h2
            className="hero-title"
            style={{
              fontSize: "53px",
              fontWeight: "800",
              color: "#2C2C2C",
              marginBottom: "50px",
              lineHeight: 1.3,
            }}
          >
            <span style={{ color: "#f27757", fontWeight: "bold" }}>
              SmartCliff
            </span>{" "}
            <br />
            Where Learning Meets Success!
          </h2>

          {/* Feature Section */}
          <div
            className="features-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "30px",
              maxWidth: "1100px",
              margin: "0 auto",
              padding: "20px",
              textAlign: "left",
            }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Image
                  className="feature-image"
                  src={feature.imgSrc}
                  alt={feature.title}
                  width={60}
                  height={60}
                  unoptimized
                />
                <div>
                  <h3
                    className="feature-title"
                    style={{
                      fontSize: "22px",
                      fontWeight: "600",
                      color: "#333",
                      marginBottom: "5px",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="feature-description"
                    style={{
                      fontSize: "16px",
                      color: "#555",
                      lineHeight: "1.5",
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
