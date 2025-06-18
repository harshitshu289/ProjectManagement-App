import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { apiConnector } from "../services/apiConnector";
import { COMMENTS_API } from "../services/apis";
import { useSelector } from "react-redux";

const CommentSection = ({ ticketId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const user = useSelector((state) => state.auth.user);

  const fetchComments = useCallback(async () => {
    try {
      const res = await apiConnector("get", COMMENTS_API.GET_BY_TICKET(ticketId));
      setComments(res);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load comments");
    }
  }, [ticketId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await apiConnector("post", COMMENTS_API.CREATE, {
        ticketId,
        text,
      });

      setText("");
      fetchComments();
    } catch (err) {
      console.error(err);
      toast.error("Failed to post comment");
    }
  };

  const handleDelete = async (commentId) => {
    const confirm = window.confirm("Delete this comment?");
    if (!confirm) return;

    try {
      await apiConnector("delete", COMMENTS_API.DELETE(commentId));
      toast.success("Comment deleted");
      fetchComments();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete comment");
    }
  };

  useEffect(() => {
    if (ticketId) fetchComments();
  }, [fetchComments, ticketId]);

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-800">Comments</h4>

      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm"
        >
          Add Comment
        </button>
      </form>

      <ul className="space-y-2">
        {comments.map((c) => (
          <li
            key={c._id}
            className="bg-gray-100 border border-gray-200 rounded p-3 text-sm relative"
          >
            <p className="text-gray-800">{c.text}</p>
            <p className="text-xs text-gray-500 mt-1">
              — {c.userId?.name || "Unknown"} • {new Date(c.createdAt).toLocaleString()}
            </p>

            {/*  Show delete button only if current user authored it */}
            {c.userId?._id === user?.id && (
              <button
                onClick={() => handleDelete(c._id)}
                className="absolute top-2 right-2 text-xs text-red-500 hover:underline"
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
