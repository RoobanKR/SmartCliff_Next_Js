import Preloader from "@/components/common/Preloader";

import HeaderAuth from "@/components/layout/headers/HeaderAuth";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import AuthImageMove from "@/components/others/AuthImageMove";
import LoginForm from "@/components/others/LoginForm";
import SignUpForm from "@/components/others/SignUpForm";
import Terms from "@/components/terms/Terms";
import React from "react";

export default function page() {
  return (
    <div className="main-content  ">
      <Preloader />

      <HeaderSeven />
      <div className="content-wrapper js-content-wrapper overflow-hidden mt-90">
        <section className="form-page js-mouse-move-container">
          <AuthImageMove />
          <SignUpForm />
        </section>
      </div>
    </div>
  );
}
