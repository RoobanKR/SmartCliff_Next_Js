import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/data/blog";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { getAllGallery } from "@/redux/slices/services/gallery/Gallery";

export default function Gallery({ serviceId }) {
  const dispatch = useDispatch();
  const [showSlider, setShowSlider] = useState(false);
  const galleries = useSelector((state) => state.gallery.galleries);

  useEffect(() => {
    dispatch(getAllGallery());
  }, [dispatch]);

  const filteredGallery = galleries.filter(
    (galleries) => galleries.service._id === serviceId
  );

  return (
    <section className="layout-pt-sm layout-pb-sm">
      <div className="container">
        <div className="row y-gap-20 justify-between items-center">
          <div className="row y-gap-20 justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle ">
                <h2
                  className="sectionTitle__title "
                  style={{ fontFamily: "Serif" }}
                >
                  Gallery
                </h2>

                <p
                  className="sectionTitle__text "
                  style={{ fontFamily: "Serif" }}
                >
                  A gallery presents a visually engaging collection of images
                  offering viewers an immersive experience to explore and
                  appreciate various subjects or themes.
                </p>
              </div>
            </div>
          </div>

          <div className="col-auto">
            <Link
              href="/service_Gallery"
              className="button -icon -purple-3 text-purple-1"
              style={{ fontFamily: "Serif" }}
            >
              View all
              <i className="icon-arrow-top-right text-13 ml-10"></i>
            </Link>
          </div>
        </div>

        <div className="row y-gap-30 pt-60">
          {filteredGallery.slice(0, 4).map((elm, i) => (
            <div
              key={i}
              className="col-lg-3 col-md-6"
              data-aos="fade-left"
              data-aos-duration={(i + 1) * 500}
            >
              <div
                className="blogCard -type-1"
                data-aos="fade-left"
                data-aos-duration={(i + 1) * 400}
              >
                <div className="blogCard__image">
                  <Image
                    width={550}
                    height={465}
                    src={elm.image}
                    style={{ width: "550px", height: "200px" }}
                    alt="image"
                  />
                </div>
                <div className="blogCard__content mt-20">
                  <div
                    className="blogCard__category"
                    style={{ fontFamily: "Serif" }}
                  >
                    {elm.name}
                  </div>
                  <h4 className="blogCard__title text-17 lh-15 mt-5">
                    <div className="linkCustom" style={{ fontFamily: "Serif" }}>
                      {elm.year}{" "}
                    </div>
                  </h4>
                  <div
                    className="blogCard__date text-14 mt-5"
                    style={{ fontFamily: "Serif" }}
                  >
                    {elm.service.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
