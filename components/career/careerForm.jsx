"use client";
import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
  Grade as GradeIcon,
  FileUpload as FileUploadIcon,
  Wc as WcIcon
} from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobPositions,
  selectJobPositions,
} from "@/redux/slices/joinUs/joinus";
import { addCareerForm } from "@/redux/slices/career/careerForm";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
    gap: "15px"
  },
  fieldContainer: {
    marginBottom: "5px"
  },
  inputWrapper: {
    position: "relative",
    borderRadius: "8px",
    border: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    transition: "all 0.3s ease"
  },
  inputWrapperFocused: {
    borderColor: "#F2775E"
  },
  inputIcon: {
    marginLeft: "12px",
    color: "#666",
    display: "flex",
    alignItems: "center"
  },
  inputIconFocused: {
    color: "#F2775E"
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
    left: "50px",
    top: "10px",
    fontSize: "12px",
    color: "#666",
    // backgroundColor: " #f9f9f9",
    padding: "0 13px",
    transition: "all 0.3s ease",
    pointerEvents: "none"
  },
  inputLabelFloated: {
    top: "-8px",
    fontSize: "12px",
    color: "#F2775E"
  },
  errorMessage: {
    color: "#e53935",
    fontSize: "13px",
    marginTop: "6px"
  },
  fileUploadContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px dashed #ddd",
    borderRadius: "8px",
    padding: "10px",
    marginTop: "10px"
  },
  submitButton: {
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
    overflow: "hidden",
    position: "relative",
    height: "2.8em",
    paddingRight: "3.3em",
    cursor: "pointer",
    transition: "transform 0.2s ease, opacity 0.2s ease",
    marginTop: "24px",
    alignSelf: "flex-end"
  },
  modalStyle: {
    backgroundColor: "#ffffff", // Changed to white
    padding: "25px",
    borderRadius: "12px",
    width: "420px",
    height: "89vh",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
    position: "relative",
    textAlign: "center",
    border: "2px solid #F2775E",
    overflowY: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  selectWrapper: {
    position: "relative",
    width: "100%",
  },
  selectArrow: {
    position: "absolute",
    right: "8px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#666",
    pointerEvents: "none"
  },
  selectArrowFocused: {
    color: "#F2775E"
  }
};

// Validation functions
const validateField = (name, value, values) => {
  let error = "";

  switch (name) {
    case "name":
      if (!value) {
        error = "Name is required";
      } else if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(value)) {
        error = "Only letters and a single space between names are allowed";
      }

      break;

    case "email":
      if (!value) {
        error = "Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        error = "Invalid email address";
      }
      break;

    case "phone":
      if (!value) {
        error = "Phone is required";
      } else if (!/^\d{10}$/.test(value)) {
        error = "Phone number must be 10 digits";
      }
      break;

    case "gender":
      if (!value) {
        error = "Gender is required";
      }
      break;

    case "job_position":
      if (!value) {
        error = "Job position is required";
      }
      break;

    case "qualification":
      if (!value) {
        error = "Qualification is required";
      }
      break;

    case "yearOfRelevantExperience":
      if (!value) {
        error = "Years of experience is required";
      }
      break;

    case "resume":
      if (!value) {
        error = "Resume is required";
      } else if (value.type !== 'application/pdf') {
        error = "Only PDF files are supported";
      } else if (value.size > 5 * 1024 * 1024) {
        error = "File size must be less than 5MB";
      }
      break;

    default:
      break;
  }

  return error;
};

// Floating Input Component
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
  const hasValue = values && values[name];

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

// Floating Select Component
const FloatingSelect = ({
  icon: Icon,
  label,
  name,
  options,
  values,
  setFieldValue,
  setFieldError,
  setFieldTouched,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasSelectedValue = values && values[name];

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setFieldValue(name, selectedValue);

    // Validate on change
    const error = validateField(name, selectedValue, values);
    setFieldError(name, error);
    setFieldTouched(name, true, false);
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
            <option value="" style={{color:"#666"}}>Select</option>
            {options && options.map((option) => (
              <option key={typeof option === 'string' ? option : option.job_position} value={typeof option === 'string' ? option : option.job_position}>
                {typeof option === 'string' ? option : option.job_position}
              </option>
            ))}
          </Field>
          <label style={{
            ...styles.inputLabel,
            left: Icon ? "40px" : "12px",
            ...((isFocused || hasSelectedValue) ? styles.inputLabelFloated : {})
          }}>
            {label}
          </label>
          <div style={{
            ...styles.selectArrow,
            ...(isFocused ? styles.selectArrowFocused : {})
          }}>
            {/* You can add an arrow icon here */}
          </div>
        </div>
      </div>
      <ErrorMessage name={name} component="div" style={styles.errorMessage} />
    </div>
  );
};

// File Upload Input Component
const FileUploadInput = ({
  name,
  values,
  setFieldValue,
  setFieldError,
  setFieldTouched,
  ...props
}) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFieldValue(name, file);

      // Validate on change
      const error = validateField(name, file, values);
      setFieldError(name, error);
      setFieldTouched(name, true, false);

      if (file.type !== 'application/pdf' || file.size > 5 * 1024 * 1024) {
        toast.error('Please upload a PDF file less than 5MB');
        return;
      }
    }
  };

  return (
    <div style={styles.fieldContainer}>
      <div style={styles.fileUploadContainer}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FileUploadIcon style={{ marginRight: '10px', color: '#F2775E' }} />
          <label>
            {fileName ? fileName : 'Upload Resume (PDF only)'}
            <input
              type="file"
              name={name}
              accept=".pdf"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              {...props}
            />
          </label>
        </div>
      </div>
      <ErrorMessage name={name} component="div" style={styles.errorMessage} />
    </div>
  );
};

export default function CareerEnquiryForm({ closeModal }) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const jobPositions = useSelector(selectJobPositions);

  useEffect(() => {
    dispatch(fetchJobPositions());
  }, [dispatch]);

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    gender: '',
    job_position: '',
    qualification: '',
    yearOfRelevantExperience: '',
    resume: null
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be 10 digits')
      .required('Phone is required'),
    gender: Yup.string().required('Gender is required'),
    job_position: Yup.string().required('Job position is required'),
    qualification: Yup.string().required('Qualification is required'),
    yearOfRelevantExperience: Yup.string().required('Years of experience is required'),
    resume: Yup.mixed()
      .required('Resume is required')
      .test('fileFormat', 'Only PDF files are supported',
        (value) => value && value.type === 'application/pdf')
      .test('fileSize', 'File size must be less than 5MB',
        (value) => value && value.size <= 5 * 1024 * 1024)
  });

  // Form validation - this will be used for validation on submit
  const validate = (values) => {
    const errors = {};
    const fieldNames = ["name", "email", "phone", "gender", "job_position", "qualification", "yearOfRelevantExperience", "resume"];

    fieldNames.forEach((fieldName) => {
      const error = validateField(fieldName, values[fieldName], values);
      if (error) errors[fieldName] = error;
    });

    return errors;
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });

      const response = await dispatch(addCareerForm(formData));

      if (addCareerForm.fulfilled.match(response)) {
        toast.success("Form submitted successfully!");
        setTimeout(() => {
          closeModal(false); // ✅ Close modal only on success
        }, 3000);
      } else {
        toast.error(response.payload[0]?.value || "An error occurred");
      }
    

    } catch (error) {
      const errorMessage = error.response?.data?.message[0]?.value || error.message || "An error occurred while submitting the form";
      toast.error(errorMessage);
    }

    finally {
     
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validate={validate}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ values, setFieldValue, setFieldError, setFieldTouched }) => (
          <Form style={styles.form}>
            <FloatingInput
              icon={PersonIcon}
              name="name"
              label="Full Name"
              values={values}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
              setFieldTouched={setFieldTouched}
            />

            <FloatingInput
              icon={EmailIcon}
              name="email"
              type="email"
              label="Email Address"
              values={values}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
              setFieldTouched={setFieldTouched}
            />

            <FloatingInput
              icon={PhoneIcon}
              name="phone"
              label="Phone Number"
              values={values}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
              setFieldTouched={setFieldTouched}
            />

            <FloatingSelect
              icon={WcIcon}
              name="gender"
              label="Gender"
              options={['Male', 'Female', 'Other']}
              values={values}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
              setFieldTouched={setFieldTouched}
            />

            <FloatingSelect
              icon={WorkIcon}
              name="job_position"
              label="Job Position"
              options={jobPositions}
              values={values}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
              setFieldTouched={setFieldTouched}
            />

            <FloatingInput
              icon={GradeIcon}
              name="qualification"
              label="Higher Qualification"
              values={values}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
              setFieldTouched={setFieldTouched}
            />

            <FloatingInput
              icon={WorkIcon}
              name="yearOfRelevantExperience"
              label="Years of Relevant Experience"
              values={values}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
              setFieldTouched={setFieldTouched}
            />

            <FileUploadInput
              name="resume"
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
                {isSubmitting ? "Submitting..." : "Submit Application"}
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
    </div>
  );
}