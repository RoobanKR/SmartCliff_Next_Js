"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOurPrograms } from "@/redux/slices/mca/ourProgram/ourProgram";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";

export default function OurProgram({ collegeId }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const ourProgram = useSelector((state) => state.ourProgram.ourProgram);
  const loading = useSelector((state) => state.ourProgram.loading);
  const error = useSelector((state) => state.ourProgram.error);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    dispatch(fetchOurPrograms());
  }, [dispatch]);

  const matchedProgram = ourProgram.filter(
    (program) => program.college?._id === collegeId
  );

  return (
    <section className="program-container">
      <div className="program-wrapper">
        <div className="program-header">
          <div className="program-subtitle">
            <span className="subtitle-line"></span>
            <span className="subtitle-text">Program Highlights</span>
            <span className="subtitle-line"></span>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading program details...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <svg
              className="error-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12" y2="16"></line>
            </svg>
            <p>Unable to load program details. Please try again later.</p>
            <button
              className="retry-button"
              onClick={() => dispatch(fetchOurPrograms())}
            >
              Retry
            </button>
          </div>
        ) : (
          <div
            className="program-swiper-container"
            style={{ paddingBottom: "10px" }}
          >
            {matchedProgram.length === 0 ? (
              <div className="no-programs">
                <p>No program highlights available for this degree program.</p>
              </div>
            ) : (
              <Swiper
                slidesPerView={1}
                spaceBetween={20}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  992: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                  1200: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                modules={[Autoplay, Pagination]}
                className="program-swiper"
              >
                {matchedProgram.map((program, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className={`program-card ${
                        activeCard === index ? "active" : ""
                      }`}
                      onMouseEnter={() => setActiveCard(index)}
                      onMouseLeave={() => setActiveCard(null)}
                      onClick={() =>
                        setActiveCard(activeCard === index ? null : index)
                      }
                    >
                      <div className="program-image-container">
                        <img
                          src={program.icon}
                          alt={program.title}
                          className="program-icon"
                        />
                      </div>
                      <div className="program-content">
                        <h3 className="program-name">{program.title}</h3>
                        {/* <p className="program-description">
                          {program.description}
                        </p> */}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .program-container {
          font-family: "Poppins", sans-serif;
          padding: 0px 20px;
        }
 
        .program-wrapper {
         \
          margin: 0 auto;
        }
 
        .program-header {
          text-align: center;
        }
 
        .program-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 20px;
          color: #2d2d3a;
          position: relative;
          display: inline-block;
        }
 
        .program-title::after {
          content: "";
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, rgb(0, 0, 0), rgb(0, 0, 0));
          border-radius: 3px;
        }
 
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
 
        .program-swiper-container {
          position: relative;
          padding-bottom: 60px; /* Space for pagination dots */
        }
 
        .program-card {
          background: white;
          border-radius: 16px;
          padding: 30px 25px;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          border: 1px solid transparent;
          display: flex;
          flex-direction: column;
          align-items: center;
         
        }
 
        .program-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(90deg, #EF5A6F, #F3CA52, #80C4E9, #536493);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
 
        .program-card:hover,
        .program-card.active {
          transform: translateY(-10px);
        }
 
        .program-card:hover::before,
        .program-card.active::before {
          transform: scaleX(1);
        }
 
        .program-image-container {
          width: 100px;
          height: 100px;
          background: #f5f0ff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto 20px;
          box-shadow: 0 5px 15px rgba(75, 0, 130, 0.1);
          transition: all 0.3s ease;
        }
 
        .program-card:hover .program-image-container,
        .program-card.active .program-image-container {
          transform: scale(1.1);
        }
 
        .program-icon {
          width: 60px;
          height: 60px;
          object-fit: contain;
          transition: all 0.3s ease;
          filter: brightness(1);
        }
 
        .program-card:hover .program-icon,
        .program-card.active .program-icon {
        }
 
        .program-name {
          font-size: 1.5rem;
          color: #4b0082;
          font-weight: 600;
          margin-bottom: 15px;
          transition: all 0.3s ease;
          text-align: center;
        }
 
        .program-card:hover .program-name,
        .program-card.active .program-name {
        }
 
        .program-description {
          color: #555;
          font-size: 1rem;
          line-height: 1.6;
          text-align: center;
        }
 
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 50px 0;
        }
 
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(75, 0, 130, 0.1);
          border-radius: 50%;
          border-top-color: #8a2be2;
          animation: spin 1s ease-in-out infinite;
          margin-bottom: 20px;
        }
 
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
 
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 50px 0;
          color: #5b2c6f;
        }
 
        .error-icon {
          width: 50px;
          height: 50px;
          margin-bottom: 20px;
          color: #5b2c6f;
        }
 
        .retry-button {
          margin-top: 20px;
          padding: 10px 25px;
          background-color: #4b0082;
          color: white;
          border: none;
          border-radius: 5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
 
        .retry-button:hover {
          background-color: #8a2be2;
        }
 
        .no-programs {
          grid-column: 1 / -1;
          text-align: center;
          padding: 40px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        }
        .swiper-pagination-bullet {
          background: #8a2be2;
          opacity: 0.3;
        }
 
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: #4b0082;
        }
           @media (max-width: 640px) {
         

          .subtitle-text {
            font-size: 1.5rem;
             margin: 0 10px;
             text-align:center;
          }
        }
      `}</style>
      <style jsx global>{`
        .program-swiper {
          width: 100%;
          padding: 40px;
        }

        .swiper-pagination {
          bottom: 0 !important;
        }

        .swiper-pagination-bullet {
          background: #8a2be2;
          opacity: 0.3;
        }

        .swiper-pagination-bullet-active {
          opacity: 1;
          background: #4b0082;
        }
      `}</style>
    </section>
  );
}
