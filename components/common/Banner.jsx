import React from "react";
import styles from "./Banner.css";

const Banner = ({ title, description, imageUrl }) => {
  return (
    <div
      className={`${styles["banner-container"]} banner-container`}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url('${imageUrl}')`,
      }}
    >
      <div className={`${styles["banner-content"]} banner-content`}>
        <h1
          className="display-4"
          style={{ color: "white", fontFamily: "serif" }}
        >
          {title}
        </h1>
        <p className="lead">{description}</p>
      </div>
    </div>
  );
};

export default Banner;
