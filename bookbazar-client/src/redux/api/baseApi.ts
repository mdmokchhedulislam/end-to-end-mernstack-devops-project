import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  baseQuery: fetchBaseQuery({ baseUrl: "http://44.201.193.84:8080" }),
  endpoints: () => ({}),
});
