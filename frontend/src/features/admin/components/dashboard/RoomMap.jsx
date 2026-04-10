import RoomCard from "./RoomCard";

export default function RoomMap({ rooms = [] }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm">
      
      {/* Title */}
      <h2 className="font-semibold text-gray-800 mb-4">
        Room Occupancy Map
      </h2>

      {/* Grid */}
      {rooms.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {rooms.slice(0, 12).map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-200 p-6 text-sm font-medium text-gray-500">
          No room data returned by the API yet.
        </div>
      )}

    </div>
  );
}
