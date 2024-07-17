import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://mern-election.onrender.com/api/v1";
// const BASE_URL = "http://localhost:5173/api/v1";

const votes = createApi({
  reducerPath: "votes",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllVotes: builder.query({
      query: () => "/vote",
    }),
    getVotersVote: builder.query({
      query: () => "/vote/voter",
    }),
    createVote: builder.mutation({
      query: (id) => ({
        url: `/vote/${id}`,
        method: "POST",
      }),
    }),
    deleteVote: builder.mutation({
      query: () => ({
        url: `/vote/delete-vote`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllVotesQuery,
  useCreateVoteMutation,
  useGetVotersVoteQuery,
  useDeleteVoteMutation,
} = votes;

export default votes;
