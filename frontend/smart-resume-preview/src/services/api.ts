import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { User, ApiResponse } from "../types/resume"; // Adjust the path as necessary

// Define the ApiResponse type

const baseUrl = "http://localhost:5000/api";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Access the state from Redux
      const token = (getState() as RootState).auth.accessToken;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    me: builder.query<ApiResponse<User>, void>({
      query: () => `/users/me`,
    }),
    login: builder.mutation<ApiResponse<{ accessToken: string, 
    refreshToken: string }>, { email: string, password: string }>({
      query: (body) => {
        return { url: `/users/login`, method: 'POST', body }
      },
    }),
    register: builder.mutation<ApiResponse<User>, Omit<User, '_id' | 'active' | 'role'> & { confirmPassword: string }>({
      query: (body) => {
        return { url: `/users/register`, method: 'POST', body }
      },
    }),
    updateUser: builder.mutation<ApiResponse<User>, User>({
      query: (body) => {
        return { url: `/users/${body._id}`, method: 'PUT', body }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => {
        return { url: `/users/logout`, method: 'POST', }
      },
    }),
    sendFile: builder.mutation({
        query: (data: FormData) => ({
          url: "users/send-email",
          method: "POST",
          body: data,
        }),

    }),
    uploadPdf: builder.mutation<ApiResponse<{ url: string }>, FormData>({
      query: (formData) => ({
        url: "/users/upload-pdf",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useSendFileMutation,
  useUploadPdfMutation,
} = api;