import { useState } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useLoginMutation } from "../services/api";
import { useDispatch } from 'react-redux';
import { setTokens } from '../store/reducers/authReducer';
import { Eye, EyeOff } from "lucide-react";

const validationSchema = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Minimum 5 characters required")
    .max(16, "Maximum 16 characters allowed"),
});

type FormData = yup.InferType<typeof validationSchema>;

export default function LoginForm() {
  const [loginUser] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const onSubmit = async (data: { email: string; password: string }) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
    
      const loginResponse = await loginUser(data).unwrap();

      if (!loginResponse?.success || !loginResponse?.data?.accessToken ) {
        throw new Error(loginResponse?.message || "Authentication failed");
      }

      

     
      const { accessToken, refreshToken } = loginResponse.data;
      dispatch(setTokens({ accessToken, refreshToken }));

      // Redirect based on role
      const redirectPath = "/dashboard"
    
        
      navigate(redirectPath, { replace: true });
      toast.success("Login successful!");
    } catch (error: any) {
      console.error("Login error:", error);
      
      toast.error(
        error?.status === 401
          ? "Invalid email or password"
          : error?.status === 403
          ? "Account not verified or blocked"
          : error?.message || "Login failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#e8f0f8] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-300 px-6 py-4 flex items-center justify-between shadow-sm">
        <div
          className="font-extrabold text-2xl text-[#1e4976] cursor-pointer hover:text-[#4285f4] transition-colors"
          onClick={() => navigate("/")}
        >
          Dashboard
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8 border border-[#d5e5f6]">
          <h1 className="text-2xl font-bold text-[#1e4976] mb-2">Welcome Back</h1>
          <p className="text-gray-600 mb-6">Please sign in to your account</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-[#1e4976]">Email Address</label>
              <input
                type="email"
                {...register("email")}
                autoComplete="email"
                disabled={isSubmitting}
                placeholder="you@example.com"
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-[#a3c2e2]'
                } bg-[#f8fafd] focus:ring-2 focus:ring-[#4285f4] focus:border-transparent outline-none transition-colors`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-[#1e4976]">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.password ? 'border-red-500' : 'border-[#a3c2e2]'
                  } bg-[#f8fafd] focus:ring-2 focus:ring-[#4285f4] focus:border-transparent outline-none transition-colors`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#1e4976]"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`w-full py-3 rounded-lg text-white font-semibold text-base mt-6 ${
                !isValid || isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1e4976] hover:bg-[#0d3c6e]'
              } transition-colors shadow-md`}
            >
              {isSubmitting ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <NavLink
                  to="/signup"
                  className="text-[#4285f4] font-medium hover:underline"
                >
                  Create one
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
