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
import { useEffect, useState } from "react";
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

  const swiperStyles = {
    container: {
      padding: "0px 0",
      position: "relative",
    },
    pagination: {
      bottom: "-10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
    },
    paginationBullet: {
      width: "10px",
      height: "10px",
      backgroundColor: "#ccc",
      borderRadius: "50%",
      opacity: 0.5,
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    paginationBulletActive: {
      width: "20px",
      height: "10px",
      backgroundColor: "#007bff",
      borderRadius: "5px",
      opacity: 1,
    },
    navigationButton: {
      color: "#007bff",
      backgroundColor: "rgba(0, 123, 255, 0.1)",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      transition: "all 0.3s ease",
    },
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
              padding: "24px",
              maxWidth: "600px", // reduced from 850px
              width: "90%",
              position: "relative",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#ffffff",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
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
                cursor: "pointer",
                color: "#ffffffb0",
              }}
              aria-label="Close"
            >
              <FaTimes size={26} />
            </button>

            {/* Swiper Wrapper */}
            <div className="relative w-full">
              {openPopups.length > 1 ? (
                <Swiper
                  modules={[Pagination, Navigation, Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1}
                  pagination={{
                    el: ".executive-pagination",
                    clickable: true,
                  }}
                  navigation={{
                    nextEl: ".icon-arrow-right-executive",
                    prevEl: ".icon-arrow-left-executive",
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

              {/* Arrows */}
              {openPopups.length > 1 && (
                <>
                  <button
                    className="icon-arrow-left-executive absolute left-[-30px] top-1/2 transform -translate-y-1/2 z-10 rounded-full bg-white/10 hover:bg-white/20 p-3 text-white transition duration-300"
                    aria-label="Previous"
                  >
                    <ArrowLeft size={24} />
                  </button>

                  <button
                    className="icon-arrow-right-executive absolute right-[-30px] top-1/2 transform -translate-y-1/2 z-10 rounded-full bg-white/10 hover:bg-white/20 p-3 text-white transition duration-300"
                    aria-label="Next"
                  >
                    <ArrowRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Pagination Centered at Bottom */}
            {openPopups.length > 1 && (
              <div className="executive-pagination flex justify-center items-center gap-2 mt-6" />
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
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <img
          src={popup.image}
          alt="Popup"
          style={{
            width: "100%",
            maxWidth: "200px", // reduced from 320px
            borderRadius: "12px",
            objectFit: "cover",
            boxShadow: "0 4px 10px rgba(255, 255, 255, 0.08)",
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2
          style={{
            fontSize: "22px", // reduced from 28px
            fontWeight: "700",
            color: "#FACC15",
            marginBottom: "10px",
          }}
        >
          {popup.title}
        </h2>
        <p
          style={{
            color: "#e5e7eb",
            fontSize: "14px", // slightly smaller
            lineHeight: "1.5",
            marginBottom: "20px",
          }}
        >
          {popup.description}
        </p>
        {popup.link && (
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
        )}
      </div>
    </div>
  );
}
