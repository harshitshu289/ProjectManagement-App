import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { apiConnector } from "../services/apiConnector";
import { TICKETS_API } from "../services/apis";

const TicketList = ({ projectId }) => {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = useCallback(async () => {
    try {
      const res = await apiConnector(
        "get",
        TICKETS_API.GET_BY_PROJECT,
        {},
        { params: { projectId } }
      );
      setTickets(res);
    } catch (err) {
      toast.error("Error loading tickets");
      console.error(err);
    }
  }, [projectId]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this ticket?");
    if (!confirm) return;

    try {
      await apiConnector("delete", TICKETS_API.DELETE(id));
      toast.success("Ticket deleted");
      fetchTickets();
    } catch (err) {
      toast.error("Delete failed");
      console.error(err);
    }
  };

  useEffect(() => {
    if (projectId) fetchTickets();
  }, [projectId, fetchTickets]);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4 border-b pb-2"> Project Tickets</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tickets.length === 0 ? (
          <p className="text-gray-500">No tickets found for this project.</p>
        ) : (
          tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-semibold text-gray-800">{ticket.title}</h4>
                <button
                  onClick={() => handleDelete(ticket._id)}
                  className="text-red-500 text-sm hover:underline"
                  title="Delete Ticket"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">{ticket.description}</p>
              <div className="mt-3 text-xs text-gray-500 flex flex-col">
                <span>
                  Priority: <strong>{ticket.priority}</strong>
                </span>
                <span>
                  Status: <strong>{ticket.status}</strong>
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TicketList;
