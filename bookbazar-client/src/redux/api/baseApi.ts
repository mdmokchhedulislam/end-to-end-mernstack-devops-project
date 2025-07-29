import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  baseQuery: fetchBaseQuery({ baseUrl: "https://bookbazzar-server-ph-a4.vercel.app" }),
  endpoints: () => ({}),
});
