import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import { useToast } from "../../../components/feedback/toastContext";
import { getCurrentUser } from "../../../services/api/authService";
import { createComplaint } from "../../../services/api/complaintService";
import { getMyRoom } from "../../../services/api/roomService";

export default function ApplicationForm() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const currentUser = getCurrentUser();

  const [form, setForm] = useState({
    name: currentUser?.name || "",
    studentId: currentUser?.enrollmentNo || currentUser?._id || "",
    room: "",
    type: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let active = true;

    async function loadMyRoom() {
      try {
        const room = await getMyRoom();
        if (active && room?.number) {
          setForm((current) => ({ ...current, room: room.number }));
        }
      } catch {
        // Keep manual room entry available when the room API is unavailable.
      }
    }

    loadMyRoom();

    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = {};
    if (!form.type) nextErrors.type = "Choose an application type.";
    if (!form.reason.trim()) nextErrors.reason = "Add a detailed reason.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      return;
    }

    setLoading(true);
    try {
      await createComplaint({
        title: form.type,
        description: form.reason.trim(),
        room: form.room.trim(),
      });
      showToast({
        title: "Complaint submitted",
        message: "Hostel staff can now review your request.",
        type: "success",
      });
      navigate("/student/complaints");
    } catch (apiError) {
      showToast({
        title: "Submission failed",
        message: apiError.message || "Unable to submit right now.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7f6] p-4 sm:p-8">
      <div>
        <p className="text-xs font-medium tracking-wide text-green-600">
          SUBMISSION PORTAL
        </p>
        <h1 className="mt-1 text-3xl font-semibold">New Application Form</h1>
        <p className="mt-1 text-sm text-gray-500">
          Submit your administrative requests directly to the hostel management office.
        </p>
      </div>

      <Card className="mt-6 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-xs text-gray-400">FULL NAME</label>
              <Input value={form.name} disabled className="mt-2 bg-gray-100 p-3" />
            </div>

            <div>
              <label className="text-xs text-gray-400">STUDENT ID</label>
              <Input value={form.studentId} disabled className="mt-2 bg-gray-100 p-3" />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-xs text-gray-400">CURRENT ROOM NO</label>
              <Input
                placeholder="e.g. Block A, 402"
                value={form.room}
                onChange={(event) => setForm({ ...form, room: event.target.value })}
                className="mt-2 p-3"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400">APPLICATION TYPE</label>
              <Select
                value={form.type}
                onChange={(type) => {
                  setForm({ ...form, type });
                  setErrors((current) => ({ ...current, type: "" }));
                }}
                placeholder="Select Request Type"
                className="mt-2"
                options={[
                  { value: "Room Change", label: "Room Change" },
                  { value: "Maintenance", label: "Maintenance" },
                  { value: "WiFi Issue", label: "WiFi Issue" },
                  { value: "Other", label: "Other" },
                ]}
                ariaLabel="Application type"
              />
              {errors.type && (
                <p className="mt-2 text-xs font-medium text-red-600">{errors.type}</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400">DETAILED REASON</label>
            <textarea
              placeholder="Please provide specific details..."
              value={form.reason}
              onChange={(event) => {
                setForm({ ...form, reason: event.target.value });
                setErrors((current) => ({ ...current, reason: "" }));
              }}
              className="mt-2 h-32 w-full rounded-lg border border-gray-200 p-4 outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.reason && (
              <p className="mt-2 text-xs font-medium text-red-600">{errors.reason}</p>
            )}
          </div>

          <div>
            <label className="text-xs text-gray-400">ATTACHMENTS (OPTIONAL)</label>
            <div className="mt-2 rounded-lg border-2 border-dashed p-8 text-center text-gray-500">
              Click to upload or drag and drop
              <p className="mt-1 text-xs">PDF, JPG, PNG (Max 5MB)</p>
            </div>
            <p className="mt-2 text-xs text-gray-400">
              Accepted: ID proofs, medical docs
            </p>
          </div>

          <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="rounded-full bg-gray-100 px-4 py-2 text-xs">
              Processing time: 2-3 business days
            </span>
            <Button type="submit" size="lg" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </Card>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {[
          ["Track Progress", "View submitted applications"],
          ["Edit Policy", "Edit before review begins"],
          ["Need Help?", "Contact hostel office"],
        ].map(([title, text]) => (
          <Card key={title} className="p-5 text-sm">
            <p className="font-medium">{title}</p>
            <p className="mt-1 text-xs text-gray-500">{text}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
