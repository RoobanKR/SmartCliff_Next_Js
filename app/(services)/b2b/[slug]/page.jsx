"use client";
import React, { useState, useEffect } from "react";
import HTD from "@/components/services/b2b/HTD/HTD";
import FooterTwo from "@/components/layout/footers/Footer";

const page = () => {
  return (
    <>
      <HTD />
      <div style={{zIndex: -1}}>
      <FooterTwo/>
      </div>
    </>
  );
};

export default page;
