"use client";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReview } from "@/redux/slices/review/review";
import { ChevronRight, ExpandLess, ExpandMore } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import ModalVideoComponent from "@/components/common/ModalVideo";
import ReactPlayer from "react-player";
import Image from "next/image";

export default function TestimonialsEight() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState("LlCwHnp3kL4");
  const [showSlider, setShowSlider] = useState(false);
  const [showVideoSlider, setShowVideoSlider] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const reviewsPerPage = 6;
  const reviews = useSelector((state) => state.reviews.reviews);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return; // Prevents error during SSR

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Set initial value only on the client side
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [videoType, setVideoType] = useState("youtube"); // "youtube" or "file"

  // Create refs for both swipers
  const testimonialSwiperRef = useRef(null);
  const videoSwiperRef = useRef(null);

  useEffect(() => {
    setShowSlider(true);
    setShowVideoSlider(true);
  }, []);

  const [expandedStates, setExpandedStates] = useState({});
  const [overflowingStates, setOverflowingStates] = useState({});
  const textRefs = useRef({});
  const reviewsWithoutVideos = reviews.filter(review => !review.video);


  const reviewsWithVideos = reviews.filter(
    (review) =>
      review.video &&
      (review.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.review?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.service?.title?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    dispatch(getAllReview());
  }, [dispatch]);
  []
  useEffect(() => {
    const timer = setTimeout(() => {
      const newOverflowingStates = {};

      reviewsWithVideos.slice(0, 3).forEach((review) => {
        const id = review._id || review.id;
        const ref = textRefs.current[id];

        if (ref) {
          const lineHeight = 21;
          const maxHeight = lineHeight * 5;
          newOverflowingStates[id] = ref.scrollHeight > maxHeight;
        }
      });

      setOverflowingStates(newOverflowingStates);
    }, 100);

    return () => clearTimeout(timer);
  }, [reviewsWithVideos]);


  const toggleExpanded = (id) => {
    setExpandedStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const extractYoutubeVideoId = (url) => {
    if (!url) return "";

    // Handle various YouTube URL formats
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : "";
  };

  // Function to determine video type and handle accordingly
  const determineVideoType = (videoUrl) => {
    if (!videoUrl) return { type: "none", id: "", url: "" };

    // Check if it's a YouTube URL
    if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
      return {
        type: "youtube",
        id: extractYoutubeVideoId(videoUrl),
        url: "",
      };
    }

    // Otherwise treat as a direct video file
    return {
      type: "file",
      id: "",
      url: videoUrl,
    };
  };

  const openVideoModal = (videoUrl) => {
    const { type, id, url } = determineVideoType(videoUrl);
    setVideoType(type);
    setCurrentVideoId(id);
    setCurrentVideoUrl(url);
    setIsOpen(true);
  };

  // Synchronized navigation handlers
  const handlePrevClick = () => {
    if (testimonialSwiperRef.current && testimonialSwiperRef.current.swiper) {
      testimonialSwiperRef.current.swiper.slidePrev();
    }
    if (videoSwiperRef.current && videoSwiperRef.current.swiper) {
      videoSwiperRef.current.swiper.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (testimonialSwiperRef.current && testimonialSwiperRef.current.swiper) {
      testimonialSwiperRef.current.swiper.slideNext();
    }
    if (videoSwiperRef.current && videoSwiperRef.current.swiper) {
      videoSwiperRef.current.swiper.slideNext();
    }
  };
  return (
    <>
      <section
        className="layout-pt-sm layout-pb-sm"
        style={{ position: "relative" }}
      >
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 10, // Ensures it's on top of other content
            }}
          >
            <Image
              src="/assets/img/about/img3.svg"
              alt="SYG"
              width={80}
              height={80}
            />
          </div>
        )}
        <div
          style={{
            padding: "0 20px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "center" : "flex-start",
            gap: "20px",
            margin: "0 auto",
            maxWidth: "1200px",
          }}
        >
          <h2
            className="text-30 lh-13"
            style={{
              fontSize: isMobile ? "24px" : "30px",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            Trusted by Many: See What Our{" "}
            <br style={{ display: isMobile ? "none" : "block" }} />
            <span
              className="text-orange-1"
              style={{
                marginLeft: isMobile ? "0" : "10px",
                display: isMobile ? "block" : "inline",
              }}
            >
              Users Say
            </span>
          </h2>
          <div
            style={{
              marginLeft: isMobile ? "0" : "30px",
              marginTop: isMobile ? "10px" : "0",
            }}
          >
            <button
              onClick={() => router.push("/reviews")}
              variant="contained"
              color="primary"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
                border: "2px solid #F2775E",
                borderRadius: "8px",
                padding: "6px 16px",
                transition: "0.3s ease-in-out",
                color: "#e8543e",
                cursor: "pointer",
                backgroundColor: "white",
                minWidth: "120px",
                justifyContent: "center",
                fontSize: isMobile ? "14px" : "16px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "white";
                e.currentTarget.style.backgroundColor = "#F2775E";
                const arrow = e.currentTarget.querySelector(".arrow");
                if (arrow) {
                  arrow.style.transform = "translateX(5px) scale(1.2)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#F2775E";
                e.currentTarget.style.color = "black";
                e.currentTarget.style.backgroundColor = "white";
                const arrow = e.currentTarget.querySelector(".arrow");
                if (arrow) {
                  arrow.style.transform = "translateX(0) scale(1)";
                }
              }}
            >
              View All
              <ArrowForwardIcon
                className="arrow"
                style={{
                  fontSize: "17px",
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </button>
          </div>
        </div>

        <div className="container">
          <div
            className="row justify-between items-center"
          >
            <div
              className="col-xl-7 col-lg-6 col-md-9"
              style={{
                maxWidth: "100%",
              }}
            >
              <div
                className="px-5 overflow-hidden js-section-slider"
                data-aos="fade-left"
                data-aos-duration={1000}
                style={{
                }}
              >
                {showSlider && (
                  <Swiper
                    modules={[Navigation, Pagination]}
                    pagination={{
                      el: ".pagination-testimonials-eight",
                      clickable: true,
                    }}
                    ref={testimonialSwiperRef}
                    spaceBetween={30}
                    slidesPerView={1}
                    className="overflow-visible"
                    loop={false}
                    allowTouchMove={true}
                  >
                    {/* {combinedFilteredReviews.map((elm, i) => { */}
                    {reviewsWithVideos.slice(0, 3).map((elm, i) => {
                      const reviewId = elm._id || elm.id || i;
                      return (
                        <SwiperSlide key={i}>
                          <div
                            className="swiper-slide pt-30"
                            style={{
                              paddingTop:
                                window.innerWidth <= 480 ? "15px" : "30px",
                            }}
                          >
                            <div
                              className="pt-20 pb-30 px-20 border-light rounded-8"
                              style={{
                                padding:
                                  window.innerWidth <= 480
                                    ? "15px"
                                    : "20px 20px 30px",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                              }}
                            >
                              <div className="testimonials__content">
                                <p
                                  className="fw-500"
                                  style={{
                                    fontSize:
                                      window.innerWidth <= 480
                                        ? "16px"
                                        : "20px",
                                    marginBottom: "5px",
                                  }}
                                >
                                  Batch :
                                  <span
                                    className="text-18 fw-500 text-orange-1"
                                    style={{
                                      fontSize:
                                        window.innerWidth <= 480
                                          ? "16px"
                                          : "18px",
                                    }}
                                  >
                                    {" "}
                                    {elm?.batch}
                                  </span>
                                </p>
                                <p
                                  className="fw-500"
                                  style={{
                                    fontSize:
                                      window.innerWidth <= 480
                                        ? "16px"
                                        : "20px",
                                    marginBottom: "10px",
                                  }}
                                >
                                  Role :
                                  <span
                                    className="text-18 fw-500 text-orange-1"
                                    style={{
                                      fontSize:
                                        window.innerWidth <= 480
                                          ? "16px"
                                          : "18px",
                                    }}
                                  >
                                    {" "}
                                    {elm?.role}
                                  </span>
                                </p>
                                <div>
                                  <p
                                    ref={(el) =>
                                      (textRefs.current[reviewId] = el)
                                    }
                                    className="fw-500 mt-15"
                                    style={{
                                      color: "#5b2c6f",
                                      fontSize:
                                        window.innerWidth <= 480
                                          ? "13px"
                                          : "14px",
                                      lineHeight: "1.5",
                                      display: "-webkit-box",
                                      WebkitBoxOrient: "vertical",
                                      overflow: "hidden",
                                      WebkitLineClamp: expandedStates[reviewId]
                                        ? "unset"
                                        : 5,
                                      transition: "all 0.3s ease-in-out",
                                      textAlign: "justify",
                                      marginTop: "15px",
                                    }}
                                  >
                                    "{elm.review}"
                                  </p>
                                  {overflowingStates[reviewId] && (
                                    <span
                                      onClick={() => toggleExpanded(reviewId)}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px",
                                        cursor: "pointer",
                                        fontSize:
                                          window.innerWidth <= 480
                                            ? "12px"
                                            : "14px",
                                        color: "#007bff",
                                        marginTop: "5px",
                                        fontWeight: "500",
                                      }}
                                    >
                                      {expandedStates[reviewId] ? (
                                        <>
                                          <span>View Less</span>
                                          <ExpandLess
                                            style={{
                                              fontSize:
                                                window.innerWidth <= 480
                                                  ? "16px"
                                                  : "20px",
                                            }}
                                          />
                                        </>
                                      ) : (
                                        <>
                                          <span>View More</span>
                                          <ExpandMore
                                            style={{
                                              fontSize:
                                                window.innerWidth <= 480
                                                  ? "16px"
                                                  : "20px",
                                            }}
                                          />
                                        </>
                                      )}
                                    </span>
                                  )}
                                </div>
                                <div
                                  className="row x-gap-20 y-gap-20 items-center pt-15"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginTop: "15px",
                                    gap: "10px",
                                  }}
                                >
                                  <div
                                    className="col-auto"
                                    style={{
                                      flex: "0 0 auto",
                                    }}
                                  >
                                    <img
                                      src={elm.profile}
                                      alt={elm.name}
                                      style={{
                                        width:
                                          window.innerWidth <= 480
                                            ? "36px"
                                            : "42px",
                                        height:
                                          window.innerWidth <= 480
                                            ? "36px"
                                            : "42px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                      }}
                                    />
                                  </div>
                                  <div
                                    className="col-auto"
                                    style={{
                                      flex: "0 0 auto",
                                    }}
                                  >
                                    <div
                                      className="lh-12 fw-500 text-dark-1"
                                      style={{
                                        fontSize:
                                          window.innerWidth <= 480
                                            ? "14px"
                                            : "16px",
                                        fontWeight: "500",
                                      }}
                                    >
                                      {elm.name}
                                    </div>
                                    <div
                                      className="text-13 lh-1 mt-5"
                                      style={{
                                        fontSize:
                                          window.innerWidth <= 480
                                            ? "12px"
                                            : "13px",
                                        marginTop: "5px",
                                      }}
                                    >
                                      {elm.position}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                )}
                <div
                  className="d-flex x-gap-15 items-center pt-30"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "15px",
                  }}
                >
                  <div className="col-auto">
                    <button
                      className="d-flex items-center text-24 arrow-left-hover"
                      onClick={handlePrevClick}
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <i className="icon icon-arrow-left"></i>
                    </button>
                  </div>
                  <div className="col-auto">
                    <div className="pagination -arrows js-pagination pagination-testimonials-eight"></div>
                  </div>
                  <div className="col-auto">
                    <button
                      className="d-flex items-center text-24 arrow-right-hover"
                      onClick={handleNextClick}
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <i className="icon icon-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-lg-5"
            >
              <div
                className="overflow-hidden js-section-slider video-testimonials-wrapper"
                data-aos="fade-right"
                data-aos-duration={1000}
                style={{
                  maxWidth: "100%",
                  marginBottom: "20px"
                }}
              >
                {showVideoSlider && reviewsWithVideos.length > 0 ? (
                  <Swiper
                    modules={[Navigation, Pagination]}
                    pagination={{
                      el: ".pagination-videos",
                      clickable: true,
                    }}
                    ref={videoSwiperRef}
                    spaceBetween={30}
                    slidesPerView={1}
                    className="overflow-visible"
                    loop={false}
                    allowTouchMove={true}
                  >
                    {/* {filteredReviewsWithVideos.map((review, i) => ( */}
                    {reviewsWithVideos.slice(0, 3).map((review, i) => (
                      <SwiperSlide key={i}>
                        <div
                          className="composition -type-7 relative"
                          style={{
                            position: "relative",
                            width: "100%",
                            height:
                              window.innerWidth <= 480
                                ? "240px"
                                : window.innerWidth <= 768
                                  ? "300px"
                                  : "360px",
                            maxWidth: "100%",
                          }}
                        >
                          <div
                            className="-el-1"
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            <ReactPlayer
                              url={review.video}
                              width="100%"
                              height="100%"
                              style={{
                                borderRadius: "12px",
                                overflow: "hidden",
                              }}
                            />
                          </div>
                          <div
                            className="-el-2"
                            onClick={() => openVideoModal(review.video)}
                            style={{
                              cursor: "pointer",
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              zIndex: 2,
                            }}
                          >
                            <div
                              className="d-flex items-center justify-center bg-white rounded-full js-gallery"
                              data-gallery="gallery1"
                              style={{
                                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                                transition:
                                  "transform 0.3s ease, box-shadow 0.3s ease",
                                width:
                                  window.innerWidth <= 480 ? "70px" : "90px",
                                height:
                                  window.innerWidth <= 480 ? "70px" : "90px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "50%",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "scale(1.1)";
                                e.currentTarget.style.boxShadow =
                                  "0 15px 25px rgba(0,0,0,0.15)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                                e.currentTarget.style.boxShadow =
                                  "0 10px 20px rgba(0,0,0,0.1)";
                              }}
                            >
                              <div
                                className="icon-play text-30"
                                style={{
                                  color: "#e8543e",
                                  fontSize:
                                    window.innerWidth <= 480 ? "24px" : "30px",
                                }}
                              ></div>
                            </div>
                          </div>
                          {/* Overlay to darken the image */}
                          <div
                            style={{
                              position: "absolute",

                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              borderRadius: "12px",
                              zIndex: 1,
                            }}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <div
                    className="flex items-center justify-center p-10 border rounded-8"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                    }}
                  >
                    <p
                      style={{
                        textAlign: "center",
                        color: "#666",
                      }}
                    >
                      No video testimonials available
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalVideoComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        videoId={currentVideoId}
        videoUrl={currentVideoUrl}
        videoType={videoType}
      />
    </>
  );
}