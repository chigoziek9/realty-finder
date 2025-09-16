import { MessageSquare } from "lucide-react";

const activities = [
  {
    message: "You received a new inquiry on 3 bedroom terrace",
    time: "2 hours ago",
  },
  {
    message: "You received a new inquiry on 3 bedroom terrace",
    time: "2 hours ago",
  },
  {
    message: "You received a new inquiry on 3 bedroom terrace",
    time: "2 hours ago",
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-2xl mt-[17px]">
      {/* Header */}
      <h2 className="text-lg font-semibold border-b pb-2 mb-3">
        Recent activity
      </h2>

      {/* Sub-header */}
      <div className="flex justify-between items-center mb-3">
        <span className="font-medium">This Week</span>
        <input
          type="text"
          placeholder="Search"
          className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring focus:ring-green-200"
        />
      </div>

      {/* Activity list */}
      <div className="space-y-3 border-t pt-3">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b pb-3 last:border-b-0"
          >
            <div>
              <p className="text-sm">{activity.message}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
            <button><MessageSquare className="text-green-800 bg-[#FFFFFF] rounded-full p-1 w-7 h-7" /></button>
           
          </div>
        ))}
      </div>

      {/* Footer with pagination */}
      <div className="flex justify-between items-center border-t pt-3 mt-3 text-sm text-gray-600">
        <p>Showing 1 to 4 of 17</p>
        <div className="flex gap-2">
          <button className="w-8 h-8 flex items-center justify-center border rounded bg-green-100 text-green-900 hover:bg-green-200">
            ‹
          </button>
          <button className="w-8 h-8 flex items-center justify-center border rounded bg-green-900 text-white hover:bg-green-800">
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
