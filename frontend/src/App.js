import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PostJob from "./pages/PostJob"; 
import MyJobs from "./pages/MyJobs"; 
import Applicants from "./pages/Applicants";
import MyApplications from "./pages/MyApplications";    

function App() {
  return (
    <Router>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">

        <Navbar />

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/jobs/:id" element={<JobDetails />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} /> 

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/post-job" element={<PostJob />} />

          <Route path="/my-jobs" element={<MyJobs />} /> 
          
          <Route path="/applicants/:jobId" element={<Applicants />} />

          <Route path="/my-applications" element={<MyApplications />} />

        </Routes>

      </div>

    </Router>
  );
}

export default App;