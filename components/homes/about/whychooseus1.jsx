import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function WhyChooseUsAbout1() {
  return (
    <section className="layout-pt-sm layout-pb-sm">
      <div className="container">
        <div className="row y-gap-30 items-center">
          <div className="col-xl-5 offset-xl-1 col-lg-6">
            <Image
              width={730}
              height={530}
              className="w-1/1"
              src="/assets/img/home-5/masthead/bg.svg"
              alt="image"
            />
          </div>

          <div className="col-xl-6 col-lg-6 order-lg-1">
            <h3 className="text-24 lh-1">Become an Instructor</h3>
            <p className="mt-20">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
