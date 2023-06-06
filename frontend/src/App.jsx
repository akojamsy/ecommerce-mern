import React from "react";
import { Route, Routes } from "react-router-dom";
import { Auth, UserActivationPage } from "./routes";

const App = () => {
  return (
    <Routes>
      <Route path='/auth' element={<Auth />} />
      <Route
        path='/activation/:id/verify/:token'
        element={<UserActivationPage />}
      />
    </Routes>
  );
};

export default App;
