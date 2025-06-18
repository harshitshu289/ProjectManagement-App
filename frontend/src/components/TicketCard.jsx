import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TicketCard = ({ ticket, onClick }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({ id: ticket._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={() => onClick(ticket)}
      style={style}
      className="bg-white p-3 rounded shadow border cursor-pointer hover:bg-gray-50"
    >
      <h4 className="font-semibold text-sm">{ticket.title}</h4>
      <p className="text-xs text-gray-600">{ticket.priority}</p>
    </div>
  );
};

export default TicketCard;
