import { useState } from "react";
import toast from "react-hot-toast";
import { apiConnector } from "../services/apiConnector";
import { PROJECTS_API } from "../services/apis";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const [form, setForm] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiConnector("post", PROJECTS_API.CREATE, form);
      toast.success("Project created!");
      navigate("/projects");
    } catch (err) {
      console.error(err);
      toast.error("Error creating project");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create a New Project</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="input w-full"
          placeholder="Project Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          className="input w-full"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button className="btn bg-blue-600 text-white px-4 py-2 rounded">
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
