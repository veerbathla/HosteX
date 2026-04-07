export default function Process() {
  const steps = [
    {
      title: "Register",
      desc: "Set up your profile with institutional credentials. One-click verification for student records ensures rapid entry into the campus ecosystem.",
    },
    {
      title: "Get Room Assigned",
      desc: "Select a preferred unit from the live map or get automatically assigned based on your department and academic requirements.",
    },
    {
      title: "Manage & Track Requests",
      desc: "Submit complaints, track maintenance history, or apply for room upgrades directly from your mobile-friendly dashboard.",
    },
  ];

  return (
    <div id="process" className="bg-gradient-to-b from-[#e4efe9] to-[#d8e5df] px-16 py-20">
      
      <div className="grid grid-cols-2 gap-16 items-start">
        
        {/* LEFT */}
        <div>
          <p className="text-xs tracking-widest text-green-600 font-medium">
            PROCESS FLOW
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-3">
            Simple Onboarding <br /> for Every Student
          </h2>

          <p className="text-gray-500 mt-4 max-w-sm">
            Designed to reduce administrative workload by up to 60% through self-service student portals.
          </p>

          {/* Placeholder box */}
          <div className="mt-8 h-40 bg-white/40 rounded-xl"></div>
        </div>

        {/* RIGHT (TIMELINE) */}
        <div className="relative">
          
          {/* Vertical Line */}
          <div className="absolute left-4 top-2 bottom-2 w-[2px] bg-gray-300"></div>

          <div className="flex flex-col gap-10">
            
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 items-start">
                
                {/* Circle */}
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#16a34a] text-white text-sm font-medium z-10">
                  {i + 1}
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {step.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1 max-w-md">
                    {step.desc}
                  </p>
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}