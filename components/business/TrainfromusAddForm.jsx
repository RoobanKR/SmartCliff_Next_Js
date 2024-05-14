import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "@/redux/slices/course/course";
import {
  fetchCategories,
  selectCategories,
} from "@/redux/slices/category/category";
import { createTrainFromUs } from "@/redux/slices/hiring/trainFromUs/trainFromus";

export default function TrainFromUsAddForm() {
  const formData = useSelector((state) => state.hirefromus.formData);
  const courses = useSelector((state) => state.courses.courses);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const categories = useSelector(selectCategories);

  const initialValues = formData;
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);

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
    if (!values.batch_size) {
      errors.batch_size = "batch size is required";
    }
    return errors;
  };

  const handleSubmit = async (values) => {
    if (selectedCourse && selectedCategory) {
      const formDataWithIds = {
        ...values,
        course: selectedCourse,
        category: selectedCategory,
      };

      dispatch(createTrainFromUs(formDataWithIds)).then(() => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      });
    } else {
      console.error("Selected course not found.");
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
    filterCourses(categories.find((cat) => cat._id === selectedCategory));
  }, [categories, courses]);

  useEffect(() => {
    dispatch(fetchCourses()).then(() => setLoading(false));
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="dashboard__content bg-light-4">
      <div className="row y-gap-60">
        <div className="col-12">
          <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
            <div className="d-flex items-center py-20 px-30 border-bottom-light">
              <h2 className="text-17 lh-1 fw-500">
                Basic Information for Training Enquiry
              </h2>
            </div>

            <div className="py-30 px-30">
              <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={handleSubmit}
              >
                {({ values }) => (
                  <Form className="contact-form row y-gap-30">
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="name"
                        className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                      >
                        Name
                      </label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="error-message"
                        style={{ color: "red" }}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="designation"
                        className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                      >
                        Designation
                      </label>
                      <Field
                        type="text"
                        id="designation"
                        name="designation"
                        placeholder="Designation"
                      />
                      <ErrorMessage
                        name="designation"
                        component="div"
                        className="error-message"
                        style={{ color: "red" }}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="company_name"
                        className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                      >
                        Company Name
                      </label>
                      <Field
                        type="text"
                        id="company_name"
                        name="company_name"
                        placeholder="Company Name"
                      />
                      <ErrorMessage
                        name="company_name"
                        component="div"
                        className="error-message"
                        style={{ color: "red" }}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="mobile"
                        className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                      >
                        Mobile Number
                      </label>
                      <Field
                        type="text"
                        id="mobile"
                        name="mobile"
                        placeholder="Mobile Number"
                      />
                      <ErrorMessage
                        name="mobile"
                        component="div"
                        className="error-message"
                        style={{ color: "red" }}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="email"
                        className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                      >
                        Email ID
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email-ID"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error-message"
                        style={{ color: "red" }}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="location"
                        className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                      >
                        Location
                      </label>
                      <Field
                        as="select"
                        id="location"
                        name="location"
                        style={{
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                          appearance: "none",
                        }}
                      >
                        <option value="">Select Location</option>
                        <option value="any">any</option>
                        <option value="smartcliff">Smartcliff</option>
                        <option value="client">client</option>
                      </Field>
                      {values.location === "client" && (
                        <Field
                          type="text"
                          id="ClientLocation"
                          name="ClientLocation"
                          placeholder="Enter Location"
                          className="mt-2"
                        />
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="type"
                        className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                      >
                        Type
                      </label>
                      <Field
                        as="select"
                        id="type"
                        name="type"
                        style={{
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                          appearance: "none",
                        }}
                      >
                        <option value="">Select Type</option>
                        <option value="upskilling">Upskilling</option>
                        <option value="fresher">Fresher</option>
                      </Field>
                    </div>

                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="mr-3">
                          <label
                            htmlFor="duration"
                            className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                          >
                            Duration
                          </label>
                          <Field
                            type="text"
                            id="duration"
                            name="duration"
                            placeholder="Duration"
                            className="mr-2"
                          />
                          <ErrorMessage
                            name="duration"
                            component="div"
                            className="error-message"
                            style={{ color: "red" }}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="durationUnit"
                            className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                          >
                            Choose Type
                          </label>
                          <Field
                            as="select"
                            id="durationUnit"
                            name="durationUnit"
                            className="mr-2"
                            style={{
                              WebkitAppearance: "none",
                              MozAppearance: "none",
                              appearance: "none",
                            }}
                          >
                            <option value="days">Days</option>
                            <option value="weeks">Weeks</option>
                            <option value="months">Months</option>
                          </Field>
                        </div>
                      </div>
                    </div>

                    {values.type === "upskilling" ? (
                      <div className="col-md-6 mb-3">
                        <label
                          htmlFor="count"
                          className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                        >
                          Count
                        </label>
                        <Field
                          type="text"
                          id="count"
                          name="count"
                          placeholder="Enter Count"
                        />
                        <ErrorMessage
                          name="count"
                          component="div"
                          className="error-message"
                          style={{ color: "red" }}
                        />
                      </div>
                    ) : values.type === "fresher" ? (
                      <div className="col-md-6 mb-3">
                        <label
                          htmlFor="batch_size"
                          className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                          required
                        >
                          Batch Size
                        </label>
                        <Field
                          as="select"
                          id="batch_size"
                          name="batch_size"
                          required
                          style={{
                            WebkitAppearance: "none",
                            MozAppearance: "none",
                            appearance: "none",
                          }}
                        >
                          <option value="">Select Batch Size</option>
                          <option value="0-10">0-10</option>
                          <option value="10-20">10-20</option>
                          <option value="20-30">20-30</option>
                        </Field>
                        <ErrorMessage
                          name="batch_size"
                          component="div"
                          className="error-message"
                          style={{ color: "red" }}
                        />
                      </div>
                    ) : null}
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="category"
                        className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                      >
                        Category
                      </label>
                      <select
                        id="category"
                        required
                        name="category"
                        disabled={loading}
                        style={{
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                          appearance: "none",
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
                        className="error-message"
                        style={{ color: "red" }}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="course"
                        className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                      >
                        Course
                      </label>
                      <select
                        id="course"
                        required
                        name="course"
                        disabled={loading}
                        style={{
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                          appearance: "none",
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
                        className="error-message"
                        style={{ color: "red" }}
                      />
                    </div>

                    <div className="col-md-12 mb-3">
                      <label
                        htmlFor="enquiry"
                        className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                      >
                        Hiring Enquiry
                      </label>
                      <Field
                        as="textarea"
                        id="enquiry"
                        name="enquiry"
                        placeholder="Hiring Enquiry..."
                        rows="4"
                      />
                      <ErrorMessage
                        name="enquiry"
                        component="div"
                        className="error-message"
                        style={{ color: "red" }}
                      />
                    </div>

                    <div className="col-md-12">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                    {showSuccess && (
                      <div className="col-md-12 mt-3">
                        <div
                          className="alert alert-success"
                          role="alert"
                          style={{ textAlign: "center" }}
                        >
                          Form submitted successfully!
                        </div>
                      </div>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
