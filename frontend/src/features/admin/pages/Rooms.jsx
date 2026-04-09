import React, { useState, useEffect } from "react";
import { rooms as initialRooms } from "../../../data/roomsData";
import RoomCard from "../components/room/RoomCard";
import StatsCard from "../../../components/ui/StatsCard";
import Modal from "../../../components/ui/Modal";

const Rooms = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [message, setMessage] = useState(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [form, setForm] = useState({
    number: "",
    capacity: "",
  });

  // ✅ Assign Room
  const assignRoom = (room) => {
    setSelectedRoom(room);
  };

  const markUnavailable = (id) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === id ? { ...room, status: "maintenance" } : room,
      ),
    );

    setMessage({
      type: "success",
      text: "Room marked unavailable",
    });
  };

  // ✅ Confirm Assign
  const confirmAssign = () => {
    setRooms((prev) =>
      prev.map((r) => {
        if (r.id === selectedRoom.id) {
          // ❌ already full
          if (r.occupants >= r.capacity) {
            setMessage({ type: "error", text: "Room is already full!" });
            return r;
          }

          const updatedOccupants = r.occupants + 1;

          return {
            ...r,
            occupants: updatedOccupants,
            status: updatedOccupants === r.capacity ? "occupied" : "available",
          };
        }
        return r;
      }),
    );

    setSelectedRoom(null);
  };

  // ✅ Update Status
  const updateStatus = (id) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === id ? { ...room, status: "available", occupants: 0 } : room,
      ),
    );
  };

  // ✅ View Details
  const viewDetails = (room) => {
    setSelectedRoom(room);
  };

  // ✅ Add Room
  const addRoom = () => {
    // ❌ Duplicate check
    const exists = rooms.some((room) => room.number === form.number);

    if (exists) {
      setMessage({ type: "error", text: "Room already exists!" });
      return;
    }

    const newRoom = {
      id: Date.now(),
      number: form.number,
      capacity: Number(form.capacity),
      occupants: 0,
      status: "available",
    };

    setRooms((prev) => [...prev, newRoom]);
    setForm({ number: "", capacity: "" });
    setIsAddOpen(false);

    setMessage({ type: "success", text: "Room added successfully!" });
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-green-600">FACILITY MANAGEMENT</p>
          <h1 className="text-3xl font-bold">Room Inventory</h1>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Add New Room
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard title="Total Capacity" value="128" />
        <StatsCard title="Available" value="42" />
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            assignRoom={() => assignRoom(room)}
            updateStatus={updateStatus}
            viewDetails={() => viewDetails(room)}
            markUnavailable={markUnavailable} // ✅ ADD THIS
          />
        ))}
      </div>

      {/* Add Room Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}>
        <h2 className="text-lg font-semibold mb-4">Add Room</h2>

        <input
          placeholder="Room Number"
          value={form.number}
          onChange={(e) => setForm({ ...form, number: e.target.value })}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          placeholder="Capacity"
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: e.target.value })}
          className="w-full border p-2 rounded mb-3"
        />

        <button
          onClick={addRoom}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Add
        </button>
      </Modal>

      {/* Assign / View Modal */}
      <Modal isOpen={!!selectedRoom} onClose={() => setSelectedRoom(null)}>
        <h2 className="text-lg font-semibold mb-2">
          Room {selectedRoom?.number}
        </h2>

        <p>Status: {selectedRoom?.status}</p>
        <p>
          Occupants: {selectedRoom?.occupants}/{selectedRoom?.capacity}
        </p>

        {selectedRoom?.status === "available" && (
          <button
            onClick={confirmAssign}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded"
          >
            Confirm Assign
          </button>
        )}
      </Modal>
    </div>
  );
};

export default Rooms;
