"use client";
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function LearningSolutions({ matchedServiceAbouts }) {

  useEffect(() => {
    const parallaxIt = () => {
      const target = document.querySelectorAll(".js-mouse-move-container");

      target.forEach((container) => {
        const targets = container.querySelectorAll(".js-mouse-move");

        targets.forEach((el) => {
          const movement = el.getAttribute("data-move");

          document.addEventListener("mousemove", (e) => {
            const relX = e.pageX - container.offsetLeft;
            const relY = e.pageY - container.offsetTop;

            gsap.to(el, {
              x:
                ((relX - container.offsetWidth / 2) / container.offsetWidth) *
                Number(movement),
              y:
                ((relY - container.offsetHeight / 2) / container.offsetHeight) *
                Number(movement),
              duration: 0.2,
            });
          });
        });
      });
    };

    parallaxIt();
  }, []);

  return (
    <section className="layout-pb-md js-mouse-move-container">
      <div className="container">
        <div className="row y-gap-30 align-items-start">
          {matchedServiceAbouts.map((item, index) => (
            <div className="col-lg-6 order-2 order-lg-1">
              <h2 className="text-25 lg:text-10 md:text-30 text-dark-1">
                {item.heading}
              </h2>
              <p className="text-dark-1 mt-10">{item.subHeading}</p>

              <div className="row y-gap-20 pt-30">
                {item.feature.map((elm, i) => (
                  <div key={i} className="col-12">
                    <div className="featureIcon -type-1 d-flex">
                      <div className={`featureIcon__icon ${elm.iconBg}`}
                        style={{
                          width: "70px", // Adjust width if needed
                          height: "70px", // Adjust height if needed
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%", // Optional: if you want a circular icon
                          backgroundColor: '#f5f0ff',
                        }}
                      >
                        <Image
                          width={30}
                          height={30}
                          src={elm.icon || "/fallback-icon.jpg"}
                          alt="icon"
                        />
                      </div>
                      <div className="featureIcon__content ml-20 mt-10">
                        <h4 className="text-17 fw-500">{elm.title}</h4>
                        <p className="mt-5">
                          {elm.description.split(" ").slice(0, 5).join(" ")}{" "}
                          <br className="lg:d-none" />
                          {elm.description.split(" ").slice(5).join(" ")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="col-lg-6 order-1 order-lg-2">
            <div className="elements-image">
              {/* Main Dynamic Image */}
              {matchedServiceAbouts[0]?.images?.length > 0 && (
                <div
                  data-move="60"
                  className="elements-image__main mb-20 js-mouse-move"
                >
                  <Image
                    width={350}
                    height={50}
                    className="js-mouse-move rounded"
                    style={{ height: "400px" }}
                    data-move="40"
                    src={
                      matchedServiceAbouts[0].images[0] || "/fallback-image.jpg"
                    }
                    alt="Main image"
                  />
                </div>
              )}

              {/* Decorative Static Images */}
              <div
                data-move="60"
                className="elements-image__el1 lg:d-none img-el -w-260 px-20 py-20 d-flex items-center bg-white rounded-8 shadow js-mouse-move"
              >
                <Image
                  width={70}
                  height={70}
                  src="/assets/img/masthead/4.png"
                  alt="icon"
                />
                <div className="ml-20">
                  <div className="text-dark-1 text-16 fw-500">Ali Tufan</div>
                  <div className="mt-3">UX/UI Designer</div>
                  <div className="d-flex x-gap-5 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="icon-star text-yellow-1 text-11"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                data-move="30"
                className="elements-image__el2 lg:d-none img-el -w-250 px-20 py-20 d-flex items-center bg-white rounded-8 shadow js-mouse-move"
              >
                <div className="size-80 d-flex justify-center items-center bg-red-2 rounded-full">
                  <Image
                    width={24}
                    height={23}
                    src="/assets/img/masthead/1.svg"
                    alt="icon"
                  />
                </div>
                <div className="ml-20">
                  <div className="text-orange-1 text-16 fw-500">3,000 +</div>
                  <div className="mt-3">Free Courses</div>
                </div>
              </div>

              <div
                data-move="30"
                className="elements-image__el3 sm:d-none shadow-4 img-el -w-260 px-30 py-20 d-flex items-center bg-white rounded-8 shadow js-mouse-move"
              >
                <div className="img-el__side">
                  <div className="size-50 d-flex justify-center items-center bg-purple-1 rounded-full">
                    <Image
                      width={20}
                      height={27}
                      src="/assets/img/masthead/2.svg"
                      alt="icon"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-purple-1 text-16 fw-500">Congrats!</div>
                  <div className="mt-3">Your Admission Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
