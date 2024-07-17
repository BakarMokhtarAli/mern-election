import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://mern-election.onrender.com/api/v1";

const voter = createApi({
  reducerPath: "voter",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getVoters: builder.query({
      query: () => "/voters",
    }),
    getSingleVoter: builder.query({
      query: (id) => `/voters/${id}`,
    }),
    getDeactivatedVoters: builder.query({
      query: () => ({
        url: `/voters/deactivated`,
        credentials: "include",
      }),
    }),
    logOutVoter: builder.mutation({
      query: () => ({
        url: `/auth/signout`,
        method: `POST`,
      }),
    }),
    deactiveYourAccount: builder.mutation({
      query: () => ({
        url: `/auth/delete-me/`,
        method: "PATCH",
      }),
    }),
    updateVoterPassword: builder.mutation({
      query: (updatePassword) => ({
        url: `/auth/update-password`,
        method: "PATCH",
        body: updatePassword,
      }),
    }),
    updateVoter: builder.mutation({
      query: (updatedVoter) => {
        const formData = new FormData();
        formData.append("firstName", updatedVoter.firstName);
        formData.append("lastName", updatedVoter.lastName);
        formData.append("email", updatedVoter.email);
        if (updatedVoter.photo) {
          formData.append("photo", updatedVoter.photo);
        }

        return {
          url: `/auth/update-me`,
          method: "PATCH",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useGetVotersQuery,
  useGetSingleVoterQuery,
  useLogOutVoterMutation,
  useGetDeactivatedVotersQuery,
  useDeactiveYourAccountMutation,
  useUpdateVoterPasswordMutation,
  useUpdateVoterMutation,
} = voter;

export default voter;
