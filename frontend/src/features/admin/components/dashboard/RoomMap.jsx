import RoomCard from "./RoomCard";

export default function RoomMap() {
  const rooms = [
    { id: 1, number: "101", status: "occupied", occupants: 2, capacity: 3 },
    { id: 2, number: "102", status: "empty", occupants: 0, capacity: 3 },
    { id: 3, number: "103", status: "issue", occupants: 1, capacity: 2 },
    { id: 4, number: "104", status: "occupied", occupants: 3, capacity: 3 },
    { id: 5, number: "105", status: "empty", occupants: 0, capacity: 2 },
    { id: 6, number: "106", status: "occupied", occupants: 1, capacity: 2 },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm">
      
      {/* Title */}
      <h2 className="font-semibold text-gray-800 mb-4">
        Room Occupancy Map
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-6 gap-4">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>

    </div>
  );
}