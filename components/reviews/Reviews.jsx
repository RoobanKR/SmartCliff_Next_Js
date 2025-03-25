"use client";
import { useEffect, useState, useRef } from "react";
import {
  Star,
  StarHalf,
  StarBorder,
  ExpandLess,
  ExpandMore,
  VideoLibrary,
  Comment,
  FilterList,
  KeyboardArrowDown,
  Person,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllReview,
  resetReview,
  selectReviewState,
} from "@/redux/slices/review/review";
 
export default function Reviews() {
  const dispatch = useDispatch();
 
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("text"); // 'text' or 'video'
  const [previousTab, setPreviousTab] = useState(""); // Track previous tab for animation
  const [animatingTabs, setAnimatingTabs] = useState(false); // Animation state
  const [selectedBatch, setSelectedBatch] = useState("All Batches");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [isBatchDropdownOpen, setIsBatchDropdownOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const batchDropdownRef = useRef(null);
  const roleDropdownRef = useRef(null);
  const textContainerRef = useRef(null);
  const videoContainerRef = useRef(null);
  const reviewsPerPage = 6;
  const reviews = useSelector((state) => state.reviews.reviews);
 
  // For text expansion functionality
  const [expandedStates, setExpandedStates] = useState({});
  const [overflowingStates, setOverflowingStates] = useState({});
  const textRefs = useRef({});
  const videoTextRefs = useRef({}); // Add separate ref for video text areas
 
  useEffect(() => {
    dispatch(getAllReview());
  }, [dispatch]);
 
  // Reset filters when tab changes
  useEffect(() => {
    setSelectedBatch("All Batches");
    setSelectedRole("All Roles");
    setCurrentPage(1);
  }, [activeTab]);
 
  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (batchDropdownRef.current && !batchDropdownRef.current.contains(event.target)) {
        setIsBatchDropdownOpen(false);
      }
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target)) {
        setIsRoleDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
 
  // Separate reviews based on whether they have a video or not
  const textReviews = reviews.filter(review => !review.video);
  const videoReviews = reviews.filter(review => review.video);
 
  // Get unique batches based on active tab
  const getBatchesByTab = () => {
    const batchSet = new Set();
    const sourceReviews = activeTab === "text" ? textReviews : videoReviews;
 
    sourceReviews.forEach(review => {
      if (review.batch) batchSet.add(review.batch);
    });
 
    return ["All Batches", ...Array.from(batchSet).sort()];
  };
 
  // Get unique roles based on active tab
  const getRolesByTab = () => {
    const roleSet = new Set();
    const sourceReviews = activeTab === "text" ? textReviews : videoReviews;
 
    sourceReviews.forEach(review => {
      if (review.role) roleSet.add(review.role);
    });
 
    return ["All Roles", ...Array.from(roleSet).sort()];
  };
 
  const batchOptions = getBatchesByTab();
  const roleOptions = getRolesByTab();
 
  // Filter reviews based on search term, active tab, selected batch, and selected role
  const filterReviews = (reviewsList) => {
    return reviewsList.filter(review => {
      // First filter by batch if a specific batch is selected
      if (selectedBatch !== "All Batches" && review.batch !== selectedBatch) {
        return false;
      }
 
      // Then filter by role if a specific role is selected
      if (selectedRole !== "All Roles" && review.role !== selectedRole) {
        return false;
      }
 
      // Then filter by search term
      return (
        review.batch?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (review.review?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.description?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (review.service?.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
      );
    });
  };
 
  const filteredTextReviews = filterReviews(textReviews);
  const filteredVideoReviews = filterReviews(videoReviews);
 
  // Get current reviews based on active tab
  const activeReviews = activeTab === "text" ? filteredTextReviews : filteredVideoReviews;
 
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = activeReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );
 
  // Check for overflow when reviews change - for both text and video reviews
  useEffect(() => {
    const timer = setTimeout(() => {
      const newOverflowingStates = {};
      const refs = activeTab === "text" ? textRefs.current : videoTextRefs.current;
 
      currentReviews.forEach((review) => {
        const id = review._id || review.id;
        const ref = refs[id];
 
        if (ref) {
          const lineHeight = 21; // Approximate line height in pixels
          const maxHeight = lineHeight * 3; // 3 lines (adjusted to show less text initially)
          newOverflowingStates[id] = ref.scrollHeight > maxHeight;
        }
      });
 
      setOverflowingStates(newOverflowingStates);
    }, 100);
 
    return () => clearTimeout(timer);
  }, [currentReviews, activeTab]);
 
  const toggleExpanded = (id) => {
    setExpandedStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
 
  const totalPages = Math.ceil(activeReviews.length / reviewsPerPage);
 
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
 
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
 
  const handleTabChange = (tab) => {
    if (tab !== activeTab && !animatingTabs) {
      setAnimatingTabs(true);
      setPreviousTab(activeTab);
 
      // Apply exit animation to current tab content
      const currentContainer = activeTab === "text" ? textContainerRef.current : videoContainerRef.current;
      if (currentContainer) {
        currentContainer.style.animation = "fadeOutRight 0.3s forwards";
      }
 
      // Change tab after short delay to allow exit animation
      setTimeout(() => {
        setActiveTab(tab);
        setCurrentPage(1);
 
        // Apply entrance animation after tab changes
        setTimeout(() => {
          const newContainer = tab === "text" ? textContainerRef.current : videoContainerRef.current;
          if (newContainer) {
            newContainer.style.animation = "fadeInLeft 0.4s forwards";
          }
          setAnimatingTabs(false);
        }, 50);
      }, 250);
    }
  };
 
  const handleBatchChange = (batch) => {
    setSelectedBatch(batch);
    setCurrentPage(1);
    setIsBatchDropdownOpen(false);
  };
 
  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setCurrentPage(1);
    setIsRoleDropdownOpen(false);
  };
 
  // Render stars for ratings
  const renderStars = (rating) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {[...Array(5)].map((_, i) => {
          if (i + 1 <= Math.floor(rating)) {
            return <Star key={i} fontSize="small" />;
          } else if (i < rating) {
            return <StarHalf key={i} fontSize="small" />;
          } else {
            return (
              <StarBorder
                key={i}
                fontSize="small"
                style={{ color: "#d1d5db" }}
              />
            );
          }
        })}
      </div>
    );
  };
 
  return (
    <div style={{ padding: "20px", backgroundColor: "#eef3f7" }}>
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeOutRight {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(20px);
          }
        }
       
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
       
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
       
        .tab-button {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
       
        .tab-button::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 3px;
          background-color: white;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
       
        .tab-button.active::after {
          width: 70%;
        }
       
        .tab-button:hover:not(.active) {
          background-color: #6d3a8599 !important;
          color: white !important;
          transform: translateY(-2px);
        }
       
        .card-container {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
       
        .card-container:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>
 
      {/* Controls Section - Contains Filter Dropdowns and Tabs */}
      <div style={{
        display: "flex",
        marginBottom: "20px",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "15px"
      }}>
        {/* Filters Container */}
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          {/* Batch Filter Dropdown */}
          <div style={{ position: "relative", minWidth: "200px" }} ref={batchDropdownRef}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 15px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                cursor: "pointer",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                transition: "all 0.2s ease",
              }}
              onClick={() => setIsBatchDropdownOpen(!isBatchDropdownOpen)}
              className={isBatchDropdownOpen ? "pulse" : ""}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FilterList fontSize="small" style={{ color: "#5b2c6f" }} />
                <span>Filter By Batch</span>
              </div>
              <KeyboardArrowDown fontSize="small" style={{
                transform: isBatchDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease"
              }} />
            </div>
 
            {isBatchDropdownOpen && (
              <div style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                marginTop: "5px",
                zIndex: 10,
                maxHeight: "300px",
                overflowY: "auto",
                animation: "fadeInLeft 0.3s ease",
                scrollbarWidth: "thin",
                scrollbarColor: "#a0a0a0 #f1f1f1"
              }}>
                {batchOptions.map((batch) => (
                  <div
                    key={batch}
                    style={{
                      padding: "10px 15px",
                      cursor: "pointer",
                      backgroundColor: selectedBatch === batch ? "#f3f4f6" : "transparent",
                      borderLeft: selectedBatch === batch ? "3px solid #5b2c6f" : "3px solid transparent",
                      transition: "all 0.2s ease",
                    }}
                    onClick={() => handleBatchChange(batch)}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f3f4f6"}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = selectedBatch === batch ? "#f3f4f6" : "transparent"}
                  >
                    {batch}
                  </div>
                ))}
              </div>
            )}
          </div>
 
          {/* Role Filter Dropdown */}
          <div style={{ position: "relative", minWidth: "200px" }} ref={roleDropdownRef}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 15px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                cursor: "pointer",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                transition: "all 0.2s ease",
              }}
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className={isRoleDropdownOpen ? "pulse" : ""}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Person fontSize="small" style={{ color: "#5b2c6f" }} />
                <span>Filter By Role</span>
              </div>
              <KeyboardArrowDown fontSize="small" style={{
                transform: isRoleDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease"
              }} />
            </div>
 
            {isRoleDropdownOpen && (
              <div style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                marginTop: "5px",
                zIndex: 10,
                maxHeight: "300px",
                overflowY: "auto",
                animation: "fadeInLeft 0.3s ease",
                scrollbarWidth: "thin",
                scrollbarColor: "#a0a0a0 #f1f1f1"
              }}>
                {roleOptions.map((role) => (
                  <div
                    key={role}
                    style={{
                      padding: "10px 15px",
                      cursor: "pointer",
                      backgroundColor: selectedRole === role ? "#f3f4f6" : "transparent",
                      borderLeft: selectedRole === role ? "3px solid #5b2c6f" : "3px solid transparent",
                      transition: "all 0.2s ease",
                    }}
                    onClick={() => handleRoleChange(role)}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f3f4f6"}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = selectedRole === role ? "#f3f4f6" : "transparent"}
                  >
                    {role}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
 
        {/* Tab Navigation */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => handleTabChange("text")}
            className={`tab-button ${activeTab === "text" ? "active" : ""}`}
            style={{
              padding: "10px 20px",
              backgroundColor: activeTab === "text" ? "#5b2c6f" : "#f3f4f6",
              color: activeTab === "text" ? "white" : "#4b5563",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: "500",
            }}
          >
            <Comment fontSize="small" />
            Text Reviews
          </button>
          <button
            onClick={() => handleTabChange("video")}
            className={`tab-button ${activeTab === "video" ? "active" : ""}`}
            style={{
              padding: "10px 20px",
              backgroundColor: activeTab === "video" ? "#5b2c6f" : "#f3f4f6",
              color: activeTab === "video" ? "white" : "#4b5563",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: "500",
            }}
          >
            <VideoLibrary fontSize="small" />
            Video Reviews
          </button>
        </div>
      </div>
 
      {/* Active Filters Display */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {selectedBatch !== "All Batches" && (
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            backgroundColor: "#5b2c6f15",
            color: "#5b2c6f",
            padding: "5px 12px",
            borderRadius: "16px",
            fontSize: "14px",
            fontWeight: "500",
            animation: "fadeInLeft 0.3s ease",
          }}>
            Batch: {selectedBatch}
            <span
              style={{ marginLeft: "5px", cursor: "pointer", fontWeight: "bold" }}
              onClick={() => handleBatchChange("All Batches")}
            >
              ×
            </span>
          </div>
        )}
        {selectedRole !== "All Roles" && (
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            backgroundColor: "#5b2c6f15",
            color: "#5b2c6f",
            padding: "5px 12px",
            borderRadius: "16px",
            fontSize: "14px",
            fontWeight: "500",
            animation: "fadeInLeft 0.3s ease",
          }}>
            Role: {selectedRole}
            <span
              style={{ marginLeft: "5px", cursor: "pointer", fontWeight: "bold" }}
              onClick={() => handleRoleChange("All Roles")}
            >
              ×
            </span>
          </div>
        )}
        {searchTerm && (
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            backgroundColor: "#5b2c6f15",
            color: "#5b2c6f",
            padding: "5px 12px",
            borderRadius: "16px",
            fontSize: "14px",
            fontWeight: "500",
            animation: "fadeInLeft 0.3s ease",
          }}>
            Search: {searchTerm}
            <span
              style={{ marginLeft: "5px", cursor: "pointer", fontWeight: "bold" }}
              onClick={() => setSearchTerm("")}
            >
              ×
            </span>
          </div>
        )}
      </div>
 
   {/* Content container with animation */}
   <div style={{ position: "relative", minHeight: "200px" }}>
        {/* No Results Message */}
        {activeReviews.length === 0 && (
          <div
            style={{ textAlign: "center", padding: "40px 0", color: "#6b7280" }}
          >
            <p>No {activeTab} reviews found with the current filters</p>
          </div>
        )}
 
        {/* Text Reviews Grid */}
        {activeTab === "text" && (
          <div
            ref={textContainerRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
              animation: previousTab === "video" ? "fadeInLeft 0.4s forwards" : "none",
            }}
          >
            {currentReviews
              .sort(
                (a, b) =>
                  new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
              )
              .map((review) => {
                const reviewId = review._id || review.id;
                return (
                  <div
                    key={reviewId}
                    className="card-container"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "10px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      width: "100%",
                    }}
                  >
                    <div style={{ padding: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ marginRight: "16px" }}>
                          <img
                            src={review.profile}
                            alt={review.name}
                            style={{
                              width: "42px",
                              height: "42px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center" }}>
                            {renderStars(review.ratings)}
                          </div>
                          <span style={{ display: "flex", alignItems: "center" }}>
                            {review?.ratings?.toFixed(2)}/5.00
                          </span>
                        </div>
                      </div>
                      <div style={{ marginTop: "12px" }}>
                        <p style={{ fontSize: "14px", color: "red" }}>
                          {review.name}{" "}
                          <span style={{ color: "gray" }}>reviewed</span>
                        </p>
                        <p>
                          <span
                            style={{
                              fontWeight: "bold",
                              fontSize: "15px",
                              marginTop: "8px",
                            }}
                          >
                            Role :{" "}
                          </span>
                          {review?.role}
                        </p>
                        <p>
                          <span
                            style={{
                              fontWeight: "bold",
                              fontSize: "15px",
                              marginTop: "8px",
                            }}
                          >
                            Batch :{" "}
                          </span>
                          {review?.batch}
                        </p>
                        <div
                          style={{
                            marginTop: "12px",
                          }}
                        >
                          <p
                            ref={(el) => (textRefs.current[reviewId] = el)}
                            style={{
                              color: "#4b5563",
                              fontSize: "14px",
                              lineHeight: "1.5",
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              WebkitLineClamp: expandedStates[reviewId]
                                ? "unset"
                                : 3,
                              transition: "all 0.3s ease-in-out",
                              textAlign: "justify",
                            }}
                          >
                            {review.review}
                          </p>
                          {overflowingStates[reviewId] && (
                            <span
                              onClick={() => toggleExpanded(reviewId)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                cursor: "pointer",
                                fontSize: "14px",
                                color: "#007bff",
                                marginTop: "5px",
                                fontWeight: "500",
                              }}
                            >
                              {expandedStates[reviewId] ? (
                                <>
                                  <span>View Less</span>
                                  <ExpandLess />
                                </>
                              ) : (
                                <>
                                  <span>View More</span>
                                  <ExpandMore />
                                </>
                              )}
                            </span>
                          )}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "16px",
                          }}
                        >
                          <p style={{ color: "#9ca3af", fontSize: "12px" }}>
                            Published:{" "}
                            {new Date(review.createdOn).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
 
        {/* Video Reviews Grid */}
        {activeTab === "video" && (
          <div
            ref={videoContainerRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
              animation: previousTab === "text" ? "fadeInLeft 0.4s forwards" : "none",
            }}
          >
            {currentReviews
              .sort(
                (a, b) =>
                  new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
              )
              .map((review) => {
                const reviewId = review._id || review.id;
                return (
                  <div
                    key={reviewId}
                    className="card-container"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "10px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      overflow: "hidden",
                      width: "100%",
                    }}
                  >
                    <div className="video-container" style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                      <video
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          borderTopLeftRadius: "10px",
                          borderTopRightRadius: "10px",
                        }}
                        controls
                      >
                        <source src={review.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div style={{ padding: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                        <div style={{ marginRight: "12px" }}>
                          <img
                            src={review.profile}
                            alt={review.name}
                            style={{
                              width: "42px",
                              height: "42px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div>
                          <p style={{ fontSize: "14px", color: "red", margin: "0" }}>
                            {review.name}
                          </p>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                            {renderStars(review.ratings)}
                            <span>{review.ratings.toFixed(2)}/5.00</span>
                          </div>
                        </div>
                      </div>
 
                      <p style={{ margin: "8px 0", fontSize: "15px" }}>
                        <span style={{ fontWeight: "bold" }}>Role: </span>
                        {review.role}
                      </p>
                      <p style={{ margin: "8px 0", fontSize: "15px" }}>
                        <span style={{ fontWeight: "bold" }}>Batch: </span>
                        {review.batch}
                      </p>
                      <div style={{ marginTop: "12px" }}>
                        <p
                          ref={(el) => (videoTextRefs.current[reviewId] = el)}
                          style={{
                            color: "#4b5563",
                            fontSize: "14px",
                            lineHeight: "1.5",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            WebkitLineClamp: expandedStates[reviewId] ? "unset" : 3,
                            transition: "all 0.3s ease-in-out",
                            textAlign: "justify",
                          }}
                        >
                          {review.review}
                        </p>
                        {overflowingStates[reviewId] && (
                          <span
                            onClick={() => toggleExpanded(reviewId)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                              cursor: "pointer",
                              fontSize: "14px",
                              color: "#007bff",
                              marginTop: "5px",
                              fontWeight: "500",
                            }}
                          >
                            {expandedStates[reviewId] ? (
                              <>
                                <span>View Less</span>
                                <ExpandLess />
                              </>
                            ) : (
                              <>
                                <span>View More</span>
                                <ExpandMore />
                              </>
                            )}
                          </span>
                        )}
                      </div>
 
                      <p style={{ color: "#9ca3af", fontSize: "12px" }}>
                        Published:{" "}
                        {new Date(review.createdOn).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
 
        {/* Pagination Controls - only shown when there are results */}
        {activeReviews.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
              gap: "10px",
            }}
          >
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              style={{
                padding: "8px 12px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                backgroundColor: currentPage === 1 ? "#e5e7eb" : "#ccc",
                border: "none",
                borderRadius: "5px",
              }}
            >
              ❮
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) =>
              num === 1 ||
                num === totalPages ||
                (num >= currentPage - 1 && num <= currentPage + 1) ? (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    backgroundColor: currentPage === num ? "#5b2c6f" : "#f07057",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  {num}
                </button>
              ) : num === currentPage - 2 || num === currentPage + 2 ? (
                <span key={num}>...</span>
              ) : null
            )}
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              style={{
                padding: "8px 12px",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                backgroundColor: currentPage === totalPages ? "#e5e7eb" : "#ccc",
                border: "none",
                borderRadius: "5px",
              }}
            >
              ❯
            </button>
          </div>
        )}
      </div>
    </div>
  );
 
}
 