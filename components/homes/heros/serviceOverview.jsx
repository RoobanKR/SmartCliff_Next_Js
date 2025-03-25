"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllBusinessServices,
  selectBusinessServices,
} from "@/redux/slices/services/services/businessServices";
import {
  fetchServices,
  selectServices,
} from "@/redux/slices/services/services/Services";

const CategoriesHomeOne = () => {
  const dispatch = useDispatch();
  const businessServices = useSelector(selectBusinessServices);
  const services = useSelector(selectServices);
  const [showSlider, setShowSlider] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});

  useEffect(() => {
    setShowSlider(true);
    dispatch(getAllBusinessServices());
    dispatch(fetchServices());
  }, [dispatch]);

  const getServicesByBusinessId = (businessServiceId) => {
    return services
      ?.filter(
        (service) =>
          service.business_services &&
          service.business_services._id === businessServiceId
      )
      .map((service) => ({
        title: service.title,
        slug: service.slug,
      }));
  };

  const handleCardFlip = (itemId) => {
    setFlippedCards((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const staticImages = [
    "https://images.ctfassets.net/ukazlt65o6hl/4zPcyKVokZYqoB755gFnt4/f54b0598af98427baeb5d324b989e0d5/Banner_Image_B2B_Customer_Service.png",
    "https://fluentsupport.com/wp-content/uploads/2022/03/b2c-customer-service-scaled.jpg",
    "https://assets.tradeholders.com/img/services/6217SDB7.jpg",
    "https://serviqbiz.in/assets/img/service/csr.jpg",
  ];

  return (
    <div className="categories-container">
      {/* Background design on right end */}
      <div className="background-image"></div>

      {/* Heading & Description */}
      <div className="heading-section">
        <h2>
          Our <span className="highlight">Services</span>
        </h2>
        <p>Discover our comprehensive range of business solutions</p>
      </div>

      {/* Container for Cards */}
      <div className="cards-container">
        {businessServices.map((item, index) => {
          const servicesList = getServicesByBusinessId(item._id);
          const isFlipped = flippedCards[item._id] || false;

          return (
            <div
              key={index}
              onMouseEnter={() => handleCardFlip(item._id)}
              onMouseLeave={() => handleCardFlip(item._id)}
              className="card-wrapper"
            >
              <div className={`card ${isFlipped ? "flipped" : ""}`}>
                {/* Front Side */}
                <div className="card-front">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="card-image"
                  />
                  <div className="card-content">
                    <div className="icon-title">
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt={item.name}
                          className="icon-image"
                        />
                      ) : (
                        <i className="icon-briefcase"></i>
                      )}
                      <span>{item.title.split(" ")[0]}</span>
                    </div>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        margin: "8px 0",
                      }}
                    >
                      {item.title}
                    </h3>{" "}
                    <p>({item.name})</p>
                  </div>
                </div>

                {/* Back Side */}
                <div className="card-back">
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginBottom: "15px",
                    }}
                  >
                    Our {item.name} Services
                  </h3>
                  <div className="services-list">
                    {servicesList && servicesList.length > 0 ? (
                      <div>
                        {servicesList.map((service, index) => (
                          <div key={index} className="service-item">
                            <Link href={`/${item.slug}/${service.slug}`}>
                              {service.title} 🔗
                            </Link>
                            {servicesList.length > 1 &&
                              index < servicesList.length - 1 && (
                                <div className="separator"></div>
                              )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>
                        Contact us to learn more about our {item.name} services
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add CSS */}
      <style jsx>{`
        .categories-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: linear-gradient(to right, #fdf9ff, #fdf9ff);
          padding: 40px;
          min-height: 80vh;
          position: relative;
        }

        /* Background Image (Hidden in Mobile) */
        .background-image {
          position: absolute;
          right: -25%;
          top: 0;
          width: 40%;
          height: 100%;
          background-image: url(/assets/img/servicebck.png);
          background-size: cover;
          background-position: center;
        }

        @media (max-width: 768px) {
          .background-image {
            display: none;
          }
        }

        /* Heading Section */
        .heading-section {
          text-align: center;
          margin-bottom: 30px;
        }

        .heading-section h2 {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 2px;
        }

        .heading-section .highlight {
          color: #f2775e;
        }

        .heading-section p {
          font-size: 16px;
          color: #666;
        }

        /* Cards Container */
        .cards-container {
          display: flex;
          gap: 20px;
          justify-content: space-between;
          z-index: 1;
          max-width: 1200px;
          width: 100%;
          padding: 0 40px;
        }

        @media (max-width: 768px) {
          .cards-container {
            flex-direction: column;
            align-items: center;
          }
        }

        /* Card Wrapper */
        .card-wrapper {
          width: 280px;
          height: 320px; /* Increase the height slightly for better balance */
          perspective: 1000px;
        }

        /* Card Flip Effect */
        .card {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.6s;
        }

        .flipped {
          transform: rotateY(180deg);
        }

        /* Card Front & Back */
        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 90%;
          backface-visibility: hidden;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 10px;
        }

        .card-back {
          transform: rotateY(180deg);
          color: #000;
        }

        /* Card Image */
        .card-image {
          width: 100%;
          height: 180px; /* Set a fixed height */
          object-fit: cover; /* Ensures images cover the area without distortion */
          object-position: center;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
        }

        /* Card Content */
        .card-content {
          padding: 10px;
          text-align: center;
        }

        .icon-title {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .icon-image {
          width: 20px;
          height: 20px;
          object-fit: cover;
          border-radius: 50%;
        }

        /* Services List */
        .services-list {
          max-height: 150px;
          overflow-y: auto;
          width: 100%;
        }

        .service-item {
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding-bottom: 8px;
        }

        .separator {
          width: 100%;
          height: 1px;
          background: rgba(0, 0, 0, 0.2);
          margin: 5px 0;
        }
      `}</style>
    </div>
  );
};

export default CategoriesHomeOne;
