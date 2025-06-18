import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProjectSelector from "../components/ProjectSelector";
import KanbanBoard from "../components/KanbanBoard";

const Dashboard = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    document.title = "Project Management";
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      {/*  Page Title */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">
        Welcome, {user?.name}!
      </h1>
      <p className="text-sm sm:text-base text-gray-600 mb-6">
        Select a project below to manage its tickets using the Kanban board.
      </p>

      {/*  Project Selector */}
      <div className="mb-6">
        <ProjectSelector
          selectedProjectId={selectedProject?._id}
          setSelectedProjectId={(id) =>
            setSelectedProject((prev) =>
              prev?._id === id ? prev : { _id: id }
            )
          }
        />
      </div>

      {/*  Kanban Board */}
      {selectedProject && (
        <div className="overflow-x-auto">
          <KanbanBoard project={selectedProject} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
