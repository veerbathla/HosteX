import { Trash2 } from "lucide-react";
import { useApp } from "../../../../context/useApp";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ComplaintCard({ item }) {
  const { deleteComplaint } = useApp();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const statusColor = {
    pending: "text-yellow-600",
    progress: "text-blue-600",
    resolved: "text-green-600",
  };

  const badge = {
    pending: "bg-yellow-100 text-yellow-600",
    progress: "bg-blue-100 text-blue-600",
    resolved: "bg-green-100 text-green-600",
  };

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    deleteComplaint(item.id);
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        className="bg-white p-5 rounded-2xl 
        shadow-[0_8px_30px_rgba(0,0,0,0.05)]
        hover:shadow-[0_12px_35px_rgba(0,0,0,0.1)]
        hover:scale-[1.02] transition-all duration-300"
      >
        {/* Top */}
        <div className="flex justify-between items-center text-xs">
          <span className={`font-medium ${statusColor[item.status]}`}>
            {item.status.toUpperCase()}
          </span>

          <div className="flex items-center gap-3">
            <span className="text-gray-400">
              {item.date || "Oct 24, 2026"}
            </span>

            {/* DELETE */}
            <button
              onClick={handleDeleteClick}
              className="text-red-400 hover:text-red-600 transition"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold mt-3 text-gray-800 text-[15px]">
          {item.title}
        </h3>

        {/* Time */}
        <p className="text-xs text-gray-400 mt-1">
          Reported: {item.time}
        </p>

        {/* Desc */}
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {item.desc || "No description"}
        </p>

        {/* Bottom */}
        <div className="flex justify-between items-center mt-4">
          {/* VIEW DETAILS */}
          <button
            onClick={() => navigate(`/student/complaints/${item.id}`)}
            className="text-xs text-green-600 font-medium hover:underline"
          >
            View Details →
          </button>

          {/* STATUS BADGE */}
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${badge[item.status]}`}
          >
            {item.status}
          </span>
        </div>
      </div>

      {/* 🔴 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[320px] animate-scaleIn">
            
            <h2 className="text-lg font-semibold text-gray-800">
              Delete Complaint?
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
