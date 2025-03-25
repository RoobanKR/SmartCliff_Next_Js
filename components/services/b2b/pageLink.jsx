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

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, [sections]);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -120; // Adjust this value based on your header height
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };
  return (
    <section
      className={`breadcrumbs ${dark ? "bg-dark-1" : ""}`}
      style={{
        marginTop: window.innerWidth <= 768 ? "-40px" : "50px",
        backgroundColor: "#f5f0ff",
        position: "sticky",
        top: 0,
        zIndex: 100,
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        overflowX: "auto", // Enables horizontal scrolling
        whiteSpace: "nowrap", // Prevents wrapping
        scrollbarWidth: "none", // Hides scrollbar for Firefox
        msOverflowStyle: "none", // Hides scrollbar for IE/Edge
      }}
    >
      <div style={{ display: "flex",  gap: "10px", width: "100%", }}>
        {sections &&
          sections.map((section, index) => (
            <div
              key={index}
              className={`breadcrumbs__item ${dark ? "text-dark-3" : ""}`}
              style={{
                cursor: "pointer",
                padding: "5px 12px", // Compact button styling
                fontSize: "14px",
                borderRadius: "6px", // Slightly rounded edges for a modern look
                fontWeight: activeSection === section.id ? "600" : "normal",
                color: activeSection === section.id ? "#FFFFFF" : "#000000",
                backgroundColor:
                  activeSection === section.id ? "#5B2C6F" : "transparent",
                border:
                  activeSection === section.id
                    ? "1px solid #5B2C6F"
                    : "1px solid transparent",
                transition: "all 0.2s ease-in-out",
              }}
            >
              <a
                href={`#${section.id}`}
                onClick={(e) => handleLinkClick(e, section.id)}
                style={{
                  textDecoration: "none",
                  color: activeSection === section.id ? "#FFFFFF" : "#5B2C6F",
                }}
              >
                {section.title}
              </a>
            </div>
          ))}
      </div>
    </section>
  );
}
