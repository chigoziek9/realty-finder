import { useState } from "react";

export default function Message() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Button that triggers the modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800"
      >
        Open Modal
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/30 backdrop-blur-sm">
          {/* Modal box */}
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg font-bold"
            >
              ✕
            </button>

            {/* Modal content */}
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Contact Willow creek bungalows
            </h2>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="border border-gray-300 rounded-md p-2"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="border border-gray-300 rounded-md p-2"
              />
              <textarea
                placeholder="Enter message"
                className="border border-gray-300 rounded-md p-2"
              ></textarea>
              <button
                type="submit"
                className="bg-green-700 text-white py-2 rounded-md hover:bg-green-800"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
