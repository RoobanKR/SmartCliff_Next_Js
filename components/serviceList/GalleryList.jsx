"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { blogs, categories } from "@/data/blog";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServices,
  selectServices,
} from "@/redux/slices/services/services/Services";
import { getAllGallery } from "@/redux/slices/services/gallery/Gallery";

export default function GalleryList() {
  const [pageItems, setPageItems] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All Categories");
  const dispatch = useDispatch();
  const services = useSelector(selectServices);
  const serviceData = useSelector((state) => state.service.serviceData);
  const galleries = useSelector((state) => state.gallery.galleries);
  const filteredGalleries = galleries.filter(
    (elm) => elm.service._id === currentCategory
  );

  useEffect(() => {
    dispatch(getAllGallery());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    if (currentCategory === "All Categories") {
      setPageItems(galleries);
    } else {
      setPageItems(filteredGalleries);
    }
  }, [currentCategory, galleries, filteredGalleries]);

  useEffect(() => {
    console.log("services", services);
    console.log("galleries in galleries", galleries);
  }, [services, galleries]);

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div className="layout-pt-md">
                  <h1 className="page-header__title">Service Gallery</h1>
                </div>

                <div>
                  <p className="page-header__text">
                    Immerse yourself in a visual journey through our Service
                    Gallery, where each image tells the story of our exceptional
                    offerings. Explore our collection and discover the essence
                    of our services captured in captivating visuals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-sm layout-pb-sm">
        <div className="container">
          <div className="tabs -pills js-tabs">
            <button
              className="btn glyphicon glyphicon-share-alt
              "
              onClick={goBack}
              style={{
                backgroundColor: "#140342",
                color: "white",
                borderRadius: "15px",
                width: "100px",
                height: "40px",
                marginLeft: "10px",
              }}
            >
              <i
                class="fa fa-reply-all"
                aria-hidden="true"
                style={{ marginRight: "5px" }}
              ></i>
              Go Back
            </button>
            <div className="tabs__controls d-flex justify-center flex-wrap y-gap-20 x-gap-10 js-tabs-controls mt-5">
              <div>
                <button
                  className={`tabs__button px-15 py-8 rounded-8 js-tabs-button ${
                    currentCategory === "All Categories" ? "is-active" : ""
                  }`}
                  onClick={() => setCurrentCategory("All Categories")}
                  type="button"
                >
                  All Categories
                </button>
              </div>
              {services.map((elm) => (
                <div key={elm._id}>
                  <button
                    className={`tabs__button px-15 py-8 rounded-8 js-tabs-button ${
                      currentCategory === elm._id ? "is-active" : ""
                    }`}
                    onClick={() => setCurrentCategory(elm._id)}
                    type="button"
                  >
                    {elm.title}
                  </button>
                </div>
              ))}
            </div>

            <div className="tabs__content pt-40 js-tabs-content">
              <div className="tabs__pane -tab-item-1 is-active">
                {pageItems.length === 0 ? (
                  <div className="row justify-center text-center">
                    <div className="col-auto">
                      <p>No images available for this particular category</p>
                    </div>
                  </div>
                ) : (
                  <div className="row y-gap-30">
                    {pageItems.map((elm, i) => (
                      <div key={i} className="col-lg-4 col-md-6">
                        <div className="blogCard -type-1">
                          <div className="blogCard__image">
                            <Image
                              width={530}
                              height={450}
                              style={{ height: "300px", width: "130px" }}
                              className="w-1/1 rounded-8"
                              src={elm.image}
                              alt="image"
                            />
                          </div>
                          <div className="blogCard__content mt-20">
                            <div className="blogCard__category">
                              {elm.category ? elm.category.toUpperCase() : ""}
                            </div>

                            <h4 className="blogCard__title text-20 lh-15 fw-500 mt-5">
                              <div
                                className="linkCustom"
                                href={`/blogs/${elm.id}`}
                              >
                                {elm.name}
                              </div>
                            </h4>
                            <div className="blogCard__date text-14 mt-5">
                              {elm.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
