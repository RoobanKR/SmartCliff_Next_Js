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
   <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2983.184590182568!2d76.94251937355544!3d11.009644054851648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8591eefc56b9d%3A0x95a4642b32007ee7!2sNILGIRIS%20SUPER%20MARKET%20-%20SNV%20HOLDINGS%20PRIVATE%20LIMITED-!5e1!3m2!1sen!2sin!4v1743164672537!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  );
}
