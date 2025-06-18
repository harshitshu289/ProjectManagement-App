
import express from "express";
import { addComment, getComments, deleteComment } from "../controllers/Comment.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, addComment);
router.get("/:ticketId", auth, getComments);
router.delete("/:id", auth, deleteComment); // 👈 new route

export default router;
