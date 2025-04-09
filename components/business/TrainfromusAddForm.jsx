import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { submitForm } from "@/redux/slices/hirefromus/Hirefromus";
import { fetchCourses } from "@/redux/slices/course/course";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// MUI Icons
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SendIcon from "@mui/icons-material/Send";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import InventoryIcon from "@mui/icons-material/Inventory";
import { createTrainFromUs } from "@/redux/slices/hiring/trainFromUs/trainFromus";

import { styles } from "./formStyle";

export default function TrainFromUsAddForm({ hireFromUsData, setShowModal }) {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.hirefromus.formData);
  const [isSubmitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const TRAINEE_MODELS = hireFromUsData.map((i) => i.title);

  const initialValues = {
    ...formData,
    resourceRequirements: [{ resources: "" }],
    traineeModel: "",
    otherTraineeModel: "",
  };

  const VALIDATION_PATTERNS = {
    name: /^[A-Za-z]+(?: [A-Za-z]+)*$/, // First letter capital, allows letters, spaces, and periods
    phone: /^[6-9]\d{0,9}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  };

  // Single field validation function
  const validateField = (name, value, values) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value) {
          error = "Contact person is required";
        } else if (!VALIDATION_PATTERNS.name.test(value)) {
          error = "Only contain letters, spaces, and periods";
        }
        break;

      case "company_name":
        if (!value) {
          error = "Company name is required";
        } else if (!VALIDATION_PATTERNS.name.test(value)) {
          error = "Invalid company name";
        }
        break;

      case "mobile":
        if (!value) {
          error = "Mobile number is required";
        } else if (!VALIDATION_PATTERNS.phone.test(value)) {
          error = "Invalid mobile number";
        }
        break;

      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!VALIDATION_PATTERNS.email.test(value)) {
          error = "Invalid email address";
        }
        break;

      case "enquiry":
        if (!value) {
          error = "Enquiry is required";
        }
        break;

      case "traineeModel":
        if (!value) {
          error = "Trainee model is required";
        } else if (
          value === "Other" &&
          (!values.otherTraineeModel || values.otherTraineeModel.trim() === "")
        ) {
          error = "Please specify the trainee model";
        }
        break;

      case "otherTraineeModel":
        if (
          values.traineeModel === "Other" &&
          (!value || value.trim() === "")
        ) {
          error = "Please specify the trainee model";
        }
        break;

      default:
        if (name.startsWith("resourceRequirements")) {
          // Parse index and field from name (e.g., resourceRequirements[0].resources)
          const matches = name.match(/resourceRequirements\[(\d+)\]\.(.+)/);
          if (matches) {
            const [, index, field] = matches;

            if (field === "resources") {
              if (!value) {
                error = "Resources is required";
              } else if (isNaN(value) || parseInt(value) <= 0) {
                error = "Please enter a valid number of resources";
              }
            }
          }
        }
        break;
    }

    return error;
  };

  // Full form validation (still needed for submit)
  const validate = (values) => {
    const errors = {};

    // Validate standard fields
    const fieldNames = [
      "name",
      "company_name",
      "mobile",
      "email",
      "enquiry",
      "traineeModel",
      "otherTraineeModel",
    ];

    fieldNames.forEach((fieldName) => {
      const error = validateField(fieldName, values[fieldName], values);
      if (error) errors[fieldName] = error;
    });

    // Resources requirements validation
    values.resourceRequirements.forEach((req, index) => {
      const resourcesError = validateField(
        `resourceRequirements[${index}].resources`,
        req.resources,
        values
      );

      if (resourcesError) {
        errors.resourceRequirements = errors.resourceRequirements || [];
        errors.resourceRequirements[index] = {
          ...(errors.resourceRequirements[index] || {}),
          resources: resourcesError,
        };
      }
    });

    return errors;
  };

  // Form submission handler
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    try {
      const processedResources = values.resourceRequirements.map((req) => ({
        resources: parseInt(req.resources, 10),
      }));

      const formDataToSubmit = {
        company_name: values.company_name,
        name: values.name,
        mobile: values.mobile,
        email: values.email,
        resourceRequirements: processedResources,
        enquiry: values.enquiry,
        trainee_modal:
          values.traineeModel === "Other"
            ? values.otherTraineeModel
            : values.traineeModel,
      };

      const response = await dispatch(createTrainFromUs(formDataToSubmit));
      if (response.payload.message[0].key === "success") {
        setShowSuccess(true);
        toast.success("Form submitted successfully!");
        setTimeout(() => {
          setShowModal(false);
        }, 3000);
      } else {
        toast.error(response.payload.message[0].value);
      }

    } catch (error) {
      const errorMessage =
        error.response?.data?.message[0]?.value ||
        error.message ||
        "An error occurred while submitting the form";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

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
        <div
          style={{
            ...styles.inputWrapper,
            ...(isFocused ? styles.inputWrapperFocused : {}),
          }}
        >
          {Icon && (
            <div
              style={{
                ...styles.inputIcon,
                ...(isFocused ? styles.inputIconFocused : {}),
              }}
            >
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
          <label
            style={{
              ...styles.inputLabel,
              left: Icon ? "40px" : "12px",
              ...(isFocused || hasValue ? styles.inputLabelFloated : {}),
            }}
          >
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
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasSelectedValue = values?.[name];

    const handleChange = (e) => {
      const selectedValue = e.target.value;
      setFieldValue(name, selectedValue);

      // If not "Other", clear otherTraineeModel field
      if (selectedValue !== "Other") {
        setFieldValue("otherTraineeModel", "");
      }

      // Validate on change
      const error = validateField(name, selectedValue, values);
      setFieldError(name, error);
      setFieldTouched(name, true, false);
    };

    return (
      <div style={styles.fieldContainers}>
        <div
          style={{
            ...styles.inputWrapper,
            ...(isFocused ? styles.inputWrapperFocused : {}),
          }}
        >
          {Icon && (
            <div
              style={{
                ...styles.inputIcon,
                ...(isFocused ? styles.inputIconFocused : {}),
              }}
            >
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
                paddingRight: "40px",
              }}
            >
              <option value="">{label}</option>
              {options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
              <option value="Other">Other</option>
            </Field>
            {hasSelectedValue && (
              <label
                style={{
                  ...styles.inputLabel,
                  left: Icon ? "10px" : "12px",
                  ...styles.inputLabelFloated,
                }}
              >
                {label}
              </label>
            )}
            <div
              style={{
                ...styles.selectArrow,
                ...(isFocused ? styles.selectArrowFocused : {}),
              }}
            >
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
      <div style={styles.fieldContainers}>
        <div
          style={{
            ...styles.inputWrapper,
            ...(isFocused ? styles.inputWrapperFocused : {}),
            alignItems: "flex-start",
          }}
        >
          {Icon && (
            <div
              style={{
                ...styles.textareaIcon,
                ...(isFocused ? styles.textareaIconFocused : {}),
              }}
            >
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
            <label
              style={{
                ...styles.inputLabel,
                left: Icon ? "10px" : "12px",
                ...(isFocused || hasValue ? styles.inputLabelFloated : {}),
              }}
            >
              {label}
            </label>
          </div>
        </div>
        <ErrorMessage name={name} component="div" style={styles.errorMessage} />
      </div>
    );
  };

  const ResourceInput = ({
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
    const hasValue =
      values?.resourceRequirements?.[props.index]?.resources !== "";

    const handleChange = (e) => {
      const value = e.target.value;
      setFieldValue(name, value);

      // Validate on change
      const error = validateField(
        `resourceRequirements[${props.index}].resources`,
        value,
        values
      );
      setFieldError(`resourceRequirements[${props.index}].resources`, error);
      setFieldTouched(
        `resourceRequirements[${props.index}].resources`,
        true,
        false
      );
    };

    return (
      <div style={styles.fieldContainer}>
        <div
          style={{
            ...styles.inputWrapper,
            ...(isFocused ? styles.inputWrapperFocused : {}),
          }}
        >
          {Icon && (
            <div
              style={{
                ...styles.inputIcon,
                ...(isFocused ? styles.inputIconFocused : {}),
              }}
            >
              <Icon fontSize="small" />
            </div>
          )}
          <div style={styles.textareaWrapper}>
            <Field
              type="number"
              name={name}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={handleChange}
              style={styles.inputField}
              min="1"
              {...props}
            />
            <label
              style={{
                ...styles.inputLabel,
                left: Icon ? "10px" : "12px",
                ...(hasValue ? styles.inputLabelFloated : {}),
              }}
            >
              {label}
            </label>
          </div>
        </div>
        <ErrorMessage name={name} component="div" style={styles.errorMessage} />
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({
          isSubmitting,
          values,
          setFieldValue,
          setFieldError,
          setFieldTouched,
        }) => (
          <Form style={styles.form}>
            {/* Company Name */}
            <FloatingInput
              icon={BusinessIcon}
              type="text"
              name="company_name"
              label="Company Name"
              values={values}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
              setFieldTouched={setFieldTouched}
            />

            {/* Name */}
            <FloatingInput
              icon={PersonIcon}
              type="text"
              name="name"
              label="Contact Person Name"
              values={values}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
              setFieldTouched={setFieldTouched}
            />

            {/* Mobile Number */}
            <FloatingInput
              icon={PhoneIcon}
              type="text"
              name="mobile"
              label="Contact Number"
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
              label="Contact Email"
              values={values}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
              setFieldTouched={setFieldTouched}
            />

            {/* Trainee Model */}
            <div>
              <FloatingSelect
                icon={ModelTrainingIcon}
                name="traineeModel"
                label="Trainee Model"
                options={TRAINEE_MODELS}
                values={values}
                setFieldValue={setFieldValue}
                setFieldError={setFieldError}
                setFieldTouched={setFieldTouched}
              />

              {/* Conditional Other Trainee Model Input */}
              {values.traineeModel === "Other" && (
                <div style={styles.otherModelField}>
                  <FloatingInput
                    icon={AssignmentIndIcon}
                    type="text"
                    name="otherTraineeModel"
                    label="Specify Other Trainee Model"
                    values={values}
                    setFieldValue={setFieldValue}
                    setFieldError={setFieldError}
                    setFieldTouched={setFieldTouched}
                  />
                </div>
              )}
            </div>

            {/* Resources Requirements */}
            <FieldArray name="resourceRequirements">
              {({ push, remove }) => {
                const canAddMoreResources = (() => {
                  const lastResource =
                    values.resourceRequirements[
                    values.resourceRequirements.length - 1
                    ];
                  return (
                    lastResource.resources &&
                    parseInt(lastResource.resources) > 0
                  );
                })();

                return (
                  <div>
                    {values.resourceRequirements.map((req, index) => (
                      <div key={index} style={styles.resourcesRow}>
                        {/* Resources Input */}
                        <div style={styles.resourcesField}>
                          <ResourceInput
                            icon={InventoryIcon}
                            name={`resourceRequirements.${index}.resources`}
                            label="Resources"
                            values={values}
                            index={index}
                            setFieldValue={setFieldValue}
                            setFieldError={setFieldError}
                            setFieldTouched={setFieldTouched}
                          />
                        </div>

                        {/* Remove Button */}
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            style={styles.removeButton}
                          >
                            <DeleteIcon fontSize="small" />
                            Delete
                          </button>
                        )}
                      </div>
                    ))}

                    {/* Add More Button with Conditional Disabled State */}
                    <button
                      type="button"
                      onClick={() => push({ resources: "" })}
                      style={{
                        ...styles.addMoreButton,
                        opacity: canAddMoreResources ? 1 : 0.5,
                        cursor: canAddMoreResources ? "pointer" : "not-allowed",
                      }}
                      disabled={!canAddMoreResources}
                    >
                      <AddIcon fontSize="small" /> Add Another Resource
                    </button>
                  </div>
                );
              }}
            </FieldArray>

            {/* Enquiry Textarea */}
            <FloatingTextarea
              icon={SendIcon}
              name="enquiry"
              label="Please describe your hiring requirements..."
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
    </div>
  );
}
