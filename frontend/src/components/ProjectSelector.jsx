import { useEffect, useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { PROJECTS_API } from "../services/apis";

const ProjectSelector = ({ selectedProjectId, setSelectedProjectId }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await apiConnector("get", PROJECTS_API.GET_ALL);
        setProjects(res);
      } catch (err) {
        console.error("Failed to load projects:", err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <select
      className="w-full md:w-80 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm transition-all"
      value={selectedProjectId || ""}
      onChange={(e) => setSelectedProjectId(e.target.value)}
    >
      <option value="" disabled>
         Select a project
      </option>
      {projects.map((p) => (
        <option key={p._id} value={p._id}>
          {p.title}
        </option>
      ))}
    </select>
  );
};

export default ProjectSelector;
