import Button from "../../../../components/ui/Button";

export default function WelcomeCard() {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-[#1f9d6a] to-[#0c7a52] p-8 text-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <h1 className="text-2xl font-semibold">Hello, Sarah Miller</h1>
      <p className="mt-2 text-sm opacity-90">
        Welcome back to your curated campus sanctuary. Everything is looking good at Room 204 today.
      </p>

      <div className="mt-4 flex gap-4">
        <Button
          variant="secondary"
          className="bg-white text-green-700 hover:scale-[1.02]"
        >
          View Room Info
        </Button>
        <Button
          variant="outline"
          className="border-white text-green-700 hover:bg-white hover:text-green-700"
        >
          Digital Key
        </Button>
      </div>
    </div>
  );
}
