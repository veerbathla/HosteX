export default function Process() {
  const steps = [
    "Register",
    "Get Room Assigned",
    "Manage & Track Requests",
  ];

  return (
    <div className="px-10 py-16">
      <h2 className="text-3xl font-bold mb-10">
        Simple Onboarding for Every Student
      </h2>

      {steps.map((step, i) => (
        <div key={i} className="mb-6">
          <h3 className="font-semibold">
            {i + 1}. {step}
          </h3>
        </div>
      ))}
    </div>
  );
}