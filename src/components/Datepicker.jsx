import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

export default function CustomDatePicker() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="max-w-sm  my-8">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Date <span className="text-red-500">*</span>
      </label>

      <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
        <FaCalendarAlt className="text-gray-400 mr-2" />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Choose a date"
          className="w-[400px] focus:outline-none text-gray-700"
        />
      </div>
    </div>
  );
}
