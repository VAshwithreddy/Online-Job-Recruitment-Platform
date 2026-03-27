import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import FeaturedCompanies from "../components/FeaturedCompanies";
import JobList from "../components/JobList";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/jobs?keyword=${keyword}&location=${location}`);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">

        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
          Find Your <span className="text-blue-600">Dream Job</span>
        </h1>

        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Search thousands of jobs from top companies
        </p>

        <div className="mt-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col md:flex-row gap-4">

          {/* Keyword */}
          <div className="flex items-center border rounded-lg px-3 py-2 flex-1">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Job title or keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full outline-none bg-transparent"
            />
          </div>

          {/* Location */}
          <div className="flex items-center border rounded-lg px-3 py-2 flex-1">
            <FaMapMarkerAlt className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full outline-none bg-transparent"
            />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Search Jobs
          </button>

        </div>

      </div>

      {/* Featured Companies */}
      <FeaturedCompanies />

      {/* Job List */}
      <JobList />

    </div>
  );
}

export default Home;