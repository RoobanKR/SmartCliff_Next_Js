"use client";
import React from "react";
import Socials from "@/components/common/Socials";
import FooterLinksTwo from "../component/FooterLinksTwo";
import Image from "next/image";
export default function FooterTwo() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <footer
      className="footer -type-4 bg-dark-10"
      style={{ fontFamily: "serif" }}
    >
      <div className="container">
        <div className="row y-gap-30 justify-between pt-60">
          <div className="col-lg-7 col-md-6">
            <div className="text-17 fw-500 text-black uppercase mb-25">
              GET IN TOUCH
            </div>
            <form
              onSubmit={handleSubmit}
              className="form-single-field -base mt-15"
            >
              <input
                required
                className="py-20 px-30 bg-dark-11 rounded-200 text-black"
                type="text"
                placeholder="Your Email"
              />
              <button className="button -white rounded-full" type="submit">
                <i className="icon-arrow-right text-24 text-dark-1"></i>
              </button>
            </form>
          </div>

          <div className="col-xl-4 col-lg-5 col-md-6">
            <div className="footer-header__logo">
              <Image
                width={140}
                height={50}
                src="/assets/img/general/logo.png"
                alt="logo"
              />
            </div>

            <div className="d-flex justify-between mt-30">
              <div className="">
                <div className="text-black opac-70">
                  Toll Free Customer Care
                </div>
                <div className="text-18 lh-1 fw-500 text-black mt-5">
                  +91 811 007 7033
                </div>
              </div>
              <div className="">
                <div className="text-black opac-70">Need live support?</div>
                <div className="text-18 lh-1 fw-500 text-black mt-5">
                  enquiry@smartcliff.in
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 justify-between pt-60 pb-60">
          <div className="col-lg-7 col-md-6">
            <div className="row y-gap-30">
              <FooterLinksTwo
                allClasses={"text-17 fw-500 text-black uppercase mb-25"}
              />
            </div>
          </div>

          <div className="col-xl-4 col-lg-5 col-md-6">
            <div className="footer-header-socials mt-60">
              <div className="text-17 uppercase text-black fw-500">
                Follow us on social media
              </div>
              <div className="footer-header-socials__list d-flex items-center mt-15">
                <Socials
                  componentsClass={
                    "size-40 d-flex justify-center items-center text-black"
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="py-30 border-top-light-15">
          <div className="row justify-between items-center y-gap-20">
            <div className="col-auto">
              <div className="d-flex items-center h-100 text-black">
                © {new Date().getFullYear()} Smartcliff. All Right Reserved.
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex x-gap-20 y-gap-20 items-center flex-wrap">
                <div>
                  <div className="d-flex x-gap-15 text-black"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
