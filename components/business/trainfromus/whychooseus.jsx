"use client";
import { getAllCurrentAvailabilities } from "@/redux/slices/bussiness/currentAvailbility/currentAvailbility";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HiringCategories from "./category";
import HowItWorks from "./howitworks";
import HeroSection from "./home";
import FormSection from "./formSection";
import Client from "./client";
import LearningJourney from "./LearningJourney";
import { fetchAllLearningJourneys } from "@/redux/slices/bussiness/learningJourney/learningJourney";

const SkillsetTable2 = () => {
  const sectionRef = useRef(null);

  // Function to scroll to the section
  const scrollToSection = () => {
    if (sectionRef.current) {
      const offset = 100; // Adjust this value to stop slightly above
      const elementPosition =
        sectionRef.current.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    } else {
      console.error("❌ sectionRef.current is NULL");
    }
  };

  const dispatch = useDispatch();

  const { learningJourneys, loading, error } = useSelector(
    (state) => state.learningJourney
  );
  useEffect(() => {
    dispatch(fetchAllLearningJourneys());
    dispatch(getAllCurrentAvailabilities());

  }, [dispatch]);

  // Filter only hirefromus type data
  const hireFromUsData = learningJourneys.filter(
    (journey) => journey.type === "trainfromus"
  );
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="mt-60">
        <HeroSection scrollToSection={scrollToSection} />
      </div>
            {hireFromUsData.length > 0 && (
              <LearningJourney hireFromUsData={hireFromUsData} />
            )}
      
      <HiringCategories />
      <HowItWorks />
      <div ref={sectionRef}>
        <FormSection />
      </div>
    </>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    overflowX: "auto", // Allow horizontal scrolling on small screens
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  highlight: {
    color: "#9c27b0",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
    textAlign: "center",
  },
  th: {
    padding: "12px",
    borderBottom: "2px solid #ddd",
    background: "#f4f4f4",
  },
  td: {
    padding: "12px",
    textAlign: "center",
  },
};

export default SkillsetTable2;
