// services/api.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponse, ResumeData, User } from "../types/resume";
import { baseQueryWithReauth } from "./baseQuery";

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Resumes"],
  endpoints: (builder) => ({
    me: builder.query<ApiResponse<User>, void>({
      query: () => `/users/me`,
      providesTags: ["User"],
    }),

    login: builder.mutation<
      ApiResponse<{ accessToken: string; refreshToken: string }>,
      { email: string; password: string }
    >({
      query: (body) => ({
        url: `/users/login`,
        method: "POST",
        body,
      }),
    }),

    register: builder.mutation<
      ApiResponse<User>,
      Omit<User, "_id" | "active" | "role"> & { confirmPassword: string }
    >({
      query: (body) => ({
        url: `/users/register`,
        method: "POST",
        body,
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: `/users/logout`,
        method: "POST",
      }),
      invalidatesTags: ["User", "Resumes"],
    }),

    refreshToken: builder.mutation<
      ApiResponse<{ accessToken: string }>,
      { refreshToken: string }
    >({
      query: (body) => ({
        url: `/users/refresh`,
        method: "POST",
        body,
      }),
    }),

    sendFile: builder.mutation<ApiResponse<any>, FormData>({
      query: (formData) => ({
        url: `/users/send-email`,
        method: "POST",
        body: formData,
      }),
    }),

    uploadPdf: builder.mutation<ApiResponse<{ url: string }>, FormData>({
      query: (formData) => ({
        url: `/resumes/upload-pdf`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Resumes"],
    }),

    createResume: builder.mutation<
      ApiResponse<{ id: string; url: string }>,
      ResumeData
    >({
      query: (resumeData) => ({
        url: `/resumes/create`,
        method: "POST",
        body: resumeData,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Resumes"],
    }),

    getResumes: builder.query<ApiResponse<any>, string>({
      query: (userId) => ({
        url: `/users/${userId}/resumes`,
        method: "GET",
      }),
      providesTags: (_result, _error, userId) => [
        { type: "Resumes", id: userId },
      ],
    }),

    getResumeById: builder.query<ApiResponse<any>, string>({
      query: (id) => ({
        url: `/resumes/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Resumes", id }],
    }),

    updateResume: builder.mutation<ApiResponse<any>, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/resumes/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Resumes", id },
      ],
    }),

    deleteResume: builder.mutation<ApiResponse<any>, string>({
      query: (id) => ({
        url: `/resumes/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Resumes", id },
      ],
    }),
  }),
});

export const {
  useMeQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useSendFileMutation,
  useUploadPdfMutation,
  useCreateResumeMutation,
  useGetResumesQuery,
  useGetResumeByIdQuery,
  useUpdateResumeMutation,
  useDeleteResumeMutation,
} = api;
  
