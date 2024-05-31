import React from "react";
import Header from "../../components/header/Header";
import { useGetUserQuery } from "../../redux/api/authApiSlice";

const Home = () => {
  const { data, error, isLoading } = useGetUserQuery();

  console.log(data, error);
  return (
    <div>
      <Header />
    </div>
  );
};

export default Home;
