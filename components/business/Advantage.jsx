import React from "react";
import { schoolAchievement } from "../../data/achievements";
import Image from "next/image";

export default function Advantage() {
  return (
    <section className="layout-pt-sm layout-pb-sm section-bg">
      <div className="section-bg__item bg-light-6"></div>

      <div className="container">
        <div className="row y-gap-20 justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">Advantage</h2>

              <p className="sectionTitle__text ">
                10,000+ unique online course list designs
              </p>
            </div>
          </div>
        </div>

        <div className="row pt-60">
          {schoolAchievement.map((elm, i) => (
            <div key={i} className="col-lg-3 col-md-6">
              <div className="infoCard -type-2 text-center py-40 -infoCard-hover">
                <div className="infoCard__image">
                  <Image
                    width={50}
                    height={50}
                    src={elm.imageSrc}
                    alt="image"
                  />
                </div>
             
                <p className="infoCard__text mt-5">{elm.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
