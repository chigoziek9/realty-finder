import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { month: "Jan", earnings: 5500 },
  { month: "Feb", earnings: 6200 },
  { month: "Mar", earnings: 7800 },
  { month: "Apr", earnings: 4800 },
  { month: "May", earnings: 6100 },
];

export default function Graph() {
  return (
    <div className="w-full max-w-2xl  p-6 border  bg-white rounded-lg shadow-md mt-[24px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Commission earned</h2>
        <select className="border rounded-md px-2 py-1 text-sm">
          <option>Monthly</option>
          <option>Weekly</option>
          <option>Yearly</option>
        </select>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="earnings"
            stroke="#4F46E5"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
