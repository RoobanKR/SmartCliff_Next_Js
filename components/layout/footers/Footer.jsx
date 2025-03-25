import React from "react";
import Socials from "@/components/common/Socials";
import Image from "next/image";
import FooterLinks from "../component/FooterLinks";
import Links from "@/components/common/links";

export default function FooterTwo() {
  return (
    <footer className="footer -type-5 pt-10" style={{ background: "#5b2c6f" }}>
      <div className="container">
        <div className="row y-gap-30 pb-10">
          <FooterLinks
            allClasses={"text-17 fw-500 text-white uppercase mb-25 mt-20"}
          />
        </div>

        <div className="py-30 border-top-light">
          <div className="row justify-between items-center y-gap-20">
            <div className="col-auto">
              <div className="footer-footer__copyright text-white d-flex items-center h-100">
                © {new Date().getFullYear()} Smartcliff. All Right Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
