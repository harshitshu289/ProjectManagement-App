import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { apiConnector } from "../services/apiConnector";
import { AUTH_API } from "../services/apis";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const { name, email, password } = form;

      await apiConnector("post", AUTH_API.REGISTER, { name, email, password }, {
        withCredentials: true,
      });

      toast.success("OTP sent to your email");
      localStorage.setItem("otpUser", JSON.stringify({ name, email, password }));
      navigate("/verify-otp");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Project Management
          </h1>
          <h2 className="text-lg font-semibold text-gray-600">Register</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded transition duration-200"
          >
            Send OTP
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
