import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import TicketForm from "./TicketForm";
import TicketList from "./TicketList";
import { apiConnector } from "../services/apiConnector";
import { PROJECTS_API } from "../services/apis";
import { MdOutlineDeleteOutline } from "react-icons/md";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [ticketFormVisibleForId, setTicketFormVisibleForId] = useState(null);
  const user = useSelector((state) => state.auth.user);

  //  Fetch all projects
  const fetchProjects = useCallback(async () => {
    try {
      const res = await apiConnector("get", PROJECTS_API.GET_ALL);
      setProjects(res);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load projects");
    }
  }, []);

  //  Delete a project if owned
  const handleDeleteProject = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      await apiConnector("delete", PROJECTS_API.DELETE(id));
      toast.success("Project deleted");
      if (selectedProject?._id === id) setSelectedProject(null);
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete project");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">All Projects</h2>

      <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {projects.map((proj) => {
          const userId = user?.id || user?._id;
          const isOwner = proj.createdBy?._id === userId;

          return (
            <li
              key={proj._id}
              onClick={() => setSelectedProject(proj)}
              className={`rounded-xl shadow-md p-5 bg-white transition-all duration-300 cursor-pointer hover:shadow-lg border-2 ${
                selectedProject?._id === proj._id ? "border-blue-500" : "border-transparent"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{proj.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{proj.description}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Created by: <strong>{proj.createdBy?.name || "Unknown"}</strong>
                  </p>
                </div>

                {/*  Show Delete only if user is owner */}
                {isOwner && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProject(proj._id);
                    }}
                     className="text-red-500 hover:text-red-700 p-2 rounded-full transition-transform duration-200 hover:scale-110"
                    title="Delete Project"
                  >
                    <MdOutlineDeleteOutline className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/*  Add Ticket */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setTicketFormVisibleForId(
                    ticketFormVisibleForId === proj._id ? null : proj._id
                  );
                }}
                className="mt-4 inline-block text-sm text-blue-600 font-medium hover:underline"
              >
                {ticketFormVisibleForId === proj._id ? "Cancel" : "Add Ticket"}
              </button>

              {/*  Ticket Form Modal */}
              {ticketFormVisibleForId === proj._id && (
                <TicketForm
                  projectId={proj._id}
                  onSuccess={fetchProjects}
                  onClose={() => setTicketFormVisibleForId(null)}
                />
              )}
            </li>
          );
        })}
      </ul>

      {/*  Ticket List */}
      {selectedProject && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Tickets for: <span className="text-blue-600">{selectedProject.title}</span>
          </h3>
          <TicketList projectId={selectedProject._id} />
        </div>
      )}
    </div>
  );
};

export default Projects;
