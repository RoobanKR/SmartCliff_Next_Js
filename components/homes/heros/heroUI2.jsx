"use client";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function HeroFour() {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="masthead -type-3 bg-light-6">
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "url('/assets/img/about-1/bckimg13.jpg') no-repeat center center/cover",
            opacity: 0.5, // Adjust opacity here
            zIndex: -1, // Keeps it behind content
          }}
        ></div>
        <div className="container">
          <div className="row y-gap-30 items-center justify-center">
            <div className="col-xl-7 col-lg-11 relative z-5">
              <div className="masthead__content pl-32 lg:pl-0">
                <h1 className="masthead__title">
                  <br /> <span className="text-purple-1">SmartCliff</span> -
                  Where Learning Meets Success!
                </h1>

                <p className="masthead__text text-17 text-dark-1 mt-25">
                  At SmartCliff, we redefine learning with expert-led training
                  programs,
                  <br className="lg:d-none" />
                  and cutting-edge technology solutions.{" "}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    marginTop: "20px",
                  }}
                >
                  <Link href="/aboutUs" passHref>
                    <button
                      style={{
                        backgroundColor: "#000",
                        color: "#fff",
                        fontSize: "18px",
                        fontWeight: "600",
                        padding: "10px 20px",
                        borderRadius: "50px",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "200px",
                        gap: "10px",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.backgroundColor = "#333";
                        e.currentTarget.style.boxShadow =
                          "0px 6px 12px rgba(0,0,0,0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.backgroundColor = "#000";
                        e.currentTarget.style.boxShadow =
                          "0px 4px 8px rgba(0,0,0,0.3)";
                      }}
                    >
                      Learn More
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#fff",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
                          fontSize: "20px",
                          transition: "all 0.3s ease",
                          color: "#000",
                        }}
                      >
                        →
                      </div>
                    </button>
                  </Link>

                  <Image
                    src="/assets/img/about/img3.svg"
                    alt="Texture"
                    width={50}
                    height={50}
                  />
                </div>
              </div>
            </div>

            <div
              className="col-xl-5 col-lg-7 relative z-2"
              style={{ marginTop: "20px" }}
            >
              <div className="masthead-image">
                <div className="masthead-image__img1">
                  <img
                    src="/assets/img/hmebck.png"
                    alt="image"
                    data-move="20"
                    style={{ width: "450px", height: "450px" }}
                  />
                </div>

                <div className="masthead-image__el1"></div>

                {/* <div className="masthead-image__el2">
                  <div
                    data-move="40"
                    className="shadow-4 img-el -w-260 px-40 py-20 d-flex items-center bg-white rounded-8 js-mouse-move"
                  >
                    <div className="img-el__side">
                      <div className="size-50 d-flex justify-center items-center bg-dark-1 rounded-full">
                        <Image
                          width={20}
                          height={27}
                          src="/assets/img/masthead/2.svg"
                          alt="icon"
                        />
                      </div>
                    </div>
                    <div className="">
                      <div className="text-purple-1 text-16 fw-500 lh-1">
                        Let's Build Success Together!
                      </div>
                      <div className="mt-3">
                        Partner with us to drive innovation and growth
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
