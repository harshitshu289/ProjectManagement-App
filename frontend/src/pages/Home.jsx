
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Project Management</h1>
      <p className="text-gray-600 mb-10 max-w-md">
        A powerful issue tracking and team collaboration tool to manage your projects efficiently.
      </p>
      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
