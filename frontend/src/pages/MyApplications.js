import { useEffect, useState } from "react";

function MyApplications() {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchApplications = async () => {

      try {

        const res = await fetch("http://localhost:5000/api/applications", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        const data = await res.json();

        if (data.success) {
          setApplications(data.data);
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
        My Applications
      </h1>

      {loading && (
        <p className="mt-6 text-gray-600 dark:text-gray-300">
          Loading applications...
        </p>
      )}

      {!loading && applications.length === 0 && (
        <p className="mt-6 text-gray-600 dark:text-gray-300">
          You haven't applied to any jobs yet.
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
              {app.job?.company} • {app.job?.location}
            </p>

            <span
              className={`inline-block px-3 py-1 text-sm font-medium rounded mt-2 ${getStatusBadge(app.status)}`}
            >
              {app.status}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MyApplications;