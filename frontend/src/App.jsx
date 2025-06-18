
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Projects from "./pages/Projects";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import CreateProject from "./pages/createProject";

function AppContent() {
  const location = useLocation();

  //  Hide navbar on auth pages
  const hideNavbarOn = ["/", "/login", "/register", "/verify-otp"];
  const shouldHideNavbar = hideNavbarOn.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/projects" element={ <ProtectedRoute> <Projects /> </ProtectedRoute>}/>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/create-project"
  element={
    <ProtectedRoute>
      <CreateProject />
    </ProtectedRoute>
  }
/>
      </Routes>
    </div>
  );
}

function App() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Router>
        <AppContent />
      </Router>
    </>
  );
}

export default App;
