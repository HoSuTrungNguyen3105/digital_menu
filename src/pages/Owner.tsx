import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { registerOwner } from "../api/auth.api";
import Button from "../components/Button";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export default function OwnerRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    setApiError("");
    setSuccess("");
    setLoading(true);

    try {
      await registerOwner({
        ownername: data.name, // backend expects ownername
        email: data.email,
        password: data.password,
      });

      setSuccess(
        "Account created successfully. Please check your email to verify your account before logging in."
      );

      // Optional: redirect after few seconds
      setTimeout(() => navigate("/login"), 3000);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setApiError(
        error?.response?.data?.message ||
          "Owner already exists or something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl mx-auto mb-4 shadow-lg shadow-orange-500/20">
            Q
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Create Owner Account
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Register as a restaurant owner
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm font-semibold">Full Name</label>
            <div className="relative mt-2">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 3, message: "Minimum 3 characters" },
                })}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-black/5"
                placeholder="Anil Kumar"
              />
            </div>
              <p className="text-xs text-red-500 mt-1">{errors.name?.message}</p>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold">Email</label>
            <div className="relative mt-2">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-black/5"
                placeholder="owner@email.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold">Password</label>
            <div className="relative mt-2">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-black/5"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Error */}
          {apiError && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">
              {apiError}
            </p>
          )}

          {/* Success */}
          {success && (
            <p className="text-sm text-green-700 bg-green-50 p-3 rounded-xl">
              {success}
            </p>
          )}

          <Button loading={loading} title="Create Account" />

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3.5 rounded-xl font-bold flex justify-center gap-2 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:hover:scale-100"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-orange-600 hover:text-orange-700"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
