"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCommentDots,
  FaTimes,
  FaClipboardList,
  FaSpinner,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBusinessServices,
  selectBusinessServices,
} from "@/redux/slices/services/services/businessServices";
import {
  fetchServices,
  selectServices,
} from "@/redux/slices/services/services/Services";
import {
  resetEnquiryState,
  selectEnquiry,
  submitEnquiry,
} from "@/redux/slices/enquiry/enquiry";
import ToastComponent from "../common/toast";

const EnquiryModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const services = useSelector(selectServices);
  const businessServices = useSelector(selectBusinessServices);
  const { loading, error, success, enquiryData } = useSelector(selectEnquiry);

  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({
    type: "success",
    message: "",
  });

  // Load data on component mount
  useEffect(() => {
    dispatch(getAllBusinessServices());
    dispatch(fetchServices());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business_service: "",
    service: "",
    message: "",
  });

  const [filteredServices, setFilteredServices] = useState([]);

  const handleBusinessServiceChange = (e) => {
    const selectedBusinessServiceId = e.target.value;
    setFormData({
      ...formData,
      business_service: selectedBusinessServiceId,
      service: "", // Reset service when business service changes
    });

    // Filter services based on the selected business service
    if (selectedBusinessServiceId && services && services.length > 0) {
      const relatedServices = services.filter(
        (service) =>
          service.business_services &&
          (service.business_services._id === selectedBusinessServiceId ||
            service.business_services === selectedBusinessServiceId)
      );

      setFilteredServices(relatedServices);
    } else {
      setFilteredServices([]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (success && enquiryData) {
      const successMessage =
        enquiryData?.message?.[0]?.value ||
        enquiryData?.message ||
        "Our Team Will Respond Shortly";

      setToastConfig({
        type: "success",
        message: successMessage,
      });
      setShowToast(true);

      setTimeout(() => {
        onClose();
        dispatch(resetEnquiryState());
      }, 5000);
    }
  }, [success, enquiryData, dispatch, onClose]);

  useEffect(() => {
    if (error) {
      setToastConfig({
        type: "error",
        message: error,
      });
      setShowToast(true);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.business_service
    ) {
      setToastConfig({
        type: "error",
        message: "Please fill in all required fields",
      });
      setShowToast(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setToastConfig({
        type: "error",
        message: "Please enter a valid email address",
      });
      setShowToast(true);
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setToastConfig({
        type: "error",
        message: "Please enter a valid 10-digit phone number",
      });
      setShowToast(true);
      return;
    }

    try {
      await dispatch(submitEnquiry(formData)).unwrap();
      setFormData({
        name: "",
        email: "",
        phone: "",
        business_service: "",
        service: "",
        message: "",
      });
    } catch (err) {
      console.error("Failed to submit enquiry:", err);
    }
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = globalStyle;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (!isOpen) return null;

  // Determine if the screen is mobile
  const isMobile = window.innerWidth <= 768;

  // Set border style based on screen size
  const borderStyle = {
    position: "absolute",
    bottom: isMobile ? "367px" : "440px", // Adjusted for mobile view
    left: isMobile ? "108px" : "160px", // Adjusted for mobile view
    width: "85px", // Width to extend from "reer" to "enqu"
    height: "2px",
    backgroundColor: "#5b2c6f",
  };

  return (
    <>
      {/* Toast Component */}
      <ToastComponent
        type={toastConfig.type}
        message={toastConfig.message}
        show={showToast}
        onClose={() => setShowToast(false)}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={overlayStyle}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={modalStyle}
        >
          <button style={closeBtnStyle} onClick={onClose}>
            <FaTimes />
          </button>
          <div style={{ position: "relative", marginBottom: "15px" }}>
            <h1
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontWeight: "500",
                fontSize: "28px",
                letterSpacing: "0",
                lineHeight: "1.5em",
                paddingBottom: "15px",
                position: "relative",
                display: "inline-block",
                color: "#5b2c6f",
              }}
            >
              Enquiry Form
              {/* Bottom Thick Line */}
              <span
                style={{
                  content: '""',
                  position: "absolute",
                  left: "0",
                  bottom: "0",
                  height: "5px",
                  width: "55px",
                  backgroundColor: "#5b2c6f",
                }}
              ></span>
              {/* Bottom Thin Line */}
              <span
                style={{
                  content: '""',
                  position: "absolute",
                  left: "0",
                  bottom: "2px",
                  height: "1px",
                  width: "95%",
                  maxWidth: "255px",
                  backgroundColor: "#5b2c6f",
                }}
              ></span>
            </h1>
          </div>
          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={inputGroupStyle}>
              <FaUser style={iconStyle} />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                onChange={handleChange}
                style={inputStyle}
                value={formData.name}
              />
            </div>
            <div style={inputGroupStyle}>
              <FaEnvelope style={iconStyle} />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                onChange={handleChange}
                style={inputStyle}
                value={formData.email}
              />
            </div>
            <div style={inputGroupStyle}>
              <FaPhone style={iconStyle} />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                required
                onChange={handleChange}
                style={inputStyle}
                value={formData.phone}
              />
            </div>

            <div style={inputGroupStyle}>
              <FaClipboardList style={iconStyle} />
              <select
                name="business_service"
                onChange={handleBusinessServiceChange}
                required
                style={selectStyle}
                value={formData.business_service}
              >
                <option value="">Select Business Service</option>
                {businessServices?.length > 0 ? (
                  businessServices.map((item) => (
                    <option
                      key={item.id || item._id}
                      value={item._id || item.id}
                    >
                      {item.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    Loading business services...
                  </option>
                )}
              </select>
            </div>

            {formData.business_service && (
              <div style={inputGroupStyle}>
                <FaClipboardList style={iconStyle} />
                <select
                  name="service"
                  onChange={handleChange}
                  value={formData.service}
                  style={selectStyle}
                >
                  <option value="">Select Service</option>
                  {filteredServices.length > 0 ? (
                    filteredServices.map((item) => (
                      <option
                        key={item.id || item._id}
                        value={item._id || item.id}
                      >
                        {item.title || item.name || "Unnamed Service"}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No services available
                    </option>
                  )}
                </select>
              </div>
            )}

            <div style={inputGroupStyle}>
              <FaCommentDots style={iconStyle} />
              <textarea
                name="message"
                placeholder="Your Message"
                required
                onChange={handleChange}
                style={textareaStyle}
                value={formData.message}
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
              type="submit"
              style={{
                ...submitBtnStyle,
                opacity: loading ? 0.8 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
              disabled={loading}
            >
              {loading ? (
                <div style={loadingContainerStyle}>
                  <FaSpinner style={spinnerStyle} />
                  <span>Submitting...</span>
                </div>
              ) : (
                "Submit"
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
};

const globalStyle = `
::-webkit-scrollbar {
    display: none;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`;

const spinnerStyle = {
  animation: "spin 1s linear infinite",
};

const loadingContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  width: "100%",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "#ffffff", // Changed to white
  padding: "25px",
  borderRadius: "12px",
  width: "420px",
  height: "89vh",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
  position: "relative",
  textAlign: "center",
  border: "2px solid #5b2c6f",
  overflowY: "auto",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
};

const closeBtnStyle = {
  position: "absolute",
  top: "15px",
  right: "15px",
  border: "none",
  background: "none",
  fontSize: "22px",
  cursor: "pointer",
  color: "black",
};

const headingStyle = {
  marginBottom: "18px",
  fontSize: "24px",
  color: "#5b2c6f",
  fontWeight: "bold",
};

const highlightedHeadingStyle = {
  fontSize: "50px", // "C" and "E" size 50px
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const inputGroupStyle = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  marginTop: "5px",
  width: "100%",
};

const iconStyle = {
  position: "absolute",
  left: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#f2775e",
  fontSize: "18px",
  zIndex: 1,
};

const inputStyle = {
  width: "100%",
  padding: "12px 12px 12px 40px",
  borderRadius: "6px",
  border: "1px solid #5b2c6f",
  fontSize: "10px", // Changed to 10px
  outline: "none",
  backgroundColor: "#fff",
};

const selectStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #5b2c6f",
  fontSize: "16px",
  outline: "none",
  paddingLeft: "40px",
  backgroundColor: "#fff",
};

const textareaStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #5b2c6f",
  fontSize: "16px",
  outline: "none",
  resize: "none",
  height: "90px",
  backgroundColor: "#fff",
};

const submitBtnStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",
  background: "#f2775e",
  color: "#fff",
  width: "150px",
  height: "50px",
  borderRadius: "12px", // Adjusted for the square shape
  border: "none",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  padding: "0", // Remove padding as we're using fixed dimensions
  transition: "all 0.3s ease",
};

export default EnquiryModal;
