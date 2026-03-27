import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PostJob() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [experience, setExperience] = useState("fresher");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          title,
          company,
          location,
          description,
          salary: {
            min: salaryMin,
            max: salaryMax
          },
          experience
        })
      });

      const data = await res.json();

      if (data.success) {
        alert("Job posted successfully!");
        navigate("/dashboard");
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Post a New Job
      </h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">

        <input
          type="text"
          placeholder="Job Title"
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Company"
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          value={company}
          onChange={(e)=>setCompany(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Location"
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
          required
        />

        <textarea
          placeholder="Job Description"
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          required
        />

        <div className="flex gap-4">

          <input
            type="number"
            placeholder="Minimum Salary"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            value={salaryMin}
            onChange={(e)=>setSalaryMin(e.target.value)}
          />

          <input
            type="number"
            placeholder="Maximum Salary"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            value={salaryMax}
            onChange={(e)=>setSalaryMax(e.target.value)}
          />

        </div>

        <select
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          value={experience}
          onChange={(e)=>setExperience(e.target.value)}
        >
          <option value="fresher">Fresher</option>
          <option value="1-2 years">1-2 years</option>
          <option value="3-5 years">3-5 years</option>
          <option value="5+ years">5+ years</option>
        </select>

        <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Post Job
        </button>

      </form>

    </div>
  );
}

export default PostJob;