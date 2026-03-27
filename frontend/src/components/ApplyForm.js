import { useState } from "react";

function ApplyForm({ jobId }) {

  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("job", jobId);
    formData.append("resume", resume);
    formData.append("coverLetter", coverLetter);

    try {

      const res = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: formData
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Application submitted successfully!");
      } else {
        setMessage(data.message);
      }

    } catch (error) {
      console.error(error);
      setMessage("Error submitting application");
    }
  };

  return (

    <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">

      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Apply for this Job
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-gray-700 dark:text-gray-300">
            Upload Resume
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
            className="block w-full text-sm text-gray-700 dark:text-gray-200
               file:mr-4 file:py-2 file:px-4
               file:rounded-lg file:border-0
               file:bg-blue-600 file:text-white
               hover:file:bg-blue-700"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300">
            Cover Letter
          </label>
          <textarea
            rows="4"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full mt-2 p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit Application
        </button>

      </form>

      {message && (
        <p className="mt-4 text-green-600 dark:text-green-400">
          {message}
        </p>
      )}

    </div>

  );
}

export default ApplyForm;