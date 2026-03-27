import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function JobList() {

  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchJobs = async () => {
    try {

      const res = await fetch(
        `http://localhost:5000/api/jobs?keyword=${keyword}&location=${location}&type=${type}&page=${page}&limit=6`
      );

      const data = await res.json();

      setJobs(data.data.jobs);
      setTotalPages(data.data.totalPages);

    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-16">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Latest Jobs
        </h2>

        {/* Search Filters */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mt-8">

          <div className="grid md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Search job title..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="border p-2 rounded"
            />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border p-2 rounded"
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">All Types</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
              <option value="remote">Remote</option>
            </select>

          </div>

          <button
            onClick={fetchJobs}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search Jobs
          </button>

        </div>

        {/* Job Cards */}
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {jobs.map((job) => (

            <Link
              to={`/jobs/${job._id}`}
              key={job._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-xl transition block hover:-translate-y-1 duration-300"
            >

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {job.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {job.company}
              </p>

              <p className="text-gray-500 text-sm mt-1">
                📍 {job.location}
              </p>

              <p className="text-gray-500 text-sm mt-1">
                💼 {job.type}
              </p>

              <p className="text-gray-500 text-sm mt-1">
                💰 ₹{job.salary.min} - ₹{job.salary.max}
              </p>

              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Apply Now
              </button>

            </Link>

          ))}

        </div>
        <div className="flex justify-center mt-10 gap-4">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-gray-700 dark:text-white">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}

export default JobList;