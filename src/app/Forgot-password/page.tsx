"use client";

import { useState } from "react";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import Loader from "@/components/ui/Loader";
import { forgotPassword, googleLogin } from "@/services/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const data = await forgotPassword(email); // call real backend
      setMessage(data.msg);
    } catch (err: any) {
      setError(err.response?.data?.msg || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      // You can integrate Google OAuth here using `react-google-login` or NextAuth
      const token = "GOOGLE_ID_TOKEN"; // get real token from Google Sign-In
      const data = await googleLogin(token);
      setMessage(`Logged in as ${data.user.name}`);
    } catch (err: any) {
      setError(err.response?.data?.msg || "Google Sign-In failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gray-900 overflow-hidden flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <RetroGrid />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <Loader />
        </div>
      )}

      {/* Forgot Password Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <TypingAnimation className="text-3xl font-extrabold mb-6 text-center">
          Forgot Password
        </TypingAnimation>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {message && <p className="text-sm text-center text-green-600">{message}</p>}
          {error && <p className="text-sm text-center text-red-600">{error}</p>}

          <InteractiveHoverButton
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-black transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Reset Password"}
          </InteractiveHoverButton>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-2 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Try another way label */}
        <p className="text-center text-gray-500 mb-3 font-medium">Try another way</p>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex items-center justify-center w-full py-2 border rounded-lg bg-white hover:bg-gray-50 transition text-gray-700 font-medium shadow-sm"
        >
          <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 533.5 544.3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M533.5 278.4c0-17.4-1.5-34.1-4.3-50.4H272v95.4h146.9c-6.3 34.1-25.2 62.9-53.8 82.1v68h86.9c50.7-46.7 81.5-115.5 81.5-195.1z"
              fill="#4285f4"
            />
            <path
              d="M272 544.3c72.6 0 133.5-24 178-65.3l-86.9-68c-24.1 16.2-55 25.9-91.1 25.9-70.1 0-129.6-47.3-150.8-110.4h-90v69.5c44.4 88.1 135.5 148.3 240.8 148.3z"
              fill="#34a853"
            />
            <path
              d="M121.2 326.5c-10.3-30.1-10.3-62.5 0-92.6v-69.5h-90c-39.5 78.9-39.5 171.4 0 250.3l90-69.5z"
              fill="#fbbc04"
            />
            <path
              d="M272 107.7c39.5 0 75.1 13.6 103 40.2l77.4-77.4C405.5 24 344.6 0 272 0 166.7 0 75.6 60.2 31.2 148.3l90 69.5c21.2-63.1 80.7-110.1 150.8-110.1z"
              fill="#ea4335"
            />
          </svg>
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
}
