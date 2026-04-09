import { Trash2 } from "lucide-react";
import { useApp } from "../../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ComplaintCard({ item }) {
  const { deleteComplaint } = useApp();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // 🔥 SAFETY GUARD (CRASH FIX)
  if (!item) return null;

  const statusConfig = {
    pending: {
      text: "text-yellow-600",
      badge: "bg-yellow-100 text-yellow-600",
    },
    progress: {
      text: "text-blue-600",
      badge: "bg-blue-100 text-blue-600",
    },
    resolved: {
      text: "text-green-600",
      badge: "bg-green-100 text-green-600",
    },
  };

  // 🔥 SAFE STATUS
  const status = item?.status || "pending";
  const currentStatus =
    statusConfig[status] || statusConfig.pending;

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
          <span className={`font-medium ${currentStatus.text}`}>
            {status.toUpperCase()}
          </span>

          <div className="flex items-center gap-3">
            <span className="text-gray-400">
              {item.date || "Oct 24, 2026"}
            </span>

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
          {item.title || "Untitled Complaint"}
        </h3>

        {/* Time */}
        <p className="text-xs text-gray-400 mt-1">
          Reported: {item.time || "N/A"}
        </p>

        {/* Desc */}
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {item.desc || "No description"}
        </p>

        {/* Bottom */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => navigate(`/student/complaints/${item.id}`)}
            className="text-xs text-green-600 font-medium hover:underline"
          >
            View Details →
          </button>

          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${currentStatus.badge}`}
          >
            {status}
          </span>
        </div>
      </div>

      {/* 🔴 DELETE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[320px]">
            
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