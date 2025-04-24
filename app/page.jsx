"use client";
import Preloader from "@/components/common/Preloader";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import FooterTwo from "@/components/layout/footers/Footer";
import HeroTwo from "@/components/homes/heros/HeroTwo";
import FrequentlyAskedQuestion from "@/components/homes/faq/Faq";
import Hiring from "@/components/homes/heros/Hiring";
import TestimonialsEight from "@/components/common/testimonial8";
import ExecutionOvervirewHome from "@/components/homes/heros/executionOverview";
import CategoriesHomeOne from "@/components/homes/heros/serviceOverview";
import WhySmartcliff from "@/components/homes/about/whysmartcliff";
import ExecutiveOverview2 from "@/components/homes/heros/executionOverview2";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getPopUpNotification } from "@/redux/slices/popUp/popUp";
import { FaTimes } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper";

export default function HomePage() {
  const dispatch = useDispatch();
  const { popupData, loading, error } = useSelector(
    (state) => state.popupNotification
  );
  const [showPopup, setShowPopup] = useState(false);
  const [openPopups, setOpenPopups] = useState([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    dispatch(getPopUpNotification());
  }, [dispatch]);

  useEffect(() => {
    if (popupData && popupData.length > 0) {
      const filtered = popupData.filter((popup) => popup.isOpen);
      setOpenPopups(filtered);
      setShowPopup(filtered.length > 0);
    }
  }, [popupData]);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      {openPopups.length > 0 && showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #3a0ca3, #0f0f0f)",
              borderRadius: "16px",
              padding: "24px", // Reduced padding
              maxWidth: "1000px",
              width: "95%",
              maxHeight: "85vh", // Limit vertical space
              overflowY: "auto", // Allow scroll if content overflows
              position: "relative",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "16px",
            }}
          >
            {/* Close Button */}
            <button
              onClick={closePopup}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                padding: "8px",
                borderRadius: "50%",
                cursor: "pointer",
                color: "#ffffffb0",
                zIndex: 10000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Close"
            >
              <FaTimes size={26} style={{ pointerEvents: "none" }} />
            </button>

            {/* Swiper Content */}
            <div style={{ width: "100%" }}>
              {openPopups.length > 1 ? (
                <Swiper
                  modules={[Pagination, Navigation, Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1}
                  onInit={(swiper) => {
                    if (swiper.params.navigation) {
                      swiper.params.navigation.prevEl = prevRef.current;
                      swiper.params.navigation.nextEl = nextRef.current;
                      swiper.navigation.init();
                      swiper.navigation.update();
                    }
                  }}
                  pagination={{
                    el: ".executive-pagination",
                    clickable: true,
                  }}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                >
                  {openPopups.map((popup, index) => (
                    <SwiperSlide key={popup._id || index}>
                      <PopupCard popup={popup} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <PopupCard popup={openPopups[0]} />
              )}
            </div>

            {/* Navigation and Pagination */}
            {openPopups.length > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px",
                  marginTop: "10px", // Reduced spacing
                }}
              >
                <button
                  ref={prevRef}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    border: "none",
                    padding: "6px",
                    borderRadius: "9999px",
                    cursor: "pointer",
                    color: "#ffffff",
                  }}
                  aria-label="Previous"
                >
                  <ArrowLeft size={24} />
                </button>

                <div
                  className="executive-pagination"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                  }}
                />

                <button
                  ref={nextRef}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    border: "none",
                    padding: "6px",
                    borderRadius: "9999px",
                    cursor: "pointer",
                    color: "#ffffff",
                  }}
                  aria-label="Next"
                >
                  <ArrowRight size={24} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Page content */}
      <Preloader />
      <HeaderTwo />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <HeroTwo />
        <ExecutionOvervirewHome />
        <ExecutiveOverview2 />
        <WhySmartcliff />
        <CategoriesHomeOne />
        <TestimonialsEight />
        <Hiring />
        <FrequentlyAskedQuestion />
        <FooterTwo />
      </div>
    </>
  );
}

function PopupCard({ popup }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        padding: "0 10px",
      }}
    >
      <h2
        style={{
          fontSize: "20px",
          fontWeight: "700",
          color: "#FACC15",
          marginBottom: "8px",
          textAlign: "center",
        }}
      >
        {popup.title}
      </h2>
      <p
        style={{
          color: "#e5e7eb",
          fontSize: "14px",
          lineHeight: "1.6",
          textAlign: "center",
          marginBottom: popup.link ? "12px" : "0",
        }}
      >
        {popup.description}
      </p>
      {popup.link && (
        <div style={{ textAlign: "center" }}>
          <a
            href={popup.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#FACC15",
              textDecoration: "underline",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            Apply Now →
          </a>
        </div>
      )}
    </div>
  );
}
