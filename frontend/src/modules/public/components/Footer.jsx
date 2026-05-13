export default function Footer() {
  return (
    <div className="bg-[#e6efe9] px-16 py-10">
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        
        {/* LEFT */}
        <div>
          <h3 className="font-semibold text-gray-800">
            HosteX
          </h3>
          <p className="text-xs text-gray-400 mt-1 max-w-xs">
            Elevating the student living experience through thoughtful digital architecture.
          </p>
        </div>

        {/* CENTER */}
        <div className="flex gap-8 text-xs">
          <span className="hover:text-gray-700 cursor-pointer">
            Privacy Policy
          </span>
          <span className="hover:text-gray-700 cursor-pointer">
            Terms of Service
          </span>
          <span className="hover:text-gray-700 cursor-pointer">
            Contact
          </span>
          <span className="hover:text-gray-700 cursor-pointer">
            Support
          </span>
        </div>

        {/* RIGHT */}
        <div className="text-xs text-gray-400">
          (c) 2026 HosteX. All rights reserved.
        </div>

      </div>

    </div>
  );
}
