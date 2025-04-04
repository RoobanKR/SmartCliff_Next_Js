import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { submitForm } from "@/redux/slices/hirefromus/Hirefromus";
import { fetchCourses } from "@/redux/slices/course/course";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// MUI Icons
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SendIcon from '@mui/icons-material/Send';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import EngineeringIcon from '@mui/icons-material/Engineering';
import InventoryIcon from '@mui/icons-material/Inventory';
import { createInstitute } from "@/redux/slices/hiring/institute/institute";


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
  fieldContainer: {
    // marginTop:"10px",
    marginBottom: "16px"
  },
  fieldContainers: {
    marginTop: "10px",
    marginBottom: "16px"
  },
  inputWrapper: {
    position: "relative",
    borderRadius: "8px",
    border: "1px solid  #ddd",
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
    left: "40px",
    top: "10px",
    fontSize: "12px",
    color: "#666",
    backgroundColor: "#f9f9f9",
    padding: "0 4px",
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
  skillsetRow: {
    gap: "10px",
    marginBottom: "16px",
    alignItems: "flex-start"
  },
  skillsetField: {
    flex: 2
  },
  resourcesField: {
    flex: 1,
  },
  otherSkillsetField: {
    flex: 2,
    marginTop: "10px",
    marginBottom: "20px"
  },
  otherSkillsetInput: {
    display: "flex",
    alignItems: "center"
  },
  otherSkillsetIcon: {
    marginRight: "10px",
    color: "#666"
  },
  otherSkillsetText: {
    width: "100%",
    padding: "7px 15px",
    fontSize: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    outline: "none",
    backgroundColor: "#f9f9f9"
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
    marginBottom: "10px"
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
    color: "#F2775E"
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
    minHeight: "120px"
  },
  textareaIcon: {
    marginLeft: "12px",
    marginTop: "12px",
    color: "#666",
    display: "flex",
    alignItems: "center"
  },
  textareaIconFocused: {
    color: "#F2775E"
  }
};

// Validation patterns
const VALIDATION_PATTERNS = {
  name: /^[a-zA-Z\s]+$/,
  phone: /^[6-9]\d{0,9}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
};

export default function InstitutionAddForm({ availabilities, setShowModal }) {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.hirefromus.formData);
  const courses = useSelector((state) => state.courses.courses);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Process availabilities data
  const skillsetsMap = availabilities.reduce((acc, item) => {
    if (!acc[item.service]) {
      acc[item.service] = [];
    }
    acc[item.service].push({
      name: item.resources,
      count: parseInt(item.resources) || 0
    });
    return acc;
  }, {});

  const skillsets = Object.keys(skillsetsMap);
  const TRAINEE_MODELS = [
    'Placement Training',
    'Skilling',
    'Degree Program',
    'Internship'
  ];

  const initialValues = {
    ...formData,
    services: [{ service: '', resources: '', otherSkillset: '', otherSkillsetFocused: false }],
    otherSkillset: '',

    // services: [{ traineeModel: '', resources: '' }],
  };

  // Form validation
  const validate = (values) => {
    const errors = {};

    // Basic field validations
    if (!values.name) {
      errors.name = "Contact person is required";
    }
    if (!values.institute_name) {
      errors.institute_name = "Institute name is required";
    }
    if (!values.mobile) {
      errors.mobile = "Mobile number is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.enquiry) {
      errors.enquiry = "Enquiry is required";
    }

    // Validate services
    values.services.forEach((req, index) => {
      if (!req.traineeModel) {
        errors.services = errors.services || [];
        errors.services[index] = { traineeModel: "Trainee model is required" };
      }
      if (!req.resources) {
        errors.services = errors.services || [];
        errors.services[index] = { resources: "Resources is required" };
      }
    });

    return errors;
  };
  // Form submission handler
  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      // Map the services to match the backend schema
      const processedServices = values.services.map(req => ({
        skillset: req.skillset === "Other" ? req.otherSkillset : req.skillset,
        service: req.traineeModel, // Assuming traineeModel corresponds to the service
        resources: req.resources
      }));

      const formDataWithCourseId = {
        name: values.name,
        institute_name: values.institute_name,
        mobile: values.mobile,
        email: values.email,
        enquiry: values.enquiry,
        services: processedServices // Send the processed services
      };

      const response = await dispatch(createInstitute(formDataWithCourseId));

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
      const errorMessage = error.response?.data?.message[0]?.value ||
        error.message ||
        "An error occurred while submitting the form";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  // Custom form components
  const FloatingInput = ({ icon: Icon, label, name, type = "text", values, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = values && values[name];

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

  // Inside the FloatingSelect component:
  const FloatingSelect = ({
    icon: Icon,
    label,
    name,
    options,
    values,
    setFieldValue,
    index
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    // Fix: Change this to match the actual path used in the form
    const hasSelectedValue = values?.services?.[index]?.traineeModel;

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
                const selectedValue = e.target.value;
                setFieldValue(name, selectedValue);
              }}
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
              <label style={{
                ...styles.inputLabel,
                left: Icon ? "10px" : "12px",
                ...styles.inputLabelFloated
              }}>
                {label}
              </label>
            )}
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

  const FloatingTextarea = ({ icon: Icon, label, name, values, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = values && values[name];

    return (
      <div style={styles.fieldContainers}>
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
              left: Icon ? "10px" : "12px",
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

  const ResourceInput = ({ icon: Icon, label, name, values, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = values?.services?.[props.index]?.resources !== '';

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
          <div style={styles.textareaWrapper}>
            <Field
              type="number"
              name={name}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={styles.inputField}
              min="1"
              {...props}
            />
            <label style={{
              ...styles.inputLabel,
              left: Icon ? "10px" : "12px",
              ...(hasValue ? styles.inputLabelFloated : {})
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
    <div style={styles.container}>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form style={styles.form}>
            {/* Company Name */}
            <FloatingInput
              icon={BusinessIcon}
              type="text"
              name="institute_name"
              label="Company Name"
              values={values}
            />

            {/* Name */}
            <FloatingInput
              icon={PersonIcon}
              type="text"
              name="name"
              label="Contact Person Name"
              values={values}
            />

            {/* Mobile Number */}
            <FloatingInput
              icon={PhoneIcon}
              type="text"
              name="mobile"
              label="Contact number"
              values={values}
            />

            {/* Email */}
            <FloatingInput
              icon={EmailIcon}
              type="email"
              name="email"
              label="Contact Email"
              values={values}
            />
            <FieldArray name="services">
              {({ push, remove }) => {
                const canAddMoreSkillsets = (() => {
                  const lastSkillset = values.services[values.services.length - 1];

                  // Check if traineeModel is selected and resources is provided
                  return lastSkillset.traineeModel &&
                    lastSkillset.resources &&
                    parseInt(lastSkillset.resources) > 0;
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
                            index={index}
                          />
                        </div>

                        {/* Other Trainee Model Input */}
                        {req.traineeModel === "Other" && (
                          <div style={styles.otherSkillsetField}>
                            <div style={{
                              ...styles.inputWrapper,
                              ...(req.otherModelFocused ? styles.inputWrapperFocused : {})
                            }}>
                              <div style={{
                                ...styles.inputIcon,
                                ...(req.otherModelFocused ? styles.inputIconFocused : {})
                              }}>
                                <AssignmentIndIcon fontSize="small" />
                              </div>
                              <Field
                                type="text"
                                name={`services.${index}.otherModel`}
                                style={styles.inputField}
                                onFocus={() => {
                                  const newServices = [...values.services];
                                  newServices[index].otherModelFocused = true;
                                  setFieldValue('services', newServices);
                                }}
                                onBlur={() => {
                                  const newServices = [...values.services];
                                  newServices[index].otherModelFocused = false;
                                  setFieldValue('services', newServices);
                                }}
                              />
                              <label style={{
                                ...styles.inputLabel,
                                left: "40px",
                                ...((req.otherModelFocused || req.otherModel) ? styles.inputLabelFloated : {})
                              }}>
                                Other Model Type
                              </label>
                            </div>
                            <ErrorMessage
                              name={`services.${index}.otherModel`}
                              component="div"
                              style={styles.errorMessage}
                            />
                          </div>
                        )}

                        {/* Resources Input */}
                        <div style={styles.resourcesField}>
                          <ResourceInput
                            icon={InventoryIcon}
                            name={`services.${index}.resources`}
                            label="Resources"
                            values={values}
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
                            <DeleteIcon fontSize="small" />Delete
                          </button>
                        )}
                      </div>
                    ))}

                    {/* Add More Button with Conditional Disabled State */}
                    <button
                      type="button"
                      onClick={() => push({ traineeModel: '', resources: '' })}
                      style={{
                        ...styles.addMoreButton,
                        opacity: canAddMoreSkillsets ? 1 : 0.5,
                        cursor: canAddMoreSkillsets ? 'pointer' : 'not-allowed'
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
