import React from "react";
import { Route, Routes } from "react-router-dom";
import { Auth, UserActivationPage, Home } from "./routes";

const App = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route
          path='/activation/:id/verify/:token'
          element={<UserActivationPage />}
        />
      </Route>
    </Routes>
  );
};

export default App;
