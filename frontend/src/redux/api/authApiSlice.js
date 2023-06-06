import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
    }),

    register: builder.mutation({
      query: (credentials) => ({
        url: "/users/register",
        method: "POST",
        body: credentials,
      }),
    }),

    validateToken: builder.query({
      query: (activationToken) => ({
        url: `/users/activation/${activationToken.id}/verify/${activationToken.token}`,
      }),
    }),

    resendToken: builder.mutation({
      query: (id) => ({
        url: `/users/resend-token`,
        method: "POST",
        body: id,
      }),
    }),
  }),
});

export const {
  useValidateTokenQuery,
  useLoginMutation,
  useRegisterMutation,
  useResendTokenMutation,
} = authApiSlice;
