import {
  BedDouble,
  CalendarCheck,
  CheckCircle2,
  Filter,
  Grid3X3,
  Key,
  Plus,
  Search,
  User,
  Wifi,
  Wrench,
} from "lucide-react";
import { useMemo, useState } from "react";
import { rooms as initialRooms } from "../../../data/roomsData";

const roomTypes = ["Single", "Double", "Triple", "Studio"];

const buildRoom = (room, index) => ({
  floor: String((index % 3) + 1),
  wing: room.number?.split("-")[0] || "A",
  type: roomTypes[index % roomTypes.length],
  student:
    room.status === "occupied"
      ? ["Liam Henderson", "Elena Moretti", "Aarav Mehta"][index % 3]
      : "",
  studentInitials:
    room.status === "occupied" ? ["LH", "EM", "AM"][index % 3] : "",
  assignedSince: ["Sep 22", "Oct 12", "Nov 04"][index % 3],
  maintenanceNote:
    room.status === "maintenance"
      ? ["HVAC Repair", "Deep Clean Scheduled", "Plumbing Check"][index % 3]
      : "",
  ...room,
});

const statusStyles = {
  available: "bg-emerald-50 text-emerald-700",
  occupied: "bg-rose-50 text-rose-600",
  maintenance: "bg-amber-50 text-amber-700",
};

const statusLabels = {
  available: "Available",
  occupied: "Occupied",
  maintenance: "Maintenance",
};

function RoomTile({
  room,
  onAssign,
  onViewDetails,
  onMarkMaintenance,
  onMarkAvailable,
}) {
  return (
    <article className="min-h-[260px] rounded-xl bg-white p-5 shadow-sm border transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-2xl font-bold leading-none text-gray-800">
            {room.number}
          </h3>
          <p className="mt-2 text-xs font-medium text-green-600">
            {room.type} - Floor {room.floor}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide ${
            statusStyles[room.status]
          }`}
        >
          {statusLabels[room.status]}
        </span>
      </div>

      <div className="mt-5 flex items-center gap-3 text-green-500">
        <Wifi size={15} />
        <BedDouble size={15} />
        <Key size={15} />
      </div>

      {room.status === "occupied" && (
        <div className="mt-5 rounded-xl bg-green-50 p-3">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-white text-xs font-bold text-green-700">
              {room.studentInitials || "ST"}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">{room.student}</p>
              <p className="text-xs text-green-600">
                Since {room.assignedSince}
              </p>
            </div>
          </div>
        </div>
      )}

      {room.status === "maintenance" && (
        <div className="mt-5 rounded-xl border border-dashed border-amber-300 bg-amber-50/60 p-4 text-center">
          <Wrench className="mx-auto text-amber-500" size={20} />
          <p className="mt-2 text-xs font-bold text-amber-700">
            {room.maintenanceNote || "Maintenance scheduled"}
          </p>
        </div>
      )}

      {room.status === "available" && (
        <p className="mt-8 text-xs font-semibold italic text-emerald-500">
          Ready for move-in
        </p>
      )}

      <div className="mt-5 space-y-2">
        {room.status === "available" && (
          <>
            <button
              type="button"
              onClick={() => onAssign(room)}
              className="w-full rounded-lg bg-green-600 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-green-700"
            >
              Assign Room
            </button>
            <button
              type="button"
              onClick={() => onMarkMaintenance(room)}
              className="w-full rounded-lg bg-amber-100 py-2 text-xs font-semibold uppercase tracking-widest text-amber-800 hover:bg-amber-200"
            >
              Maintenance
            </button>
          </>
        )}

        {room.status === "occupied" && (
          <>
            <button
              type="button"
              onClick={() => onViewDetails(room)}
              className="w-full rounded-lg bg-gray-200 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 hover:bg-gray-300"
            >
              View Details
            </button>
            <button
              type="button"
              onClick={() => onMarkMaintenance(room)}
              className="w-full rounded-lg bg-amber-100 py-2 text-xs font-semibold uppercase tracking-widest text-amber-800 hover:bg-amber-200"
            >
              Maintenance
            </button>
          </>
        )}

        {room.status === "maintenance" && (
          <button
            type="button"
            onClick={() => onMarkAvailable(room)}
            className="w-full rounded-lg bg-green-600 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-green-700"
          >
            Update Status
          </button>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-[11px] text-green-600">
        <span className="inline-flex items-center gap-1">
          <User size={12} />
          Capacity: {room.occupants}/{room.capacity}
        </span>
        <span className="inline-flex items-center gap-1">
          <CalendarCheck size={12} />
          <CheckCircle2 size={12} />
        </span>
      </div>
    </article>
  );
}

function StatBlock({ label, value, accent = "emerald" }) {
  const accentClass =
    accent === "amber" ? "text-amber-600 bg-amber-50" : "text-green-600 bg-white";

  return (
    <div className={`rounded-xl p-5 shadow-sm border ${accentClass}`}>
      <p className="text-[10px] font-semibold uppercase tracking-widest">{label}</p>
      <h3 className="mt-2 text-2xl font-semibold text-gray-800">{value}</h3>
      <div className="mt-3 h-1 w-full rounded-full bg-green-100">
        <div className="h-1 w-8 rounded-full bg-green-500" />
      </div>
    </div>
  );
}

export default function RoomsManagement() {
  const [rooms, setRooms] = useState(() => initialRooms.map(buildRoom));
  const [query, setQuery] = useState("");
  const [floor, setFloor] = useState("all");
  const [wing, setWing] = useState("all");
  const [visibleCount, setVisibleCount] = useState(10);
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState({ type: null, room: null });
  const [newRoom, setNewRoom] = useState({
    number: "",
    capacity: "2",
    floor: "1",
    wing: "A",
    type: "Single",
  });

  const stats = useMemo(() => {
    const totalCapacity = rooms.reduce((sum, room) => sum + room.capacity, 0);
    const availableBeds = rooms.reduce((sum, room) => {
      if (room.status === "maintenance") return sum;
      return sum + Math.max(room.capacity - room.occupants, 0);
    }, 0);

    return {
      totalCapacity,
      availableBeds,
      maintenanceRooms: rooms.filter((room) => room.status === "maintenance")
        .length,
      occupiedRooms: rooms.filter((room) => room.status === "occupied").length,
    };
  }, [rooms]);

  const filteredRooms = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return rooms.filter((room) => {
      const matchesQuery =
        !normalizedQuery ||
        room.number.toLowerCase().includes(normalizedQuery) ||
        room.type.toLowerCase().includes(normalizedQuery) ||
        room.student.toLowerCase().includes(normalizedQuery);
      const matchesFloor = floor === "all" || room.floor === floor;
      const matchesWing = wing === "all" || room.wing === wing;

      return matchesQuery && matchesFloor && matchesWing;
    });
  }, [floor, query, rooms, wing]);

  const visibleRooms = filteredRooms.slice(0, visibleCount);

  const showMessage = (text) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2200);
  };

  const closeModal = () => setModal({ type: null, room: null });

  const addRoom = () => {
    const roomNumber = newRoom.number.trim().toUpperCase();
    const capacity = Number(newRoom.capacity);

    if (!roomNumber || !Number.isInteger(capacity) || capacity <= 0) {
      showMessage("Enter a valid room number and capacity.");
      return;
    }

    if (rooms.some((room) => room.number.toLowerCase() === roomNumber.toLowerCase())) {
      showMessage("Room already exists.");
      return;
    }

    setRooms((prev) => [
      ...prev,
      {
        id: Date.now(),
        number: roomNumber,
        capacity,
        occupants: 0,
        status: "available",
        floor: newRoom.floor,
        wing: newRoom.wing,
        type: newRoom.type,
        student: "",
        studentInitials: "",
        assignedSince: "",
        maintenanceNote: "",
      },
    ]);
    setNewRoom({
      number: "",
      capacity: "2",
      floor: "1",
      wing: "A",
      type: "Single",
    });
    closeModal();
    showMessage(`Room ${roomNumber} added.`);
  };

  const assignRoom = (room) => {
    setRooms((prev) =>
      prev.map((currentRoom) => {
        if (currentRoom.id !== room.id) return currentRoom;
        const occupants = Math.min(currentRoom.occupants + 1, currentRoom.capacity);

        return {
          ...currentRoom,
          occupants,
          status: occupants >= currentRoom.capacity ? "occupied" : "available",
          student: currentRoom.student || "New Resident",
          studentInitials: currentRoom.studentInitials || "NR",
          assignedSince: "Today",
        };
      }),
    );
    closeModal();
    showMessage(`Room ${room.number} assigned.`);
  };

  const markMaintenance = (room) => {
    setRooms((prev) =>
      prev.map((currentRoom) =>
        currentRoom.id === room.id
          ? {
              ...currentRoom,
              status: "maintenance",
              maintenanceNote: "Maintenance scheduled",
            }
          : currentRoom,
      ),
    );
    closeModal();
    showMessage(`Room ${room.number} marked under maintenance.`);
  };

  const markAvailable = (room) => {
    setRooms((prev) =>
      prev.map((currentRoom) => {
        if (currentRoom.id !== room.id) return currentRoom;

        return {
          ...currentRoom,
          maintenanceNote: "",
          status:
            currentRoom.occupants >= currentRoom.capacity
              ? "occupied"
              : "available",
        };
      }),
    );
    closeModal();
    showMessage(`Room ${room.number} is available again.`);
  };

  return (
    <div className="min-h-screen bg-[#f5f7f6] p-6">
      <div className="space-y-6">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-green-600">
              Facility Management
            </p>
            <h1 className="mt-1 text-3xl font-bold text-gray-800">
              Room Inventory
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-green-700 shadow-sm border"
            >
              Grid View
            </button>
            <button
              type="button"
              className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-600"
              onClick={() => showMessage("List view coming soon.")}
            >
              List View
            </button>
            <button
              type="button"
              onClick={() => setModal({ type: "add", room: null })}
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700"
            >
              <Plus size={16} />
              Add New Room
            </button>
          </div>
        </header>

        {message && (
          <div className="rounded-lg bg-green-100 px-4 py-3 text-sm font-medium text-green-800">
            {message}
          </div>
        )}

        <section className="grid gap-4 lg:grid-cols-[1fr_180px_180px_180px]">
          <div className="rounded-xl bg-white p-5 shadow-sm border">
            <div className="grid gap-4 md:grid-cols-[1fr_240px_60px]">
              <label className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500"
                  size={18}
                />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search rooms, floors or students..."
                  className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-green-500"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <select
                  value={floor}
                  onChange={(event) => setFloor(event.target.value)}
                  className="rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
                >
                  <option value="all">All Floors</option>
                  <option value="1">Floor 1</option>
                  <option value="2">Floor 2</option>
                  <option value="3">Floor 3</option>
                </select>

                <select
                  value={wing}
                  onChange={(event) => setWing(event.target.value)}
                  className="rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
                >
                  <option value="all">All Wings</option>
                  <option value="A">Block A</option>
                  <option value="B">Block B</option>
                  <option value="C">Block C</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setFloor("all");
                  setWing("all");
                }}
                className="grid place-items-center rounded-lg bg-green-50 text-green-700 hover:bg-green-100"
                aria-label="Reset filters"
              >
                <Filter size={18} />
              </button>
            </div>
          </div>

          <StatBlock label="Total Capacity" value={stats.totalCapacity} />
          <StatBlock label="Available" value={stats.availableBeds} />
          <StatBlock label="Maintenance" value={stats.maintenanceRooms} accent="amber" />
        </section>

        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {visibleRooms.map((room) => (
            <RoomTile
              key={room.id}
              room={room}
              onAssign={(targetRoom) =>
                setModal({ type: "assign", room: targetRoom })
              }
              onViewDetails={(targetRoom) =>
                setModal({ type: "details", room: targetRoom })
              }
              onMarkMaintenance={(targetRoom) =>
                setModal({ type: "maintenance", room: targetRoom })
              }
              onMarkAvailable={markAvailable}
            />
          ))}
        </section>

        {filteredRooms.length === 0 && (
          <div className="rounded-xl bg-white p-10 text-center text-sm font-semibold text-gray-500 shadow-sm border">
            No rooms match the selected filters.
          </div>
        )}

        <footer className="border-t border-gray-200 py-10 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-green-50 text-green-600">
            <Grid3X3 size={20} />
          </div>
          <p className="mt-4 font-semibold text-gray-800">
            Showing {Math.min(visibleCount, filteredRooms.length)} of{" "}
            {rooms.length} Rooms
          </p>
          <p className="text-sm text-gray-500">
            Adjust your filters to see more listings
          </p>
          {visibleCount < filteredRooms.length && (
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + 10)}
              className="mt-5 rounded-lg bg-green-600 px-8 py-3 text-sm font-medium text-white hover:bg-green-700"
            >
              Load More Rooms
            </button>
          )}
        </footer>
      </div>

      {modal.type && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-green-600">
                  Room Management
                </p>
                <h2 className="mt-1 text-2xl font-bold text-gray-800">
                  {modal.type === "add"
                    ? "Add New Room"
                    : `Room ${modal.room?.number}`}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="text-sm font-bold text-gray-400 hover:text-gray-700"
              >
                X
              </button>
            </div>

            {modal.type === "add" && (
              <div className="mt-6 space-y-4">
                <input
                  value={newRoom.number}
                  onChange={(event) =>
                    setNewRoom((room) => ({
                      ...room,
                      number: event.target.value,
                    }))
                  }
                  placeholder="Room Number, e.g. A-106"
                  className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:border-green-500"
                />
                <input
                  type="number"
                  min="1"
                  value={newRoom.capacity}
                  onChange={(event) =>
                    setNewRoom((room) => ({
                      ...room,
                      capacity: event.target.value,
                    }))
                  }
                  placeholder="Capacity"
                  className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:border-green-500"
                />
                <div className="grid grid-cols-3 gap-3">
                  <select
                    value={newRoom.floor}
                    onChange={(event) =>
                      setNewRoom((room) => ({
                        ...room,
                        floor: event.target.value,
                      }))
                    }
                    className="rounded-lg border border-gray-200 p-3"
                  >
                    <option value="1">Floor 1</option>
                    <option value="2">Floor 2</option>
                    <option value="3">Floor 3</option>
                  </select>
                  <select
                    value={newRoom.wing}
                    onChange={(event) =>
                      setNewRoom((room) => ({
                        ...room,
                        wing: event.target.value,
                      }))
                    }
                    className="rounded-lg border border-gray-200 p-3"
                  >
                    <option value="A">Block A</option>
                    <option value="B">Block B</option>
                    <option value="C">Block C</option>
                  </select>
                  <select
                    value={newRoom.type}
                    onChange={(event) =>
                      setNewRoom((room) => ({
                        ...room,
                        type: event.target.value,
                      }))
                    }
                    className="rounded-lg border border-gray-200 p-3"
                  >
                    {roomTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={addRoom}
                  className="w-full rounded-lg bg-green-600 py-3 font-medium text-white hover:bg-green-700"
                >
                  Add Room
                </button>
              </div>
            )}

            {modal.type === "assign" && modal.room && (
              <div className="mt-6 space-y-4">
                <p className="text-sm text-gray-600">
                  Assign one resident to Room {modal.room.number}. The room will
                  become occupied automatically when it reaches capacity.
                </p>
                <button
                  type="button"
                  onClick={() => assignRoom(modal.room)}
                  className="w-full rounded-lg bg-green-600 py-3 font-medium text-white hover:bg-green-700"
                >
                  Confirm Assign
                </button>
              </div>
            )}

            {modal.type === "maintenance" && modal.room && (
              <div className="mt-6 space-y-4">
                <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
                  Mark Room {modal.room.number} under maintenance? It will be
                  removed from available capacity until marked available again.
                </div>
                <button
                  type="button"
                  onClick={() => markMaintenance(modal.room)}
                  className="w-full rounded-lg bg-amber-500 py-3 font-medium text-white hover:bg-amber-600"
                >
                  Mark Under Maintenance
                </button>
              </div>
            )}

            {modal.type === "details" && modal.room && (
              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <p>
                  <span className="font-bold text-gray-900">Status:</span>{" "}
                  {statusLabels[modal.room.status]}
                </p>
                <p>
                  <span className="font-bold text-gray-900">Occupancy:</span>{" "}
                  {modal.room.occupants}/{modal.room.capacity}
                </p>
                <p>
                  <span className="font-bold text-gray-900">Type:</span>{" "}
                  {modal.room.type}
                </p>
                {modal.room.student && (
                  <p>
                    <span className="font-bold text-gray-900">Resident:</span>{" "}
                    {modal.room.student}
                  </p>
                )}
                {modal.room.status === "maintenance" ? (
                  <button
                    type="button"
                    onClick={() => markAvailable(modal.room)}
                    className="mt-3 w-full rounded-lg bg-green-600 py-3 font-medium text-white hover:bg-green-700"
                  >
                    Mark Available
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setModal({ type: "maintenance", room: modal.room })}
                    className="mt-3 w-full rounded-lg bg-amber-500 py-3 font-medium text-white hover:bg-amber-600"
                  >
                    Mark Under Maintenance
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
