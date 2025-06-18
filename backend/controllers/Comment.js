import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      ticketId: req.body.ticketId,
      text: req.body.text,
      userId: req.userId,
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ ticketId: req.params.ticketId })
      .populate("userId", "name email")
      .sort({ createdAt: 1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment)
      return res.status(404).json({ message: "Comment not found" });

    if (comment.userId.toString() !== req.userId)
      return res.status(403).json({ message: "Unauthorized to delete comment" });

    await comment.deleteOne();
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};