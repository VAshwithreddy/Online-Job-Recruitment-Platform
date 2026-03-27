import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ApplyForm from "../components/ApplyForm";

function JobDetails() {

  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {

    const fetchJob = async () => {

      try {

        const res = await fetch(`http://localhost:5000/api/jobs/${id}`);
        const data = await res.json();

        setJob(data.data);

      } catch (error) {
        console.error(error);
      }

    };

    fetchJob();

  }, [id]);

  if (!job) return <div className="p-10 text-white">Loading...</div>;

  return (

    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        {job.title}
      </h1>

      <p className="text-gray-600 dark:text-gray-300 mt-2">
        {job.company} • {job.location}
      </p>

      <p className="mt-4 text-gray-700 dark:text-gray-300">
        {job.description}
      </p>

      <div className="mt-6 space-y-2 text-gray-700 dark:text-gray-300">

        <p>
          <strong>Experience:</strong> {job.experience}
        </p>

        <p>
          <strong>Type:</strong> {job.type}
        </p>

        <p>
          <strong>Salary:</strong> ₹{job.salary.min} - ₹{job.salary.max}
        </p>

      </div>

      <ApplyForm jobId={job._id} />

    </div>
  );
}

export default JobDetails;