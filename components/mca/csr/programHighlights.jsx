import React, { useEffect } from "react";
import Image from "next/image";
import { fetchOurPrograms } from "@/redux/slices/mca/ourProgram/ourProgram";
import { useDispatch, useSelector } from "react-redux";

export default function ProgrammeHighlights() {
  const dispatch = useDispatch();
  const ourProgram = useSelector((state) => state.ourProgram.ourProgram);

  useEffect(() => {
    dispatch(fetchOurPrograms());
  }, [dispatch]);

  // Filter the programs to only include those with college as null
  const filteredPrograms = ourProgram.filter((program) => program.college === null);

  return (
    <section className="layout-pt-md layout-pb-xs bg-white">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle">
              <h2 className="sectionTitle__title">MCA – Programme Highlights</h2>
              <p className="sectionTitle__text">Lorem ipsum dolor sit amet, consectetur.</p>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 pt-60 lg:pt-50">
          {filteredPrograms.map((elm) => (
            <div
              key={elm._id}
              className="col-lg-4 col-md-6 col-sm-12" // Responsive classes
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "30px", // Add margin for spacing
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
                  <h5 className="coursesCard__title text-18 lh-1 fw-500">{elm.title}</h5>
                  <p className="coursesCard__text text-14 mt-10">{elm.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .coursesCard {
            max-width: 100%; // Full width on smaller screens
          }
        }
      `}</style>
    </section>
  );
}









// import React, { useEffect } from "react";
// import Image from "next/image";
// import { fetchOurPrograms } from "@/redux/slices/mca/ourProgram/ourProgram";
// import { useDispatch, useSelector } from "react-redux";

// export default function ProgrammeHighlights() {
//   const dispatch = useDispatch();
//   const ourProgram = useSelector((state) => state.ourProgram.ourProgram);

//   useEffect(() => {
//     dispatch(fetchOurPrograms());
//   }, [dispatch]);

//   // Filter the programs to only include those with college as null
//   const filteredPrograms = ourProgram.filter((program) => program.college === null);

//   return (
//     <section className="layout-pt-md layout-pb-xs bg-white">
//       <div className="container">
//         <div className="row justify-center text-center">
//           <div className="col-auto">
//             <div className="sectionTitle">
//               <h2 className="sectionTitle__title">MCA – Programme Highlights</h2>
//               <p className="sectionTitle__text">Lorem ipsum dolor sit amet, consectetur.</p>
//             </div>
//           </div>
//         </div>

//         <div className="grid-container">
//           {filteredPrograms.map((elm) => (
//             <div key={elm._id} className="grid-item">
//               <div className="card">
//                 <div className="card-image">
//                   <Image 
//                     width={60} 
//                     height={60}
//                     src={elm.icon} 
//                     alt={elm.title}
//                     className="card-icon" 
//                   />
//                 </div>
//                 <div className="card-content">
//                   <h5 className="card-title">{elm.title}</h5>
//                   <p className="card-text">{elm.description}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         .grid-container {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//           gap: 30px;
//           margin-top: 50px;
//           width: 100%;
//         }

//         .grid-item {
//           display: flex;
//           justify-content: center;
//         }

//         .card {
//           width: 100%;
//           padding: 50px 20px 40px;
//           border-radius: 8px;
//           text-align: center;
//           background-color: white;
//           box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//         }

//         .card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
//         }

//         .card-image {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           height: 70px;
//         }

//         .card-content {
//           margin-top: 30px;
//         }

//         .card-title {
//           font-size: 18px;
//           line-height: 1.3;
//           font-weight: 500;
//           margin-bottom: 10px;
//         }

//         .card-text {
//           font-size: 14px;
//           color: #555;
//           line-height: 1.6;
//         }

//         @media (max-width: 768px) {
//           .grid-container {
//             grid-template-columns: repeat(auto-fill, minmax(250px, 2fr));
//           }
          
//           .card {
//             padding: 40px 15px 30px;
//           }
//         }

//         @media (max-width: 480px) {
//           .grid-container {
//             grid-template-columns: 1fr;
//             padding: 0 15px;
//           }
          
//           .card {
//             max-width: 100%;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }