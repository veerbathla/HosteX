import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "../../../../components/ui/Badge";
import Button from "../../../../components/ui/Button";
import Card from "../../../../components/ui/Card";
import { useApp } from "../../../../context/useApp";

export default function ComplaintCard({ item }) {
  const { deleteComplaint } = useApp();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const statusColor = {
    pending: "text-yellow-600",
    progress: "text-blue-600",
    resolved: "text-green-600",
  };

  const badgeType = {
    pending: "warning",
    progress: "info",
    resolved: "success",
  };

  const confirmDelete = () => {
    deleteComplaint(item.id);
    setShowModal(false);
  };

  return (
    <>
      <Card className="transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_35px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between text-xs">
          <span className={`font-medium ${statusColor[item.status]}`}>
            {item.status.toUpperCase()}
          </span>

          <div className="flex items-center gap-3">
            <span className="text-gray-400">{item.date || "Oct 24, 2026"}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowModal(true)}
              className="text-red-400 hover:text-red-600"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>

        <h3 className="mt-3 text-[15px] font-semibold text-gray-800">
          {item.title}
        </h3>
        <p className="mt-1 text-xs text-gray-400">Reported: {item.time}</p>
        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
          {item.desc || "No description"}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/student/complaints/${item.id}`)}
            className="text-xs font-medium text-green-600 hover:underline"
          >
            View Details -&gt;
          </Button>

          <Badge type={badgeType[item.status]}>{item.status}</Badge>
        </div>
      </Card>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <Card className="w-[320px] animate-scaleIn">
            <h2 className="text-lg font-semibold text-gray-800">
              Delete Complaint?
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
