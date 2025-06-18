import Ticket from "../models/Ticket.js";

export const createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create({ ...req.body, user: req.userId });
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getTickets = async (req, res) => {
  const { projectId, status, priority, assignee, search } = req.query;
  if (!projectId) return res.status(400).json({ message: "Missing projectId" });

  let filter = { projectId };
  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (assignee) filter.assignee = assignee;
  if (search) {
    filter.$or = [
      { title: new RegExp(search, "i") },
      { description: new RegExp(search, "i") },
    ];
  }

  try {
    const tickets = await Ticket.find(filter).populate("assignee", "name email");
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTicket = async (req, res) => {
  try {
    const updated = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ message: "Ticket deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
