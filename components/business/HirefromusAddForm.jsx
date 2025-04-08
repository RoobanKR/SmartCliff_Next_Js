import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { useDispatch, useSelector } from "react-redux";
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
import { getAPIURL } from "@/utils/utils";
import { submitForm } from "@/redux/slices/hirefromus/Hirefromus";

// Styles
const styles = {
  container: {
    fontFamily: "'Inter', sans-serif",
    padding: "10px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  fieldContainer: {
    // marginTop:"10px",
    marginBottom: "16px",
  },
  fieldContainers: {
    marginTop: "10px",
    marginBottom: "16px",
  },
  inputWrapper: {
    position: "relative",
    borderRadius: "8px",
    border: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    transition: "all 0.3s ease",
  },
  inputWrapperFocused: {
    borderColor: "#F2775E",
  },
  inputIcon: {
    marginLeft: "12px",
    color: "#666",
    display: "flex",
    alignItems: "center",
  },
  inputIconFocused: {
    color: "#F2775E",
  },
  inputField: {
    width: "100%",
    padding: "10px 12px 6px 12px",
    fontSize: "12px",
    border: "none",
    backgroundColor: "transparent",
    outline: "none",
    borderRadius: "8px",
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
    pointerEvents: "none",
  },
  inputLabelFloated: {
    top: "-8px",
    fontSize: "12px",
    color: "#F2775E",
  },
  errorMessage: {
    color: "#e53935",
    fontSize: "13px",
    marginTop: "6px",
  },
  skillsetRow: {
    gap: "10px",
    marginBottom: "16px",
    alignItems: "flex-start",
  },
  skillsetField: {
    flex: 2,
  },
  resourcesField: {
    flex: 1,
    marginTop: "15px",
  },
  otherSkillsetField: {
    flex: 2,
    marginTop: "10px",
  },
  otherSkillsetInput: {
    display: "flex",
    alignItems: "center",
  },
  otherSkillsetIcon: {
    marginRight: "10px",
    color: "#666",
  },
  otherSkillsetText: {
    width: "100%",
    padding: "7px 15px",
    fontSize: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    outline: "none",
    backgroundColor: "#f9f9f9",
  },
  removeButton: {
    background: "none",
    border: "none",
    color: "#f44336",
    cursor: "pointer",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  addMoreButton: {
    display: "flex",
    alignItems: "center",
    background: "rgba(61, 61, 231, 0.74)",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "10px",
    gap: "8px",
    marginTop: "10px",
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
    boxShadow: "inset 0 0 1.6em -0.6em #F2775E",
    overflow: "hidden",
    position: "relative",
    height: "2.8em",
    paddingRight: "3.3em",
    cursor: "pointer",
    transition: "transform 0.2s ease, opacity 0.2s ease",
    opacity: "1",
    marginTop: "24px",
    alignSelf: "flex-end",
  },
  submitButtonDisabled: {
    opacity: "0.8",
    cursor: "default",
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
    transition: "all 0.3s",
  },
  selectWrapper: {
    position: "relative",
    width: "100%",
  },
  selectArrow: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#666",
    pointerEvents: "none",
  },
  selectArrowFocused: {
    color: "#2196f3",
  },
  textareaWrapper: {
    position: "relative",
    width: "100%",
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
    minHeight: "120px",
  },
  textareaIcon: {
    marginLeft: "12px",
    marginTop: "12px",
    color: "#666",
    display: "flex",
    alignItems: "center",
  },
  textareaIconFocused: {
    color: "#2196f3",
  },
};

// Validation patterns
const VALIDATION_PATTERNS = {
  name: /^[a-zA-Z\s]+$/,
  phone: /^[6-9]\d{0,9}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

export default function HireFromUsForm({ availabilities, setShowModal }) {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.hirefromus.formData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Process availabilities data
  const skillsetsMap = availabilities.reduce((acc, item) => {
    if (!acc[item.skillset]) {
      acc[item.skillset] = [];
    }
    acc[item.skillset].push({
      name: item.resources,
      count: parseInt(item.resources) || 0,
    });
    return acc;
  }, {});

  const skillsets = Object.keys(skillsetsMap);

  const initialValues = {
    ...formData,
    skillsetRequirements: [
      {
        skillset: "",
        resources: "",
        otherSkillset: "",
        otherSkillsetFocused: false,
      },
    ],
    otherSkillset: "",
    // traineeModel: ''
  };

  const VALIDATION_PATTERNS = {
    name: /^[a-zA-Z.\s]*$/, // First letter capital, allows letters, spaces, and periods
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
        }
        break;

      default:
        if (name.startsWith("skillsetRequirements")) {
          // Parse index and field from name (e.g., skillsetRequirements[0].skillset)
          const matches = name.match(/skillsetRequirements\[(\d+)\]\.(.+)/);
          if (matches) {
            const [, index, field] = matches;
            const idx = parseInt(index, 10);

            if (field === "skillset") {
              if (!value) {
                error = "Skillset is required";
              } else if (
                value === "Other" &&
                (!values.skillsetRequirements[idx].otherSkillset ||
                  values.skillsetRequirements[idx].otherSkillset.trim() === "")
              ) {
                error = "Please specify the skillset";
              }
            } else if (field === "otherSkillset") {
              if (
                values.skillsetRequirements[idx].skillset === "Other" &&
                (!value || value.trim() === "")
              ) {
                error = "Please specify the skillset";
              }
            } else if (field === "resources") {
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
    ];
    fieldNames.forEach((fieldName) => {
      const error = validateField(fieldName, values[fieldName], values);
      if (error) errors[fieldName] = error;
    });

    // Validate skillset requirements
    values.skillsetRequirements.forEach((req, index) => {
      // Validate skillset
      const skillsetError = validateField(
        `skillsetRequirements[${index}].skillset`,
        req.skillset,
        values
      );
      if (skillsetError) {
        errors.skillsetRequirements = errors.skillsetRequirements || [];
        errors.skillsetRequirements[index] = {
          ...(errors.skillsetRequirements[index] || {}),
          skillset: skillsetError,
        };
      }

      // Validate otherSkillset if needed
      if (req.skillset === "Other") {
        const otherSkillsetError = validateField(
          `skillsetRequirements[${index}].otherSkillset`,
          req.otherSkillset,
          values
        );
        if (otherSkillsetError) {
          errors.skillsetRequirements = errors.skillsetRequirements || [];
          errors.skillsetRequirements[index] = {
            ...(errors.skillsetRequirements[index] || {}),
            otherSkillset: otherSkillsetError,
          };
        }
      }

      // Validate resources
      const resourcesError = validateField(
        `skillsetRequirements[${index}].resources`,
        req.resources,
        values
      );
      if (resourcesError) {
        errors.skillsetRequirements = errors.skillsetRequirements || [];
        errors.skillsetRequirements[index] = {
          ...(errors.skillsetRequirements[index] || {}),
          resources: resourcesError,
        };
      }
    });

    return errors;
  };

  // Form submission handler
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("Submitting values:", values);

    try {
      const processedSkillsets = values.skillsetRequirements.map((req) => ({
        skillset: req.skillset === "Other" ? req.otherSkillset : req.skillset,
        resources: parseInt(req.resources, 10),
      }));

      const formDataToSubmit = {
        company_name: values.company_name,
        name: values.name,
        mobile: values.mobile,
        email: values.email,
        skillsetRequirements: processedSkillsets,
        enquiry: values.enquiry,
      };

      const response = await dispatch(submitForm(formDataToSubmit));

      if (response.payload.message[0].key === "success") {
        setShowSuccess(true);
        toast.success("Form submitted successfully!");
      } else {
        toast.error(response.payload.message[0].value);
      }
      setTimeout(() => {
        setShowModal(false);
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
    index,
  }) => {
    const [isFocused, setIsFocused] = useState(false);

    // Determine hasSelectedValue based on whether it's a skillset or trainee model
    const hasSelectedValue =
      index !== undefined
        ? values?.skillsetRequirements?.[index]?.skillset
        : values?.[name];

    const handleChange = (e) => {
      const selectedValue = e.target.value;

      // For skillset dropdown
      if (index !== undefined) {
        setFieldValue(name, selectedValue);
        setFieldValue(`skillsetRequirements.${index}.resources`, "");

        // Clear otherSkillset if skillset is not "Other"
        if (selectedValue !== "Other") {
          setFieldValue(`skillsetRequirements.${index}.otherSkillset`, "");
        }

        // Validate on change
        const error = validateField(
          `skillsetRequirements[${index}].skillset`,
          selectedValue,
          values
        );
        setFieldError(`skillsetRequirements[${index}].skillset`, error);
        setFieldTouched(`skillsetRequirements[${index}].skillset`, true, false);
      }
      // For trainee model dropdown
      else {
        setFieldValue(name, selectedValue);

        // Validate on change
        const error = validateField(name, selectedValue, values);
        setFieldError(name, error);
        setFieldTouched(name, true, false);
      }
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
              <option value="">{label}</option>
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
  const ResourceInput = ({
    icon: Icon,
    label,
    name,
    values,
    index,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    ...props
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = values?.skillsetRequirements?.[index]?.resources !== "";

    const handleChange = (e) => {
      const value = e.target.value;
      setFieldValue(name, value);

      // Validate on change
      const error = validateField(
        `skillsetRequirements[${index}].resources`,
        value,
        values
      );
      setFieldError(`skillsetRequirements[${index}].resources`, error);
      setFieldTouched(`skillsetRequirements[${index}].resources`, true, false);
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
          <Form>
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

            {/* Skillset Requirements */}
            <FieldArray name="skillsetRequirements">
              {({ push, remove }) => {
                const canAddMoreSkillsets = (() => {
                  const lastSkillset =
                    values.skillsetRequirements[
                      values.skillsetRequirements.length - 1
                    ];

                  // If it's an "Other" skillset, check otherSkillset
                  if (lastSkillset.skillset === "Other") {
                    return (
                      lastSkillset.otherSkillset &&
                      lastSkillset.resources &&
                      parseInt(lastSkillset.resources) > 0
                    );
                  }

                  // For predefined skillsets
                  return (
                    lastSkillset.skillset &&
                    lastSkillset.resources &&
                    parseInt(lastSkillset.resources) > 0
                  );
                })();

                return (
                  <div>
                    {values.skillsetRequirements.map((req, index) => (
                      <div key={index} style={styles.skillsetRow}>
                        {/* Skillset Dropdown */}
                        <div style={styles.skillsetField}>
                          <FloatingSelect
                            icon={WorkIcon}
                            name={`skillsetRequirements.${index}.skillset`}
                            label="Select Skillset"
                            options={skillsets}
                            values={values}
                            setFieldValue={setFieldValue}
                            setFieldError={setFieldError}
                            setFieldTouched={setFieldTouched}
                            index={index}
                          />
                        </div>
                        {/* Other Skillset Input */}
                        {req.skillset === "Other" && (
                          <div style={styles.otherSkillsetField}>
                            <div
                              style={{
                                ...styles.inputWrapper,
                                ...(req.otherSkillsetFocused
                                  ? styles.inputWrapperFocused
                                  : {}),
                              }}
                            >
                              <div
                                style={{
                                  ...styles.inputIcon,
                                  ...(req.otherSkillsetFocused
                                    ? styles.inputIconFocused
                                    : {}),
                                }}
                              >
                                <AssignmentIndIcon fontSize="small" />
                              </div>
                              <Field
                                type="text"
                                name={`skillsetRequirements.${index}.otherSkillset`}
                                style={styles.inputField}
                                onFocus={() => {
                                  const newSkillsetRequirements = [
                                    ...values.skillsetRequirements,
                                  ];
                                  newSkillsetRequirements[
                                    index
                                  ].otherSkillsetFocused = true;
                                  setFieldValue(
                                    "skillsetRequirements",
                                    newSkillsetRequirements
                                  );
                                }}
                                onBlur={() => {
                                  const newSkillsetRequirements = [
                                    ...values.skillsetRequirements,
                                  ];
                                  newSkillsetRequirements[
                                    index
                                  ].otherSkillsetFocused = false;
                                  setFieldValue(
                                    "skillsetRequirements",
                                    newSkillsetRequirements
                                  );
                                }}
                              />
                              <label
                                style={{
                                  ...styles.inputLabel,
                                  left: "40px",
                                  ...(req.otherSkillsetFocused ||
                                  req.otherSkillset
                                    ? styles.inputLabelFloated
                                    : {}),
                                }}
                              >
                                Other Skillset
                              </label>
                            </div>
                            <ErrorMessage
                              name={`skillsetRequirements.${index}.otherSkillset`}
                              component="div"
                              style={styles.errorMessage}
                            />
                          </div>
                        )}

                        {/* Resources Input */}
                        <div style={styles.resourcesField}>
                          <ResourceInput
                            icon={WorkIcon}
                            name={`skillsetRequirements.${index}.resources`}
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
                      // Update the push function in the FieldArray component
                      onClick={() =>
                        push({
                          skillset: "",
                          resources: "",
                          otherSkillset: "",
                          otherSkillsetFocused: false,
                        })
                      }
                      style={{
                        ...styles.addMoreButton,
                        opacity: canAddMoreSkillsets ? 1 : 0.5,
                        cursor: canAddMoreSkillsets ? "pointer" : "not-allowed",
                      }}
                      disabled={!canAddMoreSkillsets}
                    >
                      <AddIcon fontSize="small" /> Add Another Skillset
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
