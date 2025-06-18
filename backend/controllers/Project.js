import Project from "../models/Project.js";

//  Create a new project
export const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      createdBy: req.userId,
    });
    res.status(201).json(project);
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(400).json({ message: err.message });
  }
};

//  Get all projects 
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: 1 }); // Sort by oldest first
    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ message: err.message });
  }
};

//  delete: Only the creator can delete their project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project)
      return res.status(404).json({ message: "Project not found" });

    if (project.createdBy.toString() !== req.userId)
      return res.status(403).json({ message: "Unauthorized to delete this project" });

    await project.deleteOne();
    res.json({ message: "Project deleted" });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ message: "Server error" });
  }
};
