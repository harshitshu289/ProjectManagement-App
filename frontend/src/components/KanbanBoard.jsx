import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import KanbanColumn from "./KanbanColumn";
import TicketModal from "./TicketModal";
import { apiConnector } from "../services/apiConnector";
import { TICKETS_API } from "../services/apis";

const statuses = ["To Do", "In Progress", "Done"];

const KanbanBoard = ({ project }) => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const fetchTickets = useCallback(async () => {
    try {
      const params = {
        projectId: project._id,
        ...(statusFilter && { status: statusFilter }),
        ...(priorityFilter && { priority: priorityFilter }),
        ...(searchTerm && { search: searchTerm }),
      };

      const res = await apiConnector("get", TICKETS_API.GET_ALL, {}, { params });
      setTickets(res);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
    }
  }, [project._id, statusFilter, priorityFilter, searchTerm]);

  const handleDeleteTicket = async (ticketId) => {
    const confirm = window.confirm("Are you sure you want to delete this ticket?");
    if (!confirm) return;

    try {
      await apiConnector("delete", TICKETS_API.DELETE(ticketId));
      toast.success("Ticket deleted");
      fetchTickets();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete ticket");
    }
  };

  const onDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const ticketId = active.id;
    const newStatus = over.id;

    const updated = tickets.map((ticket) =>
      ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
    );
    setTickets(updated);

    try {
      await apiConnector("put", TICKETS_API.UPDATE(ticketId), { status: newStatus });
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  useEffect(() => {
    if (project?._id) fetchTickets();
  }, [project?._id, statusFilter, priorityFilter, searchTerm, fetchTickets]);

  if (!project) return null;

  return (
    <>
      {/*  Project Title Section */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Project: {project.title}</h2>
        {project.description && (
          <p className="text-sm text-gray-600">{project.description}</p>
        )}
      </div>

      {/*  Filter UI */}
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <select
          className="input"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          className="input"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input
          className="input"
          placeholder="Search tickets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          onClick={() => {
            setStatusFilter("");
            setPriorityFilter("");
            setSearchTerm("");
          }}
          className="btn text-sm bg-gray-200 px-3 py-2 rounded"
        >
          Clear Filters
        </button>
      </div>

      {/*  Kanban Columns */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statuses.map((status) => (
            <SortableContext
              key={status}
              items={tickets.filter((t) => t.status === status).map((t) => t._id)}
              strategy={rectSortingStrategy}
            >
              <KanbanColumn
                status={status}
                tickets={tickets.filter((t) => t.status === status)}
                onTicketClick={setSelectedTicket}
                onDeleteTicket={handleDeleteTicket}
              />
            </SortableContext>
          ))}
        </div>
      </DndContext>

      {/* Ticket Modal */}
      {selectedTicket && (
        <TicketModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
      )}
    </>
  );
};

export default KanbanBoard;
