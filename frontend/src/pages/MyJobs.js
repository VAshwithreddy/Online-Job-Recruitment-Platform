import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyJobs() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchJobs = async () => {

      try {

        const res = await fetch("http://localhost:5000/api/jobs/my-jobs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        const data = await res.json();
        console.log("MyJobs API:", data);

        if (data.success) {
          setJobs(data.data?.jobs || []);
        }

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }

    };

    fetchJobs();

  }, []);

  const deleteJob = async (id) => {

    if (!window.confirm("Delete this job?")) return;

    try {

      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await res.json();

      if (data.success) {
        setJobs((prev) => prev.filter((job) => job._id !== id));
      }

    } catch (error) {
      console.error(error);
    }

  };

  return (

    <div className="max-w-6xl mx-auto p-6">

  <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
    My Posted Jobs
  </h1>

  {loading && (
    <p className="mt-6 text-gray-600 dark:text-gray-300">
      Loading jobs...
    </p>
  )}

  {!loading && jobs.length === 0 && (
    <p className="mt-6 text-gray-600 dark:text-gray-300">
      You haven't posted any jobs yet.
    </p>
  )}

  <div className="mt-8 space-y-4">

    {jobs.map((job) => (

      <div
        key={job._id}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
      >

        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          {job.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300">
          {job.company} • {job.location}
        </p>

        <p className="text-gray-500 text-sm mt-1">
          Applicants: {job.applicationsCount || 0}
        </p>

        <div className="flex gap-3 mt-4">

          <Link
            to={`/jobs/${job._id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            View
          </Link>

          <button
            onClick={() => deleteJob(job._id)}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>

          <Link
            to={`/applicants/${job._id}`}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            View Applicants
          </Link>

        </div>

      </div>

    ))}

  </div>

</div>
  );
}

export default MyJobs;