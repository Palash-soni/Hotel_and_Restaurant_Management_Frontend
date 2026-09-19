import React from "react";
import AuthCard from "./components/AuthCard";
import SignUpForm from "./components/SignUpForm";

const SignUp = () => {
  return (
    <AuthCard title="Sign-Up">
      <SignUpForm />
    </AuthCard>
  );
};

export default SignUp;