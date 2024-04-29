import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ErrorPage from "./pages/ErrorPage";
import AddTask from "./components/AddTask";
import Sidebar from "./components/Sidebar";
import Pending from "./components/Pending";

const App = () => {
  return (
    <div className="bg-[#f4f4f5]">
      <Router>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route
            path="/"
            element={
              <div className="flex relative">
                <Sidebar />

                <Dashboard />
              </div>
            }
          />
          <Route
            path="/tasks/pending"
            element={
              <div className="flex">
                <Sidebar />
                <Pending />
              </div>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/create" element={<AddTask />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
