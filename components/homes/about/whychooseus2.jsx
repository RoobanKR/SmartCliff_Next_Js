import React from "react";
import Image from "next/image";
export default function WhyChooseUsAbout2() {
  return (
    <section className="layout-pt-sm layout-pb-sm">
      <div className="container">
        <div className="row y-gap-30 items-center">
          <div className="col-xl-6 col-lg-6 order-lg-1">
            <h3 className="text-24 lh-1">Become a Student</h3>
            <p className="mt-20">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text. All the Lorem Ipsum generators on
              the Internet tend to repeat predefined.
            </p>
          </div>

          <div className="col-xl-5 offset-xl-1 col-lg-6 order-lg-2 order-1">
            <Image
              width={730}
              height={530}
              className="w-1/1"
              src="/assets/img/home-1/hero/stu.png"
              alt="image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
