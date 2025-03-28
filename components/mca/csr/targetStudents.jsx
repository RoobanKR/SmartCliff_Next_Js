import { getAllTargetStudents } from "@/redux/slices/mca/targetStudent/targetStudent";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const PageWithFixedBackground = () => {
  const dispatch = useDispatch();
  const { targetStudents, loading, error } = useSelector(
    (state) => state.targetStudent
  );

  const params = useParams();
  const programId = params.id;

  const filteredOutcomes =
    targetStudents?.filter(
      (partner) => partner.degree_program?._id === programId
    ) || [];

  const cardRefs = useRef([]);

  useEffect(() => {
    dispatch(getAllTargetStudents());
  }, [dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateX(0)";
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, [filteredOutcomes]);

  return (
    <div style={{ position: "relative", overflowX: "hidden" }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "url('/assets/img/about-1/bckimg14.jpg') no-repeat center center/cover",
          zIndex: -1,
          opacity: 0.5,
        }}
      ></div>

      <div style={{ padding: "10vh 0", display: "flex", flexDirection: "column", gap: "50px" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <div className="program-subtitle">
            <span className="subtitle-line"></span>
            <span className="subtitle-text"> MCA – Target Students</span>
            <span className="subtitle-line"></span>
          </div>
        </div>

        {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        {filteredOutcomes.map((card, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={card._id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="target-card"
              style={{
                width: "400px",
                height: "400px",
                position: "relative",
                left: isEven ? "60%" : "10%",
                background: `linear-gradient(${card.bgColor}, ${card.bgColor}), url('/assets/img/about-1/bckimg13.jpg') no-repeat center center/cover`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
                color: "#333",
                fontSize: "24px",
                fontWeight: "bold",
                opacity: 0,
                transform: `translateX(${isEven ? "100px" : "-100px"})`,
                transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
              }}
            >
              <img src={card.icon} alt="icon" style={{ width: "80px", height: "80px", marginBottom: "10px" }} />
              <h2>{card.description}</h2>
            </div>
          );
        })}
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
  
        @media (max-width: 768px) {
          .target-card {
            width: 90% !important;
            height: 300px !important;
            left: 5% !important;
            transform: translateY(20px) !important;
            margin-bottom: 20px;
          }
  
          .program-subtitle {
            flex-direction: column;
          }
  
          .subtitle-line {
            width: 80px;
            margin: 5px 0;
          }
  
          .subtitle-text {
            font-size: 1.8rem;
            margin: 5px 0;
          }
  
          div[style] {
            padding: 5vh 0 !important;
            gap: 20px !important;
          }
  
          .target-card h2 {
            font-size: 20px;
          }
  
          .target-card img {
            width: 60px !important;
            height: 60px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PageWithFixedBackground;
