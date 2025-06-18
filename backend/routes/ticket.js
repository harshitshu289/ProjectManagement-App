import express from "express";
import {
  createTicket,
  getTickets,
  updateTicket,
  deleteTicket,
} from "../controllers/Ticket.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createTicket);
router.get("/", auth, getTickets);
router.put("/:id", auth, updateTicket);
router.delete("/:id", auth, deleteTicket);

export default router;
