import React from "react";
import AuthCard from "./components/AuthCard";
import LoginForm from "./components/LoginForm";

const Login = () => {
  return (
    <AuthCard title="Log-In">
      <LoginForm />
    </AuthCard>
  );
};

export default Login;