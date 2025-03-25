import { getAllTargetStudents } from "@/redux/slices/mca/targetStudent/targetStudent";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const PageWithFixedBackground = () => {
  const dispatch = useDispatch();
  const { targetStudents, loading, error } = useSelector(
    (state) => state.targetStudent
  );

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
  }, [targetStudents]);

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
          <h1 style={{ fontSize: "48px", fontWeight: "bold", color: "#333", padding: "20px 40px", borderRadius: "8px" }}>
            MCA – Target Students
          </h1>
        </div>

        {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        {targetStudents.map((card, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={card._id}
              ref={(el) => (cardRefs.current[index] = el)}
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
    </div>
  );
};

export default PageWithFixedBackground;
