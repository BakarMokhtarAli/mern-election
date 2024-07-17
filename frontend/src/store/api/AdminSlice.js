import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://mern-election.onrender.com/api/v1";

const Admin = createApi({
  reducerPath: "admin",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Voter"],
  endpoints: (builder) => ({
    getAllAdmins: builder.query({
      query: () => "/voters/admins",
    }),
    getSingleVoter: builder.query({
      query: (id) => `/voters/${id}`,
      providesTags: (result, error, id) => [{ type: "Voter", id }],
    }),
    updateVoter: builder.mutation({
      query: ({ id, updatedVoter }) => ({
        url: `/voters/${id}`,
        method: "PATCH",
        body: updatedVoter,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Voter", id }],
    }),
    DeActiveVoter: builder.mutation({
      query: (id) => ({
        url: `/voters/deactivate/${id}`,
        method: "PATCH",
      }),
    }),
    ActivateVoter: builder.mutation({
      query: (id) => ({
        url: `/voters/activate/${id}`,
        method: "PATCH",
      }),
    }),
    deleteVoter: builder.mutation({
      query: (id) => ({
        url: `/voters/delete-voter/${id}`,
        method: "DELETE",
      }),
    }),
    createVoter: builder.mutation({
      query: (body) => ({
        url: `/voters/`,
        method: "POST",
        body,
      }),
    }),
    createCandidate: builder.mutation({
      query: (body) => ({
        url: `/candidates/`,
        method: "POST",
        body,
      }),
    }),
    getUnverifiedVoters: builder.query({
      query: () => `/voters/unverified`,
    }),
    updateVoterPassword: builder.mutation({
      query: ({ id, updatedPassword }) => ({
        url: `/voters/${id}`,
        method: "PUT",
        body: updatedPassword,
      }),
    }),
    changeToAdmin: builder.mutation({
      query: (id) => ({
        url: `/voters/change-to-admin/${id}`,
        method: "PATCH",
      }),
    }),
    changeToVoter: builder.mutation({
      query: (id) => ({
        url: `/voters/change-to-voter/${id}`,
        method: "PATCH",
      }),
    }),
    deleteCandidate: builder.mutation({
      query: (id) => ({
        url: `/candidates/delete-candidate/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllAdminsQuery,
  useUpdateVoterMutation,
  useGetSingleVoterQuery,
  useDeActiveVoterMutation,
  useActivateVoterMutation,
  useDeleteVoterMutation,
  useCreateVoterMutation,
  useGetUnverifiedVotersQuery,
  useCreateCandidateMutation,
  useUpdateVoterPasswordMutation,
  useChangeToAdminMutation,
  useChangeToVoterMutation,
  useDeleteCandidateMutation,
} = Admin;

export default Admin;
