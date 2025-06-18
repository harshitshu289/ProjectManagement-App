import express from "express";
import { createProject, getProjects, deleteProject } from "../controllers/Project.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createProject);
router.get("/", auth, getProjects);
router.delete("/:id", auth, deleteProject);

export default router;
