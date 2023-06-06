import React, { useState } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

const Auth = () => {
  const [authType, setAuthType] = useState("login");
  return (
    <div>
      {authType !== "register" ? (
        <Login setAuthType={setAuthType} />
      ) : (
        <Register setAuthType={setAuthType} />
      )}
    </div>
  );
};

export default Auth;
