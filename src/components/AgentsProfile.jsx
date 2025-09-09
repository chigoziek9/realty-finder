import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import Viewproperty from "./Viewproperty";

export default function AgentsProfile() {
  const [Agents, setAgents] = useState([]);

 

  useEffect(() => {
    fetch("/agents.json")
      .then((res) => res.json())
      .then((data) => {
        setAgents(data.slice(0, 6)); // limit to 6
      });
  }, []);

  if (Agents.length === 0) {
    return (
      <p className="flex justify-center items-center text-2xl sm:text-3xl md:text-4xl font-bold h-40">
        Loading...
      </p>
    );
  }

  return (
    <div className="px-2 sm:px-4 md:px-8 lg:px-12 mt-10">
      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
        {Agents.map((profile) => (
          <div
            key={profile.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
          >
            {/* Image wrapper */}
            <div className="relative">
              {/* Badge */}
              <span className="absolute top-3 left-3 bg-[#27513d] text-white text-sm px-3 py-1 rounded-2xl">
                {profile.badge}
              </span>

              {/* Image */}
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
              />
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="text-xl sm:text-3xl font-semibold">
                {profile.name}
              </h3>
              <p className="text-xl mt-4 text-[#000000]">
                {profile.title} . {profile.location}
              </p>
              <p className="text-[#27513d] text-xl">{profile.email}</p>

              {/* Stats */}
              <div className="mt-5  flex justify-between text-2xl sm:text-3xl font-semibold">
                <p>{profile.sales_volume}</p>
                <p>{profile.total_deals}</p>
                <p>{profile.avg_rating}⭐</p>
              </div>
              <div className="text-xs sm:text-sm flex justify-between">
                <p>Sales Volume</p>
                <p>Total Deals</p>
                <p>Avg Rating</p>
              </div>

              {/* Button */}
              <div className="flex items-center justify-between mt-3">
                <button className="text-sm text-white bg-[#27513d] w-full px-6 py-5 rounded-lg">
                  {profile.button}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Section */}
      <div>
        <Viewproperty />
      </div>
    </div>
  );
}
