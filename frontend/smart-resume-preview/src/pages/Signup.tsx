import { useState } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useRegisterMutation } from "../services/api";
import { User } from "../types/resume";
import { Eye, EyeOff } from "lucide-react";

const validation = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required").min(5).max(16),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

type FormData = yup.InferType<typeof validation>;

export default function SignupForm() {
  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    resolver: yupResolver(validation),
    mode: "onChange",
  });

  const handleDashboardClick = () => {
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data as Omit<User, '_id' | 'active' | 'role'> & { confirmPassword: string }).unwrap();
      toast.success("User registered successfully!");
      navigate("/login", { replace: true });
    } catch (error: any) {
      const validationError = error?.data?.data?.errors?.[0]?.msg;
      toast.error(
        validationError ?? error?.data?.message ?? "Something went wrong!"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#e8f0f8] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-300 px-6 py-4 flex items-center justify-between shadow-sm">
        <div 
          className="font-extrabold text-2xl text-[#1e4976] cursor-pointer hover:text-[#4285f4] transition-colors"
          onClick={handleDashboardClick}
        >
          Dashboard
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8 border border-[#d5e5f6]">
          <h1 className="text-2xl font-bold text-[#1e4976] mb-2">Create Account</h1>
          <p className="text-gray-600 mb-6">Register to get started.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-[#1e4976]">
                Name
              </label>
              <input
                type="text"
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.name ? 'border-red-500' : 'border-[#a3c2e2]'
                } bg-[#f8fafd] focus:ring-2 focus:ring-[#4285f4] focus:border-transparent outline-none transition-colors`}
                placeholder="Full Name"
                {...register("name")}
                autoFocus
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-[#1e4976]">
                Email Address
              </label>
              <input
                type="email"
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-[#a3c2e2]'
                } bg-[#f8fafd] focus:ring-2 focus:ring-[#4285f4] focus:border-transparent outline-none transition-colors`}
                placeholder="you@example.com"
                {...register("email")}
                autoComplete="email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-[#1e4976]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.password ? 'border-red-500' : 'border-[#a3c2e2]'
                  } bg-[#f8fafd] focus:ring-2 focus:ring-[#4285f4] focus:border-transparent outline-none transition-colors`}
                  placeholder="••••••••"
                  {...register("password")}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#1e4976]"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-[#1e4976]">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-[#a3c2e2]'
                  } bg-[#f8fafd] focus:ring-2 focus:ring-[#4285f4] focus:border-transparent outline-none transition-colors`}
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#1e4976]"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className={`w-full py-3 rounded-lg text-white font-semibold text-base mt-6 ${
                !isValid
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#1e4976] hover:bg-[#0d3c6e]'
              } transition-colors shadow-md`}
            >
              Sign Up
            </button>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{" "}
                <NavLink
                  to="/login"
                  className="text-[#4285f4] font-medium hover:underline"
                >
                  Log in
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>

      
    </div>
  );
}