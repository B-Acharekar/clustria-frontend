"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import Loader from "@/components/ui/Loader";
import { signup, googleLogin } from '@/services/auth';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  // Reset scroll to top when page loads or refreshes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await signup(name, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async (credentialResponse: any) => {
    try {
      if (!credentialResponse.credential) {
        setError("Google signup failed");
        return;
      }
      await googleLogin(credentialResponse.credential);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.msg || "Google signup failed");
    }
  };

  return (
     <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
    <div className="relative min-h-screen w-full bg-gray-900 overflow-hidden flex items-center justify-center px-4">
      {/* RetroGrid Full Background */}
      <div className="absolute inset-0 z-0">
        <RetroGrid />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Loader Overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60">
          <Loader />
        </div>
      )}

      {/* Signup Form */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <TypingAnimation className="text-4xl font-extrabold mb-6 text-center">
          SIGN UP
        </TypingAnimation>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <InteractiveHoverButton
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-black transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign Up"}
          </InteractiveHoverButton>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-2 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Google Signup Button */}
        {/* <button
          onClick={handleGoogleSignup}
          disabled={loading}
          className="flex items-center justify-center w-full py-2.5 px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 transition-all duration-200 text-gray-700 font-medium shadow-sm disabled:opacity-50"
        >
          <svg
            className="w-5 h-5 mr-3"
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
          {loading ? "Signing in..." : "Continue with Google"}
        </button> */}
        <GoogleLogin
          onSuccess={handleGoogleSignup}
          onError={() => setError("Google signup failed")}
          size="large"
          shape="rectangular"
          text="continue_with"
          width="100%"
        />
        
        {/* Link to Login */}
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
    </GoogleOAuthProvider>
  );
}
