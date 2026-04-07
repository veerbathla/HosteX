export default function WelcomeCard() {
  return (
    <div className="bg-gradient-to-r from-[#1f9d6a] to-[#0c7a52] text-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <h1 className="text-2xl font-semibold">Hello, Sarah Miller</h1>
      <p className="mt-2 text-sm opacity-90">
        Welcome back to your curated campus sanctuary. Everything is looking good at Room 204 today.
      </p>

      <div className="flex gap-4 mt-4">
        <button className="bg-white text-green-700 px-4 py-2 rounded-lg font-medium hover:scale-[1.02] transition">
          View Room Info
        </button>
        <button className="border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-green-700 transition">
          Digital Key
        </button>
      </div>
    </div>
  );
}