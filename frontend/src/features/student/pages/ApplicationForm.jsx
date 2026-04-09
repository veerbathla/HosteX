import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../../context/useApp";

export default function ApplicationForm() {
  const navigate = useNavigate();
  const { addComplaint } = useApp();

  const [form, setForm] = useState({
    name: "Alex Rivera",
    studentId: "STU-2024-8842",
    room: "",
    type: "",
    reason: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.type || !form.reason) {
      alert("Fill all required fields");
      return;
    }

    // 👇 connect with complaints system
    addComplaint({
      title: form.type,
      desc: form.reason,
      status: "pending",
      time: "Just now",
      date: new Date().toLocaleDateString(),
    });

    navigate("/student/complaints");
  };

  return (
    <div className="p-8 bg-[#f5f7f6] min-h-screen">

      {/* Header */}
      <div>
        <p className="text-xs text-green-600 font-medium tracking-wide">
          SUBMISSION PORTAL
        </p>
        <h1 className="text-3xl font-semibold mt-1">
          New Application Form
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Submit your administrative requests directly to the hostel management office.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white mt-6 p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] space-y-6"
      >
        {/* Top Row */}
        <div className="grid grid-cols-2 gap-6">

          {/* Name */}
          <div>
            <label className="text-xs text-gray-400">FULL NAME</label>
            <input
              value={form.name}
              disabled
              className="w-full mt-2 p-3 rounded-xl bg-gray-100"
            />
          </div>

          {/* Student ID */}
          <div>
            <label className="text-xs text-gray-400">STUDENT ID</label>
            <input
              value={form.studentId}
              disabled
              className="w-full mt-2 p-3 rounded-xl bg-gray-100"
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-2 gap-6">

          {/* Room */}
          <div>
            <label className="text-xs text-gray-400">
              CURRENT ROOM NO
            </label>
            <input
              placeholder="e.g. Block A, 402"
              value={form.room}
              onChange={(e) =>
                setForm({ ...form, room: e.target.value })
              }
              className="w-full mt-2 p-3 rounded-xl border"
            />
          </div>

          {/* Type */}
          <div>
            <label className="text-xs text-gray-400">
              APPLICATION TYPE
            </label>
            <select
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
              className="w-full mt-2 p-3 rounded-xl border"
            >
              <option value="">Select Request Type</option>
              <option value="Room Change">Room Change</option>
              <option value="Maintenance">Maintenance</option>
              <option value="WiFi Issue">WiFi Issue</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Reason */}
        <div>
          <label className="text-xs text-gray-400">
            DETAILED REASON
          </label>
          <textarea
            placeholder="Please provide specific details..."
            value={form.reason}
            onChange={(e) =>
              setForm({ ...form, reason: e.target.value })
            }
            className="w-full mt-2 p-4 rounded-xl border h-32"
          />
        </div>

        {/* Upload Box */}
        <div>
          <label className="text-xs text-gray-400">
            ATTACHMENTS (OPTIONAL)
          </label>

          <div className="mt-2 border-2 border-dashed p-8 rounded-2xl text-center text-gray-500">
            Click to upload or drag & drop
            <p className="text-xs mt-1">PDF, JPG, PNG (Max 5MB)</p>
          </div>

          <p className="text-xs text-gray-400 mt-2">
            Accepted: ID proofs, medical docs
          </p>
        </div>

        {/* Bottom */}
        <div className="flex justify-between items-center pt-4">

          <span className="text-xs bg-gray-100 px-4 py-2 rounded-full">
            Processing time: 2–3 business days
          </span>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-xl shadow
            hover:scale-105 hover:shadow-lg transition"
          >
            Submit Application
          </button>

        </div>
      </form>

      {/* Bottom Cards */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-5 rounded-xl shadow text-sm">
          <p className="font-medium">Track Progress</p>
          <p className="text-gray-500 text-xs mt-1">
            View submitted applications
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-sm">
          <p className="font-medium">Edit Policy</p>
          <p className="text-gray-500 text-xs mt-1">
            Edit before review begins
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-sm">
          <p className="font-medium">Need Help?</p>
          <p className="text-gray-500 text-xs mt-1">
            Contact hostel office
          </p>
        </div>
      </div>

    </div>
  );
}
