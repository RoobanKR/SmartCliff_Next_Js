"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  fetchServices,
  selectServices,
} from "@/redux/slices/services/services/Services";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
export default function InstitutServices() {
  const dispatch = useDispatch();
  const services = useSelector(selectServices);
  const [showMore, setShowMore] = useState(false);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleMoreClick = () => {
    router.push("/services");
  };

  return (
    <section className="layout-pt-sm layout-pb-sm">
      <div className="container">
        <div className="row y-gap-30 items-center">
          <div className="col-xl-4 offset-xl-1 order-lg-1 col-lg-6 order-2">
            <h3 className="text-24 lh-1">SERVICES OFFERED</h3>
            <p className="mt-20">
              Join millions of people from around the world learning together.
              Online learning is as easy and natural as chatting.
            </p>
            <div className="y-gap-20 pt-25">
              {services
                .slice(0, showMore ? services.length : 3)
                .map((elm, i) => (
                  <div key={i} className="d-flex items-center">
                    <Image width={35} height={25} src={elm.image} alt="image" />
                    <div className="ml-20">
                      <div className="text-15 text-dark-1 lh-11 fw-500">
                        {elm.title}
                      </div>
                      {/* <div className="text-13 lh-1 mt-5">{elm.jobTitle}</div> */}
                    </div>
                  </div>
                ))}
              {services.length > 3 && !showMore && (
                <Link href="/services" className="mt-10">
                  More
                </Link>
              )}
            </div>
          </div>

          <div className="col-xl-5 offset-xl-1 col-lg-6 order-lg-2 order-1">
            <Image
              width={730}
              height={530}
              className="w-1/1"
              src="/assets/img/home-2/about/2.png"
              alt="image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
