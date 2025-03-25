import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { submitForm } from "@/redux/slices/hirefromus/Hirefromus";
import { fetchCourses } from "@/redux/slices/course/course";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast notifications
import "./Modal.css"; // Import the CSS for the modal
import Modal from "./modal";

export default function HirefromusAddForm() {
  const formData = useSelector((state) => state.hirefromus.formData);
  const courses = useSelector((state) => state.courses.courses);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const initialValues = formData;

  const validate = (values) => {
    const errors = {};
    const nameRegex = /^[a-zA-Z\s]+$/;
    const phoneNumberRegex = /^[6-9]\d{0,9}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!values.name) {
      errors.name = "Name is required";
    } else if (!nameRegex.test(values.name)) {
      errors.name = "Invalid name";
    }

    if (!values.designation) {
      errors.designation = "Designation is required";
    } else if (!nameRegex.test(values.designation)) {
      errors.designation = "Invalid designation";
    }

    if (!values.company_name) {
      errors.company_name = "Company name is required";
    } else if (!nameRegex.test(values.company_name)) {
      errors.company_name = "Invalid company name";
    }

    if (!values.mobile) {
      errors.mobile = "Mobile number is required";
    } else if (!phoneNumberRegex.test(values.mobile)) {
      errors.mobile = "Invalid mobile number";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.enquiry) {
      errors.enquiry = "Enquiry is required";
    }
    if (!values.count) {
      errors.count = "Batch size is required";
    }
    return errors;
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    const selectedCourseName = values.course;
    const selectedCourse = courses.find(
      (course) => course.course_name === selectedCourseName
    );
    if (selectedCourse) {
      const formDataWithCourseId = { ...values, course: selectedCourse._id };
      dispatch(submitForm(formDataWithCourseId))
        .then((response) => {
          if (response.payload.message[0].key === "success") {
            setShowSuccess(true);
            toast.success("Form submitted successfully!");
          } else {
            toast.error(response.payload.message[0].value);
          }
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message[0]?.value || "Email Already Exist";
          toast.error(errorMessage);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } else {
      console.error("Selected course not found.");
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    dispatch(fetchCourses()).then(() => setLoading(false));
  }, [dispatch]);
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", maxWidth: "100%" }}>
      <ToastContainer />
      <div style={{ padding: "10px", maxWidth: "100%" }}>
        <div>
          <div style={{ padding: "20px", maxWidth: "100%" }}>
            <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={handleSubmit}
            >
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  width: "100%",
                }}
              >
                {/* Row 1: Name and Designation */}
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                    width: "100%",
                  }}
                >
                  <div style={{ flex: "1 1 300px", minWidth: "0" }}>
                    <label
                      htmlFor="name"
                      style={{
                        display: "block",
                        fontSize: "15px",
                        fontWeight: "500",
                        color: "#333",
                        marginBottom: "8px",
                      }}
                    >
                      Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      style={{
                        width: "100%",
                        padding: "7px 15px",
                        fontSize: "15px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        outline: "none",
                        transition: "all 0.3s",
                        backgroundColor: "#f9f9f9",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#007BFF";
                        e.target.style.backgroundColor = "#fff";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#ddd";
                        e.target.style.backgroundColor = "#f9f9f9";
                      }}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      style={{
                        color: "#e53935",
                        fontSize: "13px",
                        marginTop: "6px",
                      }}
                    />
                  </div>
                  <div style={{ flex: "1 1 300px", minWidth: "0" }}>
                    <label
                      htmlFor="designation"
                      style={{
                        display: "block",
                        fontSize: "15px",
                        fontWeight: "500",
                        color: "#333",
                        marginBottom: "8px",
                      }}
                    >
                      Designation <span style={{ color: "red" }}>*</span>
                    </label>
                    <Field
                      type="text"
                      id="designation"
                      name="designation"
                      placeholder="Your job title"
                      style={{
                        width: "100%",
                        padding: "7px 15px",
                        fontSize: "15px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        outline: "none",
                        transition: "all 0.3s",
                        backgroundColor: "#f9f9f9",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#007BFF";
                        e.target.style.backgroundColor = "#fff";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#ddd";
                        e.target.style.backgroundColor = "#f9f9f9";
                      }}
                    />
                    <ErrorMessage
                      name="designation"
                      component="div"
                      style={{
                        color: "#e53935",
                        fontSize: "13px",
                        marginTop: "6px",
                      }}
                    />
                  </div>
                </div>

                {/* Row 2: Company Name and Mobile */}
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                    width: "100%",
                  }}
                >
                  <div style={{ flex: "1 1 300px", minWidth: "0" }}>
                    <label
                      htmlFor="company_name"
                      style={{
                        display: "block",
                        fontSize: "15px",
                        fontWeight: "500",
                        color: "#333",
                        marginBottom: "8px",
                      }}
                    >
                      Company Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <Field
                      type="text"
                      id="company_name"
                      name="company_name"
                      placeholder="Your company"
                      style={{
                        width: "100%",
                        padding: "7px 15px",
                        fontSize: "15px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        outline: "none",
                        transition: "all 0.3s",
                        backgroundColor: "#f9f9f9",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#007BFF";
                        e.target.style.backgroundColor = "#fff";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#ddd";
                        e.target.style.backgroundColor = "#f9f9f9";
                      }}
                    />
                    <ErrorMessage
                      name="company_name"
                      component="div"
                      style={{
                        color: "#e53935",
                        fontSize: "13px",
                        marginTop: "6px",
                      }}
                    />
                  </div>
                  <div style={{ flex: "1 1 300px", minWidth: "0" }}>
                    <label
                      htmlFor="mobile"
                      style={{
                        display: "block",
                        fontSize: "15px",
                        fontWeight: "500",
                        color: "#333",
                        marginBottom: "8px",
                      }}
                    >
                      Mobile Number <span style={{ color: "red" }}>*</span>
                    </label>
                    <Field
                      type="text"
                      id="mobile"
                      name="mobile"
                      placeholder="Your contact number"
                      style={{
                        width: "100%",
                        padding: "7px 15px",
                        fontSize: "15px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        outline: "none",
                        transition: "all 0.3s",
                        backgroundColor: "#f9f9f9",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#007BFF";
                        e.target.style.backgroundColor = "#fff";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#ddd";
                        e.target.style.backgroundColor = "#f9f9f9";
                      }}
                    />
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      style={{
                        color: "#e53935",
                        fontSize: "13px",
                        marginTop: "6px",
                      }}
                    />
                  </div>
                </div>

                {/* Row 3: Email and Batch Size */}
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                    width: "100%",
                  }}
                >
                  <div style={{ flex: "1 1 300px", minWidth: "0" }}>
                    <label
                      htmlFor="email"
                      style={{
                        display: "block",
                        fontSize: "15px",
                        fontWeight: "500",
                        color: "#333",
                        marginBottom: "8px",
                      }}
                    >
                      Email ID <span style={{ color: "red" }}>*</span>
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your.email@example.com"
                      style={{
                        width: "100%",
                        padding: "7px 15px",
                        fontSize: "15px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        outline: "none",
                        transition: "all 0.3s",
                        backgroundColor: "#f9f9f9",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#007BFF";
                        e.target.style.backgroundColor = "#fff";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#ddd";
                        e.target.style.backgroundColor = "#f9f9f9";
                      }}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      style={{
                        color: "#e53935",
                        fontSize: "13px",
                        marginTop: "6px",
                      }}
                    />
                  </div>
                  <div style={{ flex: "1 1 300px", minWidth: "0" }}>
                    <label
                      htmlFor="count"
                      style={{
                        display: "block",
                        fontSize: "15px",
                        fontWeight: "500",
                        color: "#333",
                        marginBottom: "8px",
                      }}
                    >
                      Batch Size <span style={{ color: "red" }}>*</span>
                    </label>
                    <Field
                      as="select"
                      id="count"
                      name="count"
                      style={{
                        width: "100%",
                        padding: "7px 15px",
                        fontSize: "15px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        outline: "none",
                        transition: "all 0.3s",
                        backgroundColor: "#f9f9f9",
                        appearance: "none",
                        backgroundImage:
                          'url(\'data:image/svg+xml;utf8,<svg fill="%23555" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>\')',
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 12px center",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#007BFF";
                        e.target.style.backgroundColor = "#fff";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#ddd";
                        e.target.style.backgroundColor = "#f9f9f9";
                      }}
                    >
                      <option value="">Select Batch Size</option>
                      <option value="0-10">0-10</option>
                      <option value="10-20">10-20</option>
                      <option value="20-30">20-30</option>
                      <option value="30+">30+</option>
                    </Field>
                    <ErrorMessage
                      name="count"
                      component="div"
                      style={{
                        color: "#e53935",
                        fontSize: "13px",
                        marginTop: "6px",
                      }}
                    />
                  </div>
                </div>

                {/* Row 4: Course */}
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                    width: "100%",
                  }}
                >
                  <div style={{ flex: "1 1 300px", minWidth: "0" }}>
                    <label
                      htmlFor="course"
                      style={{
                        display: "block",
                        fontSize: "15px",
                        fontWeight: "500",
                        color: "#333",
                        marginBottom: "8px",
                      }}
                    >
                      Course <span style={{ color: "red" }}>*</span>
                    </label>
                    <Field
                      as="select"
                      id="course"
                      name="course"
                      style={{
                        width: "100%",
                        padding: "7px 15px",
                        fontSize: "15px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        outline: "none",
                        transition: "all 0.3s",
                        backgroundColor: "#f9f9f9",
                        appearance: "none",
                        backgroundImage:
                          'url(\'data:image/svg+xml;utf8,<svg fill="%23555" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>\')',
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 12px center",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#007BFF";
                        e.target.style.backgroundColor = "#fff";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#ddd";
                        e.target.style.backgroundColor = "#f9f9f9";
                      }}
                      disabled={loading}
                    >
                      <option value="">Select Course</option>
                      {courses.map((course) => (
                        <option key={course._id} value={course.course_name}>
                          {course.course_name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="course"
                      component="div"
                      style={{
                        color: "#e53935",
                        fontSize: "13px",
                        marginTop: "6px",
                      }}
                    />
                  </div>
                </div>

                {/* Row 5: Enquiry Textarea */}
                <div style={{ width: "100%", marginTop: "8px" }}>
                  <label
                    htmlFor="enquiry"
                    style={{
                      display: "block",
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "#333",
                      marginBottom: "8px",
                    }}
                  >
                    Hiring Enquiry <span style={{ color: "red" }}>*</span>
                  </label>
                  <Field
                    as="textarea"
                    id="enquiry"
                    name="enquiry"
                    placeholder="Please describe your hiring requirements..."
                    rows="4"
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      fontSize: "15px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      outline: "none",
                      transition: "all 0.3s",
                      backgroundColor: "#f9f9f9",
                      resize: "vertical",
                      minHeight: "120px",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#007BFF";
                      e.target.style.backgroundColor = "#fff";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#ddd";
                      e.target.style.backgroundColor = "#f9f9f9";
                    }}
                  />
                  <ErrorMessage
                    name="enquiry"
                    component="div"
                    style={{
                      color: "#e53935",
                      fontSize: "13px",
                      marginTop: "6px",
                    }}
                  />
                </div>

                {/* Submit Button */}
                <div
                  style={{
                    marginTop: "24px",
                    display: "flex",
                    justifyContent: "right",
                    width: "100%",
                    "@media (min-width: 768px)": {
                      justifyContent: "flex-end",
                    },
                  }}
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
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
                      cursor: isSubmitting ? "default" : "pointer",
                      transition: "transform 0.2s ease, opacity 0.2s ease",
                      opacity: isSubmitting ? "0.8" : "1",
                    }}
                    onMouseOver={(e) => {
                      if (!isSubmitting) {
                        e.target.style.transform = "translateY(-2px)";
                      }
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    {isSubmitting ? "Submitting..." : "Get started"}
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
                        borderRadius: "50%",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
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
                          color: "#f2775e",
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
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Contact us soon! Your form has been submitted successfully!"
      />
    </div>
  );
}
