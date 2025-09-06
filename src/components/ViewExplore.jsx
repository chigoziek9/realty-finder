import { useNavigate } from "react-router-dom";
import Arrow from "../assets/ArrowRight.png";

const ViewExplore = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Newtomarket"); // Adjust the route based on your routing setup
  };

  return (
    <div className="flex sm:px-6  mb-10">
      <p
        onClick={handleClick}
        className="text-sm sm:text-base text-[#28563a] font-semibold underline"
      >
        See all 100 popular rentals
      </p>
    </div>
  );
};

export default ViewExplore;
