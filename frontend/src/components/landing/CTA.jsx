import Button from "../ui/Button";

export default function CTA() {
  return (
    <div id="cta" className="bg-[#e6efe9] px-16 py-20">
      
      {/* CONTAINER */}
      <div className="bg-gradient-to-r from-[#22c55e] to-[#15803d] rounded-3xl py-16 px-10 text-center shadow-lg">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-white">
          Ready to Digitize Your Campus?
        </h2>

        {/* Subtext */}
        <p className="text-green-100 mt-4">
          Join over 50 institutions streamlining their housing management today.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center items-center gap-6">
          
          {/* Primary Button */}
          <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-medium shadow hover:bg-gray-100 transition">
            Start Free Trial
          </button>

          {/* Secondary Link */}
          <button className="text-white font-medium flex items-center gap-1">
            Talk to Sales →
          </button>

        </div>

      </div>

    </div>
  );
}