import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  baseQuery: fetchBaseQuery({ baseUrl: "http://52.206.120.212:8080" }),
  endpoints: () => ({}),
});
