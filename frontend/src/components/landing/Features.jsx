export default function Features() {
  const features = [
    {
      title: "Room Allocation",
      desc: "Smart room assignment system",
    },
    {
      title: "Complaint Management",
      desc: "Track and resolve issues easily",
    },
    {
      title: "Real-time Notifications",
      desc: "Instant alerts and updates",
    },
    {
      title: "Admin Dashboard",
      desc: "Full control & insights",
    },
  ];

  return (
    <div className="px-16 py-20 text-center">
      
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Precision Engineering for Campus Life
      </h2>

      <p className="text-gray-500 mb-12">
        Eliminate friction between admin and students
      </p>

      <div className="grid grid-cols-4 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg">{f.title}</h3>
            <p className="text-sm text-gray-500 mt-2">{f.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
}