import React from "react";

const StatsCard = ({ title, value, icon, trend }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-center">
      
      {/* Left Content */}
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-semibold mt-1">{value}</h2>

        {/* Optional Trend */}
        {trend && (
          <p
            className={`text-xs mt-1 ${
              trend.type === "up" ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.value}
          </p>
        )}
      </div>

      {/* Right Icon */}
      {icon && (
        <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg">
          {icon}
        </div>
      )}
    </div>
  );
};

export default StatsCard;