import Link from "next/link";

import { socialMediaLinks } from "../../data/socialLinks";
import React from "react";

export default function Socials({ componentsClass, textSize }) {
  return (
    <>
      {socialMediaLinks.map((link, index) => (
        <Link
          key={index}
          className={componentsClass ? componentsClass : ""}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className={`${link.iconClassName} ${textSize}`}></i>
        </Link>
      ))}
    </>
  );
}

