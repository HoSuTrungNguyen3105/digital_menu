import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, UtensilsCrossed } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { loginOwner } from "../api/auth.api";

export default function OwnerLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [verifyHint, setVerifyHint] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setApiError("");
    setVerifyHint(false);
    setLoading(true);

    try {
      const res = await loginOwner({
        email: data.email,
        password: data.password,
      });

      const { data: userData } = res;

      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData.user));

      // only after successful login
      navigate("/dashboard");
    } catch (err: any) {
      const message = err?.response?.data?.message;

      if (
        message?.toLowerCase().includes("verify") ||
        message?.toLowerCase().includes("not verified")
      ) {
        setApiError("Please verify your email before logging in.");
        setVerifyHint(true);
      } else {
        setApiError(message || "Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-orange-500/10 p-8 border border-orange-100"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl mx-auto mb-4 shadow-lg shadow-orange-500/20">
            <UtensilsCrossed className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">Owner Login</h1>
          <p className="text-gray-500 text-sm mt-2">
            Access your restaurant dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <div className="relative mt-2">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                placeholder="owner@restaurant.com"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {(errors.email as any)?.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="relative mt-2">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {(errors.password as any)?.message}
              </p>
            )}
          </div>

          {/* Error */}
          {apiError && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-xl border border-red-100 flex items-center gap-2">
              <span className="font-bold">!</span> {apiError}
            </p>
          )}

          {/* Verify hint */}
          {verifyHint && (
            <p className="text-sm text-blue-600 bg-blue-50 p-3 rounded-xl border border-blue-100">
              Didn’t get the email?{" "}
              <Link
                to="/resend-verification"
                className="font-semibold underline hover:text-blue-700"
              >
                Resend verification
              </Link>
            </p>
          )}

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3.5 rounded-xl font-bold flex justify-center gap-2 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:hover:scale-100"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-8 text-gray-500">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-orange-600 hover:text-orange-700"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
