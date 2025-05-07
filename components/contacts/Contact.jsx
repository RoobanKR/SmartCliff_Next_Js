"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaCommentDots,
  FaSpinner,
  FaTimes,
  FaMapMarkerAlt,
  FaPhone,
  FaBuilding,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  resetContactState,
  selectContact,
  submitContact,
} from "@/redux/slices/contact/contact";
import dynamic from "next/dynamic";
import { getAllContactPages } from "@/redux/slices/contactPage/contactPage";
import { getAllAddress } from "@/redux/slices/contactPage/address";

const MapComponent = dynamic(() => import("./Map"), {
  ssr: false,
});

export default function ContactPage() {
  const dispatch = useDispatch();
  const {
    loading,
    error,
    success,
    contactData: responseData,
  } = useSelector(selectContact);
  const [showMap, setShowMap] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);

  // Get contact pages from redux state
  const contactPages =
    useSelector((state) => state?.contactPage?.contactPages) || [];

  // Get address data from redux state
  const addressData = useSelector((state) => state?.address?.addresses) || [];

  // Contact form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Load map after component mount
  useEffect(() => {
    setShowMap(true);
  }, []);

  // Fetch contact pages and address data
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllContactPages());
        await dispatch(getAllAddress()); // Fetch address data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  // Handle success response
  useEffect(() => {
    if (success && responseData) {
      const successMessage =
        responseData?.message?.[0]?.value ||
        responseData?.message ||
        "Our Team Will Respond Shortly";
      toast.success(successMessage);

      // Reset form and state after success
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => {
        dispatch(resetContactState());
      }, 5000);
    }
  }, [success, responseData, dispatch]);

  // Handle error response
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      await dispatch(submitContact(formData)).unwrap();
    } catch (err) {
      console.error("Failed to submit contact form:", err);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <section className="layout-pb-sm">
        <div className="container">
          <div className="row y-gap-50 justify-between">
            <div className="col-lg-6">
              {/* Address information section */}
              {addressData && addressData.length > 0 && (
                <div className="address-section mb-30">
                  <h3 className="text-24 fw-600 mb-20">Our Address</h3>
                  <div className="d-flex items-center mb-15">
                    <div
                      className="d-flex justify-center items-center size-60 rounded-full"
                      style={{ background: "#edecec" }}
                    >
                      <Image
                        width={30}
                        height={30}
                        src={addressData[0]?.image}
                        alt="icon"
                      />{" "}
                    </div>
                    <div className="ml-30">
                      <div className="fw-600">{addressData[0]?.street}</div>
                      <div className="fw-600">{addressData[0]?.address}</div>
                      <div className="fw-600">{addressData[0]?.city}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="y-gap-30 pt-10 lg:pt-10">
                {contactPages.map((elm, i) => (
                  <div key={i} className="d-flex items-center">
                    <div
                      className="d-flex justify-center items-center size-60 rounded-full"
                      style={{ background: "#edecec" }}
                    >
                      <Image
                        width={30}
                        height={30}
                        src={elm.image}
                        alt="icon"
                      />
                    </div>
                    <div className="ml-30 fw-600">{elm.contact}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-5 mb-30">
              <h3 className="text-24 fw-600 mb-20">Send us a message</h3>
              <form
                className="contact-form row y-gap-30 pt-10"
                onSubmit={handleSubmit}
              >
                <div className="col-md-6">
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="Your name..."
                    onChange={handleChange}
                    value={formData.name}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="Your email..."
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>
                <div className="col-12">
                  <textarea
                    required
                    name="message"
                    placeholder="Your message..."
                    rows="3"
                    onChange={handleChange}
                    value={formData.message}
                  ></textarea>
                </div>
                <div
                  className="col-12"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    disabled={loading}
                    style={{
                      background: "#F2775E",
                      color: "white",
                      padding: "0.35em 1.2em 0.35em 1.2em",
                      fontSize: "17px",
                      fontWeight: "500",
                      borderRadius: "0.9em",
                      border: "none",
                      letterSpacing: "0.05em",
                      display: "flex",
                      alignItems: "center",
                      boxShadow: "inset 0 0 1.6em -0.6em #F2775E",
                      overflow: "hidden",
                      position: "relative",
                      height: "2.8em",
                      paddingRight: "3.3em",
                      cursor: "pointer",
                    }}
                  >
                    {loading ? (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <FaSpinner className="spinner-icon" />
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                    <span
                      style={{
                        background: "white",
                        marginLeft: "1em",
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "2.2em",
                        width: "2.2em",
                        borderRadius: "0.7em",
                        boxShadow: "0.1em 0.1em 0.6em 0.2em #F2775E",
                        right: "0.3em",
                        transition: "all 0.3s",
                      }}
                    >
                      <svg
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          width: "1.1em",
                          color: "#F2775E",
                          transition: "transform 0.3s",
                        }}
                      >
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path
                          d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section>{showMap && <MapComponent />}</section>
    </>
  );
}
