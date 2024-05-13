import React, { useEffect } from "react";
import { topCategoriesTwo } from "@/data/topCategories";
import Image from "next/image";
import Link from "next/link";
import { getAllKeyElements } from "@/redux/slices/bussiness/keyElements/keyElements";
import { useDispatch, useSelector } from "react-redux";

export default function KeyElements() {
  const dispatch = useDispatch();

  const { keyElements, loading, error } = useSelector((state) => state.keyElements);

  useEffect(() => {
    dispatch(getAllKeyElements());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Error state
  }

  return (
    <section className="layout-pt-sm layout-pb-sm">
      <div className="container">
        <div className="row y-gap-20 justify-between items-end">
          <div className="col-lg-6">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">Key Elements</h2>

              <p className="sectionTitle__text ">
                Lorem ipsum dolor sit amet, consectetur.
              </p>
            </div>
          </div>
        </div>

        <div className="row y-gap-50 pt-60 lg:pt-50">
          {keyElements.map((elm, i) => (
            <div
              key={i}
              className="col-xl-3 col-lg-4 col-sm-6 linkCustomTwo"
            >
              <div className="categoryCard -type-2">
                <div className="categoryCard__image mr-20">
                  <Image
                    width={80}
                    height={80}
                    src={elm.icon}
                    alt="image"
                    style={{width:'80px',height:'80px'}}
                  />
                </div>

                <div className="categoryCard__content">
                  <h4 className="categoryCard__title text-17 fw-500">
                    {elm.title}
                  </h4>
                  {/* <div className="categoryCard__text text-13 lh-1 mt-5">
                    {elm.text}
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
