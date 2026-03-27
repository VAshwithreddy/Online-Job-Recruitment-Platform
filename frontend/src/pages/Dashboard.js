import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
function Dashboard() {
  const { user } = useContext(AuthContext);

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateStatus = async (id, status) => {
  try {

    const res = await fetch(`http://localhost:5000/api/applications/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ status })
    });

    const data = await res.json();

    if (data.success) {

      // update UI without refreshing
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status } : app
        )
      );

    }

  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {

    const fetchApplications = async () => {

      try {

        const res = await fetch("http://localhost:5000/api/applications", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        const data = await res.json();

        console.log("Applications API:", data);

        if (data.success) {
          setApplications(data.data || []);
        }

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }

    };

    fetchApplications();

  }, []);

  const getStatusBadge = (status) => {

  switch (status) {

    case "pending":
      return "bg-yellow-100 text-yellow-800";

    case "shortlisted":
      return "bg-blue-100 text-blue-800";

    case "rejected":
      return "bg-red-100 text-red-800";

    case "hired":
      return "bg-green-100 text-green-800";

    default:
      return "bg-gray-100 text-gray-800";
  }

};

  return (

    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Applications Dashboard
      </h1>
      {user?.role === "employer" && (
        <>
  <Link
    to="/post-job"
    className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  >
    Post New Job  
  </Link>

  <Link
  to="/my-jobs"
  className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
>
  My Jobs
</Link>
</>
)}

      {loading && (
        <p className="mt-6 text-gray-600 dark:text-gray-300">
          Loading applications...
        </p>
      )}

      {!loading && applications.length === 0 && (
        <p className="mt-6 text-gray-600 dark:text-gray-300">
          No applications yet.
        </p>
      )}

      <div className="mt-8 space-y-4">

        {applications.map((app) => (

          <div
            key={app._id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
          >

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              {app.job?.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300">
              Applicant: {app.applicant?.name}
            </p>

            <p className="text-gray-600 dark:text-gray-300">
              Email: {app.applicant?.email}
            </p>

            <span
              className={`inline-block px-3 py-1 text-sm font-medium rounded ${getStatusBadge(app.status)}`}
            >
              {app.status}
            </span>
            

            <div className="mt-3 flex gap-3">

              {app.resume && (
                <a
                  href={`http://localhost:5000/${app.resume}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  View Resume
                </a>
              )}

            </div>  
            
            {user?.role === "employer" && (
  <div className="flex gap-2 mt-4">

    <button
      onClick={() => updateStatus(app._id, "shortlisted")}
      className="bg-yellow-500 text-white px-3 py-1 rounded"
    >
      Shortlist
    </button>

    <button
      onClick={() => updateStatus(app._id, "rejected")}
      className="bg-red-600 text-white px-3 py-1 rounded"
    >
      Reject
    </button>

    <button
      onClick={() => updateStatus(app._id, "hired")}
      className="bg-green-600 text-white px-3 py-1 rounded"
    >
      Hire
    </button>

  </div>
)}

          </div>

        ))}

      </div>

    </div>
  );
}

export default Dashboard;