import React, { useEffect } from "react";
import Image from "next/image";
import { fetchOurPrograms } from "@/redux/slices/mca/ourProgram/ourProgram";
import { useDispatch, useSelector } from "react-redux";

export default function ProgrammeHighlights({ids}) {
  const dispatch = useDispatch();
  const ourProgram = useSelector((state) => state.ourProgram.ourProgram);

  const fullUrl = typeof window !== "undefined" ? window.location.href : "";
  const segments = fullUrl.split("/").filter(Boolean);
  const lastSegment = segments.pop();
  useEffect(() => {
    dispatch(fetchOurPrograms());
  }, [dispatch]);

  const final = ourProgram.filter(
    (program) => program.degree_program?._id === ids
  );

  return (
    <section className="layout-pt-sm layout-pb-xs bg-white">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div>
              <div className="program-subtitle">
                <span className="subtitle-line"></span>
                <span className="subtitle-text">
                  MCA – Programme Highlights
                </span>
                <span className="subtitle-line"></span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="pt-40 lg:pt-50"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "30px", // for spacing between items
          }}
        >
          {final.map((elm) => (
            <div
              key={elm._id}
              style={{
                flex: "0 1 300px", // width of card
                maxWidth: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                className="coursesCard -type-2 text-center pt-50 pb-40 px-30 bg-white rounded-8"
                style={{
                  width: "100%",
                  maxWidth: "350px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="coursesCard__image">
                  <Image width={60} height={60} src={elm.icon} alt="image" />
                </div>
                <div className="coursesCard__content mt-30">
                  <h5 className="coursesCard__title text-18 lh-1 fw-500">
                    {elm.title}
                  </h5>
                  <p className="coursesCard__text text-14 mt-10">
                    {elm.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .program-subtitle {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
          width: 100%;
        }

        .subtitle-line {
          height: 2px;
          width: 100px;
          background-color: #5b2c6f;
          opacity: 0.5;
        }

        .subtitle-text {
          font-size: 2.5rem;
          margin: 0 15px;
          color: #5b2c6f;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        @media (max-width: 640px) {
          .subtitle-line {
            width: 60px;
          }

          .subtitle-text {
            font-size: 1.5rem;
            margin: 0 10px;
            text-align: center;
          }
        }

        @media (min-width: 641px) and (max-width: 1023px) {
          .subtitle-text {
            font-size: 2rem;
          }
        }
        @media (max-width: 768px) {
          .coursesCard {
            max-width: 100%; // Full width on smaller screens
          }
        }
      `}</style>
    </section>
  );
}
