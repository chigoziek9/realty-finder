// src/components/Filters.jsx
import Frame from "../assets/Frame.png";
import Size from "../assets/size.png";
import Location from "../assets/Vector.png";
import Calendar from "../assets/calendar.png";
import Pricing from "../assets/pricing.png";

export default function Filters({ filters, setFilters }) {
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const FilterBox = ({ icon, value, onChange, options, placeholder }) => (
    <div className="flex items-center bg-white border border-gray-300 rounded-2xl shadow-sm overflow-hidden w-full sm:w-[236px] h-[52px]">
      <div className="px-3 flex items-center">
        <img src={icon} alt="icon" />
      </div>
      <div className="h-6 w-px bg-gray-300 mx-2" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 p-2 text-gray-700 text-sm sm:text-base focus:outline-none"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <FilterBox
        icon={Location}
        value={filters.location}
        onChange={(v) => handleChange("location", v)}
        placeholder="Location"
        options={[
          { value: "lagos", label: "Lagos" },
          { value: "abuja", label: "Abuja" },
          { value: "portharcourt", label: "Port Harcourt" },
          { value: "kano", label: "Kano" },
        ]}
      />

      <FilterBox
        icon={Frame}
        value={filters.type}
        onChange={(v) => handleChange("type", v)}
        placeholder="Property Type"
        options={[
          { value: "apartment", label: "Apartment" },
          { value: "duplex", label: "Duplex" },
          { value: "bungalow", label: "Bungalow" },
        ]}
      />

      <FilterBox
        icon={Pricing}
        value={filters.pricing}
        onChange={(v) => handleChange("pricing", v)}
        placeholder="Pricing Range"
        options={[
          { value: "low", label: "₦0 - ₦500k" },
          { value: "mid", label: "₦500k - ₦2M" },
          { value: "high", label: "₦2M+" },
        ]}
      />

      <FilterBox
        icon={Size}
        value={filters.size}
        onChange={(v) => handleChange("size", v)}
        placeholder="Property Size"
        options={[
          { value: "small", label: "1-2 Bedroom" },
          { value: "medium", label: "3-4 Bedroom" },
          { value: "large", label: "5+ Bedroom" },
        ]}
      />

      <FilterBox
        icon={Calendar}
        value={filters.year}
        onChange={(v) => handleChange("year", v)}
        placeholder="Build Year"
        options={[
          { value: "2020", label: "2020+" },
          { value: "2010", label: "2010 - 2019" },
          { value: "2000", label: "2000 - 2009" },
        ]}
      />
    </div>
  );
}
