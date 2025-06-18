import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { apiConnector } from "../services/apiConnector";
import { AUTH_API } from "../services/apis";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const otpUser = JSON.parse(localStorage.getItem("otpUser"));

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otpUser) {
      toast.error("No registration data found.");
      return navigate("/register");
    }

    try {
      await apiConnector(
        "post",
        AUTH_API.VERIFY_OTP,
        { email: otpUser.email, otp },
        { withCredentials: true }
      );

      localStorage.removeItem("otpUser");
      toast.success("OTP verified! Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleVerify}
        className="bg-white p-6 rounded shadow-md space-y-4 w-80"
      >
        <h2 className="text-xl font-bold text-center">Verify OTP</h2>

        <input
          type="text"
          placeholder="Enter OTP"
          className="input w-full"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button className="btn w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
