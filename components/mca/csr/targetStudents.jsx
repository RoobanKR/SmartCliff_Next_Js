import { getAllTargetStudents } from "@/redux/slices/mca/targetStudent/targetStudent";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const PageWithFixedBackground = ({ ids }) => {
  const dispatch = useDispatch();
  const { targetStudents, loading, error } = useSelector(
    (state) => state.targetStudent
  );

  const params = useParams();
  const programId = params.id;

  const filteredOutcomes =
    targetStudents?.filter((partner) => partner.degree_program?._id === ids) ||
    [];

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

  const awards = [
    {
      img: "https://via.placeholder.com/150",
      title: "Software Reviews Leader - CRM Data Quadrant 2020",
      description: "Gold Medalist Software Reviews 2020",
      bgColor: "#2C3E50",
    },
    {
      img: "https://via.placeholder.com/150",
      title: "GetApp Category Leaders - CRM Software 2019",
      description: "Category Leaders 2019",
      bgColor: "#1B9AAA",
    },
    {
      img: "https://via.placeholder.com/150",
      title: "FinancesOnline Great User Experience Award 2019",
      description: "Great User Experience 2019",
      bgColor: "#2C78C9",
    },
    {
      img: "https://via.placeholder.com/150",
      title: "Gartner Magic Quadrant Challenger - Sales Force Automation 2019",
      description: "Gartner",
      bgColor: "#1A1F71",
    },
  ];

  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
        backgroundColor: "#F4F7FA",
      }}
    >
      <div
        style={{
          marginBottom: "60px",
          position: "relative",
        }}
      >
        <div className="program-subtitle">
          <span className="subtitle-line"></span>
          <span className="subtitle-text"> MCA – Target Students</span>
          <span className="subtitle-line"></span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        {filteredOutcomes.map((card, index) => (
          <div
            key={index}
            style={{
              width: "230px",
              borderRadius: "15px",
              padding: "20px",
              backgroundColor: card.bgColor,
              color: "#fff",
              textAlign: "center",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-in-out",
              cursor: "pointer",
            }}
          >
            <img
              src={card.icon}
              alt={card.title}
              style={{
                width: "70%",
                // height:"50%",
                borderRadius: "10px",
                marginBottom: "15px",
              }}
            />
            <h3 style={{ fontSize: "14px", marginBottom: "10px" }}>
              {card.description}
            </h3>
          </div>
        ))}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
            marginTop:"200px"
          }}
        >
          {filteredOutcomes.map((card, index) => (
            <div
              key={index}
              style={{
                width: "230px",
                borderRadius: "15px",
                padding: "20px",
                backgroundColor: " #f4e5d3",
                color: "#fff",
                textAlign: "center",
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease-in-out",
                cursor: "pointer",
              }}
            >
              <img
                src={filteredOutcomes[0].icon}
                alt={card.title}
                style={{
                  width: "70%",
                  // height:"50%",
                  borderRadius: "10px",
                  marginBottom: "15px",
                }}
              />
              <h3 style={{ fontSize: "14px", marginBottom: "10px" }}>
                {card.description}
              </h3>
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
    </div>
  );
};

export default PageWithFixedBackground;
