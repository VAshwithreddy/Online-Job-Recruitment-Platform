import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Applicants() {

  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {

    const fetchApplications = async () => {

      try {

        const res = await fetch(
          `http://localhost:5000/api/applications/job/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        const data = await res.json();

        if (data.success) {
          setApplications(data.data);
        }

      } catch (error) {
        console.error(error);
      }

    };

    fetchApplications();

  }, [jobId]);

  return (

    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Applicants
      </h1>

      <div className="mt-8 space-y-4">

        {applications.length === 0 && (
          <p className="text-gray-600 dark:text-gray-300">
            No applicants have applied for this job yet.
          </p>
        )}

        {applications.map((app) => (

          <div
            key={app._id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
          >

            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {app.applicant.name}
            </h3>

            <p className="text-gray-600 dark:text-gray-300">
              {app.applicant.email}
            </p>

            <p className="text-gray-500">
              Status: {app.status}
            </p>

            {app.resume && (
              <a
                href={`http://localhost:5000/${app.resume}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded"
              >
                View Resume
              </a>
            )}

          </div>

        ))}

      </div>

    </div>
  );
}

export default Applicants;