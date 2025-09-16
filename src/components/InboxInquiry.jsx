import { MessageSquare } from "lucide-react";

const activities = [
  {
    message:
      "I’m interested in the Lekki 3-bedroom apartment and would like mo...",
    title: "General property interest",
  },
  {
    message:
      "Hello, i really like the Ajah 3 bedroom bungalow but would like to kn...",
    title: "Rental inquiry",
  },
  {
    message:
      "Hi, before proceeding with the banana island villa viewing, could you pro...",
    title: "Documentation/Legal inquiry",
  },
];

export default function InboxInquiry() {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-xl mt-[24px]">
      {/* Header */}
      <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-[20px] leading-[30px] border-b py-[36px] px-[10px] tracking-[0] text-[#08110C]">
        Inbox Inquiry
      </h2>
      {/* Activity list */}
      <div className="space-y-3 mt-[16px] ">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b pb-3 last:border-b-0"
          >
            <div>
              <p className="font-['Plus_Jakarta_Sans'] font-semibold px-[34px]  text-[16px] leading-[100%] tracking-[0] align-middle  text-[#08110C]">
                {activity.title}
              </p>
              <p className="font-['Plus_Jakarta_Sans'] font-medium text-[14px] px-[34px] mt-[4px] leading-[20px] text-[#313131] tracking-[0] align-middle">{activity.message}</p>
            </div>
            <button>
              <MessageSquare className="text-green-800 bg-[#FFFFFF] rounded-full p-1 w-7 h-7" />
            </button>
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
