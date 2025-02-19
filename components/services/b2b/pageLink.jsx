import React, { useEffect, useState } from "react";

export default function PageLinks({ dark, sections }) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Function to check which section is currently in view
    const checkScroll = () => {
      // Only run if sections are available
      if (!sections || sections.length === 0) return;

      const scrollPosition = window.scrollY + 200; // Adding offset for header

      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i].id);
        if (!section) continue;

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, [sections]);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -120; // Adjust this value based on your header height
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };
  return (
    <section
      className={`breadcrumbs ${dark ? "bg-dark-1" : ""}`}
      style={{
        marginTop: "50px",
        backgroundColor: "#f5f0ff",
        position: "sticky",
        top: 0,
        zIndex: 100,
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {sections &&
          sections.map((section, index) => (
            <div
              key={index}
              className={`breadcrumbs__item ${dark ? "text-dark-3" : ""} ${activeSection === section.id ? "active" : ""
                }`}
              style={{
                cursor: "pointer",
                fontWeight: activeSection === section.id ? "bold" : "normal",
                color: activeSection === section.id ? "#f2775e" : "#000000",
                padding: "5px 10px",
               

              }}
            >
              <a
                href={`#${section.id}`}
                onClick={(e) => handleLinkClick(e, section.id)}
              >
                {section.title}
              </a>
            </div>
          ))}
      </div>
    </section>
  );

}