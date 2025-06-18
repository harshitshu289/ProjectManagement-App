import { useState } from "react";
import toast from "react-hot-toast";
import { apiConnector } from "../services/apiConnector";
import { TICKETS_API } from "../services/apis";

const TicketForm = ({ projectId, onSuccess, onClose }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "To Do",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiConnector("post", TICKETS_API.CREATE, {
        ...form,
        projectId,
      });

      toast.success("Ticket created!");
      setForm({
        title: "",
        description: "",
        priority: "Medium",
        status: "To Do",
      });

      onSuccess();     
      onClose();       
    } catch (err) {
      console.error(err);
      toast.error("Error creating ticket");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">Create Ticket</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="input w-full"
            placeholder="Ticket title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            className="input w-full"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
          <select
            className="input w-full"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button className="btn bg-green-600 text-white px-4 py-2 rounded w-full">
            Create Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;
