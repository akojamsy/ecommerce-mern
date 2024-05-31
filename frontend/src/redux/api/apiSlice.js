import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
  // prepareHeaders: (headers, { getState }) => {
  //   return headers;
  // },
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
});
