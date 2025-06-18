import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { clearUser } from "../utils/auth/authSlice";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  const confirmLogout = () => {
    dispatch(clearUser());
    navigate("/login");
  };

  // Hide navbar on login/register pages
  const hideNavbarOn = ["/login", "/register", "/verify-otp"];
  if (hideNavbarOn.includes(location.pathname)) return null;

  return (
    <>
      <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center rounded-b mb-4">
        <div className="flex gap-4 font-semibold text-sm">
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/projects" className="hover:underline">
            Projects
          </Link>
          <Link to="/create-project" className="hover:underline">
            Create Project
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm hidden md:block">
            Logged in as: <span className="font-bold">{user?.name}</span>
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </nav>

      {/*  Logout Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Confirm Logout</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
