import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServices,
  selectServices,
} from "@/redux/slices/services/services/Services";
import { useParams } from "next/navigation";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/swiper-bundle.min.css";

SwiperCore.use([Pagination]);

export default function ServiceOverview1() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const services = useSelector(selectServices);
  const serviceData = useSelector((state) => state.service.serviceData);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const selectedService = serviceData.find((service) => service._id === id);
  const swiperRef = useRef(null);

  return (
    <section
      className="layout-pt-sm layout-pb-sm bg-beige-1"
      style={{ fontFamily: "Serif" }}
    >
      {selectedService && (
        <div className="container">
          <div className="row y-gap-30 justify-between items-center">
            <div className="col-xl-5 col-lg-6 col-md-10 order-2 order-lg-1">
              <div className="about-content">
                <h2
                  className="about-content__title customSized"
                  data-aos="fade-up"
                >
                  <span className="text-purple-1">{selectedService.title}</span>
                </h2>
                <p className="about-content__text" data-aos="fade-up">
                  {selectedService.description}
                </p>
              </div>
            </div>

            <div
              className="col-xl-5 col-lg-6 order-1 order-lg-2"
              data-aos="fade-up"
            >
              <div className="about-image">
                <Swiper
                  modules={[Navigation, Pagination,Autoplay]}
                  navigation={{
                    nextEl: ".swiper-next",
                    prevEl: ".swiper-prev",
                  }}
                  autoplay={{ delay: 3000 }} // 3 seconds delay between slides
                  pagination={{ clickable: true }}
                  slidesPerView={1}
                  spaceBetween={0}
                  speed={1200}
                >
                  {selectedService.videos?.map((video, index) => (
                    <SwiperSlide key={index}>
                      <div className="swiper-slide-content">
                        <button>
                          {/* <i className="icon-arrow-left text-24"></i> */}
                        </button>
                        <video controls autoPlay>
                          <source src={video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <button>
                          {/* <i className="icon-arrow-right text-24"></i> */}
                        </button>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
