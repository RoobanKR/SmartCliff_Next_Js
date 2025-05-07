import React from "react";
 
export default function PrivacyPolicy() {

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
 
  const headingStyle = {

    fontSize: isMobile ? "18px" : "25px",

    color: "#8B66A4",

    fontWeight: 600,

    fontFamily: "Montserrat, sans-serif",

    marginBottom: "8px",

  };
 
  const textStyle = {

    fontSize: isMobile ? "14px" : "17px",

    color: "#212529",

    lineHeight: 1.6,

    fontWeight: 400,

    fontFamily: "Montserrat, sans-serif",

  };
 
  const containerStyle = {

    padding: isMobile ? "20px 15px" : "40px 80px",

    maxWidth: "100%",

    boxSizing: "border-box",

  };
 
  const listNumberStyle = {

    ...headingStyle,

    marginRight: "8px",

  };
 
  const dotStyle = {

    fontSize: isMobile ? "16px" : "20px",

    color: "#f79c8d",

    marginRight: "10px",

  };
 
  return (
<section style={containerStyle}>
<ol style={{ paddingLeft: "20px" }}>
<li style={{ marginTop: "25px", ...textStyle }}>
<span style={listNumberStyle}>1.</span>

          SmartCliff, committed to the ethical collection, retention and use of

          information that you provide to us about yourself ("Personal

          Information") on this site ("Site")
</li>
 
        <li style={{ marginTop: "25px", ...textStyle }}>
<span style={listNumberStyle}>2.</span>

          Your Personal Information may comprise the following:
<ul style={{ paddingLeft: "25px", marginTop: "10px" }}>

            {[

              "Your name",

              "Your email and mailing address",

              "Your telephone number",

              "Limited personal details",

              "Any other details SmartCliff may require",

            ].map((item, index) => (
<li

                key={index}

                style={{ display: "flex", alignItems: "flex-start", marginTop: "8px" }}
>
<span style={dotStyle}>●</span>
<span style={textStyle}>{item}</span>
</li>

            ))}
</ul>
</li>
 
        <li style={{ marginTop: "25px", ...textStyle }}>
<span style={listNumberStyle}>3.</span>

          The following Privacy Policy sets forth our understanding with you on

          the collection, use and protection of your Personal Information.

          Please read the entire Privacy Policy.
</li>
 
        <li style={{ marginTop: "25px", ...textStyle }}>
<span style={listNumberStyle}>4.</span>

          YOUR USE OF THE WEBSITE CONSTITUTES YOUR CONSENT TO ALL THE TERMS AND

          CONDITIONS CONTAINED IN THIS PRIVACY POLICY (AS AMENDED FROM TIME TO

          TIME) AND YOU SHALL BE BOUND BY THE SAME.
</li>
 
        <li style={{ marginTop: "25px" }}>
<span style={listNumberStyle}>5.</span>
<span style={{ ...headingStyle, fontSize: isMobile ? "16px" : "20px" }}>

            COLLECTION OF INFORMATION
</span>
</li>
</ol>
 
      <ol style={{ paddingLeft: "30px", marginTop: "30px", listStyleType: "lower-alpha" }}>
<li style={{ marginTop: "20px", ...textStyle }}>
<span style={headingStyle}>1.</span>
<strong style={{ color: "#8B66A4" }}> SITE BROWSING: </strong>

          You browse the Site anonymously. We do not require you to identify

          yourself or reveal any Personal Information while browsing through the

          Site. However, you may not be able to interact with us without

          supplying Personal Information.
</li>
 
        <li style={{ marginTop: "20px", ...textStyle }}>
<span style={headingStyle}>2.</span>

          While browsing the Site, the operating system may record General

          Information such as:
<ol style={{ paddingLeft: "30px", marginTop: "10px", listStyleType: "lower-roman" }}>
<li style={{ marginTop: "6px" }}>

              The date and time of visit, and referrer website.
</li>
<li style={{ marginTop: "6px" }}>

              The type of browser you use (e.g., Chrome, Safari).
</li>
<li style={{ marginTop: "6px" }}>

              The operating system (e.g., Windows, macOS).
</li>
</ol>
</li>
 
        <li style={{ marginTop: "20px", ...textStyle }}>
<span style={headingStyle}>3.</span>

          The General Information is not Personal Information. It is not linked

          to your identity.
</li>
 
        <li style={{ marginTop: "20px", ...textStyle }}>
<span style={headingStyle}>4.</span>

          General Information is used for traffic analysis and public interest

          tracking.
</li>
 
        <li style={{ marginTop: "20px" }}>
<span style={headingStyle}>5.</span>
<strong style={{ color: "#8B66A4" }}>COOKIES: </strong>
<ol style={{ paddingLeft: "30px", marginTop: "10px", listStyleType: "lower-roman" }}>
<li style={textStyle}>

              "Cookies" are small data sent to your browser. They track interest

              areas but not personal identity.
</li>
<li style={{ marginTop: "10px", ...textStyle }}>

              They collect visit time, pages viewed, etc.
</li>
<li style={{ marginTop: "10px", ...textStyle }}>

              TYPES OF COOKIES:
<ol style={{ paddingLeft: "25px", listStyleType: "lower-alpha" }}>
<li>a. Session-based or persistent, depending on their duration.</li>
<li>b. Used for user preference, analytics, etc.</li>
</ol>
</li>
</ol>
</li>
</ol>
</section>

  );

}

 