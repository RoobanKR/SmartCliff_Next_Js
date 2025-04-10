"use client";

import "../public/assets/sass/styles.scss";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-calendar/dist/Calendar.css";
import "../public/assets/css/fixedButton.css";

config.autoAddCss = false;

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Context from "@/context/Context";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { useRouter } from "next/navigation";
import EnquiryModal from "@/components/common/EnquiryModal";
import { FaWhatsapp } from "react-icons/fa";

export default function RootLayout({ children }) {
  const router = useRouter();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [followerPos, setFollowerPos] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMouseDevice, setIsMouseDevice] = useState(true);


  const handleEnquiryClick = () => {
    setIsModalOpen(true); // Open modal instead of redirecting
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    AOS.init({
      duration: 700,
      offset: 120,
      easing: "ease-out",
      once: true,
    });

    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    const isMouseDevice = window.matchMedia("(pointer: fine)").matches;

    if (!isMouseDevice) return; // Skip adding mousemove listener on touch devices

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      clearTimeout(window.cursorTimeout);
      window.cursorTimeout = setTimeout(() => setIsMoving(false), 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);


  useEffect(() => {
    setIsMouseDevice(window.matchMedia("(pointer: fine)").matches);
  }, []);


  useEffect(() => {
    let animationFrame;

    const updatePositions = () => {
      setFollowerPos((prev) => ({
        x: prev.x + (mousePos.x - prev.x) / 6, // Smooth delay
        y: prev.y + (mousePos.y - prev.y) / 6,
      }));

      animationFrame = requestAnimationFrame(updatePositions);
    };

    animationFrame = requestAnimationFrame(updatePositions);
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePos]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Provider store={store}>
      <html lang="en">
        <head />
        <body>
          <Context>
            {isMouseDevice && (
              <div
                style={{
                  position: "fixed",
                  width: isMoving ? "1rem" : "0.7rem",
                  height: isMoving ? "1rem" : "0.7rem",
                  backgroundColor: "#27eb62",
                  borderRadius: "50%",
                  mixBlendMode: "difference",
                  pointerEvents: "none",
                  zIndex: 9999,
                  transform: `translate(${mousePos.x - 6}px, ${mousePos.y - 6}px)`,
                  transition:
                    "transform 0.08s linear, width 0.2s ease, height 0.2s ease",
                  opacity: isMoving ? 1 : 0.5,
                }}
              />
            )}

            {/* Page Content */}
            {children}
            <EnquiryModal isOpen={isModalOpen} onClose={closeModal} />
            {/* 
            <button
              className="learn-more"
              onClick={handleEnquiryClick}
              style={{ background: "#E91E63" }}
            >
              <img
                src="/assets/img/enquiry.png"
                alt="Enquiry Icon"
                width="20"
                height="20"
                className="svg-icon"
              />
              <span className="label">Enquiry</span>
            </button> */}

            {/* Back to Top Button */}
            {showScrollButton && (
              <button
                className="back-to-top"
                onClick={scrollToTop}
                style={{ bottom: "50px" }}
              >
                <svg className="svgIcon" viewBox="0 0 384 512">
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
                </svg>
              </button>
            )}
            {/* WhatsApp Button */}
            <a
              href="https://api.whatsapp.com/send?phone=918110077033&text=I+would+like+to+discuss+about+the+courses+offered"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: "fixed",
                bottom: "10px",
                right: "10px",
                zIndex: 10000,
                backgroundColor: "#25D366",
                color: "white",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out",
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <FaWhatsapp color="white" size={19} />
            </a>
          </Context>
        </body>
      </html>
    </Provider>
  );
}
