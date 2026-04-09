import { useState } from "react";
import { AppContext } from "./appContextInstance";

export function AppProvider({ children }) {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: "Fan not working",
      time: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      title: "Water leakage in bathroom",
      time: "Yesterday",
      status: "progress",
    },
    {
      id: 3,
      title: "WiFi Connection Issues",
      time: "3 days ago",
      status: "resolved",
    },
  ]);

  const addComplaint = (newComplaint) => {
    setComplaints((prev) => [
      { id: Date.now(), ...newComplaint },
      ...prev,
    ]);
  };
  const deleteComplaint = (id) => {
    setComplaints((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <AppContext.Provider value={{ complaints, addComplaint, deleteComplaint }}>
      {children}
    </AppContext.Provider>
  );
}
