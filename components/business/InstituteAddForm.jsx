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
import EngineeringIcon from "@mui/icons-material/Engineering";
import InventoryIcon from "@mui/icons-material/Inventory";
import { createInstitute } from "@/redux/slices/hiring/institute/institute";

import { styles } from "./formStyle";

export default function InstitutionAddForm({ setShowModal, hireFromUsData }) {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.hirefromus.formData);
  const courses = useSelector((state) => state.courses.courses);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Process availabilities data
  const TRAINEE_MODELS = hireFromUsData.map((i) => i.title);

  const initialValues = {
    ...formData,
    services: [
      {
        traineeModel: "",
        resources: "",
        otherModel: "",
        otherModelFocused: false,
      },
    ],
  };

  // Validation patterns
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

      case "institute_name":
        if (!value) {
          error = "Institution name is required";
        } else if (!VALIDATION_PATTERNS.name.test(value)) {
          error = "Invalid institute name";
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

      default:
        if (name.startsWith("services")) {
          // Parse index and field from name (e.g., services[0].traineeModel)
          const matches = name.match(/services\[(\d+)\]\.(.+)/);
          if (matches) {
            const [, index, field] = matches;

            if (field === "traineeModel") {
              if (!value) {
                error = "Trainee model is required";
              } else if (
                value === "Other" &&
                (!values.services[index].otherModel ||
                  values.services[index].otherModel.trim() === "")
              ) {
                error = "Please specify the other model";
              }
            } else if (field === "otherModel") {
              if (
                values.services[index].traineeModel === "Other" &&
                (!value || value.trim() === "")
              ) {
                error = "Please specify the other model";
              }
            } else if (field === "resources") {
              if (!value) {
                error = "No Of Resources is required";
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

  // Form validation
  const validate = (values) => {
    const errors = {};

    // Basic field validations
    const fieldNames = ["name", "institute_name", "mobile", "email", "enquiry"];

    fieldNames.forEach((fieldName) => {
      const error = validateField(fieldName, values[fieldName], values);
      if (error) errors[fieldName] = error;
    });

    // Validate services
    if (values.services && values.services.length > 0) {
      const serviceErrors = [];
      values.services.forEach((service, index) => {
        const serviceError = {};

        const traineeModelError = validateField(
          `services[${index}].traineeModel`,
          service.traineeModel,
          values
        );
        if (traineeModelError) serviceError.traineeModel = traineeModelError;

        const resourcesError = validateField(
          `services[${index}].resources`,
          service.resources,
          values
        );
        if (resourcesError) serviceError.resources = resourcesError;

        if (service.traineeModel === "Other") {
          const otherModelError = validateField(
            `services[${index}].otherModel`,
            service.otherModel,
            values
          );
          if (otherModelError) serviceError.otherModel = otherModelError;
        }

        if (Object.keys(serviceError).length > 0) {
          serviceErrors[index] = serviceError;
        }
      });

      if (serviceErrors.length > 0) {
        errors.services = serviceErrors;
      }
    }

    return errors;
  };

  // Form submission handler
  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      // Map the services to match the backend schema
      const processedServices = values.services.map((req) => ({
        service:
          req.traineeModel === "Other" ? req.otherModel : req.traineeModel,
        resources: parseInt(req.resources, 10),
      }));

      const formDataWithCourseId = {
        name: values.name,
        institute_name: values.institute_name,
        mobile: values.mobile,
        email: values.email,
        enquiry: values.enquiry,
        services: processedServices, // Send the processed services
      };

      const response = await dispatch(createInstitute(formDataWithCourseId));

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
      setIsSubmitting(false);
    }
  };

  // Custom form components
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

  // Inside the FloatingSelect component:
  const FloatingSelect = ({
    icon: Icon,
    label,
    name,
    options,
    values,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    index,
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    // Fix to match the actual path used in the form
    const hasSelectedValue =
      index !== undefined
        ? values?.services?.[index]?.traineeModel
        : values?.[name];

    const handleChange = (e) => {
      const selectedValue = e.target.value;
      setFieldValue(name, selectedValue);

      // If not "Other", clear otherModel field if it exists
      if (selectedValue !== "Other" && index !== undefined) {
        setFieldValue(`services.${index}.otherModel`, "");
      }

      // Validate on change
      const error = validateField(name, selectedValue, values);
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
              <option value="">Select {label}</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
              <option value="Other">Other (Please specify)</option>
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
    const hasValue = values?.services?.[props.index]?.resources !== "";

    const handleChange = (e) => {
      const value = e.target.value;
      setFieldValue(name, value);

      // Validate on change
      const error = validateField(
        `services[${props.index}].resources`,
        value,
        values
      );
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

  const OtherModelInput = ({
    icon: Icon,
    label,
    name,
    values,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    index,
    ...props
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = values?.services?.[index]?.otherModel || false;

    const handleChange = (e) => {
      const value = e.target.value;
      setFieldValue(name, value);

      // Validate on change
      const error = validateField(
        `services[${index}].otherModel`,
        value,
        values
      );
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
            type="text"
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
        {({ values, setFieldValue, setFieldError, setFieldTouched }) => (
          <Form style={styles.form}>
            {/* Institution Name */}
            <FloatingInput
              icon={BusinessIcon}
              type="text"
              name="institute_name"
              label="Institution Name"
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
              label="Contact number"
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

            <FieldArray name="services">
              {({ push, remove }) => {
                const canAddMoreSkillsets = (() => {
                  const lastSkillset =
                    values.services[values.services.length - 1];

                  // Check if traineeModel is selected and resources is provided
                  return (
                    lastSkillset.traineeModel &&
                    lastSkillset.resources &&
                    parseInt(lastSkillset.resources) > 0
                  );
                })();

                return (
                  <div>
                    {values.services.map((req, index) => (
                      <div key={index} style={styles.skillsetRow}>
                        {/* Trainee Model Dropdown */}
                        <div style={styles.skillsetField}>
                          <FloatingSelect
                            icon={ModelTrainingIcon}
                            name={`services.${index}.traineeModel`}
                            label="Model"
                            options={TRAINEE_MODELS}
                            values={values}
                            setFieldValue={setFieldValue}
                            setFieldError={setFieldError}
                            setFieldTouched={setFieldTouched}
                            index={index}
                          />
                        </div>

                        {/* Other Trainee Model Input */}
                        {req.traineeModel === "Other" && (
                          <div style={styles.otherSkillsetField}>
                            <OtherModelInput
                              icon={AssignmentIndIcon}
                              name={`services.${index}.otherModel`}
                              label="Other Model Type"
                              values={values}
                              setFieldValue={setFieldValue}
                              setFieldError={setFieldError}
                              setFieldTouched={setFieldTouched}
                              index={index}
                            />
                          </div>
                        )}

                        {/* Resources Input */}
                        <div style={styles.resourcesField}>
                          <ResourceInput
                            icon={InventoryIcon}
                            name={`services.${index}.resources`}
                            label="No of Resources"
                            values={values}
                            setFieldValue={setFieldValue}
                            setFieldError={setFieldError}
                            setFieldTouched={setFieldTouched}
                            index={index}
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
                      onClick={() => push({ traineeModel: "", resources: "" })}
                      style={{
                        ...styles.addMoreButton,
                        opacity: canAddMoreSkillsets ? 1 : 0.5,
                        cursor: canAddMoreSkillsets ? "pointer" : "not-allowed",
                      }}
                      disabled={!canAddMoreSkillsets}
                    >
                      <AddIcon fontSize="small" /> Add Another Model
                    </button>
                  </div>
                );
              }}
            </FieldArray>

            {/* Enquiry Textarea */}
            <FloatingTextarea
              icon={SendIcon}
              name="enquiry"
              label="Please describe your enquiry requirements..."
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
