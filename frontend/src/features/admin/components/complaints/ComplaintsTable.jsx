import React from "react";
import Card from "../../../../components/ui/Card";
import Badge from "../../../../components/ui/Badge";

const ComplaintsTable = ({ data }) => {
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Recent Logs</h2>

      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-5 items-center p-3 border-b"
          >
            {/* Title */}
            <div>
              <p className="font-medium">{item.title}</p>
              <span className="text-sm text-gray-400">{item.time}</span>
            </div>

            {/* Student */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center text-sm">
                {item.initials}
              </div>
              {item.student}
            </div>

            {/* Priority */}
            <Badge type={item.priority} />

            {/* Status */}
            <Badge type={item.status} />

            {/* Actions */}
            <div className="flex gap-2">
              <button className="text-green-600">✔</button>
              <button className="text-blue-600">✏</button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ComplaintsTable;