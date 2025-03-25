import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "@/redux/slices/course/course";
import {
  fetchCategories,
  selectCategories,
} from "@/redux/slices/category/category";
import { createTrainFromUs } from "@/redux/slices/hiring/trainFromUs/trainFromus";
import "./Modal.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./Modal";

export default function TrainFromUsAddForm() {
  const formData = useSelector((state) => state.hirefromus.formData);
  const courses = useSelector((state) => state.courses.courses);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const categories = useSelector(selectCategories);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const initialValues = formData || {
    name: "",
    designation: "",
    company_name: "",
    mobile: "",
    email: "",
    location: "",
    type: "",
    duration: "",
    durationUnit: "days",
    enquiry: "",
    batch_size: "",
    count: "",
  };

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

    if (!values.location) {
      errors.location = "Location is required";
    }

    if (!values.type) {
      errors.type = "Type is required";
    }

    if (!values.duration) {
      errors.duration = "Duration is required";
    }

    if (!values.enquiry) {
      errors.enquiry = "Enquiry is required";
    }

    if (values.type === "fresher" && !values.batch_size) {
      errors.batch_size = "Batch size is required";
    }

    if (values.type === "upskilling" && !values.count) {
      errors.count = "Count is required";
    }

    if (!selectedCategory) {
      errors.category = "Category selection is required";
    }

    if (!selectedCourse) {
      errors.course = "Course selection is required";
    }

    return errors;
  };

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);

    try {
      const formDataWithIds = {
        ...values,
        course: selectedCourse,
        category: selectedCategory,
      };

      const response = await dispatch(
        createTrainFromUs(formDataWithIds)
      ).unwrap();

      if (
        response &&
        response.message &&
        response.message[0] &&
        response.message[0].key === "success"
      ) {
        setShowSuccess(true);
        toast.success("Form submitted successfully!");
        resetForm();
        setSelectedCourse(null);
        setSelectedCategory(null);
        setFilteredCourses([]);
      } else {
        const errorMsg = response?.message?.[0]?.value || "Submission failed";
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error("Submission error:", error);
      const errorMessage =
        error?.response?.data?.message?.[0]?.value || "Email Already Exist";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filterCourses = (category) => {
    if (!category) {
      setFilteredCourses([]);
      return;
    }
    const filtered = courses.filter(
      (course) => course.category._id === category._id
    );
    setFilteredCourses(filtered);
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    filterCourses(categories.find((cat) => cat._id === categoryId));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCourses());
        await dispatch(fetchCategories());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      filterCourses(categories.find((cat) => cat._id === selectedCategory));
    }
  }, [categories, courses, selectedCategory]);
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
              {({ values }) => (
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

                  {/* Row 3: Email and Location */}
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
                        htmlFor="location"
                        style={{
                          display: "block",
                          fontSize: "15px",
                          fontWeight: "500",
                          color: "#333",
                          marginBottom: "8px",
                        }}
                      >
                        Location <span style={{ color: "red" }}>*</span>
                      </label>
                      <Field
                        as="select"
                        id="location"
                        name="location"
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
                        <option value="">Select Location</option>
                        <option value="any">Any</option>
                        <option value="smartcliff">Smartcliff</option>
                        <option value="client">Client</option>
                      </Field>
                      <ErrorMessage
                        name="location"
                        component="div"
                        style={{
                          color: "#e53935",
                          fontSize: "13px",
                          marginTop: "6px",
                        }}
                      />
                      {values.location === "client" && (
                        <Field
                          type="text"
                          id="ClientLocation"
                          name="ClientLocation"
                          placeholder="Enter Location"
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
                            marginTop: "10px",
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
                      )}
                    </div>
                  </div>

                  {/* Row 4: Type and Duration */}
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
                        htmlFor="type"
                        style={{
                          display: "block",
                          fontSize: "15px",
                          fontWeight: "500",
                          color: "#333",
                          marginBottom: "8px",
                        }}
                      >
                        Type <span style={{ color: "red" }}>*</span>
                      </label>
                      <Field
                        as="select"
                        id="type"
                        name="type"
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
                        <option value="">Select Type</option>
                        <option value="upskilling">Upskilling</option>
                        <option value="fresher">Fresher</option>
                      </Field>
                      <ErrorMessage
                        name="type"
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
                        htmlFor="duration"
                        style={{
                          display: "block",
                          fontSize: "15px",
                          fontWeight: "500",
                          color: "#333",
                          marginBottom: "8px",
                        }}
                      >
                        Duration <span style={{ color: "red" }}>*</span>
                      </label>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <div style={{ flex: "2" }}>
                          <Field
                            type="text"
                            id="duration"
                            name="duration"
                            placeholder="Duration"
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
                        </div>
                        <div style={{ flex: "1" }}>
                          <Field
                            as="select"
                            id="durationUnit"
                            name="durationUnit"
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
                            <option value="days">Days</option>
                            <option value="weeks">Weeks</option>
                            <option value="months">Months</option>
                          </Field>
                        </div>
                      </div>
                      <ErrorMessage
                        name="duration"
                        component="div"
                        style={{
                          color: "#e53935",
                          fontSize: "13px",
                          marginTop: "6px",
                        }}
                      />
                    </div>
                  </div>

                  {/* Row 5: Count/Batch Size & Category */}
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      flexWrap: "wrap",
                      width: "100%",
                    }}
                  >
                    {values.type === "upskilling" ? (
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
                          Count <span style={{ color: "red" }}>*</span>
                        </label>
                        <Field
                          type="text"
                          id="count"
                          name="count"
                          placeholder="Enter Count"
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
                          name="count"
                          component="div"
                          style={{
                            color: "#e53935",
                            fontSize: "13px",
                            marginTop: "6px",
                          }}
                        />
                      </div>
                    ) : values.type === "fresher" ? (
                      <div style={{ flex: "1 1 300px", minWidth: "0" }}>
                        <label
                          htmlFor="batch_size"
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
                          id="batch_size"
                          name="batch_size"
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
                          name="batch_size"
                          component="div"
                          style={{
                            color: "#e53935",
                            fontSize: "13px",
                            marginTop: "6px",
                          }}
                        />
                      </div>
                    ) : (
                      <div style={{ flex: "1 1 300px", minWidth: "0" }}>
                        <label
                          htmlFor="batch_size"
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
                          id="batch_size"
                          name="batch_size"
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
                          name="batch_size"
                          component="div"
                          style={{
                            color: "#e53935",
                            fontSize: "13px",
                            marginTop: "6px",
                          }}
                        />
                      </div>
                    )}
                    <div style={{ flex: "1 1 300px", minWidth: "0" }}>
                      <label
                        htmlFor="category"
                        style={{
                          display: "block",
                          fontSize: "15px",
                          fontWeight: "500",
                          color: "#333",
                          marginBottom: "8px",
                        }}
                      >
                        Category <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        id="category"
                        name="category"
                        disabled={loading}
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
                        value={selectedCategory || ""}
                        onChange={handleCategoryChange}
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.category_name}
                          </option>
                        ))}
                      </select>
                      <ErrorMessage
                        name="category"
                        component="div"
                        style={{
                          color: "#e53935",
                          fontSize: "13px",
                          marginTop: "6px",
                        }}
                      />
                    </div>
                  </div>

                  {/* Row 6: Course */}
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
                      <select
                        id="course"
                        name="course"
                        disabled={loading}
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
                        value={selectedCourse || ""}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                      >
                        <option value="">Select Course</option>
                        {filteredCourses.map((course) => (
                          <option key={course._id} value={course._id}>
                            {course.course_name}
                          </option>
                        ))}
                      </select>
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

                  {/* Row 7: Enquiry Textarea */}
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
                          borderRadius: "0.7em",
                          boxShadow: "0.1em 0.1em 0.6em 0.2em #f2775e",
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
              )}
            </Formik>
          </div>
        </div>
        <Modal
          isOpen={showSuccess}
          onClose={() => {
            setShowSuccess(false);
            resetForm();
          }}
          message="Contact us soon! Your form has been submitted successfully!"
        />
      </div>
    </div>
  );
}
