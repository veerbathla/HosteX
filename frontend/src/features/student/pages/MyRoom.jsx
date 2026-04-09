import { BedDouble, Building2, Fan, Table, Wifi } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import { getCurrentUser } from "../../../services/api/authService";
import { getMyRoom } from "../../../services/api/roomService";
import { getErrorMessage } from "../../../services/api/normalizers";

export default function MyRoom() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadRoom() {
      setLoading(true);
      setError("");

      try {
        const data = await getMyRoom();
        if (active) setRoom(data);
      } catch (apiError) {
        if (active) setError(getErrorMessage(apiError, "Unable to load room details."));
      } finally {
        if (active) setLoading(false);
      }
    }

    loadRoom();

    return () => {
      active = false;
    };
  }, []);

  const facilities = useMemo(
    () => [
      { icon: <Wifi size={20} />, title: "Connectivity", status: "ACTIVE" },
      { icon: <BedDouble size={20} />, title: "Room Type", status: room?.type || "ASSIGNED" },
      { icon: <Fan size={20} />, title: "Occupancy", status: `${room?.occupants || 0}/${room?.capacity || 0}` },
      { icon: <Table size={20} />, title: "Floor", status: room?.floor ? `LEVEL ${room.floor}` : "NOT SET" },
      { icon: <Building2 size={20} />, title: "Wing", status: room?.wing || "MAIN BLOCK" },
    ],
    [room],
  );

  const roommates = useMemo(() => {
    const occupants = room?.raw?.occupants || [];
    return occupants.filter((mate) => mate?._id !== currentUser?._id);
  }, [currentUser?._id, room?.raw?.occupants]);

  return (
    <div className="min-h-screen space-y-6 bg-[#f5f7f6] p-4 sm:p-8">
      <div>
        <p className="text-xs font-medium tracking-wide text-green-600">
          PERSONAL SANCTUARY
        </p>
        <h1 className="mt-1 text-3xl font-semibold">My Room</h1>
      </div>

      {error && (
        <div className="rounded-lg border border-amber-100 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
          {error}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2 flex flex-col gap-6 p-6 md:flex-row">
          <div className="flex h-48 w-1/2 items-end rounded-2xl bg-gray-200 p-3">
            <Badge type={room?.status === "available" ? "neutral" : "success"}>
              {loading ? "Loading..." : room?.status || "Unassigned"}
            </Badge>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xs text-gray-400">ASSIGNED UNIT</p>
              <h2 className="mt-1 text-3xl font-bold">
                {loading ? "--" : room?.number || "Not assigned"}
              </h2>

              <div className="mt-4 flex flex-wrap gap-10 text-sm">
                <div>
                  <p className="text-xs text-gray-400">BUILDING BLOCK</p>
                  <p className="font-medium">{loading ? "--" : room?.wing || "Main Wing"}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">FLOOR LEVEL</p>
                  <p className="font-medium">
                    {loading ? "--" : room?.floor ? `Floor ${room.floor}` : "Not assigned"}
                  </p>
                </div>
              </div>
            </div>

            <Button onClick={() => navigate("/student/application")}>
              Request Room Change
            </Button>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Roommates</h3>
            <Badge type="neutral">
              {loading ? "Loading..." : `${room?.occupants || 0} Slots Filled`}
            </Badge>
          </div>

          <div className="mt-4 space-y-4">
            {loading ? (
              <div className="h-24 animate-pulse rounded-xl bg-gray-100" />
            ) : roommates.length ? (
              roommates.map((mate) => (
              <div key={mate.name} className="rounded-xl bg-gray-50 p-3">
                <p className="font-medium">{mate.name}</p>
                <p className="text-xs text-gray-500">
                  {mate.courses || "Hostel Resident"}{mate.year ? ` - Year ${mate.year}` : ""}
                </p>
              </div>
              ))
            ) : (
              <div className="rounded-xl bg-gray-50 p-3 text-sm text-gray-500">
                No roommate data available yet.
              </div>
            )}
          </div>

          <p className="mt-4 text-xs text-gray-400">
            "Living together is the first step toward lifelong friendship."
          </p>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Room Facilities</h2>
            <p className="text-sm text-gray-500">
              Included amenities for your comfort
            </p>
          </div>

          <Button
            variant="ghost"
            onClick={() => navigate("/student/complaints")}
            className="text-green-600"
          >
            Report Issue
          </Button>
        </div>

        <div className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
          {facilities.map((item) => (
            <Card
              key={item.title}
              className="p-5 text-center transition hover:scale-[1.03]"
            >
              <div className="inline-block rounded-full bg-green-50 p-3 text-green-600">
                {item.icon}
              </div>
              <p className="mt-3 font-medium">{item.title}</p>
              <p className="mt-1 text-xs text-green-600">{item.status}</p>
            </Card>
          ))}
        </div>
      </div>

      <Card className="flex items-center justify-between p-6">
        <div>
          <p className="font-medium">Something not working?</p>
          <p className="text-sm text-gray-500">
            Open a quick ticket for repairs or cleaning.
          </p>
        </div>

        <Button onClick={() => navigate("/student/application")}>Create Ticket</Button>
      </Card>
    </div>
  );
}
