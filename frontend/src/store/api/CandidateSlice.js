import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://mern-election.onrender.com/api/v1";

const Candidate = createApi({
  reducerPath: "candidate",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCandidates: builder.query({
      query: () => "/candidates",
    }),
    getVerifiedCandidates: builder.query({
      query: () => "/candidates/verified",
    }),
    getCandidateVoters: builder.query({
      query: (id) => `/vote/candidate/${id}`,
    }),
    getOneCandidate: builder.query({
      query: (id) => `/candidates/${id}`,
    }),
    updateCandidate: builder.mutation({
      query: (updatedCandidate) => {
        const formData = new FormData();
        formData.append("firstName", updatedCandidate.firstName);
        formData.append("lastName", updatedCandidate.lastName);
        formData.append("email", updatedCandidate.email);
        if (updatedCandidate.photo) {
          formData.append("photo", updatedCandidate.photo);
        }

        return {
          url: `/candidates/update-me`,
          method: "PATCH",
          body: formData,
        };
      },
    }),
    updateCandidatePassword: builder.mutation({
      query: (updatedPassword) => ({
        url: `/candidates/update-password`,
        method: "PATCH",
        body: updatedPassword,
      }),
    }),
  }),
});

export const {
  useGetCandidatesQuery,
  useGetCandidateVotersQuery,
  useGetOneCandidateQuery,
  useGetVerifiedCandidatesQuery,
  useUpdateCandidateMutation,
  useUpdateCandidatePasswordMutation,
} = Candidate;

export default Candidate;
