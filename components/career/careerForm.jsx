"use client";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaGraduationCap,
  FaFile,
  FaTimes,
  FaSpinner,
  FaUndo,
  FaSubscript,
  FaGenderless,
  FaPersonBooth,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCareers,
  selectCareerState,
  resetCareer,
  addCareerForm,
} from "@/redux/slices/career/careerForm";
import ToastComponent from "../common/toast";
import {
  fetchJobPositions,
  selectJobPositions,
} from "@/redux/slices/joinUs/joinus";
import { bottom } from "@popperjs/core";

export default function CareerEnquiryForm({ closeModal }) {
  const [isResetting, setIsResetting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({
    type: "success",
    message: "",
  });

  const dispatch = useDispatch();
  const careerState = useSelector(selectCareerState);
  const { isLoading, isSuccess, isError, error } = careerState;
  const jobPositions = useSelector(selectJobPositions);

  useEffect(() => {
    dispatch(fetchJobPositions());
  }, [dispatch]);


  // Handle success or error states
  useEffect(() => {
    if (isSuccess) {
      setToastConfig({
        type: "success",
        message: "Application submitted successfully!",
      });
      setShowToast(true);

      setTimeout(() => {
        dispatch(resetCareer());
        closeModal();
      }, 3000);
    }

    if (isError) {
      setToastConfig({
        type: "error",
        message: error || "User Already exists",
      });
      setShowToast(true);

      setTimeout(() => {
        dispatch(resetCareer());
      }, 3000);
    }
  }, [isSuccess, isError, error, dispatch, closeModal]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      job_position: "",
      qualification: "",
      resume: null,
      gender: "", // New field for gender
      yearOfRelevantExperience: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone is required"),
      job_position: Yup.string().required("Job position is required"),
      qualification: Yup.string().required("Qualification is required"),
      resume: Yup.mixed()
        .required("Resume is required")
        .test(
          "fileFormat",
          "Only PDF files are supported",
          (value) => value && value.type === "application/pdf"
        )
        .test(
          "fileSize",
          "File size must be less than 5MB",
          (value) => value && value.size <= 5 * 1024 * 1024
        ),
      gender: Yup.string().required("Gender is required"), // Validation for gender
      yearOfRelevantExperience: Yup.string().required(
        "Year of Relavent experience is required"
      ),
    }),
    onSubmit: (values) => {
      // Create FormData object to handle file upload
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("job_position", values.job_position);
      formData.append("qualification", values.qualification);
      formData.append("resume", values.resume);
      formData.append("gender", values.gender); // Append gender
      formData.append(
        "yearOfRelevantExperience",
        values.yearOfRelevantExperience
      ); // Append year of experience
      dispatch(addCareerForm(formData));
    },
  });

  // Function to handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.type !== "application/pdf") {
        setToastConfig({
          type: "error",
          message: "Only PDF files are supported",
        });
        setShowToast(true);
        // Reset file input
        event.target.value = "";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setToastConfig({
          type: "error",
          message: "File size must be less than 5MB",
        });
        setShowToast(true);
        // Reset file input
        event.target.value = "";
        return;
      }

      formik.setFieldValue("resume", file);
    }
  };

  // Function to handle form reset with animation
  const handleResetForm = () => {
    setIsResetting(true);

    // Add clearing animation timing
    setTimeout(() => {
      formik.resetForm();
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = "";
      }
      setIsResetting(false);
    }, 500);
  };

  // Add global style for animations
  React.useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = globalStyle;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={overlayStyle}
    >
      {/* Toast Notification Component */}
      <ToastComponent
        type={toastConfig.type}
        message={toastConfig.message}
        show={showToast}
        onClose={() => setShowToast(false)}
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={modalStyle}
        className={isResetting ? "form-resetting" : ""}
      >
        <button type="button" onClick={closeModal} style={closeBtnStyle}>
          <FaTimes />
        </button>

        <div style={{ position: "relative" }}>
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
            Career Enquiry
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

        <form onSubmit={formik.handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <FaUser style={iconStyle} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={inputStyle}
              className={isResetting ? "clearing-field" : ""}
            />
          </div>
          {formik.touched.name && formik.errors.name && (
            <p style={errorStyle}>{formik.errors.name}</p>
          )}

          <div style={inputGroupStyle}>
            <FaEnvelope style={iconStyle} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={inputStyle}
              className={isResetting ? "clearing-field" : ""}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <p style={errorStyle}>{formik.errors.email}</p>
          )}

          <div style={inputGroupStyle}>
            <FaPhone style={iconStyle} />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={inputStyle}
              className={isResetting ? "clearing-field" : ""}
            />
          </div>
          {formik.touched.phone && formik.errors.phone && (
            <p style={errorStyle}>{formik.errors.phone}</p>
          )}
          <div style={inputGroupStyle}>
            <FaPersonBooth style={iconStyle} />
            <select
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={inputStyle}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          {formik.touched.gender && formik.errors.gender && (
            <p style={errorStyle}>{formik.errors.gender}</p>
          )}
          <div style={inputGroupStyle}>
            <FaBriefcase style={iconStyle} />
            <select
              name="job_position"
              value={formik.values.job_position}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={inputStyle}
            >
              <option value="">Select Job Position</option>
              {jobPositions.length > 0 ? (
                jobPositions.map((job) => (
                  <option key={job._id} value={job.job_position}>
                    {job.job_position}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No positions available
                </option>
              )}
            </select>
          </div>
          {formik.touched.job_position && formik.errors.job_position && (
            <p style={errorStyle}>{formik.errors.job_position}</p>
          )}

          <div style={inputGroupStyle}>
            <FaGraduationCap style={iconStyle} />
            <input
              type="text"
              name="qualification"
              placeholder="Higher Qualification"
              value={formik.values.qualification}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={inputStyle}
              className={isResetting ? "clearing-field" : ""}
            />
          </div>
          {formik.touched.qualification && formik.errors.qualification && (
            <p style={errorStyle}>{formik.errors.qualification}</p>
          )}

          {/* Year of Experience Field */}
          <div style={inputGroupStyle}>
            <FaBriefcase style={iconStyle} />
            <input
              type="text"
              name="yearOfRelevantExperience"
              placeholder="Years of Relavent Experience"
              value={formik.values.yearOfRelevantExperience}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={inputStyle}
              className={isResetting ? "clearing-field" : ""}
            />
          </div>
          {formik.touched.yearOfRelevantExperience &&
            formik.errors.yearOfRelevantExperience && (
              <p style={errorStyle}>{formik.errors.yearOfRelevantExperience}</p>
            )}

          <div style={fileInputGroupStyle}>
            <div style={fileInputLabelContainerStyle}>
              <FaFile style={{ ...iconStyle, top: "15px" }} />
              <label style={fileInputLabelStyle}>
                Upload Resume (PDF only)
                <input
                  type="file"
                  name="resume"
                  accept=".pdf"
                  onChange={handleFileChange}
                  onBlur={formik.handleBlur}
                  style={hiddenFileInputStyle}
                  className={isResetting ? "clearing-field" : ""}
                />
              </label>
            </div>{" "}
            {formik.values.resume && (
              <div style={selectedFileStyle}>
                <FaFile style={{ marginRight: "5px", color: "#5b2c6f" }} />
                <span
                  style={{
                    flex: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {formik.values.resume.name}
                </span>
              </div>
            )}
          </div>
          {formik.touched.resume && formik.errors.resume && (
            <p style={errorStyle}>{formik.errors.resume}</p>
          )}

          <div style={submitContainerStyle}>
            <motion.button
              whileHover={{ scale: isLoading ? 1 : 1.05 }}
              whileTap={{ scale: isLoading ? 1 : 0.95 }}
              type="submit"
              style={{
                ...submitBtnStyle,
                opacity: isLoading ? 0.8 : 1,
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <div style={loadingContainerStyle}>
                  <FaSpinner style={spinnerStyle} />
                  <span>Submitting...</span>
                </div>
              ) : (
                "Submit"
              )}
            </motion.button>
            ;
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// Styles
const globalStyle = `
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
   
    @keyframes clear-field {
        0% { opacity: 1; }
        50% { opacity: 0.3; }
        100% { opacity: 1; }
    }
   
    .clearing-field {
        animation: clear-field 0.5s ease-in-out;
    }
   
    ::-webkit-scrollbar {
        display: none;
    }
`;
const underlineContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "-15px", // Adjust as needed
};

const underlineStyle = {
  width: "50px", // Set to 10px for the width of the underline
  height: "2px", // Set to 1px for a smaller height
  backgroundColor: "#5b2c6f", // Color of the underline
  margin: "0 10px", // Space between the underline and the star
};

const starStyle = {
  fontSize: "20px", // Size of the star
  color: "#5b2c6f", // Color of the star
  lineHeight: "0", // Adjust line height to center the star
};

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
  backgroundColor: "#b91616",
  borderRadius: "8px",
  padding: "4px 6px",
  top: "15px",
  right: "15px",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: "20px",
  cursor: "pointer",
  color: "white",
};

const headingStyle = {
  marginBottom: "18px",
  fontSize: "24px",
  color: "#5b2c6f",
  fontWeight: "bold",
  // textDecoration: "underline",
};
const highlightedHeadingStyle = {
  fontSize: "50px", // "C" and "E" size 50px
};
const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  marginTop: "15px",
};

const borderStyle = {
  position: "absolute",
  bottom: "440px",
  left: "160px", // Position to start at "reer"
  width: "85px", // Width to extend from "reer" to "enqu"
  height: "2px",
  backgroundColor: "#5b2c6f",
};

const inputGroupStyle = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  marginTop: "5px",
  width: "100%",
};

const fileInputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginTop: "5px",
  gap: "5px",
};

const fileInputLabelContainerStyle = {
  position: "relative",
  width: "100%",
  display: "flex",
  alignItems: "center",
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
const fileInputLabelStyle = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: "12px 12px 12px 40px",
  borderRadius: "6px",
  border: "1px solid #5b2c6f",
  fontSize: "10px", // Changed to match inputStyle
  outline: "none",
  backgroundColor: "#fff",
  cursor: "pointer",
  color: "#666", // Added to match placeholder color
  textAlign: "left", // Added to align text to left
};
const hiddenFileInputStyle = {
  display: "none",
};

const selectedFileStyle = {
  display: "flex",
  alignItems: "center",
  padding: "8px 12px",
  backgroundColor: "#e8e0f7",
  borderRadius: "6px",
  fontSize: "14px",
  width: "100%",
  marginTop: "5px",
};

const errorStyle = {
  color: "red",
  fontSize: "14px",
  textAlign: "left",
  marginTop: "-2px",
  marginBottom: "2px",
  paddingLeft: "5px",
};

const submitContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginTop: "30px",
  position: "relative",
};

const submitBtnStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f2775e",
  color: "#fff",
  width: "120px", // Slightly wider for a better proportion
  height: "36px", // Reduced height to make it thinner
  borderRadius: "6px", // Slightly rounded edges
  border: "none",
  cursor: "pointer",
  fontSize: "13px", // Smaller text for a neater look
  fontWeight: "500",
  padding: "4px 10px", // Adjusted padding
  transition: "all 0.3s ease",
};
