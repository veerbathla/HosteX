import {
  BedDouble,
  Building2,
  CheckCircle2,
  Filter,
  Grid3X3,
  KeyRound,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Users,
  Wifi,
  Wrench,
} from "lucide-react";
import { useMemo, useState } from "react";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import { rooms as initialRooms } from "../../../data/roomsData";

const roomTypes = ["Single", "Double", "Triple", "Studio"];

const seedRoom = (room, index) => ({
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
      ? ["HVAC inspection", "Deep clean scheduled", "Plumbing check"][index % 3]
      : "",
  ...room,
});

const statusMeta = {
  available: {
    label: "Available",
    badge: "success",
    tint: "from-green-50 to-white",
    border: "border-green-100",
    iconBg: "bg-green-50 text-green-700",
  },
  occupied: {
    label: "Occupied",
    badge: "error",
    tint: "from-red-50 to-white",
    border: "border-red-100",
    iconBg: "bg-red-50 text-red-600",
  },
  maintenance: {
    label: "Maintenance",
    badge: "warning",
    tint: "from-amber-50 to-white",
    border: "border-amber-100",
    iconBg: "bg-amber-50 text-amber-700",
  },
};

function SegmentedControl({ value, onChange }) {
  return (
    <div className="inline-flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
      {[
        { value: "grid", label: "Grid View", icon: Grid3X3 },
        { value: "list", label: "List View", icon: List },
      ].map((item) => {
        const ViewIcon = item.icon;
        const active = value === item.value;

        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={`inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium transition ${
              active
                ? "bg-green-600 text-white shadow-sm"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
            }`}
          >
            <ViewIcon size={15} />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

function StatCard({ icon, label, value, progress, tone }) {
  const tones = {
    green: "from-green-50 to-white text-green-700",
    amber: "from-amber-50 to-white text-amber-700",
    slate: "from-slate-50 to-white text-slate-700",
  };

  return (
    <Card
      className={`group bg-gradient-to-br ${tones[tone]} p-5 transition duration-200 ease-out hover:-translate-y-1 hover:shadow-lg`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-600">{label}</p>
          <h3 className="mt-2 text-3xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/80 shadow-sm">
          {icon}
        </div>
      </div>

      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-current transition-all duration-500 ease-out group-hover:w-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </Card>
  );
}

function RoomCard({
  room,
  menuOpen,
  onToggleMenu,
  onAssign,
  onDetails,
  onMaintenance,
  onAvailable,
}) {
  const meta = statusMeta[room.status] || statusMeta.available;
  const primaryLabel =
    room.status === "maintenance"
      ? "Update Status"
      : room.status === "available"
        ? "Assign Room"
        : null;

  return (
    <Card
      className={`relative overflow-visible border ${meta.border} bg-gradient-to-br ${meta.tint} p-5 transition duration-300 hover:shadow-xl`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{room.number}</h3>
          <p className="mt-1 text-xs font-medium text-gray-600">
            {room.type} room - Floor {room.floor}, Wing {room.wing}
          </p>
        </div>
        <Badge type={meta.badge}>{meta.label}</Badge>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {[
          { icon: Wifi, label: "WiFi" },
          { icon: BedDouble, label: "Bed" },
          { icon: KeyRound, label: "Key" },
        ].map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.label}
              className={`grid h-12 place-items-center rounded-xl ${meta.iconBg}`}
              title={feature.label}
            >
              <Icon size={18} />
            </div>
          );
        })}
      </div>

      <div className="mt-5 min-h-[68px]">
        {room.status === "occupied" && (
          <div className="flex items-center gap-3 rounded-xl bg-white/70 p-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-green-100 text-sm font-bold text-green-800">
              {room.studentInitials || "ST"}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {room.student || "Assigned Student"}
              </p>
              <p className="text-xs text-gray-500">
                Joined {room.assignedSince || "Today"}
              </p>
            </div>
          </div>
        )}

        {room.status === "maintenance" && (
          <div className="flex items-center gap-3 rounded-xl bg-amber-100/70 p-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-white text-amber-700">
              <Wrench size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-900">
                Maintenance active
              </p>
              <p className="text-xs text-amber-700">
                {room.maintenanceNote || "Scheduled service"}
              </p>
            </div>
          </div>
        )}

        {room.status === "available" && (
          <div className="rounded-xl bg-white/70 p-3">
            <p className="text-sm font-semibold text-green-800">
              Ready for move-in
            </p>
            <p className="text-xs text-gray-500">
              {room.capacity - room.occupants} bed spaces currently open.
            </p>
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between text-xs text-gray-500">
        <span className="inline-flex items-center gap-1.5">
          <Users size={14} />
          {room.occupants}/{room.capacity} occupied
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Building2 size={14} />
          Block {room.wing}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto_auto] items-center gap-2">
        {primaryLabel ? (
          <Button
            onClick={() =>
              room.status === "maintenance" ? onAvailable(room) : onAssign(room)
            }
            fullWidth
            className="h-10"
          >
            {primaryLabel}
          </Button>
        ) : (
          <Button
            variant="ghost"
            onClick={() => onDetails(room)}
            fullWidth
            className="h-10 text-green-700"
          >
            View Details
          </Button>
        )}

        <Button
          variant="ghost"
          onClick={() => onDetails(room)}
          className="h-10 px-3 text-gray-600"
        >
          Details
        </Button>

        <div className="relative">
          <Button
            variant="ghost"
            onClick={() => onToggleMenu(room.id)}
            className="h-10 px-3"
            aria-label={`More actions for room ${room.number}`}
          >
            <MoreHorizontal size={18} />
          </Button>

          {menuOpen && (
            <div className="absolute right-0 top-12 z-20 w-48 rounded-xl border bg-white p-2 shadow-xl">
              {room.status !== "maintenance" && (
                <button
                  type="button"
                  onClick={() => onMaintenance(room)}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-amber-700 hover:bg-amber-50"
                >
                  Mark maintenance
                </button>
              )}
              {room.status === "maintenance" && (
                <button
                  type="button"
                  onClick={() => onAvailable(room)}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-green-700 hover:bg-green-50"
                >
                  Mark available
                </button>
              )}
              <button
                type="button"
                onClick={() => onDetails(room)}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                Open details
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default function RoomsInventory() {
  const [rooms, setRooms] = useState(() => initialRooms.map(seedRoom));
  const [query, setQuery] = useState("");
  const [floor, setFloor] = useState("all");
  const [wing, setWing] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [activeMenu, setActiveMenu] = useState(null);
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState({ type: null, room: null });
  const [form, setForm] = useState({
    number: "",
    capacity: "2",
    floor: "1",
    wing: "A",
    type: "Single",
  });

  const stats = useMemo(() => {
    const totalCapacity = rooms.reduce((sum, room) => sum + room.capacity, 0);
    const available = rooms.reduce((sum, room) => {
      if (room.status === "maintenance") return sum;
      return sum + Math.max(room.capacity - room.occupants, 0);
    }, 0);
    const maintenance = rooms.filter((room) => room.status === "maintenance")
      .length;

    return { totalCapacity, available, maintenance };
  }, [rooms]);

  const filteredRooms = useMemo(() => {
    const term = query.trim().toLowerCase();

    return rooms.filter((room) => {
      const matchesSearch =
        !term ||
        room.number.toLowerCase().includes(term) ||
        room.type.toLowerCase().includes(term) ||
        room.student.toLowerCase().includes(term);
      const matchesFloor = floor === "all" || room.floor === floor;
      const matchesWing = wing === "all" || room.wing === wing;

      return matchesSearch && matchesFloor && matchesWing;
    });
  }, [floor, query, rooms, wing]);

  const showMessage = (text) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2200);
  };

  const closeModal = () => setModal({ type: null, room: null });

  const assignRoom = (room) => {
    setRooms((prev) =>
      prev.map((current) => {
        if (current.id !== room.id) return current;
        const occupants = Math.min(current.occupants + 1, current.capacity);

        return {
          ...current,
          occupants,
          status: occupants >= current.capacity ? "occupied" : "available",
          student: current.student || "New Resident",
          studentInitials: current.studentInitials || "NR",
          assignedSince: "Today",
        };
      }),
    );
    setActiveMenu(null);
    closeModal();
    showMessage(`Room ${room.number} assigned.`);
  };

  const markMaintenance = (room) => {
    setRooms((prev) =>
      prev.map((current) =>
        current.id === room.id
          ? {
              ...current,
              status: "maintenance",
              maintenanceNote: "Maintenance scheduled",
            }
          : current,
      ),
    );
    setActiveMenu(null);
    closeModal();
    showMessage(`Room ${room.number} moved to maintenance.`);
  };

  const markAvailable = (room) => {
    setRooms((prev) =>
      prev.map((current) => {
        if (current.id !== room.id) return current;

        return {
          ...current,
          maintenanceNote: "",
          status: current.occupants >= current.capacity ? "occupied" : "available",
        };
      }),
    );
    setActiveMenu(null);
    closeModal();
    showMessage(`Room ${room.number} is back in service.`);
  };

  const addRoom = () => {
    const number = form.number.trim().toUpperCase();
    const capacity = Number(form.capacity);

    if (!number || !Number.isInteger(capacity) || capacity <= 0) {
      showMessage("Enter a valid room number and capacity.");
      return;
    }

    if (rooms.some((room) => room.number.toLowerCase() === number.toLowerCase())) {
      showMessage("Room already exists.");
      return;
    }

    setRooms((prev) => [
      ...prev,
      {
        id: Date.now(),
        number,
        capacity,
        occupants: 0,
        status: "available",
        floor: form.floor,
        wing: form.wing,
        type: form.type,
        student: "",
        studentInitials: "",
        assignedSince: "",
        maintenanceNote: "",
      },
    ]);
    setForm({
      number: "",
      capacity: "2",
      floor: "1",
      wing: "A",
      type: "Single",
    });
    closeModal();
    showMessage(`Room ${number} added.`);
  };

  return (
    <div className="min-h-screen p-6 sm:p-8">
      <div className="space-y-6">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-700">
              Facility Management
            </p>
            <h1 className="mt-1 text-4xl font-bold tracking-tight text-gray-900">
              Room Inventory
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <SegmentedControl value={viewMode} onChange={setViewMode} />
            <Button onClick={() => setModal({ type: "add", room: null })} className="gap-2">
              <Plus size={16} />
              Add Room
            </Button>
          </div>
        </header>

        {message && (
          <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
            {message}
          </div>
        )}

        <section className="grid gap-4 md:grid-cols-3">
          <StatCard
            icon={<Users size={20} />}
            label="Total Capacity"
            value={stats.totalCapacity}
            progress={100}
            tone="green"
          />
          <StatCard
            icon={<CheckCircle2 size={20} />}
            label="Available"
            value={stats.available}
            progress={(stats.available / Math.max(stats.totalCapacity, 1)) * 100}
            tone="slate"
          />
          <StatCard
            icon={<Wrench size={20} />}
            label="Maintenance"
            value={stats.maintenance}
            progress={(stats.maintenance / Math.max(rooms.length, 1)) * 100}
            tone="amber"
          />
        </section>

        <Card className="p-4">
          <div className="grid gap-3 lg:grid-cols-[1fr_160px_160px_48px]">
            <label className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search room, type, or occupant..."
                className="h-12 pl-10"
              />
            </label>

            <Select
              value={floor}
              onChange={setFloor}
              options={[
                { value: "all", label: "All Floors" },
                { value: "1", label: "Floor 1" },
                { value: "2", label: "Floor 2" },
                { value: "3", label: "Floor 3" },
              ]}
              ariaLabel="Filter by floor"
            />

            <Select
              value={wing}
              onChange={setWing}
              options={[
                { value: "all", label: "All Wings" },
                { value: "A", label: "Wing A" },
                { value: "B", label: "Wing B" },
                { value: "C", label: "Wing C" },
              ]}
              ariaLabel="Filter by wing"
            />

            <Button
              variant="ghost"
              onClick={() => {
                setQuery("");
                setFloor("all");
                setWing("all");
              }}
              className="h-12 bg-gray-50 text-gray-600 hover:bg-green-50 hover:text-green-700"
              aria-label="Reset filters"
            >
              <Filter size={18} />
            </Button>
          </div>
        </Card>

        {viewMode === "grid" ? (
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                menuOpen={activeMenu === room.id}
                onToggleMenu={(id) =>
                  setActiveMenu((current) => (current === id ? null : id))
                }
                onAssign={(target) => setModal({ type: "assign", room: target })}
                onDetails={(target) => setModal({ type: "details", room: target })}
                onMaintenance={markMaintenance}
                onAvailable={markAvailable}
              />
            ))}
          </section>
        ) : (
          <Card className="overflow-hidden p-0">
            <div className="grid grid-cols-[1fr_140px_140px_160px] border-b px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
              <span>Room</span>
              <span>Status</span>
              <span>Occupancy</span>
              <span>Action</span>
            </div>
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className="grid grid-cols-[1fr_140px_140px_160px] items-center border-b px-5 py-4 last:border-b-0"
              >
                <div>
                  <p className="font-semibold text-gray-900">{room.number}</p>
                  <p className="text-sm text-gray-500">
                    {room.type} - Floor {room.floor}, Wing {room.wing}
                  </p>
                </div>
                <Badge type={statusMeta[room.status].badge}>
                  {statusMeta[room.status].label}
                </Badge>
                <span className="text-sm text-gray-600">
                  {room.occupants}/{room.capacity}
                </span>
                <Button
                  size="sm"
                  onClick={() =>
                    room.status === "maintenance"
                      ? markAvailable(room)
                      : setModal({ type: "details", room })
                  }
                >
                  {room.status === "maintenance" ? "Update" : "Details"}
                </Button>
              </div>
            ))}
          </Card>
        )}

        {filteredRooms.length === 0 && (
          <Card className="p-10 text-center text-sm text-gray-500">
            No rooms match the selected filters.
          </Card>
        )}
      </div>

      {modal.type && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <Card className="w-full max-w-md">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-green-600">
                  Room Management
                </p>
                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                  {modal.type === "add"
                    ? "Add Room"
                    : `Room ${modal.room?.number}`}
                </h2>
              </div>
              <Button variant="ghost" size="sm" onClick={closeModal}>
                X
              </Button>
            </div>

            {modal.type === "add" && (
              <div className="mt-6 space-y-4">
                <Input
                  value={form.number}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      number: event.target.value,
                    }))
                  }
                  placeholder="Room number, e.g. A-106"
                />
                <Input
                  type="number"
                  min="1"
                  value={form.capacity}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      capacity: event.target.value,
                    }))
                  }
                  placeholder="Capacity"
                />
                <div className="grid grid-cols-3 gap-3">
                  <Select
                    value={form.floor}
                    onChange={(floorValue) =>
                      setForm((current) => ({
                        ...current,
                        floor: floorValue,
                      }))
                    }
                    options={[
                      { value: "1", label: "Floor 1" },
                      { value: "2", label: "Floor 2" },
                      { value: "3", label: "Floor 3" },
                    ]}
                    ariaLabel="Room floor"
                  />
                  <Select
                    value={form.wing}
                    onChange={(wingValue) =>
                      setForm((current) => ({
                        ...current,
                        wing: wingValue,
                      }))
                    }
                    options={[
                      { value: "A", label: "Wing A" },
                      { value: "B", label: "Wing B" },
                      { value: "C", label: "Wing C" },
                    ]}
                    ariaLabel="Room wing"
                  />
                  <Select
                    value={form.type}
                    onChange={(type) =>
                      setForm((current) => ({
                        ...current,
                        type,
                      }))
                    }
                    options={roomTypes.map((type) => ({ value: type, label: type }))}
                    ariaLabel="Room type"
                  />
                </div>
                <Button fullWidth size="lg" onClick={addRoom}>
                  Add Room
                </Button>
              </div>
            )}

            {modal.type === "assign" && modal.room && (
              <div className="mt-6 space-y-4">
                <p className="text-sm text-gray-600">
                  Assign one occupant to Room {modal.room.number}. The room
                  status updates automatically when capacity is reached.
                </p>
                <Button fullWidth size="lg" onClick={() => assignRoom(modal.room)}>
                  Confirm Assign
                </Button>
              </div>
            )}

            {modal.type === "details" && modal.room && (
              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <p>
                  <strong className="text-gray-900">Status:</strong>{" "}
                  {statusMeta[modal.room.status].label}
                </p>
                <p>
                  <strong className="text-gray-900">Occupancy:</strong>{" "}
                  {modal.room.occupants}/{modal.room.capacity}
                </p>
                <p>
                  <strong className="text-gray-900">Type:</strong>{" "}
                  {modal.room.type}
                </p>
                {modal.room.student && (
                  <p>
                    <strong className="text-gray-900">Occupant:</strong>{" "}
                    {modal.room.student}
                  </p>
                )}
                <div className="grid grid-cols-2 gap-3 pt-3">
                  {modal.room.status !== "maintenance" && (
                    <Button
                      variant="warning"
                      fullWidth
                      onClick={() => markMaintenance(modal.room)}
                    >
                      Maintenance
                    </Button>
                  )}
                  {modal.room.status === "maintenance" && (
                    <Button fullWidth onClick={() => markAvailable(modal.room)}>
                      Update Status
                    </Button>
                  )}
                  <Button variant="secondary" fullWidth onClick={closeModal}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
