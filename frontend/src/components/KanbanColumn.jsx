import { useDroppable } from "@dnd-kit/core";
import TicketCard from "./TicketCard";
import CommentSection from "./CommentSection";
import { useState } from "react";

const KanbanColumn = ({ status, tickets, onTicketClick, onDeleteTicket }) => {
  const { setNodeRef } = useDroppable({ id: status });
  const [expandedTicketId, setExpandedTicketId] = useState(null);

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 rounded-lg shadow-md p-4 flex flex-col gap-3 min-h-[300px] max-h-[80vh] overflow-y-auto"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center tracking-wide">
        {status}
      </h3>

      {tickets.length === 0 ? (
        <p className="text-sm text-gray-500 text-center italic">No tickets</p>
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white rounded-xl shadow p-4 transition duration-200 hover:shadow-md"
            >
              {/*  Ticket card */}
              <TicketCard
                ticket={ticket}
                onClick={onTicketClick}
                onDelete={onDeleteTicket}
              />

              {/*  Toggle Comments Button */}
              <button
                onClick={() =>
                  setExpandedTicketId((prev) =>
                    prev === ticket._id ? null : ticket._id
                  )
                }
                className="text-xs text-blue-600 mt-2 hover:underline"
              >
                {expandedTicketId === ticket._id ? "Hide Comments" : "Show Comments"}
              </button>

              {/*  Comment Section */}
              {expandedTicketId === ticket._id && (
                <div className="mt-3">
                  <CommentSection ticketId={ticket._id} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KanbanColumn;
