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

// Styles
const styles = {
  container: {
    fontFamily: "'Inter', sans-serif",
    padding: "10px",
    maxWidth: "800px",
    margin: "0 auto"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "5px"
  },
  overlay: {
    padding: "10px",
    maxWidth: "800px",
    margin: "0 auto"
  },

  closeBtn: {
    position: "absolute",
    top: "15px",
    right: "15px",
    border: "none",
    background: "none",
    fontSize: "22px",
    cursor: "pointer",
    color: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: "500",
    fontSize: "28px",
    letterSpacing: "0",
    lineHeight: "1.5em",
    paddingBottom: "15px",
    position: "relative",
    display: "inline-block",
    color: "#5b2c6f",
    marginBottom: "18px",
  },
  headingUnderline: {
    content: '""',
    position: "absolute",
    left: "0",
    bottom: "0",
    height: "5px",
    width: "55px",
    backgroundColor: "#5b2c6f",
  },
  headingThinLine: {
    content: '""',
    position: "absolute",
    left: "0",
    bottom: "2px",
    height: "1px",
    width: "95%",
    maxWidth: "255px",
    backgroundColor: "#5b2c6f",
  },
  fieldContainer: {
    marginBottom: "16px"
  },
  inputWrapper: {
    position: "relative",
    borderRadius: "8px",
    border: "1px solid #5b2c6f",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    transition: "all 0.3s ease"
  },
  inputWrapperFocused: {
    borderColor: "#f2775e"
  },
  inputIcon: {
    marginLeft: "12px",
    color: "#666",
    display: "flex",
    alignItems: "center"
  },
  inputIconFocused: {
    color: "#f2775e"
  },
  inputField: {
    width: "100%",
    padding: "10px 12px 6px 12px",
    fontSize: "12px",
    border: "none",
    backgroundColor: "transparent",
    outline: "none",
    borderRadius: "8px"
  },
  inputLabel: {
    position: "absolute",
    left: "40px",
    top: "10px",
    fontSize: "12px",
    color: "#666",
    backgroundColor: "#f9f9f9",
    padding: "0 4px",
    transition: "all 0.3s ease",
    pointerEvents: "none"
  },
  inputLabels: {
    position: "absolute",
    left: "40px",
    top: "10px",
    fontSize: "12px",
    color: "#666",
    backgroundColor: "#f9f9f9",
    padding: "0 4px",
    transition: "all 0.3s ease",
    marginLeft: "-30px",
    pointerEvents: "none"
  },
  inputLabelFloated: {
    top: "-8px",
    fontSize: "12px",
    color: "#f2775e",
    // marginLeft: "-30px"
  },
  errorMessage: {
    color: "#e53935",
    fontSize: "13px",
    marginTop: "6px"
  },
  selectWrapper: {
    position: "relative",
    width: "100%"
  },
  selectArrow: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#666",
    pointerEvents: "none"
  },
  selectArrowFocused: {
    color: "#f2775e"
  },
  textareaWrapper: {
    position: "relative",
    width: "100%"
  },
  textareaField: {
    width: "100%",
    padding: "20px 12px 6px 12px",
    fontSize: "15px",
    border: "none",
    backgroundColor: "transparent",
    outline: "none",
    borderRadius: "8px",
    resize: "vertical",
    minHeight: "90px"
  },
  textareaIcon: {
    marginLeft: "12px",
    marginTop: "12px",
    color: "#666",
    display: "flex",
    alignItems: "center"
  },
  textareaIconFocused: {
    color: "#f2775e"
  },
  submitButton: {
    background: "#f2775e",
    color: "white",
    padding: "0.35em 1.2em 0.35em 1.2em",
    fontSize: "12px",
    fontWeight: "500",
    borderRadius: "0.9em",
    border: "none",
    letterSpacing: "0.05em",
    display: "flex",
    alignItems: "center",
    boxShadow: "inset 0 0 1.6em -0.6em #f2775e",
    overflow: "hidden",
    position: "relative",
    height: "2.8em",
    paddingRight: "3.3em",
    cursor: "pointer",
    transition: "transform 0.2s ease, opacity 0.2s ease",
    opacity: "1",
    marginTop: "24px",
    alignSelf: "flex-end"
  },
  submitButtonDisabled: {
    opacity: "0.8",
    cursor: "default"
  },
  submitIcon: {
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
    transition: "all 0.3s"
  },
  otherCourseField: {
    marginTop: "10px"
  }
};

// Validation patterns
const VALIDATION_PATTERNS = {
  name: /^[a-zA-Z\s]+$/,
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
    business_service: "",
    service: "",
    otherCourse: "",
    message: ""
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

  // Form validation
  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!VALIDATION_PATTERNS.email.test(values.email)) {
      errors.email = "Invalid email format";
    }
    if (!values.phone) {
      errors.phone = "Phone number is required";
    } else if (!VALIDATION_PATTERNS.phone.test(values.phone)) {
      errors.phone = "Phone number must be exactly 10 digits";
    }
    if (!values.business_service) {
      errors.business_service = "Business service is required";
    }
    if (!values.service && !values.otherCourse) {
      errors.service = "Course selection is required";
    }
    if (values.service === "Other" && !values.otherCourse) {
      errors.otherCourse = "Please specify the course";
    }
    if (!values.message) {
      errors.message = "Message is required";
    }

    return errors;
  };

  // Form submission handler
  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    // Prepare submission data
    const submissionData = {
      ...values,
      // If "Other" is selected, use the otherCourse value
      service: values.service === "Other" ? values.otherCourse : values.service
    };

    try {
      await dispatch(submitEnquiry(submissionData)).unwrap();
    } catch (error) {
      const errorMessage = error.response?.data?.message[0]?.value ||
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
    values = {},
    ...props
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = values[name]; // Check if the field has a value

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
    values = {},
    setFieldValue,
    onChange,
    ...props
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = values[name]; // Check if the field has a value

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
              onChange={(e) => {
                if (onChange) {
                  onChange(e);
                }
                setFieldValue(name, e.target.value);

                // For service dropdown, check if "Other" is selected
                if (name === "service" && e.target.value === "Other") {
                  setShowOtherCourse(true);
                } else if (name === "service") {
                  setShowOtherCourse(false);
                  setFieldValue("otherCourse", "");
                }
              }}
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
              {name === "service" && <option value="Other">Other (Please specify)</option>}
            </Field>
            <label style={{
              ...styles.inputLabels,
              left: Icon ? "40px" : "12px",
              ...((isFocused || hasValue) ? styles.inputLabelFloated : {}) // Apply floated style when focused or has value
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
    values = {},
    ...props
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = values[name]; // Check if the field has a value

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
      >
        {({ values, setFieldValue }) => (
          <Form style={styles.form}>
            {/* Name */}
            <FloatingInput
              icon={PersonIcon}
              type="text"
              name="name"
              label="Your Name"
              values={values}
            />

            {/* Email */}
            <FloatingInput
              icon={EmailIcon}
              type="email"
              name="email"
              label="Your Email"
              values={values}
            />

            {/* Phone */}
            <FloatingInput
              icon={PhoneIcon}
              type="tel"
              name="phone"
              label="Your Phone"
              values={values}
            />

            {/* Category dropdown */}
            <FloatingSelect
              icon={BusinessIcon}
              name="business_service"
              label="Select Category"
              options={categories || []}
              setFieldValue={setFieldValue}
              values={values} // Pass the values prop
              onChange={(e) => {
                const selectedBusinessServiceId = e.target.value;

                if (selectedBusinessServiceId && courses && courses.length > 0) {
                  const relatedServices = courses.filter(
                    (service) =>
                      service.category &&
                      (service.category._id === selectedBusinessServiceId ||
                        service.category === selectedBusinessServiceId)
                  );

                  setFilteredServices(relatedServices);
                } else {
                  setFilteredServices([]);
                }

                // Reset service and otherCourse when category changes
                setFieldValue("service", "");
                setFieldValue("otherCourse", "");
                setShowOtherCourse(false);
              }}
            />

            {/* Course dropdown (conditionally rendered) */}
            {values.business_service && (
              <FloatingSelect
                icon={CategoryIcon}
                name="service"
                label="Select Course"
                options={filteredServices || []}
                values={values} // Pass the values prop here too
                setFieldValue={setFieldValue}
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
                />
              </div>
            )}

            {/* Message */}
            <FloatingTextarea
              icon={MessageIcon}
              name="message"
              label="Your Message"
              values={values}
            />

            {/* Submit Button */}
            <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  ...styles.submitButton,
                  ...(isSubmitting ? styles.submitButtonDisabled : {})
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
                <span style={styles.submitIcon}>
                  <ArrowForwardIcon style={{ color: "#f2775e" }} />
                </span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}