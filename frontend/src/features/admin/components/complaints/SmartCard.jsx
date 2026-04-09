import React from "react";

const SmartCard = ({ type }) => {
  if (type === "smart") {
    return (
      <div className="bg-green-800 text-white p-6 rounded-xl">
        <h3 className="text-lg font-semibold">Smart Routing Active</h3>
        <p className="text-sm mt-2">
          Complaints are automatically assigned to staff
        </p>
      </div>
    );
  }

  return (
    <div className="bg-red-200 p-6 rounded-xl">
      <h3 className="text-lg font-semibold">Critical Overdue</h3>
      <p className="text-sm mt-2">
        2 high priority issues pending
      </p>
    </div>
  );
};

export default SmartCard;