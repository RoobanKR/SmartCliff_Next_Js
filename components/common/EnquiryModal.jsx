"use client";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// MUI Icons
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CategoryIcon from '@mui/icons-material/Category';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { selectCategories } from "@/redux/slices/category/category";
import { styles } from "../business/formStyle"

// Validation patterns
const VALIDATION_PATTERNS = {
  name: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
  phone: /^\d{10}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
};

export default function EnquiryModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const services = useSelector(selectServices);
  const businessServices = useSelector(selectBusinessServices);
  const categories = useSelector(selectCategories);

  const courses = useSelector((state) => state.courses.courses);
  const { loading, error, success, enquiryData } = useSelector(selectEnquiry);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filteredServices, setFilteredServices] = useState([]);
  const [showOtherCourse, setShowOtherCourse] = useState(false);

  // Initial values for the form
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    category: "",
    courses: "",
    otherCourse: "",
    message: "",
    touched: {}
  };

  // Load data on component mount
  useEffect(() => {
    dispatch(getAllBusinessServices());
    dispatch(fetchServices());
  }, [dispatch]);

  // Handle success and error messages
  useEffect(() => {
    if (success && enquiryData) {
      const successMessage =
        enquiryData?.message?.[0]?.value ||
        enquiryData?.message ||
        "Our Team Will Respond Shortly";

      toast.success(successMessage);

      setTimeout(() => {
        onClose();
        dispatch(resetEnquiryState());
      }, 3000);
    }
  }, [success, enquiryData, dispatch, onClose]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Single field validation function
  const validateField = (name, value, values) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value) {
          error = "Name is required";
        } else if (!VALIDATION_PATTERNS.name.test(value)) {
          error = "Only letters and spaces are allowed";
        }
        break;

      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!VALIDATION_PATTERNS.email.test(value)) {
          error = "Invalid email format";
        }
        break;

      case "phone":
        if (!value) {
          error = "Phone number is required";
        } else if (!VALIDATION_PATTERNS.phone.test(value)) {
          error = "Phone number must be exactly 10 digits";
        }
        break;

      case "category":
        if (!value) {
          error = "Business courses is required";
        }
        break;

      // In your validate function, modify the courses validation logic
      case "courses":
        // Only show error if the category is selected AND the field is touched
        if (values.category && values.touched?.courses && !value && !values.otherCourse) {
          error = "Course selection is required";
        }
        break;

      case "otherCourse":
        if (values.courses === "Other" && !value) {
          error = "Please specify the course";
        }
        break;

      case "message":
        if (!value) {
          error = "Message is required";
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Form validation
  const validate = (values) => {
    const errors = {};
    const touched = values.touched || {};

    // Validate all fields
    const fieldNames = ["name", "email", "phone", "category", "courses", "otherCourse", "message"];

    fieldNames.forEach((fieldName) => {
      const error = validateField(fieldName, values[fieldName], values);
      if (error) errors[fieldName] = error;
    });
    Object.keys(touched).forEach(fieldName => {
      if (touched[fieldName]) {
        const error = validateField(fieldName, values[fieldName], values);
        if (error) errors[fieldName] = error;
      }
    });
    return errors;
  };

  // Form submission handler
  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    // Prepare submission data
    const submissionData = {
      ...values,
      // If "Other" is selected, use the otherCourse value
      courses: values.courses === "Other" ? values.otherCourse : values.courses
    };

    try {
      await dispatch(submitEnquiry(submissionData)).unwrap();

      toast.success("Form submitted successfully!");

      // ✅ Close modal only on success
      setTimeout(() => {
        onClose(false);
      }, 3000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message[0]?.value ||
        error.message ||
        "An error occurred while submitting the form";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };


  if (!isOpen) return null;

  const FloatingInput = ({
    icon: Icon,
    label,
    name,
    type = "text",
    values,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    ...props
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = values[name]; // Check if the field has a value

    const handleChange = (e) => {
      const selectedValue = e.target.value;
      setFieldValue(name, selectedValue);

      // Mark this field as touched
      setFieldValue('touched', {
        ...values.touched,
        [name]: true
      });

      // Rest of your existing code...

      // Don't mark dependent fields as touched when they're reset
      if (name === 'category') {
        setFieldValue("courses", "");
        setFieldValue("otherCourse", "");
        setShowOtherCourse(false);
        // Don't set courses as touched here
      }
    }

    return (
      <div style={styles.fieldContainer}>
        <div style={{
          ...styles.inputWrapper,
          ...(isFocused ? styles.inputWrapperFocused : {})
        }}>
          {Icon && (
            <div style={{
              ...styles.inputIcon,
              ...(isFocused ? styles.inputIconFocused : {})
            }}>
              <Icon fontSize="small" />
            </div>
          )}
          <Field
            type={type}
            name={name}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleChange}
            style={styles.inputField}
            {...props}
          />
          <label style={{
            ...styles.inputLabel,
            left: Icon ? "40px" : "12px",
            ...((isFocused || hasValue) ? styles.inputLabelFloated : {})
          }}>
            {label}
          </label>
        </div>
        <ErrorMessage name={name} component="div" style={styles.errorMessage} />
      </div>
    );
  };

  const FloatingSelect = ({
    icon: Icon,
    label,
    name,
    options,
    values,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    onChange,
    ...props
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = values[name]; // Check if the field has a value

    const handleChange = (e) => {
      const selectedValue = e.target.value;
      setFieldValue(name, selectedValue);

      // Validate on change
      const error = validateField(name, selectedValue, values);
      setFieldError(name, error);
      setFieldTouched(name, true, false);

      // If name is 'category', filter services
      if (name === 'category') {
        if (selectedValue && courses && courses.length > 0) {
          const relatedServices = courses.filter(
            (courses) =>
              courses.category &&
              (courses.category._id === selectedValue ||
                courses.category === selectedValue)
          );
          setFilteredServices(relatedServices);
        } else {
          setFilteredServices([]);
        }

        // Reset courses and otherCourse when category changes
        setFieldValue("courses", "");
        setFieldValue("otherCourse", "");
        setShowOtherCourse(false);
      }

      // For courses dropdown, check if "Other" is selected
      if (name === "courses") {
        if (selectedValue === "Other") {
          setShowOtherCourse(true);
        } else {
          setShowOtherCourse(false);
          setFieldValue("otherCourse", "");
        }
      }

      // Call custom onChange handler if provided
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div style={styles.fieldContainer}>
        <div style={{
          ...styles.inputWrapper,
          ...(isFocused ? styles.inputWrapperFocused : {})
        }}>
          {Icon && (
            <div style={{
              ...styles.inputIcon,
              ...(isFocused ? styles.inputIconFocused : {})
            }}>
              <Icon fontSize="small" />
            </div>
          )}
          <div style={styles.selectWrapper}>
            <Field
              as="select"
              name={name}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={handleChange}
              style={{
                ...styles.inputField,
                appearance: "none",
                paddingRight: "40px"
              }}
              {...props}
            >
              <option value="">{`${label}`}</option>
              {options && options.map((option) => (
                <option key={option._id || option.id} value={option._id || option.id}>
                  {option.course_name || option.category_name || "Unnamed"}
                </option>
              ))}
              {name === "courses" && <option value="Other">Other (Please specify)</option>}
            </Field>
            <label style={{
              ...styles.inputLabels,
              left: Icon ? "40px" : "12px",
              ...((isFocused || hasValue) ? styles.inputLabelFloated : {})
            }}>
              {label}
            </label>
            <div style={{
              ...styles.selectArrow,
              ...(isFocused ? styles.selectArrowFocused : {})
            }}>
              <KeyboardArrowDownIcon fontSize="small" />
            </div>
          </div>
        </div>
        <ErrorMessage name={name} component="div" style={styles.errorMessage} />
      </div>
    );
  };

  const FloatingTextarea = ({
    icon: Icon,
    label,
    name,
    values,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    ...props
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = values[name]; // Check if the field has a value

    const handleChange = (e) => {
      const value = e.target.value;
      setFieldValue(name, value);

      // Validate on change
      const error = validateField(name, value, values);
      setFieldError(name, error);
      setFieldTouched(name, true, false);
    };

    return (
      <div style={styles.fieldContainer}>
        <div style={{
          ...styles.inputWrapper,
          ...(isFocused ? styles.inputWrapperFocused : {}),
          alignItems: "flex-start"
        }}>
          {Icon && (
            <div style={{
              ...styles.textareaIcon,
              ...(isFocused ? styles.textareaIconFocused : {})
            }}>
              <Icon fontSize="small" />
            </div>
          )}
          <div style={styles.textareaWrapper}>
            <Field
              as="textarea"
              name={name}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={handleChange}
              style={styles.textareaField}
              {...props}
            />
            <label style={{
              ...styles.inputLabel,
              left: Icon ? "40px" : "12px",
              ...((isFocused || hasValue) ? styles.inputLabelFloated : {})
            }}>
              {label}
            </label>
          </div>
        </div>
        <ErrorMessage name={name} component="div" style={styles.errorMessage} />
      </div>
    );
  };

  return (
    <div style={styles.overlay}>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ values, setFieldValue, setFieldError, setFieldTouched }) => (
          <Form style={styles.form}>
            {/* Name */}
            <FloatingInput
              icon={PersonIcon}
              type="text"
              name="name"
              label="Your Name"
              values={values}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
              setFieldTouched={setFieldTouched}
            />

            {/* Email */}
            <FloatingInput
              icon={EmailIcon}
              type="email"
              name="email"
              label="Your Email"
              values={values}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
              setFieldTouched={setFieldTouched}
            />

            {/* Phone */}
            <FloatingInput
              icon={PhoneIcon}
              type="tel"
              name="phone"
              label="Your Phone"
              values={values}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
              setFieldTouched={setFieldTouched}
            />

            {/* Category dropdown */}
            <FloatingSelect
              icon={BusinessIcon}
              name="category"
              label="Select Category"
              options={categories || []}
              values={values}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
              setFieldTouched={setFieldTouched}
            />

            {/* Course dropdown (conditionally rendered) */}
            {values.category && (
              <FloatingSelect
                icon={CategoryIcon}
                name="courses"
                label="Select Course"
                options={filteredServices || []}
                values={values}
                setFieldValue={setFieldValue}
                setFieldError={setFieldError}
                setFieldTouched={setFieldTouched}
              />
            )}

            {/* Other Course input field (conditionally rendered) */}
            {showOtherCourse && (
              <div style={styles.otherCourseField}>
                <FloatingInput
                  icon={AssignmentIndIcon}
                  type="text"
                  name="otherCourse"
                  label="Specify Course"
                  values={values}
                  setFieldValue={setFieldValue}
                  setFieldError={setFieldError}
                  setFieldTouched={setFieldTouched}
                />
              </div>
            )}

            {/* Message */}
            <FloatingTextarea
              icon={MessageIcon}
              name="message"
              label="Your Message"
              values={values}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
              setFieldTouched={setFieldTouched}
            />

            {/* Submit Button */}
            <div
              style={{
                marginTop: "5px",
                display: "flex",
                justifyContent: "right",
                width: "100%",
              }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  background: "#F2775E",
                  color: "white",
                  padding: "0.35em 1.2em 0.35em 1.2em",
                  fontSize: "12px",
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
              >
                {isSubmitting ? "Submitting..." : "Get started"}
                <span
                  style={{
                    background: "white",
                    marginLeft: "50px",
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
                  <ArrowForwardIcon
                    style={{
                      color: "#f2775e",
                      transition: "transform 0.3s",
                    }}
                  />
                </span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div >
  );
}