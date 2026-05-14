import Button from "@/components/ui/Button";

export default function WelcomeCard() {
  return (
    <div className="rounded-2xl border border-green-100 bg-gradient-to-r from-green-600 via-green-600 to-green-700 p-8 text-white shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-green-100">
        Student Portal
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-green-50">Hello</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-green-50">
        Welcome back. Your room and service requests are synced with the latest campus updates.
      </p>

      <div className="mt-6 flex flex-wrap gap-4">
        <Button
          variant="secondary"
          className="border-white bg-white text-green-700 hover:scale-[1.02] hover:bg-green-50"
        >
          View Room Info
        </Button>
        <Button
          variant="outline"
          className="border-white bg-transparent text-green-700 hover:bg-white hover:text-green-700"
        >
          Digital Key
        </Button>
      </div>
    </div>
  );
}