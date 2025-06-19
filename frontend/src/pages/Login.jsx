import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/auth/authSlice";
import { apiConnector } from "../services/apiConnector";
import { AUTH_API } from "../services/apis";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiConnector("post", AUTH_API.LOGIN, form, {
        withCredentials: true,
      });

     dispatch(setUser({ ...res.user, token: res.token }));
    localStorage.setItem("token", res.token);

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      const msg = err.message || "Login failed";
      toast.error(msg);

      if (msg.toLowerCase().includes("invalid")) {
        toast("New here? Register instead.", { icon: "🔑" });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      {/*  Main Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Project Management
      </h1>

      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm text-gray-700 block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm text-gray-700 block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
