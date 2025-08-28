import { useNavigate } from "react-router-dom";
import Arrow from "../assets/ArrowRight.png";

const Viewproperty = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Newtomarket"); // Adjust the route based on your routing setup
  };

  return (
    <div className="flex justify-center items-center px-4 sm:px-6">
      <button
        onClick={handleClick}
        className="px-6 py-2 text-sm sm:text-base bg-[#28563a] text-white font-semibold rounded-3xl hover:bg-blue-800 transition flex items-center"
      >
        View All Property
        <img src={Arrow} alt="Arrow" className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
      </button>
    </div>
  );
};

export default Viewproperty;
