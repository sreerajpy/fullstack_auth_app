import { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error state

    const form = e.target;

    try {
      const res = await axios.post("/auth/login", {
        email: form.email.value,
        password: form.password.value,
      });

      localStorage.setItem("token", res.data.token);

      // Success Feedback
      alert("Login successful!");
      window.location.href = "/usermanagement"; // Simple redirect
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        {/* Branding/Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl">G</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 italic tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-500">Please enter your details to sign in.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-100">
            {error}
          </div>
        )}

        <form className="mt-6 space-y-5" onSubmit={submit} noValidate>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="name@company.com"
              className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label className="block text-sm font-semibold text-gray-700">Password</label>
            
            </div>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition duration-300 transform active:scale-[0.98] disabled:bg-gray-400"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Or continue with</span></div>
        </div>

        <p className="text-center text-sm text-gray-600">
          New here? <a href="/signup" className="text-blue-600 font-semibold hover:text-blue-700">Create an account</a>
        </p>
      </div>
    </div>
  );
}