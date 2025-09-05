import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import individualImg from "../assets/Individual.png";
import ownerImg from "../assets/property owner.png";
import agentImg from "../assets/Realestateagent.png";

const accountTypes = [
  { id: "individual", title: "Individual", image: individualImg },
  { id: "owner", title: "Property Owner", image: ownerImg },
  { id: "agent", title: "Real Estate Agent", image: agentImg },
];

export default function ChooseAccountType() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  // ✅ Load saved account type on mount
  useEffect(() => {
    const savedType = localStorage.getItem("accountType");
    if (savedType) {
      setSelected(savedType);
    }
  }, []);

  const handleSelect = (typeId) => {
    setSelected(typeId);
    localStorage.setItem("accountType", typeId); // ✅ save immediately
  };

  const handleContinue = () => {
    if (!selected) return;
    navigate("/signup"); // ✅ redirect to signup page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        {/* Back Button */}
        <button
          className="text-gray-600 mb-6 flex items-center hover:underline"
          onClick={() => navigate(-1)}
        >
          &larr; Back
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Select your account type
        </h2>
        <p className="text-center text-gray-600 mt-2">
          We’ll streamline your setup experience accordingly
        </p>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {accountTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => handleSelect(type.id)}
              className={`relative border rounded-xl p-6 flex flex-col items-center cursor-pointer transition-all ${
                selected === type.id
                  ? "border-green-600 bg-green-50"
                  : "border-gray-200 hover:border-green-400"
              }`}
            >
              <img
                src={type.image}
                alt={type.title}
                className="w-28 h-28 object-contain mb-4"
              />
              <h3 className="font-medium text-gray-800">{type.title}</h3>

              {/* Selected Checkmark */}
              {selected === type.id && (
                <FaCheckCircle className="absolute top-3 right-3 text-green-600 text-lg" />
              )}
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <button
          disabled={!selected}
          onClick={handleContinue}
          className={`mt-10 w-full py-3 rounded-lg font-semibold transition ${
            selected
              ? "bg-green-700 text-white hover:bg-green-800"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
