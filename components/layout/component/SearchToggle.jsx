import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "@/redux/slices/course/course";

const SearchToggle = ({ allClasses, color }) => {
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showAllResults, setShowAllResults] = useState(false);
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const filteredCourses = courses
    ? courses.filter(
        (course) =>
          course.course_name &&
          course.course_name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  const handleShowAllResults = () => {
    setShowAllResults(true);
  };

  return (
    <>
      <div className={allClasses ? allClasses : ""}>
        <button
          onClick={() => setActiveSearch((pre) => !pre)}
          className={`d-flex items-center ${color ? color : "text-white"} `}
          data-el-toggle=".js-search-toggle"
        >
          <i
            className="text-20 icon icon-search"
            style={{ color: "black" }}
          ></i>
        </button>

        <div
          className={`toggle-element js-search-toggle ${
            activeSearch ? "-is-el-visible" : ""
          }`}
        >
          <div
            className="header-search pt-90 bg-white shadow-4 "
            style={{ height: "650px" }}
          >
            <div className="container">
              <div className="header-search__field">
                <div className="icon icon-search text-dark-1"></div>
                <input
                  required
                  type="text"
                  className="col-12 text-18 lh-12 text-dark-1 fw-500"
                  placeholder="Search Course Name?"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />

                <button
                  onClick={() => setActiveSearch(false)}
                  className="d-flex items-center justify-center size-40 rounded-full bg-purple-3"
                  data-el-toggle=".js-search-toggle"
                >
                  <Image
                    width={12}
                    height={12}
                    src="/assets/img/menus/close.svg"
                    alt="icon"
                  />
                </button>
              </div>

              <div className="header-search__content mt-30">
                <div className="text-17 text-dark-1 fw-500">Suggestions</div>

                <div className="d-flex y-gap-5 flex-column mt-20">
                  {showAllResults
                    ? filteredCourses.map((course) => (
                        <Link
                          key={course._id}
                          href={`/courses/${course.slug}/${course._id}`}
                          className="text-dark-1"
                        >
                          {course.course_name}
                        </Link>
                      ))
                    : filteredCourses.slice(0, 3).map((course) => (
                        <Link
                          key={course._id}
                          href={`/courses/${course.slug}/${course._id}`}
                          className="text-dark-1"
                        >
                          {course.course_name}
                        </Link>
                      ))}
                </div>

                <div className="mt-30">
                  {!showAllResults && (
                    <button
                      onClick={handleShowAllResults}
                      className="uppercase underline"
                    >
                      VIEW ALL
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className="header-search__bg"
            data-el-toggle=".js-search-toggle"
          ></div>
        </div>
      </div>
    </>
  );
};

export default SearchToggle;
