import CommentSection from "./CommentSection";

const TicketModal = ({ ticket, onClose }) => {
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-sm text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-2">{ticket.title}</h2>
        <p className="text-sm text-gray-700">{ticket.description}</p>
        <p className="text-xs mt-2">
          Priority: <strong>{ticket.priority}</strong> | Status:{" "}
          <strong>{ticket.status}</strong>
        </p>

        <CommentSection ticketId={ticket._id} />
      </div>
    </div>
  );
};

export default TicketModal;
