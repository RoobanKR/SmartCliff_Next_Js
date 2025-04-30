"use client"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAboutUs } from "@/redux/slices/aboutUs/aboutUs";

export default function AboutUs() {
  const dispatch = useDispatch();
  const allss = useSelector((state) => state.aboutUs.aboutUsItems);

  useEffect(() => {
    dispatch(getAllAboutUs());
  }, [dispatch]);

  return (
    <section className="layout-pt-xs layout-pb-sm bg-gray-50">
      {allss.map((elm, i) => (
        <div className="container py-12" key={i}>
          <div className="row y-gap-30 items-center">
            {/* Content Column */}
            <div className="col-xl-6 col-lg-6 order-lg-1">
              <div className="about-content p-6 md:p-8">
                              <p
                  className="text-lg md:text-xl leading-relaxed font-sans text-gray-700"
                  data-aos="fade-up"
                  data-aos-delay="100"
                  style={{ textAlign: "justify",fontWeight: "600", fontFamily: "'Poppins', sans-serif", }}
                >
                  {elm.title}
                </p>
                
                {/* Additional paragraph with enhanced styling */}
                <p 
                  className="mt-4 text-lg md:text-xl leading-relaxed font-serif italic text-gray-600"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  We are committed to excellence and innovation in everything we do.
                </p>
                        
              </div>
            </div>

            {/* Image Column */}
            <div className="col-xl-6 col-lg-6 order-lg-2">
              <div 
                className="about-image rounded-xl overflow-hidden shadow-xl"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                <img
                  src={elm.image}
                  alt="About Us"
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}