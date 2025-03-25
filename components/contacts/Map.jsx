"use client";
import React from "react";

export default function MapComponent() {
  return (
    <div
      style={{
        height: "50vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.387690892288!2d76.94261427355549!3d11.009511154854161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8590b89fdb05f%3A0x4874f32fe1c2c1b6!2sSmartCliff%20Learning%20Solutions%20LLP!5e0!3m2!1sen!2sin!4v1740371670184!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: "0", borderRadius: "10px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
