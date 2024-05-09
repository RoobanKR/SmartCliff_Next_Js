"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  createApplyNow,
  resendOTP,
  verifyOTP,
} from "@/redux/slices/courseApply/courseApplyNow";
import { getAllHiring } from "@/redux/slices/hiring/hiring/hiring";
import { createHiringApplication } from "@/redux/slices/hiring/hiringApply/hiringApply";

export default function HiringApply() {
  const dispatch = useDispatch();
  const { allHiring } = useSelector((state) => state.hiring);
  const [selectedHiring, setSelectedHiring] = useState(null);

  const [values, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    dob: "",
    gender: "",
    college: "",
    highest_level_education: "",
    company: "",
    yop: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true); // State to manage resend button disable/enable
  const [secondsLeft, setSecondsLeft] = useState(30);

  useEffect(() => {
    dispatch(getAllHiring());
  }, [dispatch]);

  const handleHiringChange = (_, newValue) => {
    setSelectedHiring(newValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const regex = /^[A-Za-z ]*$/;
    if (
      name === "name" &&
      (!regex.test(value) || value.split(" ").length > 2)
    ) {
      return;
    }
    if (name === "mobile" && !/^\d*$/.test(value)) {
      return;
    }
    if (
      name === "college" &&
      (!regex.test(value) || value.split(" ").length > 2)
    ) {
      return;
    }
    if (
      name === "highest_level_education" &&
      (!regex.test(value) || value.split(" ").length > 2)
    ) {
      return;
    }
    setFormData({ ...values, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createHiringApplication(values));

      setOtpSent(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <div
        className="dashboard__content mt-50"
        style={{ background: "#f4f1fe" }}
      >
        <div className="row y-gap-60">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex items-center py-20 px-30 border-bottom-light">
                <div className="row pb-3 mt-15">
                  <div className="col-auto">
                    <h1 className="text-30 lh-12 fw-700">
                      New Hiring{" "}
                      <span style={{ color: "#f2775e" }}>Enrollment </span>
                    </h1>
                    <br></br>
                    <h3 className="text-20 lh-12 fw-500">
                      Unlock Your Potential, Enroll Today!
                    </h3>
                  </div>
                </div>
              </div>

              <div className="py-30 px-30">
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    mobile: "",
                    address: "",
                    dob: "",
                    gender: "",
                    college: "",
                    highest_level_education: "",
                    company: "",
                    yop: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleFormSubmit}
                  // No need to handle onBlur here
                >
                  {({ errors, touched }) => (
                    <form
                      onSubmit={handleFormSubmit}
                      className="contact-form row y-gap-30"
                    >
                      <div className="col-sm-12 col-md-12 col-lg-6">
                        <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                          Name*
                        </label>
                        <Field
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Enter your name"
                          required
                          value={values.name}
                          onChange={handleChange}
                        />
                        {touched.name && !values.name && (
                          <div className="error" style={{ color: "red" }}>
                            ** Name is required **
                          </div>
                        )}
                      </div>
                      {/* Email */}
                      <div className="col-sm-12 col-md-12 col-lg-6">
                        <label
                          htmlFor="email"
                          className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                        >
                          Email* (eg: Aegon15@gmail.com)
                        </label>
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Enter your email"
                          required
                          value={values.email}
                          onChange={handleChange}
                        />
                        {touched.email && !values.email && (
                          <div className="error" style={{ color: "red" }}>
                            ** Email is required **
                          </div>
                        )}
                        {touched.email &&
                          values.email &&
                          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                            values.email
                          ) && (
                            <div className="error" style={{ color: "red" }}>
                              ** Invalid email format **
                            </div>
                          )}
                      </div>
                      {/* Phone */}
                      <div className="col-sm-12 col-md-12 col-lg-6">
                        <label
                          htmlFor="mobile"
                          className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                        >
                          Phone*
                        </label>
                        <Field
                          type="text"
                          id="mobile"
                          name="mobile"
                          value={values.mobile}
                          placeholder="Enter your phone number"
                          required
                          onChange={handleChange}
                        />

                        <ErrorMessage
                          name="mobile"
                          component="div"
                          className="error"
                          style={{ color: "red" }}
                        />
                      </div>{" "}
                      <div className="col-sm-12 col-md-12 col-lg-6">
                        <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                          Date of Birth*
                        </label>
                        <Field
                          style={{
                            outline: "none",
                            width: "100%",
                            backgroundColor: "transparent",
                            borderRadius: "8px",
                            border: "1px solid #dddddd",
                            fontSize: "15px",
                            lineHeight: "1.5",
                            padding: "15px 22px",
                            transition:
                              "all 0.15s cubic-bezier(0.165, 0.84, 0.44, 1)",
                          }}
                          type="date"
                          name="dob"
                          value={values.dob}
                          onChange={handleChange}
                        />
                        {touched.dob && !values.dob && (
                          <div className="error" style={{ color: "red" }}>
                            ** Date of birth is required **
                          </div>
                        )}
                      </div>
                      {/* Address */}
                      <div className="col-12">
                        <label
                          htmlFor="address"
                          className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                        >
                          Address* (eg: 15 church street, Madurai, India)
                        </label>
                        <Field
                          as="textarea"
                          id="address"
                          name="address"
                          value={values.address}
                          onChange={handleChange}
                          placeholder="Enter your address"
                          required
                          rows="5"
                        />
                        {touched.address && !values.address && (
                          <div className="error" style={{ color: "red" }}>
                            ** Address is required **
                          </div>
                        )}
                        {touched.address &&
                          values.address &&
                          !/^\d{1,3}\s[a-zA-Z\s,]+$/i.test(values.address) && (
                            <div className="error" style={{ color: "red" }}>
                              ** Invalid address format **
                            </div>
                          )}
                      </div>
                      {/* Gender */}
                      <div className="col-sm-12 col-md-12 col-lg-6">
                        <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                          Gender*
                        </label>
                        <Field
                          name="gender"
                          as="select"
                          value={values.gender}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </Field>
                        {touched.gender && !values.gender && (
                          <div className="error" style={{ color: "red" }}>
                            ** Gender is required **
                          </div>
                        )}
                      </div>
                      <div className="col-sm-12 col-md-12 col-lg-6">
                        <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                          Company Name *
                        </label>
                        <Field
                          name="company"
                          as="select"
                          value={values.company}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="">Select Company</option>
                          {allHiring.map((company) => (
                            <option key={company.id} value={company._id}>
                              {company.company_name}
                            </option>
                          ))}
                        </Field>
                        {touched.company && !values.company && (
                          <div className="error" style={{ color: "red" }}>
                            ** Company name is required **
                          </div>
                        )}
                      </div>
                      <div className="col-12">
                        <label
                          htmlFor="college"
                          className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                        >
                          College*
                        </label>

                        <Field
                          required
                          type="text"
                          name="college"
                          value={values.college}
                          onChange={handleChange}
                          placeholder="Enter your college name"
                          rows="5"
                        />
                        {touched.college && !values.college && (
                          <div className="error" style={{ color: "red" }}>
                            ** College Name is required **
                          </div>
                        )}
                      </div>
                      <div className="col-sm-12 col-md-12 col-lg-6">
                        <label
                          htmlFor="highest_level_education"
                          className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                        >
                          Highest_level_Education*
                        </label>

                        <Field
                          required
                          type="text"
                          name="highest_level_education"
                          value={values.highest_level_education}
                          onChange={handleChange}
                          placeholder="Enter your highest_level_education, eg: Bachelor Of Engineering"
                        />
                        {touched.highest_level_education &&
                          !values.highest_level_education && (
                            <div className="error" style={{ color: "red" }}>
                              ** Highest_level_Education Name is required **
                            </div>
                          )}
                      </div>
                      <div className="col-sm-12 col-md-12 col-lg-6">
                        <label
                          htmlFor="yop"
                          className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                        >
                          Year Of Passing*
                        </label>
                        <Field
                          type="text"
                          id="yop"
                          name="yop"
                          value={values.yop}
                          placeholder="Enter the passing year"
                          required
                          onChange={handleChange}
                        />

                        <ErrorMessage
                          name="yop"
                          component="div"
                          className="error"
                          style={{ color: "red" }}
                        />
                      </div>
                      <div className="col-12">
                        <button
                          className="button -sm -outline-dark-2 text-dark-2"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("** Name is required **"),
  mobile: Yup.string().matches(
    /^[6-9]\d{9}$/,
    "** Invalid phone number format **"
  ), // Corrected regex pattern
  // .required("** Phone number is required **"),
  address: Yup.string().required("** Address is required **"),
  dob: Yup.date().required("**  Date of Birth is required **"),
  gender: Yup.string().required("** Gender is required **"),
  college: Yup.string().required("** College Name is required **"),
  highest_level_education: Yup.string().required(
    "** Highest level Eeducation is required **"
  ),
  company: Yup.string().required("** Company Name is required **"),
  yop: Yup.number()
    .typeError("** Year of passing must be a number **") // Custom error message if it's not a number
    .integer("** Year of passing must be an integer **") // Ensure it's an integer
    .min(1900, "** Year of passing must be at least 1900 **") // Minimum allowed year
    .max(
      new Date().getFullYear(),
      `** Year of passing cannot be in the future **`
    ), // Cannot be in the future
});
