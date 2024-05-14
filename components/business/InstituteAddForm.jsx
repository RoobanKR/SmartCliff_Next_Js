import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "@/redux/slices/course/course";
import {
  fetchCategories,
  selectCategories,
} from "@/redux/slices/category/category";
import { createInstitute } from "@/redux/slices/hiring/institute/institute";
import { fetchManagedCampus } from "@/redux/slices/services/managedCampus/managedCampus";

export default function TrainFromUsAddForm() {
  const formData = useSelector((state) => state.institute.formData);
  const courses = useSelector((state) => state.courses.courses);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const categories = useSelector(selectCategories);
  const managedCampus = useSelector(
    (state) => state.managedCampus.managedCampus
  );
  const initialValues = formData;
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedService, setSelectedService] = useState("");

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

    if (!values.institute_name) {
      errors.institute_name = "institute name is required";
    } else if (!nameRegex.test(values.institute_name)) {
      errors.institute_name = "Invalid institute name";
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
    return errors;
  };

  const handleSubmit = async (values) => {
    if (selectedCourse && selectedCategory && selectedService) {
      const formDataWithIds = {
        ...values,
        course: selectedCourse,
        category: selectedCategory,
        service: selectedService,
      };

      dispatch(createInstitute(formDataWithIds)).then(() => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
        console.log("Form submitted:", formDataWithIds);
      });
    } else {
      console.error("Selected course, category, or service not found.");
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

  const handleServiceChange = (e) => {
    const serviceId = e.target.value;
    setSelectedService(serviceId);
  };

  useEffect(() => {
    filterCourses(categories.find((cat) => cat._id === selectedCategory));
  }, [categories, courses]);

  useEffect(() => {
    dispatch(fetchCourses()).then(() => setLoading(false));
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchManagedCampus());
  }, [dispatch]);

  return (
    <div className="dashboard__content bg-light-4">
      <div className="row y-gap-60">
        <div className="col-12">
          <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
            <div className="d-flex items-center py-20 px-30 border-bottom-light">
              <h2 className="text-17 lh-1 fw-500">
                Basic Information for Institute Enquiry
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
                        htmlFor="institute_name"
                        className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                      >
                        Institute Name
                      </label>
                      <Field
                        type="text"
                        id="institute_name"
                        name="institute_name"
                        placeholder="institute Name"
                      />
                      <ErrorMessage
                        name="institute_name"
                        component="div"
                        className="error-message"
                        style={{ color: "red" }}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="no_of_students"
                        className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                      >
                        number of students
                      </label>
                      <Field
                        type="text"
                        id="no_of_students"
                        name="no_of_students"
                        placeholder="no.of students"
                      />
                      <ErrorMessage
                        name="no_of_students"
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
                        htmlFor="target_year"
                        className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                      >
                        Target Year
                      </label>
                      <Field
                        type="text"
                        id="target_year"
                        name="target_year"
                        placeholder="Target year"
                      />
                      <ErrorMessage
                        name="target_year"
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
                            htmlFor="duration_type"
                            className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                          >
                            Choose Type
                          </label>
                          <Field
                            as="select"
                            id="duration_type"
                            name="duration_type"
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

                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="category"
                        className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                      >
                        Services
                      </label>
                      <select
                        id="services"
                        required
                        name="services"
                        disabled={loading}
                        onChange={handleServiceChange}
                      >
                        <option value="">Select services</option>
                        {managedCampus &&
                          managedCampus.getAllManagedCampus &&
                          managedCampus.getAllManagedCampus.map((campus) => (
                            <option key={campus._id} value={campus._id}>
                              {campus.sub_title}
                            </option>
                          ))}
                      </select>
                      <ErrorMessage
                        name="services"
                        component="div"
                        className="error-message"
                        style={{ color: "red" }}
                      />
                    </div>

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
