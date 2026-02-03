import { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // Stores validation messages
  const navigate = useNavigate(); // Initialize navigation
  const validate = (data) => {
    const newErrors = {};
    if (!data.name.trim()) newErrors.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = "Email is invalid";
    if (data.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const submit = async (e) => {
    e.preventDefault();
    setErrors({});

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    // 1. Client-side validation check
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      await axios.post("/auth/signup", formData);
      alert("Signup successful! Welcome aboard.");
      navigate("/login");
      
    } catch (err) {
      // 2. Server-side validation check (e.g., Email already exists)
      if (err.response && err.response.data) {
        setErrors({ server: err.response.data.message || "Signup failed" });
      } else {
        setErrors({ server: "Network error. Please try again later." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">Join our community today</p>
        </div>

        {errors.server && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg text-center">
            {errors.server}
          </div>
        )}

        <form className="mt-8 space-y-5" onSubmit={submit} noValidate>
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              name="name"
              className={`mt-1 block w-full px-4 py-3 bg-gray-50 border rounded-lg transition duration-200 outline-none focus:ring-2 ${errors.name ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"
                }`}
              placeholder="John Doe"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500 font-medium">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              name="email"
              type="email"
              className={`mt-1 block w-full px-4 py-3 bg-gray-50 border rounded-lg transition duration-200 outline-none focus:ring-2 ${errors.email ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"
                }`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              className={`mt-1 block w-full px-4 py-3 bg-gray-50 border rounded-lg transition duration-200 outline-none focus:ring-2 ${errors.password ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"
                }`}
              placeholder="••••••••"
            />
            {errors.password && <p className="mt-1 text-xs text-red-500 font-medium">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition duration-200 ${loading ? "opacity-70 cursor-not-allowed" : "active:scale-[0.98]"
              }`}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
}