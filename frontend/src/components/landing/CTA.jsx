import Button from "../ui/Button";

export default function CTA() {
  return (
    <div id="cta" className="bg-[#e6efe9] px-16 py-20">
      <div className="rounded-3xl bg-gradient-to-r from-[#22c55e] to-[#15803d] px-10 py-16 text-center shadow-lg">
        <h2 className="text-3xl font-bold text-white">
          Ready to Digitize Your Campus?
        </h2>

        <p className="mt-4 text-green-100">
          Join over 50 institutions streamlining their housing management today.
        </p>

        <div className="mt-8 flex items-center justify-center gap-6">
          <Button
            variant="secondary"
            size="lg"
            className="bg-white text-green-700 hover:bg-gray-100"
          >
            Start Free Trial
          </Button>

          <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
            Talk to Sales -&gt;
          </Button>
        </div>
      </div>
    </div>
  );
}
